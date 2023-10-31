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
    products: null,
    filteredResults: [],
    attributes: { price: { min: 50, max: 30000 }, sizes: [], colors: [] },
    product_attrs: [],
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.products = action.payload.products;
      if (state.products.length) {
        state.filteredResults = state.products.flatMap((product) =>
          product.items.map((item) => item)
        );
      } else {
        state.filteredResults = [];
      }
      const product_attributes = [];

      state.products.forEach((product) => {
        product.items.forEach((item) => {
          if (Object.keys(item.attributes).length > 0) {
            product_attributes.push(item.attributes);
          }
        });
      });
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
