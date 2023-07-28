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
      const productIndex = state.products.findIndex((item) =>
        item.id === action.payload.id
      );
      if (productIndex === -1) {
        state.products.push(action.payload);
        // setValue("product", state.products);
      }
      return state;
    },
  },
});

export const { setProducts } = checkOutSlice.actions;

export default checkOutSlice.reducer;
