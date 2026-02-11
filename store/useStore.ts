import { create } from 'zustand'

interface WalletState {
  address: string | null
  isConnected: boolean
  setAddress: (address: string | null) => void
  disconnect: () => void
}

interface UIState {
  balanceHidden: boolean
  toggleBalanceVisibility: () => void
}

type Store = WalletState & UIState

export const useStore = create<Store>((set) => ({
  // Wallet state
  address: null,
  isConnected: false,
  setAddress: (address) => set({ address, isConnected: !!address }),
  disconnect: () => set({ address: null, isConnected: false }),

  // UI state
  balanceHidden: false,
  toggleBalanceVisibility: () => set((state) => ({ balanceHidden: !state.balanceHidden })),
}))
