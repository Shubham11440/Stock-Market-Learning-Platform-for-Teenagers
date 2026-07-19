"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ReactNode } from "react"

interface InterceptedModalProps {
  children: ReactNode
}

export function InterceptedModal({ children }: InterceptedModalProps) {
  const router = useRouter()

  function handleOpenChange(open: boolean) {
    if (!open) {
      router.back()
    }
  }

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] p-0 border-0 bg-transparent shadow-none [&>button]:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* We strip the default Dialog padding/bg and hide the default close button 
            so the children can define their own layout and background */}
        <div className="bg-bg rounded-2xl p-4 sm:p-6 shadow-2xl border border-border w-full relative">
          <button 
            onClick={() => router.back()}
            className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-surface-2 hover:bg-surface-3 transition-colors"
          >
            ✕
          </button>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
