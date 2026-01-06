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
  subTotal: number;
  deliveryFee: number;
  finalTotal: number;
}

const initialState: CartState = {
  cartData: [],
  subTotal: 0,
  deliveryFee: 50,
 finalTotal: 50,
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
      cartSlice.caseReducers.calculateTotal(state);
    },

    IncreaseCartItemQuantity(state, action: PayloadAction<string>) {
      const id = String(action.payload);
      const item = state.cartData.find((i) => String(i._id) === id);
      if (item) item.quantity += 1;
      cartSlice.caseReducers.calculateTotal(state);
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
      cartSlice.caseReducers.calculateTotal(state);
    },
    deleteCartItemQuantity(state, action: PayloadAction<string>) {
      const id = String(action.payload);
      state.cartData = state.cartData.filter((i) => String(i._id) !== id);
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal(state) {
      state.subTotal = state.cartData.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
      state.deliveryFee=state.subTotal>100?0:50;
      state.finalTotal = state.subTotal + state.deliveryFee;
    },

  },
});

export const { addToCart, IncreaseCartItemQuantity, decreaseCartItemQuantity, deleteCartItemQuantity, calculateTotal } =
  cartSlice.actions;

export const cartReducer=cartSlice.reducer;
