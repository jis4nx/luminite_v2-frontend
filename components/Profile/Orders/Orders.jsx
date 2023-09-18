"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserOrders } from "@app/api/productapi/productapi";
import OrderDetail from "./OrderDetail";

function Orders() {
  const { data: ordersData } = useQuery("userOrders", getUserOrders);
  return ordersData && (
    <div className="flex justify-center items-center">
      <div className="w-full min-w-max flex flex-col">
        <OrderDetail ordersData={ordersData} />
      </div>
    </div>
  );
}

export default Orders;
