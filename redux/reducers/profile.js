import { createSlice } from "@reduxjs/toolkit";

const initState = {
  id: "",
  user: null,
  address: "",
  profile_image: null,
  user_id: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initState,
  reducers: {
    loadProfile: (state, action) => {
      state.id = action.payload.id;
      state.user = action.payload?.user.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.phoneNumber = action.payload.phone;
      state.user_id = action.payload?.user.id;
      state.address = action.payload?.address;
      state.profile_image = action.payload?.image;
    },
    resetProfile: (state) => initState,
  },
});

export const { loadProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
