'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { getQuote } from '@/lib/market/yahoo'
import { revalidatePath } from 'next/cache'

// Removed runtime export, handled by pages

import { TradeResult } from '@/types/market'

export async function executeTrade(
  symbol: string,
  quantity: number,
  type: 'BUY' | 'SELL'
): Promise<TradeResult> {
  try {
    // 1. Basic validation
    if (!symbol || quantity <= 0) {
      return { success: false, message: 'Invalid trade parameters.' }
    }

    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized.' }
    }

    // 2. Fetch live quote
    const quote = await getQuote(symbol)
    if (!quote || quote.price <= 0) {
      return { success: false, message: 'Market data unavailable or invalid price.' }
    }

    const price = quote.price
    const totalAmount = price * quantity

    // 3. Database Transaction
    const result = await db.$transaction(async (tx) => {
      // Fetch user and position with strict row locking (in a real PG environment, we'd use FOR UPDATE,
      // but Prisma's sequential read within a transaction provides basic isolation here).
      const user = await tx.user.findUniqueOrThrow({
        where: { id: session.user.id },
      })

      const position = await tx.position.findUnique({
        where: {
          userId_symbol_isVirtual: {
            userId: session.user.id,
            symbol: symbol,
            isVirtual: true,
          },
        },
      })

      if (type === 'BUY') {
        if (user.virtualBalance < totalAmount) {
          throw new Error('Insufficient virtual balance.')
        }

        // Deduct balance
        await tx.user.update({
          where: { id: user.id },
          data: { virtualBalance: user.virtualBalance - totalAmount },
        })

        // Update or Create Position
        if (position) {
          // Recalculate average price
          const totalCostBefore = position.quantity * position.avgPrice
          const newTotalQuantity = position.quantity + quantity
          const newAvgPrice = (totalCostBefore + totalAmount) / newTotalQuantity

          await tx.position.update({
            where: { id: position.id },
            data: {
              quantity: newTotalQuantity,
              avgPrice: newAvgPrice,
              name: quote.name, // ensure latest name
            },
          })
        } else {
          await tx.position.create({
            data: {
              userId: user.id,
              symbol,
              name: quote.name,
              quantity,
              avgPrice: price,
              isVirtual: true,
            },
          })
        }
      } else if (type === 'SELL') {
        if (!position || position.quantity < quantity) {
          throw new Error('Insufficient shares to sell.')
        }

        // Add balance
        await tx.user.update({
          where: { id: user.id },
          data: { virtualBalance: user.virtualBalance + totalAmount },
        })

        // Update or Delete Position
        const remainingQuantity = position.quantity - quantity
        if (remainingQuantity > 0) {
          await tx.position.update({
            where: { id: position.id },
            data: { quantity: remainingQuantity },
          })
        } else {
          await tx.position.delete({
            where: { id: position.id },
          })
        }
      }

      // Create Transaction Record
      await tx.transaction.create({
        data: {
          userId: user.id,
          symbol,
          name: quote.name,
          type,
          quantity,
          price,
          total: totalAmount,
          isVirtual: true,
          xpEarned: 0, // Simplified for now
        },
      })

      return price
    })

    // 4. Revalidate cache
    revalidatePath('/dashboard', 'layout')
    revalidatePath(`/trade/${symbol}`)

    return {
      success: true,
      message: `Successfully ${type === 'BUY' ? 'bought' : 'sold'} ${quantity} shares of ${symbol}.`,
      executedPrice: result,
    }
  } catch (error: any) {
    console.error(`[Trade Execution Error]`, error)
    return {
      success: false,
      message: error.message || 'An error occurred during trade execution.',
    }
  }
}
