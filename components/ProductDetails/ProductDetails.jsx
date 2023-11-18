"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getItembyId } from "@app/api/productapi/productapi";
import Image from "next/image";
import { Breadcrumbs, Input } from "@material-tailwind/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-tailwind/react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { addToCart } from "@redux/reducers/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setAttributeList,
  setItemList,
  setProduct,
  setProductItem,
} from "@redux/reducers/product";
import { useRouter } from "next/navigation";
import { setProducts } from "@redux/reducers/checkout";
import AttributeFilter from "./AttributeFilter";
import ProductReviews from "./ProductReviews";
import UserReview from "./UserReview";

function ProductDetails({ id }) {
  const router = useRouter();
  const { product, itemList, productItem: item } = useSelector((state) =>
    state.product
  );
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [mount, setMount] = useState(false);
  const [qtyError, setQtyError] = useState(false);
  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getItembyId(id),
    enabled: !!id,
  });

  const handleBuy = () => {
    if (!(qty >= item.stockQty)) {
      dispatch(setProducts({ ...item, title: product.name, qty: qty }));
      router.push("/checkout/");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
    const newQty = parseInt(e.target.value, 10);
    if (newQty >= item.stockQty) {
      setQtyError(true);
    } else {
      setQtyError(false);
    }
  };

  useEffect(() => {
    if (!mount && productData?.product && productData?.items) {
      dispatch(
        setProduct({
          id: productData.product.id,
          name: productData.product.name,
          desc: productData.product.desc,
          category: productData.product.category,
        }),
      );
      dispatch(setAttributeList(productData.attributes));
      dispatch(setItemList(productData.items));
      dispatch(
        setProductItem({
          id: productData.item.id,
          name: product.name,
          color: productData.item.product_color,
          image: productData.item.image,
          price: productData.item.price,
          stockQty: productData.item.qty_in_stock,
          product_type: productData.product_type,
          attributes: productData.item.attributes,
          reviews: productData.item.reviews,
        }),
      );
    }

    setMount(true);
  }, [mount, productData, dispatch]);

  useEffect(() => {
    console.log(item);
    console.log(Boolean(item));
  }, [item]);
  return (
    item &&
    mount && (
      <div>
        <section className="">
          <div className="">
            <div className="lg:w-3/4 flex flex-wrap mb-16 mt-8">
              <Breadcrumbs separator="-" color="indigo">
                <Link
                  href="#"
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
                {product.category.parent?.length && (
                  product.category.parent.map((parent) => {
                    return (
                      <Link
                        href={`/product/category/${parent.id}`}
                        key={parent.id}
                        className="text-indigo-500 hover:text-indigo-900"
                      >
                        {parent.name}
                      </Link>
                    );
                  })
                )}
                <Link
                  href={`/product/category/${product.category.id}`}
                  className="text-indigo-500 hover:text-indigo-900"
                >
                  {product.category.name}
                </Link>
              </Breadcrumbs>
            </div>
            <div className="lg:w-4/5  flex flex-wrap">
              <Image
                alt={product.name}
                className="object-contain object-center rounded-md"
                src={item.id ? item.image : "/no-item-found-here.png"}
                width={400}
                height={400}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
                <div className="space-y-5">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    BRAND NAME
                  </h2>
                  <h1 className="text-gray-800 text-3xl title-font font-medium mb-1">
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center gap-10 text-gray-900 py-5">
                  <div className="flex items-center gap-2">
                    <p>QTY</p>
                    <input
                      className="w-24 p-1 bg-white border border-gray-400 rounded-sm focus:outline-none"
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => handleQty(e)}
                      key={item}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      size="sm"
                      color="indigo"
                      disabled={!item.id}
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
                {qtyError && (
                  <div className="text-red-500 text-sm py-4 px-1">
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      color="red"
                      className="pr-1"
                    />
                    Max you can order is {item.stockQty - 1}!
                  </div>
                )}

                <div className="my-5 space-y-5">
                  <div className="flex items-center gap-10">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      BDT {item.price} /-
                    </span>
                  </div>
                  <Button
                    disabled={!item.id}
                    color="indigo"
                    className="my-5"
                    size="sm"
                    onClick={handleBuy}
                  >
                    Buy Now
                  </Button>
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
              <div>
                {itemList.length && (
                  <AttributeFilter
                    items={itemList}
                    selectedItem={item}
                    attributes={item.attributes}
                  />
                )}
              </div>
            </div>
            <div className="my-10">
              <div className="border-dotted border-2 border-gray-400">
                <p className="text-gray-700 text-xl inline-block ml-5 mt-2">
                  Description
                </p>
                <div className="p-5">
                  <p className="text-gray-900 text-lg">{product.desc}</p>
                </div>
              </div>
              <div className="flex mt-10 gap-5">
                <div className="basis-[50%]">
                  <p className="text-site-blue text-xl">Reviews</p>
                  <div className="my-5">
                    <ProductReviews />
                  </div>
                </div>
                <div className="basis-[45%] space-y-2 bg-white shadow-md p-5 rounded-md">
                  <p className="text-site-blue text-xl">
                    Write a review
                  </p>
                  <UserReview />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default ProductDetails;
