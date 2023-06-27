import {
  resetUser,
} from "@redux/reducers/auth";
import { loadProfile, resetProfile } from "@redux/reducers/profile";
import axios from "axios";
axios.defaults.withCredentials = true;
import { authenticated } from "@redux/reducers/auth";

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

export const verifyToken = () => async (dispatch) => {
  try {
    const res = await accountApi.get("/token/verify");
    if (res.status === 200) {
      dispatch(authenticated());
      dispatch(loadUser());
    } else {
      dispatch(resetUser());
    }
  } catch (error) {
    dispatch(resetUser());
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await accountApi.get("/profile");
    if (res.status === 200) {
      dispatch(loadProfile(res.data));
    } else {
      dispatch(resetProfile());
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      dispatch(resetProfile());
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

export const getRefresh = () => async (dispatch) => {
  try {
    const res = await accountApi.get("/token/refresh");
    if (res.status === 200) {
      dispatch(verifyToken());
      return res;
    } else {
      dispatch(resetUser());
    }
  } catch (err) {
    dispatch(resetUser());
  }
};
