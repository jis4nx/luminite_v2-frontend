import { Input } from "@material-tailwind/react";
import React from "react";

function ChangeEmail() {
  return (
    <div>
      <Input
        type="email"
        name="email"
        placeholder="New Email"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
  );
}

export default ChangeEmail;
