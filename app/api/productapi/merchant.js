import { productAPI } from "./productapi";

export const getMerchantProducts = async (name) => {
  const res = await productAPI.get("merchant-products", {
    params: {
      name: name,
    },
  });
  return res.data;
};
export const getProductTypes = async () => {
  const res = await productAPI.get("product-types");
  return res.data;
};

export const getItemList = async () => {
  const res = await productAPI.get("merchant-items");
  return res.data;
};

export const changeProduct = async (data) => {
  console.log(data);
  const res = await productAPI.put(`merchant-products/${data.id}`, data);
  return res.data;
};
