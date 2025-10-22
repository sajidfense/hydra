import { create } from 'zustand';

interface UIStore {
  isCartOpen: boolean;
  isNavOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  setNavOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isNavOpen: false,
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  setNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
}));
