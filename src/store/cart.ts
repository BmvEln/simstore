import { create } from "zustand/react";

import { API } from "@/services/api-client";

import { CartStateItem } from "@/static/types";

import { getCartDetails } from "@/functions/data";

export type CartStore = {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  getCartItems: () => Promise<void>;
  updateItemQuantity: (
    productVariantId: number,
    quantity: number,
  ) => Promise<void>;
  addCartItem: (productVariantId: number) => Promise<void>;
  removeCartItem: (productVariantId: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,

  getCartItems: async () => {
    set({ loading: true, error: false });
    try {
      const data = await API.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (productVariantId: number, quantity: number) => {
    set({ loading: true, error: false });
    try {
      const data = await API.cart.updateItemQuantity(
        productVariantId,
        quantity,
      );
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (productVariantId: number) => {
    set({ loading: true, error: false });
    try {
      const data = await API.cart.addCartItem(productVariantId);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (productVariantId: number) => {
    set((state) => ({
      loading: true,
      error: false,
      items: state.items.map((item) =>
        item.id === productVariantId ? { ...item, disabled: true } : item,
      ),
    }));
    try {
      const data = await API.cart.removeCartItem(productVariantId);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set((state) => ({
        loading: true,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
}));
