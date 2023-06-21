import axios from "axios";
import cookie from "cookie";
axios.defaults.withCredentials = true;

const accountApi = axios.create({
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
