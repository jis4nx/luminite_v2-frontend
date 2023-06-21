"use client";
import React from "react";
import { logoutUser } from "@app/api/accountApi/accountApi";
import { useQuery } from "@tanstack/react-query";

function Page() {
  const res = useQuery({
    queryKey: ["logout"],
    queryFn: logoutUser,
  });
  return <div>Logged Out</div>;
}

export default Page;
