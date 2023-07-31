import { createSlice } from "@reduxjs/toolkit";

const initState = {
  products: [],
  delivery: { address: "", delivery_method: "" },
  payment: { payment_type: "", account_no: "" },
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
    setDeliveryMethod: (state, action) => {
      state.delivery.delivery_method = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.delivery.address = action.payload;
    },
    setPaymentType: (state, action) => {
      state.payment.payment_type = action.payload;
    },
    setPaymentAccount: (state, action) => {
      state.payment.account_no = action.payload.account;
    },
  },
});

export const {
  setProducts,
  resetProducts,
  setDeliveryMethod,
  setDeliveryAddress,
  setPaymentType,
  setPaymentAccount,
} = checkOutSlice.actions;

export default checkOutSlice.reducer;
