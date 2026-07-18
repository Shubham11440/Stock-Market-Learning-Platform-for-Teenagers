'use client'

import { useRef, useEffect, ClipboardEvent, KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

interface OTPInputProps {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
  error?: boolean
}

export function OTPInput({ value, onChange, disabled, error }: OTPInputProps) {
  const digits = 6
  const cells = Array.from({ length: digits }, (_, i) => value[i] ?? '')
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const update = (index: number, char: string) => {
    const next = value.split('')
    next[index] = char
    onChange(next.join('').slice(0, digits))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (value[index]) {
        update(index, '')
      } else if (index > 0) {
        update(index - 1, '')
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < digits - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleInput = (char: string, index: number) => {
    const digit = char.replace(/\D/g, '').slice(-1)
    if (!digit) return
    update(index, digit)
    if (index < digits - 1) inputRefs.current[index + 1]?.focus()
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, digits)
    onChange(pasted)
    const nextFocus = Math.min(pasted.length, digits - 1)
    inputRefs.current[nextFocus]?.focus()
  }

  return (
    <div
      role="group"
      aria-label="One-time password"
      className={cn('flex gap-2', error && 'animate-[shake_0.4s_ease-in-out]')}
    >
      {cells.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${i + 1} of 6`}
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleInput(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={cn(
            'w-11 h-12 text-center text-lg font-semibold font-mono rounded-xl border bg-surface-2 text-text-1',
            'transition-all duration-150 outline-none',
            'focus:border-primary focus:ring-2 focus:ring-primary/20',
            error ? 'border-loss focus:border-loss focus:ring-loss/20' : 'border-border',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      ))}
    </div>
  )
}
