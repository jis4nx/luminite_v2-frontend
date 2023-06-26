"use client";
import React from "react";
import { getProducts } from "@app/api/productapi/productapi";
import { useQuery } from "react-query";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

function Products() {
  const products = useQuery("products", getProducts);
  console.log(products.data);

  return (
    <div className="mx-auto mt-8">
      <div className="grid grid-cols-5 gap-x-3">
        {products?.data?.map((item) => {
          return (
            <div
              className="bg-white rounded-md shadow-md flex flex-col p-4 justify-around"
              key={item.id}
            >
              <Link
                href={`/product/${item.id}`}
                className="rounded mx-auto"
              >
                <Image
                  alt={item.name}
                  className="object-cover object-center rounded-sm"
                  width={200}
                  height={200}
                  src={item.product_image}
                />
              </Link>

              <div className="mt-4 space-y-2">
                <h3 className="text-gray-500 text-xs tracking-widest title-font">
                  {item.category.name}
                </h3>
                <h2 className="text-indigo-900 title-font text-lg font-medium">
                  {item.name}
                </h2>
                <div className="flex gap-1 text-indigo-900 font-medium">
                  <p>{item.base_price}</p>
                  <span>/-</span>
                </div>
              </div>
            </div>
            // <Card className="rounded-sm" key={item.id}>
            //   <CardHeader
            //     floated={false}
            //     shadow={false}
            //     color="transparent"
            //     className="rounded-none mx-auto h-[200px] w-[200px]"
            //   >
            //     <Link href={`/product/${item.id}`}>
            //       <Image
            //         src={item.product_image}
            //         alt={item.name}
            //         width={200}
            //         height={200}
            //         className="object-contain"
            //       />
            //     </Link>
            //   </CardHeader>
            //   <CardBody>
            //     <Link href={`/product/${item.id}`}>
            //       <Typography
            //         variant="body1"
            //         className="text-indigo-600 font-medium"
            //       >
            //         {item.name}
            //       </Typography>
            //     </Link>
            //     <Typography
            //       variant="paragraph"
            //       color="gray"
            //       className="mt-3 font-normal"
            //     >
            //       {item.desc}
            //     </Typography>
            //     <div className="mb-0">
            //       <Typography variant="lead" className="text-red-600">
            //         BDT {item.base_price}
            //       </Typography>
            //     </div>
            //   </CardBody>
            // </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
