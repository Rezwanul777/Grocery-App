/* eslint-disable @typescript-eslint/no-empty-object-type */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CartItem {
  _id: string; // ✅ store as string in redux
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
  quantity: number;
}

interface CartState {
  cartData: CartItem[];
}

const initialState: CartState = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const id = String(action.payload._id);
      const existing = state.cartData.find((i) => String(i._id) === id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartData.push({ ...action.payload, _id: id, quantity: 1 });
      }
    },

    IncreaseCartItemQuantity(state, action: PayloadAction<string>) {
      const id = String(action.payload);
      const item = state.cartData.find((i) => String(i._id) === id);
      if (item) item.quantity += 1;
    },

    decreaseCartItemQuantity(state, action: PayloadAction<string>) {
      const id = String(action.payload);
      const item = state.cartData.find((i) => String(i._id) === id);

      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cartData = state.cartData.filter((i) => String(i._id) !== id);
        }
      }
    },
  },
});

export const { addToCart, IncreaseCartItemQuantity, decreaseCartItemQuantity } =
  cartSlice.actions;

export const cartReducer=cartSlice.reducer;
