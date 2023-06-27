"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkExpiry, getRefresh } from "@app/api/accountApi/accountApi";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function CheckAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const user = useSelector((state) => state.user);

  const { data: expiryData } = useQuery(
    "checkExpiry",
    checkExpiry,
    { retry: false },
  );

  useEffect(() => {
    if (!expiryData.access) {
      dispatch(getRefresh());
    }
    if (!expiryData.refresh) {
      router.push("/account/login");
    }
  }, [expiryData.access, expiryData.refresh, dispatch]);
}

export default CheckAuth;
