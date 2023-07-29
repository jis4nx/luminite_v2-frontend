"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
function Checkout() {
  const { products } = useSelector((state) => state.checkout);
  const router = useRouter();
  // useEffect(() => {
  //   if (!products.length) {
  //     router.back();
  //   }
  // }, [router, products]);

  return (
    <div>
      <div>
        <p className="p-3 text-xl text-indigo-900">Checkout</p>
      </div>
      <section className="">
        <div class="flex">
          <div className="w-3/5 rounded-md">
            <AddressForm />
          </div>
          <div className="bg-indigo-400 p-5">
            <OrderSummary />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
