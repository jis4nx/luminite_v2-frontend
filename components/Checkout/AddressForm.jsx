"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";

function AddressForm() {
  return (
    <div className="bg-white">
      <p className="p-3 text-lg text-indigo-700 border-b-4 border-b-indigo-600 inline-block">
        Address Form
      </p>
      <div className="flex flex-col p-5 w-3/5 gap-3">
        <div>
          <Typography variant="small" color="indigo">Address Line 1</Typography>
          <Input type="text"  color="indigo"/>
        </div>
        <div>
          <Typography variant="small" color="indigo">Address Line 2</Typography>
          <Input type="text" color="indigo"/>
        </div>

        <div className="flex gap-3">
          <Input type="text" label="Flat No" color="indigo" />
          <Input type="text" label="Street No" color="indigo" />
        </div>
        <div className="flex gap-3">
          <Input type="text" label="City" color="indigo"/>
          <Input type="text" label="Postal Code" color="indigo"/>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
