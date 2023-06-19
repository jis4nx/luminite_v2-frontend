import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: "", isAuthenticated: "" },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
