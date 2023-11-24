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
    attributes: { price: { min: 50, max: 30000 }, colors: [] },
    product_attrs: [],
  },
  reducers: {
    setSearchResult: (state, action) => {
      let products = action.payload.products;
      if (products.items.length) {
        state.filteredResults = products.items;
      } else {
        state.filteredResults = [];
      }
      state.products = products;
      const product_attributes = [];

      const colorList = [];
      state.products.items.forEach((item) => {
        colorList.push(item.product_color);
        if (Object.keys(item.attributes).length > 0) {
          product_attributes.push(item.attributes);
        }
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
      state.attributes.colors = colorList;
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
