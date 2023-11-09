"use client";
import { useState } from "react";
import { Collapse, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@material-tailwind/react";
import {
  faCalendarDays,
  faChevronDown,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TABLE_HEAD = ["Product", "Quantity", "Price"];

const chipColor = { PD: "amber", CD: "light-blue", DL: "green" };
const chipValue = { PD: "PENDING", CD: "CONFIRMED", DL: "DELIVRED" };

function MerchantOrderDetail({ ordersData }) {
  const [openOrder, setOpenOrder] = useState({});

  const toggleOpen = (orderId) => {
    if (openOrder === orderId) {
      setOpenOrder(null);
    } else {
      setOpenOrder(orderId);
    }
  };

  return (
    <div>
      {ordersData &&
        ordersData.map((order) => (
          <div key={Math.random()} className="ml-10 space-y-5">
            <div className="flex justify-around p-2 items-center space-x-8">
              <Typography variant="body" className="text-red-500 font-medium">
                ORDER #{order.id}
              </Typography>
              <div className="flex gap-1 items-center">
                <div className="bg-blue-100 rounded-sm">
                  <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
                </div>
                <p className="text-sm text-indigo-400">
                  {order.order.delivery_address.street_no}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-blue-100 p-[4px] rounded-sm">
                  <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4" />
                </div>
                <p className="text-sm text-indigo-400">
                  {new Date(order.updated_at).toLocaleString()}
                </p>
              </div>
              <Chip
                variant="ghost"
                color={chipColor[order.order.status]}
                value={chipValue[order.order.status]}
              />

              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() =>
                  toggleOpen(order.id)}
                size="sm"
                color="indigo"
                className={`transition-transform hover:cursor-pointer ${
                  openOrder === order.id ? "rotate-180" : ""
                }`}
              />
            </div>
            <Collapse open={openOrder === order.id}>
              <table className="w-full table-auto text-left border border-gray-300">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr key={order.id}>
                    <td className="p-4">
                      <div className="flex items-center gap-3 hover:scale-105 transition-all duration-200 hover:font-medium">
                        <Image
                          src={order.product_item.image}
                          alt={order.product_item.name}
                          width={50}
                          height={50}
                          className="bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="indigo"
                          className="font-normal"
                        >
                          <Link href={`/product/${order.product_item.id}`}>
                            {order.product_item.name}
                          </Link>
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {order.qty}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {order.price} /-
                      </Typography>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} className="p-4 text-right">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        Total Cost:
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {order.order.total_cost} /-
                      </Typography>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Collapse>
          </div>
        ))}
    </div>
  );
}

export default MerchantOrderDetail;
