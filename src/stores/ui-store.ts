import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isLoading: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setLoading: (isLoading) => set({ isLoading }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
