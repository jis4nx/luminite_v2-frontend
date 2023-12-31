import axios from "axios";

export const productAPI = axios.create({
  baseURL: process.env.BASE_URL_SHOP || "http://127.0.0.1:8000/shop/",
  withCredentials: true,
});

export const getCategories = async () => {
  const res = await productAPI.get("/category/");
  return res.data;
};

export const addProduct = async (product) => {
  return await productAPI.post("/product/", product);
};

export const addProductItem = async (item) => {
  return await productAPI.post("item/", item);
};

export const getProducts = async () => {
  const res = await productAPI.get("/items/");
  return res.data;
};

export const getItembyId = async (id) => {
  const res = await productAPI.get(`/item/${id}`);
  return res.data;
};

export const orderProduct = async (item) => {
  return await productAPI.post("/order/", item);
};
export const getUserOrders = async () => {
  const res = await productAPI.get("/user-orders/");
  return res.data;
};

export const searchProduct = async (type, value) => {
  const res = await productAPI.get(`/search?${type}=${value}`);
  return res.data;
};

export const filterProduct = async (data) => {
  const res = await productAPI.post("filter-item", data);
  return res.data;
};

export const listMerchantOrders = async (offset) => {
  const res = await productAPI.get(`list-orders`);
  return res.data;
};

export const createReview = async (data) => {
  const res = await productAPI.post("reviews", data);
  return res.data;
};
