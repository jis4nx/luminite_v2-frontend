import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/auth";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
