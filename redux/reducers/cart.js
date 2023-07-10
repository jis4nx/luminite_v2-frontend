import { createSlice } from "@reduxjs/toolkit";

const initState = {
  cartItems: [],
  totalPrice: 0,
};

const setProducts = (products, totalPrice) => {
  localStorage.setItem(
    "carts",
    JSON.stringify({
      products: products,
      totalPrice: totalPrice,
    }),
  );
};

const getTotalPrice = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
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

      state.totalPrice = getTotalPrice(state.cartItems);
      setProducts(state.cartItems, state.totalPrice);
    },
    removeFromCart: (state, action) => {
      const getIndex = state.cartItems.findIndex((item) =>
        item.id === action.payload.id
      );
      state.cartItems.splice(getIndex, 1);

      state.totalPrice = getTotalPrice(state.cartItems);
      setProducts(state.cartItems, state.totalPrice);
    },
  },
});

export const { cartLoad, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
