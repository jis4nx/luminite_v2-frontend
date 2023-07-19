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
import { setItem, setProduct } from "@redux/reducers/product";
import { useDispatch } from "react-redux";

function Products() {
  const { data: products } = useQuery("products", getProducts);
  const dispatch = useDispatch();
  console.log(products);

  return (
    <div className="mx-auto mt-8">
      <div className="grid grid-cols-5 gap-x-3">
        {products?.map((obj) => {
          return (
            <div
              className="bg-white rounded-md shadow-md flex flex-col p-4 justify-around"
              key={obj.item.id}
              onClick={(e) => {
                dispatch(
                  setProduct({
                    id: obj.product.id,
                    name: obj.product.name,
                    desc: obj.product.desc,
                    category: obj.product.category,
                  }),
                );
                dispatch(
                  setItem({
                    id: obj.item.id,
                    size: obj.item.product_size,
                    color: obj.item.product_color,
                    image: obj.item.image,
                    price: obj.item.price,
                  }),
                );
              }}
            >
              <Link
                href={`/product/${obj.item.id}`}
                className="rounded mx-auto"
              >
                <Image
                  alt={""}
                  className="object-cover object-center rounded-sm"
                  width={200}
                  height={200}
                  src={obj.item.image}
                />

                <div className="mt-4 space-y-2">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    {obj.product.category.name}
                  </h3>
                  <h2 className="text-indigo-900 title-font text-lg font-medium">
                    {obj.product.name}
                  </h2>
                  <div className="flex gap-1 text-indigo-900 font-medium">
                    <p>{obj.item.price}</p>
                    <span>/-</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
