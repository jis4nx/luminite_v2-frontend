import axios from "axios"


const productAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/shop/"
})

export const getCategories = async() => {
  const res = await productAPI.get("/category/")
  return res.data
}
