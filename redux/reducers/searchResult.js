import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: { products: [], filteredResults: [], items: [] },
  reducers: {
    setSearchResult: (state, action) => {
      state.products = action.payload.products;
      state.filteredResults = state.filteredResults.length
        ? state.filteredResults
        : action.payload.products;
    },
    setFilterItems: (state, action) => {
      state.items = action.payload;
    },
    setFilterResult: (state, action) => {
      state.filteredResults = action.payload;
    },
  },
});

export const {
  setSearchResult,
  setFilterResult,
  setFilterItems,
} = searchResultSlice.actions;
export default searchResultSlice.reducer;
