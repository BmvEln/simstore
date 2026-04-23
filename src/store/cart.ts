import { create } from "zustand/react";

import { CartItem } from "../../generated/prisma/client";

import { API } from "@/services/api-client";

import { getCartDetails } from "@/functions/data";

export type CartStore = {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartItem[];
  getCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (productVariantId: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,

  getCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await API.cart.getCart();
      // TODO: Проверить типизацию
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    set({ loading: true, error: false });
    try {
      const data = await API.cart.updateItemQuantity(id, quantity);
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
  removeCartItem: async (id: number) => {
    set({ loading: true, error: false });
    try {
      const data = await API.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
