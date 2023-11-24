import { createSlice } from "@reduxjs/toolkit";

const initState = {
  product: { id: "", name: "", desc: "", category: "" },
  itemList: [],
  productItem: {
    id: "",
    name: "",
    title: "",
    attributes: {},
    stockQty: "",
    image: "",
    price: 0,
    product_type: "",
    reviews: [],
  },
  attributeList: {},
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
        reviews,
        title,
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
        reviews,
        title,
      };
    },
    setItemList(state, action) {
      state.itemList = action.payload;
    },
    setAttributeList(state, action) {
      state.attributeList = action.payload;
    },
    filterItem(state, action) {
      // const { color, attr } = action.payload;
      // const filteredItems = state.itemList.filter((item) => {
      //   const hasMatchingColor = item.product_color === color;
      //
      //   const hasMatchingAttributes = Object.keys(attr).every((key) =>
      //     item.attributes[key] == attr[key]
      //   );
      //
      //   return hasMatchingColor && hasMatchingAttributes;
      // });
      // state.productItem = filteredItems[0];
    },
  },
});

export const {
  setProduct,
  setItemList,
  setProductItem,
  setAttributeList,
  filterItem,
} = productSlice.actions;
export default productSlice.reducer;
