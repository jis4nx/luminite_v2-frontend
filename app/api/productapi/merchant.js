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
  const res = await productAPI.put(`merchant-products/${data.id}`, data);
  return res.data;
};

export const listProductItems = async (id, params = {}) => {
  const res = await productAPI.get(`merchant-product-items/${id}`, {
    params: { ...params },
  });
  return res.data;
};

export const changeProductItem = async (data) => {
  const res = await productAPI.put(`merchant-product-item/${data.id}`, data);
  return res.data;
};

export const merchantAnalytics = async () => {
  const res = await productAPI.get("merchant-analytics");
  return res.data;
};
