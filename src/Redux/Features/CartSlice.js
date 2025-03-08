import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // Check if the product already exists in the cart
      const existingProduct = state.cartProducts.find(
        (item) => item._id === product._id
      );

      if (!existingProduct) {
        state.cartProducts.push({ ...product, "quantity": 1 });
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;

      // Filter out the product with the given ID from the cart
      state.cartProducts = state.cartProducts.filter(
        (item) => item._id !== product._id
      );
    },
    updatedCartProducts: (state, action) => {
      const product = action.payload;

      // Filter out the product with the given ID from the cart
      state.cartProducts = action.payload
    },

    removeAllProducts: (state, action) => {
      const product = action.payload;

      // Filter out the product with the given ID from the cart
      state.cartProducts = []
    },
  },
});

// Export the actions and reducer
export const { addToCart, removeFromCart, updatedCartProducts, removeAllProducts } = cartSlice.actions;
export default cartSlice.reducer;
