import { create } from "zustand/react";

import { CartItem } from "../../generated/prisma/client";

import { API } from "@/services/api-client";

import { getCartDetails } from "@/functions/data";

export type CartStore = {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  // TODO: Использовать другой тип вместо any
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await API.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: any) => {},
  removeCartItem: async (id: number) => {},
}));
