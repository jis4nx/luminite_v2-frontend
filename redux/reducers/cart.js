import { createSlice } from "@reduxjs/toolkit";

const initState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    cartLoad: (state, action) => {
      state.cartItems = [...action.payload.cartItems];
      state.totalPrice = action.payload.totalPrice;
    },
    addToCart: (state, action) => {
      const cartIndex = state.cartItems.findIndex((item) =>
        item.id === action.payload.id
      );
      if (cartIndex >= 0) {
        state.cartItems[cartIndex].qty += action.payload.qty;
      } else {
        state.cartItems.push(action.payload);
      }

      // Get Total Price of cart items
      let sum = 0;
      for (let x = 0; x < state.cartItems.length; x++) {
        let item = state.cartItems[x];
        sum += item.price * item.qty;
      }
      state.totalPrice = sum;

      localStorage.setItem(
        "carts",
        JSON.stringify({
          products: state.cartItems,
          totalPrice: state.totalPrice,
        }),
      );
    },
    removeFromCart: (state, action) => {
      const getIndex = state.cartItems.findIndex(action.payload.id);
      console.log(getIndex);
    },
  },
});

export const { cartLoad, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
