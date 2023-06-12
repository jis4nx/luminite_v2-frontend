"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useFormik } from "formik";
import { getCategories } from "@api/productapi/productapi";
import { useQuery } from "react-query";

function ProductForm() {
  const category = useQuery("categories", getCategories, { cacheTime: 5000 });

  const formik = useFormik({
    initialValues: {
      productName: "",
      productDesc: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.productName);
      formData.append("desc", values.productDesc);
      formData.append("category", values.category.value);
      formData.append("product_image", values.productImage);

      //     fetch(BASE_URL + "/shop/product/", {
      //       method: "POST",
      //       body: formData,
      //     })
      //       .then((res) => {
      //         if (res.ok) {
      //           console.log("Product Submitted");
      //         } else {
      //           console.log("Error submitting");
      //         }
      //       }).catch((err) => {
      //         console.log("error occurred", err);
      //       });
      //     console.log(values);
    },
  });
  //
  return (
    <>
      <Card className="mt-5 max-w-lg p-8 m-auto shadow-xl">
        <Typography color="indigo" align="center" variant="h4" className="mb-5">
          Product Add
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Product Name"
              color="indigo"
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
            <Textarea
              label="Product description"
              color="indigo"
              name="productDesc"
              value={formik.values.productDesc}
              onChange={formik.handleChange}
            />

            <Select
              options={category && category.data?.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              onChange={(option) => formik.setFieldValue("category", option)}
              onBlur={formik.handleBlur("category")}
            />

            <div className="inline-block border-2 border-indigo-800
              text-indigo-800
              rounded-lg p-1 px-2 hover:bg-indigo-800 hover:text-white hover:transition duration-300">
              <input
                type="file"
                id="upload"
                hidden
                accept="images/*"
                // onChange={(e) => handleFile(e)}
                onChange={(e) =>
                  formik.setFieldValue("productImage", e.target.files[0])}
                required
              />
              <label
                htmlFor="upload"
                className="space-x-1 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faImage}
                  size="lg"
                  className=""
                />
                <span className="text-sm font-medium">
                </span>
                {formik.values.productImage
                  ? formik.values.productImage.name
                  : "Choose File"}
              </label>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Button size="sm" className="mx-auto" type="submit">Add</Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default ProductForm;
