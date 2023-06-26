"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkExpiry,
  getRefresh,
  loadUser,
  verifyToken,
} from "@app/api/accountApi/accountApi";
import { useQuery } from "react-query";
import { authenticated } from "@redux/reducers/auth";
import { loadProfile } from "@redux/reducers/profile";

function CheckAuth() {
  const dispatch = useDispatch();
  const tokenVerify = useQuery(
    "tokenVerify",
    verifyToken,
    {
      retry: false,
    },
  );
  const { data: userData } = useQuery("loadUser", loadUser, { retry: false });
  const { data: expiryData, isSuccess: expirySuccess } = useQuery(
    "checkExpiry",
    checkExpiry,
    { retry: false },
  );
  useQuery("getRefresh", getRefresh, {
    retry: false,
    enabled: !expiryData?.access,
  });

  useEffect(() => {
    if (tokenVerify.isSuccess && expiryData?.access && expiryData?.refresh) {
      dispatch(authenticated());
      dispatch(loadProfile(userData));
    }
  }, [dispatch, userData, tokenVerify.isSuccess, expirySuccess, expiryData]);
}

export default CheckAuth;
