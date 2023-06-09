import React from "react";
import ProductItemForm from "../../components/ProductItemForm";


async function getProductAttributes(){
  const res = await fetch('http://127.0.0.1:8000/shop/product-attr')
  const data = await res.json()
  return data
}

async function page() {
  const attr = await getProductAttributes()
  return (
    <ProductItemForm attr={attr}/>
  );
}

export default page;
