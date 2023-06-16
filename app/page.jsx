"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";

function page() {
  return (
    <div className="flex justify-center items-center flex-col mt-5">
      <Typography variant="h3" className="font-medium">Hello</Typography>
      <Typography variant="h5" className="" color="indigo">
        Welcome To Luminite V2
      </Typography>
    </div>
  );
}

export default page;
