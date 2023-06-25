import axios, { AxiosError } from "axios";
axios.defaults.withCredentials = true;

export const accountApi = axios.create({
  baseURL: "http://127.0.0.1:8000/account/",
});

export const registerUser = async (user) => {
  return await accountApi.post("/register", user);
};

export const loginUser = async (user) => {
  const res = await accountApi.post("/token", user);
  return res;
};

export const logoutUser = async () => {
  return await accountApi.get("logout/");
};

export const verifyToken = async () => {
  try {
    const res = await accountApi.get("/token/verify");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loadUser = async () => {
  try {
    const res = await accountApi.get("/profile");
    return res.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      if (error.response.status === 401) {
        throw new Error("user is unauthorized!");
      }
    }
  }
};

export const checkExpiry = async () => {
  try {
    const res = await accountApi.get("/token/expired");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getRefresh = async () => {
  try {
    const res = await accountApi.get("/token/refresh");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};
