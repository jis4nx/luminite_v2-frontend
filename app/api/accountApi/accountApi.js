import axios from "axios";
axios.defaults.withCredentials = true;

export const accountApi = axios.create({
  baseURL: "http://127.0.0.1:8000/account/",
});

export const registerUser = async (user) => {
  return await accountApi.post("/register", user);
};

export const loginUser = async (user) => {
  return await accountApi.post("/token", user);
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
    throw error.response.data;
  }
};
