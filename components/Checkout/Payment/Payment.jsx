"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import OrderSummary from "../OrderSummary";
import PaymentMethod from "./PaymentMethod";
import { Button, Input, Typography } from "@material-tailwind/react";
import { setPaymentAccount } from "@redux/reducers/checkout";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { orderProduct } from "@app/api/productapi/productapi";

function Payment() {
  const { id } = useSelector((state) => state.profile);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { delivery, payment, products } = useSelector((state) =>
    state.checkout
  );
  const orderProductItem = useMutation(orderProduct);
  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = {
      ...payment,
      user: id,
    };
    const orderData = {
      payment: { ...paymentData },
      delivery_method: delivery.delivery_method,
      user: id,
      delivery_address: delivery.address.id,
    };
    const items = [];
    products.forEach((item) => {
      items.push({ product_item: item.id, price: item.price, qty: item.qty });
    });
    const data = {
      order: orderData,
      items: items,
    };
    console.log(data);
    setOrderSuccess(true);
    orderProductItem.mutate(data, {
      onSuccess: () => {
        setOrderSuccess(true);
      },
    });
  };

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (orderSuccess) {
      router.push("/orders");
    }
  }, [orderSuccess, router]);
  useEffect(() => {
    if (!delivery.address || !delivery.delivery_method) {
      router.back();
    }
  }, [delivery.address, delivery.delivery_method, router]);

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="basis-1/2 bg-white p-4 rounded-md">
          <div>
            <div className="p-3">
              <p className="text-center font-body text-base text-gray-800">
                Payment Details
              </p>
            </div>
            <PaymentMethod />
            <form className="w-80" onSubmit={(e) => handleSubmit(e)}>
              <div className="p-5 space-y-1">
                <Typography
                  size="sm"
                  variant="paragraph"
                  className="font-normal text-indigo-600"
                >
                  Bank Account
                </Typography>
                <Input
                  size="sm"
                  color="indigo"
                  placeholder="0123493434.."
                  onChange={(e) =>
                    dispatch(setPaymentAccount({ account: e.target.value }))}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  className=""
                  size="sm"
                  variant="gradient"
                  color="indigo"
                  type="submit"
                >
                  Order
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="bg-indigo-400 p-5 rounded-md">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}

export default Payment;
