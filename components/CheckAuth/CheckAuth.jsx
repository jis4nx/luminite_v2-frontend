"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkExpiry,
  getRefresh,
  loadUser,
} from "@app/api/accountApi/accountApi";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function CheckAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const router = useRouter();

  const { data: expiryData } = useQuery(
    "checkExpiry",
    checkExpiry,
    { retry: false },
  );

  useEffect(() => {
    if (!expiryData?.access) {
      dispatch(getRefresh());
    }
    if (isAuthenticated) {
      dispatch(loadUser());
    }
    if (expiryData && !expiryData.refresh) {
      router.push("/account/login");
    }
  }, [dispatch, isAuthenticated, expiryData, router]);
}

export default CheckAuth;
