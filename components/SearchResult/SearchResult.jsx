"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import EmptyProductList from "@components/NotFound/EmptyProductList";
import Filter from "./Filter/Filter";
import { useEffect } from "react";

function SearchResult() {
  const { products, filteredResults } = useSelector((state) =>
    state.searchResult
  );

  return filteredResults && (
    <div className="flex gap-3">
      <div className="basis-1/5">
        <Filter products={products} />
      </div>
      {filteredResults.length
        ? (
          <div className="flex gap-2 flex-wrap ">
            {filteredResults?.map((item) => {
              return (
                <Link key={item.id} href={`/product/${item.id}`}>
                  <div className="w-[200px] h-[270px] p-3 rounded-md shadow-md flex flex-col gap-1 flex-wrap">
                    <div className="mx-auto flex flex-col justify-around gap-2">
                      <Image
                        className="object-contain max-h-[150px] max-w-[150px]"
                        src={item.image}
                        height={150}
                        width={150}
                        alt=""
                      />
                      <div>
                        <p className="font-body text-normal text-indigo-800">
                          BDT {item.price}
                        </p>
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
        : (
          <>
            <div className="mx-auto mt-20">
              <EmptyProductList />
            </div>
          </>
        )}
    </div>
  );
}

export default SearchResult;
