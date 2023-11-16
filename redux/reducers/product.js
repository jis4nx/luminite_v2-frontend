import { createSlice } from "@reduxjs/toolkit";

const initState = {
  product: { id: "", name: "", desc: "", category: "" },
  item: { id: "", size: "", color: "", image: "", price: 0, product: "" },
  itemList: [],
  productItem: {
    id: "",
    name: "",
    attributes: {},
    stockQty: 0,
    image: "",
    price: 0,
    product_type: "",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {
    setProduct(state, action) {
      const { id, name, desc, category } = action.payload;
      state.product = { id, name, desc, category };
    },
    setProductItem(state, action) {
      const {
        id,
        stockQty,
        price,
        image,
        attributes,
        product,
        product_type,
        name,
      } = action.payload;
      state.productItem = {
        id,
        stockQty,
        price,
        image,
        attributes,
        product,
        product_type,
        name,
      };
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

export const { setProduct, setItem, setItemList, setProductItem } =
  productSlice.actions;
export default productSlice.reducer;
