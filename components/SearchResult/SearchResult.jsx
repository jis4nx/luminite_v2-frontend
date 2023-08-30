"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import BASE_URL from "@app/data";

function SearchResult() {
  const { products } = useSelector((state) => state.searchResult);
  useEffect(() => {
    console.log(products);
  });
  return (
    <div>
      <div className="flex gap-2">
        {products?.map((item) => {
          return (
            <Link key={item.item.id} href={`/product/${item.item.id}`}>
              <div className="w-[200px] h-[270px] p-3 rounded-md shadow-md flex flex-col gap-1">
                <div className="mx-auto flex flex-col justify-around gap-2">
                  <Image
                    className="object-contain max-h-[150px] max-w-[150px]"
                    src={`${BASE_URL}${item.item.image}`}
                    height={150}
                    width={150}
                    alt=""
                  />
                  <div>
                    <p className="font-body text-normal text-indigo-800">
                      BDT {item.item.price}
                    </p>
                    <p>{item.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResult;
