"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
function OrderSummary() {
  const { products } = useSelector((state) => state.checkout);
  const getTotalPrice = () =>
    products.reduce((sum, item) => sum + item.price * item.qty, 0);
  useEffect(() => {
  }, []);
  return (
    <div>
      <div className="relative">
        <ul className="space-y-5">
          {products?.map((product) => {
            return (
              <li class="flex justify-between" key={product.id}>
                <div class="inline-flex">
                  <Image
                    src={product.image}
                    width={50}
                    height={50}
                    alt={product.title}
                    className="max-h-16 rounded-sm"
                  />
                  <div className="ml-3 flex justify-center gap-2">
                    <div>
                      <p className="text-sm font-body text-white">
                        {product.title}
                      </p>
                      <p className="text-sm text-white">x{product.qty}</p>
                    </div>
                    <p class="text-sm font-semibold text-white">
                      {product.price} /-
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
        <div className="space-y-2">
          <p className="flex justify-between text-lg text-white">
            <span>Total price:</span>
            <span className="font-semibold">BDT {getTotalPrice()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
