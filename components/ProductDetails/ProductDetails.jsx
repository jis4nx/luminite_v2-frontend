"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getItembyId } from "@app/api/productapi/productapi";
import Image from "next/image";
import { Breadcrumbs, Input } from "@material-tailwind/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-tailwind/react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { addToCart } from "@redux/reducers/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setItem, setItemList, setProduct } from "@redux/reducers/product";

function ProductDetails({ id }) {
  const { product, item, itemList } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [mount, setMount] = useState(false);
  const { data: productData } = useQuery(
    ["product", id],
    () => getItembyId(id),
    {
      enabled: !!id,
    },
  );

  useEffect(() => {
    setMount(true);
    if (mount && productData?.product && productData?.items) {
      dispatch(
        setProduct({
          id: productData.product.id,
          name: productData.product.name,
          desc: productData.product.desc,
          category: productData.product.category,
        }),
      );
      dispatch(setItemList(productData.items));
      dispatch(
        setItem({
          id: productData.item.id,
          size: productData.item.product_size,
          color: productData.item.product_color,
          image: productData.item.image,
          price: productData.item.price,
        }),
      );
    }
  }, [mount, productData, dispatch]);
  return productData && mount && (
    <div>
      <section className="px-5 mx-auto">
        <div className="container">
          <div className="lg:w-4/5 mx-auto flex flex-wrap mb-16 mt-8">
            <Breadcrumbs separator="-" color="indigo">
              <Link
                href="/"
                className="opacity-60 text-indigo-500 hover:text-indigo-900"
              >
                <FontAwesomeIcon icon={faHouse} size="sm" />
              </Link>
              <Link
                href="/shop"
                className="text-indigo-500 hover:text-indigo-900"
              >
                <span>Products</span>
              </Link>
              {product.category.parent && (
                <Link
                  href="#"
                  className="text-indigo-500 hover:text-indigo-900"
                >
                  {product.category.parent}
                </Link>
              )}
              <Link href="#" className="text-indigo-500 hover:text-indigo-900">
                {product.category.name}
              </Link>
            </Breadcrumbs>
          </div>
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt={product.name}
              className="object-contain object-center rounded-md"
              src={item.image}
              width={400}
              height={400}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                    </path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                    </path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                    </path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                    </path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                    </path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z">
                      </path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                      </path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                      </path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none">
                  </button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none">
                  </button>
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none">
                  </button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="pl-3 flex items-center gap-3">
                  <p>QTY</p>
                  <input
                    className="w-16 p-1 bg-transparent border border-indigo-700 rounded-sm focus:outline-none"
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  BDT {item.price} /-
                </span>
                <div className="m-10 flex items-center space-x-3">
                  <Button
                    color="indigo"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          title: product.name,
                          image: item.image,
                          price: item.price,
                          qty: Number(qty),
                        }),
                      )}
                  >
                    Add To Cart
                  </Button>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="h-7 w-7 text-indigo-700"
                  />
                </div>
              </div>
              <div className="">
                <p className="font-semibold text-indigo-700 m-0">Features</p>
                <ul className="space-y-2 featured-lists text-gray-800">
                  <li>Made with full cotton</li>
                  <li>Slim fit for any body</li>
                  <li>QC Passed</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-4/6 space-y-1">
              <p className="text-indigo-800 text-xl border-gray-500 border-b-2 py-1">
                Reviews
              </p>
            </div>
            <div className="mt-5">
              <Image width={50} height={50} alt="User Profile" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
