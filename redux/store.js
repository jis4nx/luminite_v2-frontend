import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";
import cartReducer from "./reducers/cart";
import { createWrapper } from "next-redux-wrapper";
import productReducer from "./reducers/product";
import checkOutReducer from "./reducers/checkout";
import searchResultReducer from "./reducers/searchResult";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    product: productReducer,
    checkout: checkOutReducer,
    searchResult: searchResultReducer,
  },
});
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
