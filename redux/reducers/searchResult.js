import { createSlice } from "@reduxjs/toolkit";
function isObjectUnique(obj, index, self) {
  return (
    index ===
      self.findIndex((item) => JSON.stringify(item) === JSON.stringify(obj))
  );
}
const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    products: [],
    filteredResults: [],
    attributes: { price: { min: 50, max: 30000 }, sizes: [], colors: [] },
    product_attrs: [],
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.products = action.payload.products;
      state.filteredResults = state.products.flatMap((product) =>
        product.items.map((item) => item)
      );

      const sizes = new Set();
      const colors = new Set();
      const product_attributes = [];

      state.products.forEach((product) => {
        product.items.forEach((item) => {
          if (Object.keys(item.attributes).length > 0) {
            product_attributes.push(item.attributes);
          }
          sizes.add(item.product_size);
          colors.add(item.product_color);
        });
      });
      state.attributes.sizes = [];
      state.attributes.colors = [...colors];
      const uniqueObjects = product_attributes.filter(isObjectUnique);
      const new_res = uniqueObjects.reduce((result, item) => {
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            result[key] = result[key] || [];
            const valueToAdd = item[key];
            if (!result[key].includes(valueToAdd)) {
              result[key].push(valueToAdd);
            }
          }
        }
        return result;
      }, {});
      state.product_attrs = new_res;
    },
    setFilterItems: (state, action) => {
      state.filteredResults = action.payload.items;
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
