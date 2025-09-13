import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("addToCart payload:", action.payload);
      const existingProduct = state.products.find(p => p._id === action.payload._id);

      if (existingProduct) {
        // Increase quantity if already in cart
        existingProduct.quantity += 1;
        console.log("Increased quantity for:", existingProduct.name);
      } else {
        // Add new product
        state.products.push({ ...action.payload, quantity: 1 });
        console.log("Added to cart:", action.payload.name);
      }

      // Recalculate totals
      recalcCart(state);
    },

    updateQuantity: (state, action) => {
      const product = state.products.find(p => p._id === action.payload._id);
      if (!product) return;

      if (action.payload.type === "increment") product.quantity += 1;
      else if (action.payload.type === "decrement" && product.quantity > 1) product.quantity -= 1;

      recalcCart(state);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload._id);
      recalcCart(state);
    },

    cleanCart: (state) => {
      state.products = [];
      recalcCart(state);
    },
  },
});

// Utility to recalc cart totals
const recalcCart = (state) => {
  state.selectedItems = state.products.reduce((total, p) => total + p.quantity, 0);
  state.totalPrice = state.products.reduce((total, p) => total + p.quantity * p.price, 0);
  state.tax = state.totalPrice * state.taxRate;
  state.grandTotal = state.totalPrice + state.tax;
};

export const { addToCart, updateQuantity, removeFromCart, cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
