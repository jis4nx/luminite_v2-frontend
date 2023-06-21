import { createSlice } from "@reduxjs/toolkit";

const initState = { user: "", isAuthenticated: "" };

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    resetUser: () => initState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
