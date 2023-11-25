import { resetUser, setLoading } from "@redux/reducers/auth";
import { loadProfile, resetProfile } from "@redux/reducers/profile";
import axios from "axios";
axios.defaults.withCredentials = true;
import { authenticated } from "@redux/reducers/auth";

export const accountApi = axios.create({
  baseURL: process.env.BASE_URL_ACCOUNT,
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

// export const verifyToken = () => async (dispatch) => {
//   try {
//     const res = await accountApi.get("/token/verify");
//     if (res.status === 200) {
//       dispatch(authenticated());
//       dispatch(loadUser());
//     } else {
//       dispatch(resetUser());
//     }
//   } catch (error) {
//     dispatch(resetUser());
//   }
// };

export const verifyToken = async () => {
  try {
    const res = await accountApi.get("/token/verify");
    return res;
  } catch (error) {
    throw Error(error.response.data);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await accountApi.get("/profile");
    dispatch(setLoading(true));
    if (res.status === 200) {
      dispatch(loadProfile(res.data));
    } else {
      dispatch(resetProfile());
    }
  } catch (error) {
    if (error.response) {
      dispatch(resetProfile());
    }
  } finally {
    dispatch(setLoading(false));
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
    const token = await verifyToken();
    if (token.status === 200) {
      const res = await accountApi.get("/token/refresh");
      if (res.status === 200) {
        dispatch(authenticated());
        return res;
      } else {
        dispatch(resetUser());
      }
    }
  } catch (err) {
    dispatch(resetUser());
  }
};

export const listAddress = async () => {
  const res = await accountApi.get("/address");
  return res.data;
};

export const updateAddress = async (data) => {
  const res = await accountApi.put(`getaddress/${data.id}`, data);
  return res.data;
};
export const createAddress = async (data) => {
  const res = await accountApi.post("/address", data);
  return res.data;
};

export const checkType = async () => {
  const res = await accountApi.get("/checktype");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await accountApi.put(`profile/${data.get("id")}`, data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await accountApi.put(`change-password/${data.id}`, data);
  return res.data;
};
