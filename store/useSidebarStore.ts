import { create } from 'zustand'

interface SidebarState {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,
  setCollapsed: (v) => set({ collapsed: v }),
}))
