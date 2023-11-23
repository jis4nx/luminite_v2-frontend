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
        <div className="mx-auto mb-16">
          <p className="text-indigo-700 font-medium text-lg">ORDER HISTORY</p>
        </div>
        <OrderDetail ordersData={ordersData} />
      </div>
    </div>
  );
}

export default Orders;
