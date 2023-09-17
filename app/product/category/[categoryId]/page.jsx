"use client";
import { useQuery } from "react-query";
import { searchProduct } from "@app/api/productapi/productapi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchResult } from "@redux/reducers/searchResult";
import SearchResult from "@components/SearchResult/SearchResult";

function Page({ params }) {
  const categoryId = params.categoryId;
  const dispatch = useDispatch();
  const { data: searchData } = useQuery(
    ["filterCategory", categoryId],
    () => searchProduct("category", categoryId),
    {
      enabled: !!categoryId,
    },
  );

  useEffect(() => {
    if (searchData) {
      dispatch(setSearchResult({ products: searchData }));
    }
  }, [searchData,dispatch]);

  return (
    <div>
      <SearchResult />
    </div>
  );
}

export default Page;
