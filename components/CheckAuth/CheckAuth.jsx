"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser, verifyToken } from "@app/api/accountApi/accountApi";
import { useQuery } from "react-query";
import { authenticated } from "@redux/reducers/auth";
import { setUser } from "@redux/reducers/auth";

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
    console.log(loadData.data)
    if (tokenVerify.isSuccess) {
      dispatch(authenticated());
    }
  }, []);
}

export default CheckAuth;
