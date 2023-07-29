import { createSlice } from "@reduxjs/toolkit";

const initState = {
  products: [],
  // products: sessionStorage.getItem("product")
  //   ? JSON.parse(sessionStorage.getItem("product"))
  //   : [],
};

const checkOutSlice = createSlice({
  name: "checkout",
  initialState: initState,
  reducers: {
    setProducts: (state, action) => {
      state.products = [];
      const productIndex = state.products.findIndex((item) =>
        item.id === action.payload.id
      );
      if (Array.isArray(action.payload)) {
        action.payload.forEach((item) => {
          state.products.push(item);
        });
      } else if (productIndex === -1) {
        state.products.push(action.payload);
      }
      return state;
    },
    resetProducts: (state) => {
      return state;
    },
  },
});

export const { setProducts, resetProducts } = checkOutSlice.actions;

export default checkOutSlice.reducer;
