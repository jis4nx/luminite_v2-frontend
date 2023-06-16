import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@app/redux/reducers/auth";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
