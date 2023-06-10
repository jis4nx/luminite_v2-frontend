"use client"
import { Spinner } from "@material-tailwind/react";

export default function loading() {
  return (
    <div className="mt-5">
      <Spinner className="h-16 w-16 m-auto" color="indigo" />
    </div>
  );
}
