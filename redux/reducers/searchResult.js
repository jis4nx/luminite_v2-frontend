import { createSlice } from "@reduxjs/toolkit";
const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    products: [],
    filteredResults: [],
    attributes: { price: { min: 50, max: 30000 }, sizes: [], colors: [] },
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.products = action.payload.products;
      state.filteredResults = state.products.flatMap((product) =>
        product.items.map((item) => ({ name: product.name, item }))
      );

      const sizes = new Set();
      const colors = new Set();

      state.products.forEach((product) => {
        product.items.forEach((item) => {
          sizes.add(item.product_size);
          colors.add(item.product_color);
        });
      });
      state.attributes.sizes = [...sizes];
      state.attributes.colors = [...colors];
    },
    setFilterItems: (state, action) => {
      const { price, sizes, colors } = action.payload;
      const filteredResults = state.products.reduce((temp, product) => {
        const matchingItems = product.items.filter((item) =>
          item.price >= price.min && item.price <= price.max &&
          (!sizes.length || sizes.includes(item.product_size)) &&
          (!colors.length || colors.includes(item.product_color))
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
