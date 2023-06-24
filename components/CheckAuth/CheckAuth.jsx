"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser, verifyToken } from "@app/api/accountApi/accountApi";
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
  const loadData = useQuery("loadUser", loadUser, { retry: false });
  useEffect(() => {
    console.log(loadData.data);
    if (tokenVerify.isSuccess) {
      dispatch(authenticated());
      dispatch(loadProfile(loadData.data));
    }
  },[dispatch, loadData.data, tokenVerify.isSuccess]);
}

export default CheckAuth;
