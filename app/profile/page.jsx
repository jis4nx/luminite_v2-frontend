"use client";
import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

function Page() {
  const user = useSelector((state) => state.user.user);
  return (
    <Card className="mx-auto w-96 mt-5 flex flex-col items-center justify-center p-5">
      <Typography variant="h5" color="black" className="font-medium">
        Welcome back, <span className="text-indigo-600 font-medium">{user}</span>
      </Typography>
    </Card>
  );
}

export default Page;
