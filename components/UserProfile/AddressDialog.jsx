import React from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import AddressEdit from "./AddressEdit";

function AddressDialog({ open, setOpen }) {
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>New Address</DialogHeader>
        <DialogBody>
          <AddressEdit create={true} />
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default AddressDialog;
