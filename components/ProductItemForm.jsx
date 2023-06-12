"use client";
import { Button } from "@material-tailwind/react";
import React from "react";
import Select from "react-select";
import { useFormik } from "formik";
import BASE_URL from "@app/data";

function ProductItemForm({ attr, products }) {
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#6366f1",
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "white" : "white",
        color: "black",
        "&:hover": {
          color: "white",
          backgroundColor: "#6366f1",
        },
      };
    },
  };

  const formik = useFormik({
    initialValues: {
      color: "",
      size: "",
      price: "",
      qty: "",
    },
    onSubmit: (values) => {
      const data = {
        product: values.product.value,
        product_size: values.size,
        product_color: values.color,
        qty_in_stock: values.qty,
        price: values.price,
      };
      fetch(BASE_URL + "/shop/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Product Submitted");
          } else {
            console.log("Error submitting");
          }
        }).catch((err) => {
          console.log("error occurred", err);
        });
      console.log(data);
    },
  });

  return (
    <>
      <div className="max-w-2xl m-auto">
        <form onSubmit={formik.handleSubmit}>
          <h4 className="text-indigo-600 font-bold text-center mt-2">
            Add Product Item
          </h4>
          <section className="flex flex-col gap-5 mt-5">
            <div className="select-product">
              <Select
                options={products.map((product) => ({
                  value: product.id,
                  label: product.name,
                }))}
                isSearchable
                noOptionsMessage={() => "No products found!"}
                defaultValue=""
                styles={selectStyles}
                placeholder="Select Product"
                onChange={(e) => formik.setFieldValue("product", e)}
              />
            </div>
            <input
              type="number"
              placeholder="Qty"
              min={0}
              name="qty"
              className="product-input"
              onChange={formik.handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              min={0}
              className="focus:outline-none border-site-primary
            text-indigo-600 appearance-none
            border-b-2 font-medium"
              onChange={formik.handleChange}
            />
          </section>
          <div className="flex mt-5 flex-col">
            <div className="flex flex-col">
              <p className="text-indigo-600 text-medium font-medium inline-flex">
                Colors
              </p>
              <div className="space-x-2 btn-selected">
                {attr?.colors.map((iColor, i) => {
                  return (
                    <input
                      className="color-switch m-btn p-3 appearance-none"
                      key={i}
                      type="radio"
                      name="color"
                      id={`color${i}`}
                      style={{ backgroundColor: iColor }}
                      value={iColor}
                      onChange={formik.handleChange}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-5">
              <p className="text-indigo-500 text-medium font-medium mb-1">
                Sizes
              </p>
              <div className="space-x-1 xs:grid xs:grid-cols-2 xs:gap-y-2 xs:space-x-0">
                {attr?.size.map((size, i) => {
                  return (
                    <label key={i} className="sizebtn-selected relative">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        id={`size${i}`}
                        onClick={formik.handleChange}
                      />
                      <span className="size-btn xs:py-0 xs:text-sm">
                        {size}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Button type="submit" variant="outlined" color="indigo" size="sm">
              Create Item
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductItemForm;
