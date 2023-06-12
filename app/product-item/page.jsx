import React from "react";
import ProductItemForm from "../../components/ProductItemForm";
import BASE_URL from "@app/data";

async function getProductAttributes() {
  const res = await fetch(BASE_URL + "/shop/product-attr", {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

async function getProducts() {
  const res = await fetch(BASE_URL + "/shop/product", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

async function page() {
  const attr = await getProductAttributes();
  const products = await getProducts();
  return (
    <ProductItemForm
      attr={attr}
      products={products}
    />
  );
}

export default page;
