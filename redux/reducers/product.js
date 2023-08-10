import { createSlice } from "@reduxjs/toolkit";

const initState = {
  product: { id: "", name: "", desc: "", category: "" },
  item: { id: "", size: "", color: "", image: "", price: 0 },
  itemList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {
    setProduct(state, action) {
      const { id, name, desc, category } = action.payload;
      state.product = { id, name, desc, category };
    },
    setItem(state, action) {
      const { id, size, color, image, price, stockQty } = action.payload;
      state.item = { id, size, color, image, price, stockQty };
    },
    setItemList(state, action) {
      state.itemList = action.payload;
    },
  },
});

export const { setProduct, setItem, setItemList } = productSlice.actions;
export default productSlice.reducer;
