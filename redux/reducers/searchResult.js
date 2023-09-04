import { createSlice, current } from "@reduxjs/toolkit";
const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    products: [],
    filteredResults: [],
    attributes: { price: { min: 50, max: 30000 } },
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.products = action.payload.products;
      state.filteredResults = state.products.flatMap((product) =>
        product.items.map((item) => ({ name: product.name, item }))
      );
    },
    setFilterItems: (state, action) => {
      const { price, sizes } = action.payload;
      state.attributes.price = price;
      const filterPrice = state.attributes.price;
      const filteredResults = state.products.reduce((temp, product) => {
        const matchingItems = product.items.filter((item) =>
          item.price >= filterPrice.min && item.price <= filterPrice.max &&
          (!sizes.length || sizes.includes(item.product_size))
        );

        return temp.concat(matchingItems.map((item) => ({
          name: product.name,
          item,
        })));
      }, []);

      state.filteredResults = filteredResults;
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
