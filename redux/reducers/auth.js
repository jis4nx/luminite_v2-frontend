import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, resetUser, authenticated, setLoading } =
  userSlice.actions;
export default userSlice.reducer;
