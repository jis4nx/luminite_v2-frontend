import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    resetUser: () => initState,
    authenticated: (state) => {
      return { ...state, isAuthenticated: true };
    },
  },
});

export const { setUser, resetUser, authenticated } = userSlice.actions;
export default userSlice.reducer;
