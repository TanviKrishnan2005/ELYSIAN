import { createSlice } from "@reduxjs/toolkit";

console.log("🛒 cartSlice loaded");

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const recalcCart = (state) => {
  state.selectedItems = state.products.reduce(
    (total, p) => total + (p.quantity || 0),
    0
  );

  state.totalPrice = state.products.reduce(
    (total, p) => total + (p.quantity || 0) * (p.price || 0),
    0
  );

  state.tax = state.totalPrice * state.taxRate;
  state.grandTotal = state.totalPrice + state.tax;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!action?.payload?._id) return;

      const existing = state.products.find(
        (p) => p._id === action.payload._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      recalcCart(state);
    },

    updateQuantity: (state, action) => {
      if (!action?.payload) return;

      const { _id, type } = action.payload;
      if (!_id || !type) return;

      const product = state.products.find((p) => p._id === _id);
      if (!product) return;

      if (type === "increment") product.quantity += 1;
      if (type === "decrement" && product.quantity > 1)
        product.quantity -= 1;

      recalcCart(state);
    },

    removeFromCart: (state, action) => {
      if (!action?.payload?._id) return;

      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );

      recalcCart(state);
    },

    clearCart: (state) => {
      state.products = [];
      recalcCart(state);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
