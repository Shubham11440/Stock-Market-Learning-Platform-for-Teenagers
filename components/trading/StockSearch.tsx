'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { Search, Loader2, TrendingUp } from 'lucide-react'
import { StockSearchResult } from '@/types/market'
import { searchMarket } from '@/actions/market'
import { cn } from '@/lib/utils'

const POPULAR_STOCKS: StockSearchResult[] = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', exchange: 'NSE', type: 'EQUITY' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', exchange: 'NSE', type: 'EQUITY' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', exchange: 'NSE', type: 'EQUITY' },
  { symbol: 'INFY.NS', name: 'Infosys', exchange: 'NSE', type: 'EQUITY' },
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NMS', type: 'EQUITY' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', exchange: 'NMS', type: 'EQUITY' },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NMS', type: 'EQUITY' },
]

const fuse = new Fuse(POPULAR_STOCKS, {
  keys: ['symbol', 'name'],
  threshold: 0.3,
})

export function StockSearch({ className }: { className?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<StockSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search effect
  useEffect(() => {
    if (!query) {
      setResults(POPULAR_STOCKS)
      setIsSearching(false)
      return
    }

    const timer = setTimeout(async () => {
      // 1. Try local Fuse search
      const localResults = fuse.search(query).map(res => res.item)
      
      if (localResults.length > 0) {
        setResults(localResults)
        setIsSearching(false)
      } else {
        // 2. Fallback to Yahoo API if no local match
        setIsSearching(true)
        try {
          const apiResults = await searchMarket(query)
          setResults(apiResults.slice(0, 5)) // Limit to top 5
        } catch (e) {
          console.error(e)
          setResults([])
        } finally {
          setIsSearching(false)
        }
      }
    }, 400) // 400ms debounce

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (symbol: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(`/trade/${symbol}`)
  }

  return (
    <div className={cn("relative w-full max-w-lg z-50", className)} ref={searchContainerRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-text-3 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          className="w-full bg-surface-2 border border-border text-text-1 rounded-2xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-text-3"
          placeholder="Search stocks (e.g. RELIANCE.NS, AAPL)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          role="combobox"
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Loader2 size={18} className="text-primary animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div 
          className="absolute mt-2 w-full bg-surface border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2"
          role="listbox"
        >
          {results.length > 0 ? (
            <ul className="max-h-[300px] overflow-y-auto py-2">
              {!query && (
                <li className="px-4 py-2 text-xs font-semibold text-text-3 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp size={14} /> Popular Stocks
                </li>
              )}
              {results.map((stock) => (
                <li key={stock.symbol}>
                  <button
                    onClick={() => handleSelect(stock.symbol)}
                    className="w-full text-left px-4 py-3 hover:bg-surface-2 transition-colors flex flex-col focus:bg-surface-2 focus:outline-none"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="font-display font-bold text-text-1">{stock.symbol}</span>
                    <span className="text-sm text-text-3 truncate">{stock.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-text-3">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
