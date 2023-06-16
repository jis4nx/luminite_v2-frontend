import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { user: "", accessToken: "" },
  reducers: {
    setUserToken: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
    },
  },
});

export const { setUserToken } = userSlice.actions;
export default { userSlice } = userSlice.reducer;
