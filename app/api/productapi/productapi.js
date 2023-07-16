import axios from "axios";

const productAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/shop/",
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

export const getProductbyId = async (id) => {
  const res = await productAPI.get(`/product/${id}`);
  return res.data;
};
