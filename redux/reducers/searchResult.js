import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: { products: [] },
  reducers: {
    setSearchResult: (state, action) => {
      state.products = action.payload.products;
    },
  },
});

export const { setSearchResult } = searchResultSlice.actions;
export default searchResultSlice.reducer;
