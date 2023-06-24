import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
