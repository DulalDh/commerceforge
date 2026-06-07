import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  isDrawerOpen: false,
  setCart: (cart) => set({ items: cart?.items || [] }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item]
    })),
  clearCart: () => set({ items: [] })
}));
