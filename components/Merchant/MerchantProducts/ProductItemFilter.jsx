import { Checkbox } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listProductItems } from "@app/api/productapi/merchant";
import { useDispatch } from "react-redux";
import { setFilterItems } from "@redux/reducers/searchResult";
import ReactSlider from "react-slider";
import { Input } from "@material-tailwind/react";
import "./style.css";

function ProductItemFilter({ attributes, id }) {
  const [queryAttr, setQueryAttr] = useState({});
  const [qtyRange, setQtyRange] = useState(0);
  const dispatch = useDispatch();
  const { data: filteredData } = useQuery({
    queryKey: ["merchantProductItems", id, queryAttr],
    queryFn: () => listProductItems(id, queryAttr),
  });

  useEffect(() => {
    if (filteredData) {
      dispatch(setFilterItems({ items: filteredData.items }));
      console.log(filteredData);
    }
  }, [filteredData]);
  const handleAttrValue = (k, v, checked) => {
    let queryData = { ...queryAttr };
    if (checked) {
      if (queryData.hasOwnProperty(k)) {
        queryData[k] = Array.isArray(queryData[k])
          ? [...queryData[k], v]
          : [queryData[k], v];
      } else {
        queryData[k] = v;
      }
    } else {
      if (Array.isArray(queryData[k])) {
        queryData[k] = queryData[k].filter((item) => item !== v);

        if (queryData[k].length === 1) {
          queryData[k] = queryData[k][0];
        } else if (queryData[k].length === 0) {
          delete queryData[k];
        }
      } else {
        delete queryData[k];
      }
    }

    setQueryAttr(queryData);
  };
  return (
    <div className="flex flex-col gap-3">
      <section className="space-y-5  bg-white shadow-sm p-3">
        <div>
          <div className="p-3 text-gray-800 text-sm font-bold space-x-4 flex">
            <p>QTY:</p>
            <p>{qtyRange}</p>
          </div>
          <ReactSlider
            ariaLabelledby="slider-label"
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            min={0}
            max={1000}
            onChange={(value) => {
              let attr = { ...queryAttr, qty: value };
              setQtyRange(value);
              setQueryAttr(attr);
            }}
          />
        </div>
        <div className="pt-10 flex justify-between">
        </div>
      </section>

      {Object.entries(attributes).map((item) => {
        const [k, v] = item;
        return (
          <section className="bg-white shadow-sm p-3" key={k}>
            <p className="p-3 text-gray-800 text-lg">{k.toUpperCase()}</p>
            <div className="space-x-5">
              {v.map((item) => {
                return (
                  <Checkbox
                    label={item}
                    key={item}
                    color="indigo"
                    value={item}
                    onChange={(e) =>
                      handleAttrValue(k, e.target.value, e.target.checked)}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default ProductItemFilter;
