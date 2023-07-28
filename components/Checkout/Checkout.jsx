"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AddressForm from "./AddressForm";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
function Checkout() {
  const { products } = useSelector((state) => state.checkout);
  const router = useRouter();
  // useEffect(() => {
  //   if (!products.length) {
  //     router.back();
  //   }
  // }, [router, products]);

  return (
    <section>
      <div>
        <p className="p-3 text-xl text-indigo-900">Checkout</p>
      </div>

      <div class="flex">
        <div className=" basis-3/5">
          <AddressForm />
        </div>
        <div className="bg-blue-300 p-4">Card 2 - 40%</div>
      </div>
    </section>
  );
}

export default Checkout;
