import { createSlice } from "@reduxjs/toolkit";

const initState = {
  id: "",
  user: null,
  address: "",
  profile_image: null,
  user_id: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initState,
  reducers: {
    loadProfile: (state, action) => {
      state.id = action.payload.id;
      state.user = action.payload?.user.email;
      state.user_id = action.payload?.user.id;
      state.address = action.payload?.address;
      state.profile_image = action.payload?.image;
    },
    resetProfile: (state) => initState,
  },
});

export const { loadProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
