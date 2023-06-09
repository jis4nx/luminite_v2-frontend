"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import { useFormik } from "formik";

function ProductItemForm({ attr }) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState();

  return (
    <>
      <form action="">
        <h4 className="text-indigo-500 font-bold text-center mt-2">
          Add Product Item
        </h4>
        <section className="flex flex-col gap-5 mt-5">
          <div className="select-product text-white">
            <Select label="Product" color="indigo">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
          <input
            type="number"
            placeholder="Qty"
            min={0}
            className="product-input"
          />
          <input
            type="number"
            placeholder="Price"
            min={0}
            className="focus:outline-none border-site-primary
            text-indigo-600
            border-b-2 font-medium"
          />
        </section>
      </form>
      <div className="flex mt-5 flex-col">
        <div className="flex flex-col">
          <p className="text-indigo-500 text-medium font-medium inline-flex">
            Colors
          </p>
          <div>
            {attr?.colors.map((color, i) => {
              return (
                <button
                  className="color-switch m-btn"
                  type="button"
                  key={i}
                  style={{ backgroundColor: color }}
                  value={color}
                  onClick={(e) => setColor(e.target.value)}
                >
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-3">
          <div>
            {attr?.size.map((data, i) => {
              return (
                <button
                  key={i}
                  className="size-btn m-btn"
                >
                  <span className="text-sm">{data}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItemForm;
