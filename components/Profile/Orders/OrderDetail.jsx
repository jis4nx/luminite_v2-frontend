"use client";
import { useState } from "react";
import { Collapse, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@material-tailwind/react";
import {
  faCalendarDays,
  faChevronDown,
  faEye,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TABLE_HEAD = ["Product", "Quantity", "Price", "Payment"];
import BASE_URL from "@app/data";

const chipColor = { PD: "amber", CD: "light-blue", DL: "green" };
const chipValue = { PD: "PENDING", CD: "CONFIRMED", DL: "DELIVRED" };

function OrderDetail({ ordersData }) {
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
          <div key={order.order.id} className="ml-10 space-y-5">
            <div className="flex justify-between p-2 items-center space-x-8">
              <Typography variant="body" className="text-red-500 font-medium">
                ORDER #{order.order.id}
              </Typography>
              <div className="flex gap-1 items-center">
                <div className="bg-blue-100 rounded-sm">
                  <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
                </div>
                <p className="text-sm text-indigo-400">
                  {order.order.deliveryAddress}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-blue-100 p-[4px] rounded-sm">
                  <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4" />
                </div>
                <p className="text-sm text-indigo-400">
                  {new Date(order.order.orderDate).toLocaleString()}
                </p>
              </div>
              <Chip
                variant="ghost"
                color={chipColor[order.order.status]}
                value={chipValue[order.order.status]}
              />
              <a
                href={`${BASE_URL}/shop/invoice/${order.order.id}`}
                target="_blank"
                className="flex items-center gap-1 cursor-pointer"
              >
                <FontAwesomeIcon icon={faEye} className="text-indigo-800" />
                <p className="text-sm">Invoice</p>
              </a>

              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() =>
                  toggleOpen(order.order.id)}
                size="sm"
                color="indigo"
                className={`transition-transform hover:cursor-pointer ${
                  openOrder === order.order.id ? "rotate-180" : ""
                }`}
              />
            </div>
            <Collapse open={openOrder === order.order.id}>
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
                  {order.products.map((item) => (
                    <tr key={order.id}>
                      <td className="p-4">
                        <div className="flex items-center gap-3 hover:scale-105 transition-all duration-200 hover:font-medium">
                          <Image
                            src={`http://127.0.0.1:8000${item.image}`}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="indigo"
                            className="font-normal"
                          >
                            <Link href={`/product/${item.id}`}>
                              {item.name}
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
                          {item.qty}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {item.price} /-
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {order.order.payment.account_no}
                        </Typography>
                      </td>
                    </tr>
                  ))}
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
                        {order.order.totalPrice} /-
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

export default OrderDetail;
