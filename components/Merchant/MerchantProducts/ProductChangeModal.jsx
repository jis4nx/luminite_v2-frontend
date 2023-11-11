import React from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import ProductForm from "./ProductForm";

function ProductChangeModal({ open, setOpen, productData }) {
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Change Product</DialogHeader>
        <DialogBody>
          <ProductForm create={false} productData={productData} />
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default ProductChangeModal;
