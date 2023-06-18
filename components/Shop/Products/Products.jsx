"use client";
import React from "react";
import { getProduct } from "@app/api/productapi/productapi";
import { useQuery } from "react-query";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

function Products() {
  const products = useQuery("products", getProduct);
  console.log(products.data);

  return (
    <div className="text-black grid grid-cols-4 gap-2 p-4 mt-5">
      {products?.data?.map((item) => {
        return (
          <Card className="rounded-sm h-[370px] w-[280px]" key={item.id}>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="rounded-none mx-auto h-[200px] w-[200px]"
            >
              <Image
                src={item.product_image}
                alt={item.name}
                width={200}
                height={200}
                className="object-contain"
              />
            </CardHeader>
            <CardBody>
              <Typography
                variant="body1"
                className="text-indigo-600 font-medium"
              >
                {item.name}
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mt-3 font-normal"
              >
                {item.desc}
              </Typography>
              <div className="mb-0">
                <Typography variant="lead" className="text-red-600">
                  BDT {item.base_price}
                </Typography>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}

export default Products;
