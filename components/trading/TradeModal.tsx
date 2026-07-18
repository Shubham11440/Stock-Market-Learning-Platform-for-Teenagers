'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { executeTrade } from '@/actions/trade'
import { StockQuote } from '@/types/market'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TradeModalProps {
  isOpen: boolean
  onClose: () => void
  quote: StockQuote
  userBalance: number
  currentPositionQuantity: number
}

export function TradeModal({ isOpen, onClose, quote, userBalance, currentPositionQuantity }: TradeModalProps) {
  const router = useRouter()
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY')
  const [quantityStr, setQuantityStr] = useState('1')
  
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'>('IDLE')
  const [errorMessage, setErrorMessage] = useState('')
  const [successData, setSuccessData] = useState<{ executedPrice: number, qty: number } | null>(null)

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStatus('IDLE')
      setErrorMessage('')
      setQuantityStr('1')
    }
  }, [isOpen])

  const quantity = parseFloat(quantityStr) || 0
  const estimatedTotal = quantity * quote.price

  // Validations
  const isValidQuantity = quantity > 0 && Number.isInteger(quantity)
  const hasFunds = type === 'BUY' ? userBalance >= estimatedTotal : true
  const hasShares = type === 'SELL' ? currentPositionQuantity >= quantity : true
  
  const canSubmit = isValidQuantity && hasFunds && hasShares && status === 'IDLE'

  const handleSubmit = async () => {
    if (!canSubmit) return

    setStatus('PENDING')
    setErrorMessage('')

    try {
      const result = await executeTrade(quote.symbol, quantity, type)
      if (result.success) {
        setSuccessData({ executedPrice: result.executedPrice || quote.price, qty: quantity })
        setStatus('SUCCESS')
        // We do NOT close the modal immediately, we let the user see the success animation
        // The page data is revalidated in the background
        setTimeout(() => {
          onClose()
          router.refresh() // Refresh the page to ensure latest client state
        }, 2000)
      } else {
        setStatus('ERROR')
        setErrorMessage(result.message)
      }
    } catch (error) {
      setStatus('ERROR')
      setErrorMessage('A network error occurred. Please try again.')
    }
  }

  // Focus trap and escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'PENDING') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, status])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={() => status !== 'PENDING' && status !== 'SUCCESS' && onClose()}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 id="modal-title" className="font-display font-bold text-xl text-text-1">
                Trade {quote.symbol}
              </h2>
              <button 
                onClick={onClose}
                disabled={status === 'PENDING' || status === 'SUCCESS'}
                className="p-2 -mr-2 text-text-3 hover:text-text-1 hover:bg-surface-2 rounded-full transition-colors disabled:opacity-50"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Success State Overlay */}
            {status === 'SUCCESS' && successData && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 z-10 bg-surface flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                  className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="font-display font-bold text-2xl text-text-1 mb-2">Order Filled</h3>
                <p className="text-text-2">
                  Successfully {type === 'BUY' ? 'bought' : 'sold'} {successData.qty} shares at ₹{successData.executedPrice.toFixed(2)}
                </p>
              </motion.div>
            )}

            {/* Main Content */}
            <div className="p-6 flex flex-col gap-6">
              
              {/* Type Toggle */}
              <div className="flex bg-surface-2 p-1 rounded-xl border border-border/50">
                <button
                  onClick={() => setType('BUY')}
                  className={cn(
                    "flex-1 py-2 text-sm font-bold rounded-lg transition-colors",
                    type === 'BUY' ? "bg-surface text-text-1 shadow-sm border border-border/50" : "text-text-3 hover:text-text-2"
                  )}
                >
                  Buy
                </button>
                <button
                  onClick={() => setType('SELL')}
                  className={cn(
                    "flex-1 py-2 text-sm font-bold rounded-lg transition-colors",
                    type === 'SELL' ? "bg-surface text-text-1 shadow-sm border border-border/50" : "text-text-3 hover:text-text-2"
                  )}
                >
                  Sell
                </button>
              </div>

              {/* Price Info */}
              <div className="flex justify-between items-center px-2">
                <span className="text-text-2 text-sm">Current Price</span>
                <span className="font-medium text-text-1">₹{quote.price.toFixed(2)}</span>
              </div>

              {/* Input */}
              <div>
                <label htmlFor="qty" className="block text-text-2 text-sm mb-2 px-2">
                  Quantity
                </label>
                <div className="relative">
                  <input
                    id="qty"
                    type="number"
                    min="1"
                    step="1"
                    value={quantityStr}
                    onChange={(e) => setQuantityStr(e.target.value)}
                    className="w-full bg-surface-2 border border-border text-text-1 text-lg font-medium rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="0"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-text-3 font-medium">
                    Shares
                  </div>
                </div>
                {type === 'SELL' && (
                  <p className="text-xs text-text-3 mt-2 px-2">
                    Available to sell: <span className="font-medium text-text-2">{currentPositionQuantity}</span>
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="bg-surface-2 rounded-2xl p-5 border border-border/50 flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-2">Estimated Total</span>
                  <span className="font-bold text-text-1">₹{estimatedTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-2">Available Funds</span>
                  <span className={cn("font-medium", !hasFunds ? "text-red-500" : "text-text-1")}>
                    ₹{userBalance.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {status === 'ERROR' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm"
                  >
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <p>{errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all relative overflow-hidden",
                  canSubmit 
                    ? type === 'BUY' ? "bg-primary text-white hover:bg-primary-light" : "bg-red-500 text-white hover:bg-red-400"
                    : "bg-surface-2 text-text-3 border border-border/50 cursor-not-allowed",
                  status === 'PENDING' && "opacity-80 cursor-wait"
                )}
              >
                {status === 'PENDING' ? (
                  <><Loader2 size={18} className="animate-spin" /> Processing...</>
                ) : (
                  <>
                    Confirm {type === 'BUY' ? 'Buy' : 'Sell'}
                    {canSubmit && <ArrowRight size={18} />}
                  </>
                )}
              </button>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
