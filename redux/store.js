import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";
import cartReducer from "./reducers/cart";
import { createWrapper } from "next-redux-wrapper";
import productReducer from "./reducers/product";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    product: productReducer,
  },
});
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
