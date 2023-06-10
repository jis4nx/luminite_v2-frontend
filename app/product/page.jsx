import React from "react";
import ProductForm from "@components/ProductForm";
import BASE_URL from "@app/data";

async function getCategory() {
  const res = await fetch(BASE_URL+"/shop/category", {cache: "no-store"});
  const data = await res.json()
  return data
}

async function page() {
  const categories = await getCategory()
  return (
    <React.Fragment>
      <ProductForm categories={categories} />
    </React.Fragment>
  );
}

export default page;
