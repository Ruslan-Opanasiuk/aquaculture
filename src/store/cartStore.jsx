// src/store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addToCart: (newItems) =>
        set((state) => {
          const updatedItems = [...state.items];

          newItems.forEach((newItem) => {
            const existingIndex = updatedItems.findIndex(
              (item) => item.id === newItem.id
            );

            if (existingIndex >= 0) {
              updatedItems[existingIndex].quantity +=
                newItem.quantity;
            } else {
              updatedItems.push(newItem);
            }
          });

          return { items: updatedItems };
        }),

      updateQuantity: (id, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(0, newQuantity) }
              : item
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== id
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "caviar-cart",
    }
  )
);