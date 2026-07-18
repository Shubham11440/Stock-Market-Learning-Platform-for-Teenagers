import { create } from 'zustand';

export type Timeframe = '1W' | '1M' | '3M' | 'ALL';
export type SortOption = 'VALUE_DESC' | 'VALUE_ASC' | 'PNL_DESC' | 'PNL_ASC';

interface PortfolioState {
  // Chart controls
  selectedTimeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  
  // Position list controls
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  hideSmallBalances: boolean;
  setHideSmallBalances: (hide: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  selectedTimeframe: '1M',
  setTimeframe: (tf) => set({ selectedTimeframe: tf }),
  
  sortBy: 'VALUE_DESC',
  setSortBy: (sort) => set({ sortBy: sort }),
  
  hideSmallBalances: false,
  setHideSmallBalances: (hide) => set({ hideSmallBalances: hide }),
}));
