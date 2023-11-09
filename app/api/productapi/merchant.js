import { productAPI } from "./productapi";

export const getMerchantProducts = async () => {
  const res = await productAPI.get("merchant-products");
  return res.data;
};
export const getProductTypes = async () => {
  const res = await productAPI.get("product-types");
  return res.data;
};
