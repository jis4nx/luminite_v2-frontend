import React from "react";
import ListProductItems from "@components/Merchant/MerchantProducts/ListProductItems";
import { listProductItems } from "@app/api/productapi/merchant";

export async function Page({ params }) {
  const items = await listProductItems(params.itemId);

  return <ListProductItems items={items} id={params.itemId} />;
}

export default Page;
