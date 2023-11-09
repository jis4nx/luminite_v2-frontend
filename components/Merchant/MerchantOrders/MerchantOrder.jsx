"use client";
import { listMerchantOrders } from "@app/api/productapi/productapi";
import MerchantOrderDetail from "./MerchantOrderDetail";
import { useEffect, useState } from "react";
import PaginatedItems from "./Pagination";
import { useQuery } from "@tanstack/react-query";

function MerchantOrder() {
  const [itemOffset, setItemOffset] = useState(0);
  const { data: ordersData } = useQuery({
    queryKey: ["listOrders"],
    queryFn: listMerchantOrders,
  });
  return ordersData && (
    <div className="flex justify-center items-center">
      <div className="w-full min-w-max flex flex-col">
        <PaginatedItems
          items={ordersData}
          itemsPerPage={7}
          totalResult={ordersData.count}
          setItemOffset={setItemOffset}
          itemOffset={itemOffset}
        />
      </div>
    </div>
  );
}

export default MerchantOrder;
