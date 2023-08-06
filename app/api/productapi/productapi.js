import axios from "axios";

const productAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/shop/",
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
  return await productAPI.post("/products/", item);
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
