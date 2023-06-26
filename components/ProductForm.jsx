"use client";
import React from "react";
import {
  Alert,
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useFormik } from "formik";
import { addProduct, getCategories } from "@app/api/productapi/productapi";
import { useMutation, useQuery } from "@tanstack/react-query";

function ProductForm() {
  const [open, setOpen] = React.useState(false);
  const category = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const addProductData = useMutation(addProduct);
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      base_price: null,
    },
    onSubmit: (values) => {
      const formData = new FormData();
      const data = { ...values, category: values.category.value };
      for (let x in data) {
        formData.append(x, data[x]);
      }
      addProductData.mutate(formData, {
        onSuccess: () => {
          setOpen(true);
        },
      });
    },
  });
  //
  return (
    <>
      <section className="mt-5 max-w-lg m-auto">
        <Alert
          className="mb-1 bg-indigo-600"
          open={open}
          onClose={() => setOpen(false)}
          icon={
            <FontAwesomeIcon icon={faCircleCheck} className="mt-px h-6 w-6" />
          }
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          Product Added
        </Alert>
        <Card className=" shadow-xl p-8">
          <Typography
            color="indigo"
            align="center"
            variant="h4"
            className="mb-5"
          >
            Product Add
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Product Name"
                color="indigo"
                name="name"
                value={formik.values.productName}
                onChange={formik.handleChange}
              />
              <Textarea
                label="Product description"
                color="indigo"
                name="desc"
                value={formik.values.productDesc}
                onChange={formik.handleChange}
              />
              <Input
                label="Base Price"
                color="indigo"
                name="base_price"
                type="number"
                size="sm"
                className="w-3/5"
                min={0}
                value={formik.values.base_price}
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
                  onChange={(e) =>
                    formik.setFieldValue("product_image", e.target.files[0])}
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
                  {formik.values.product_image
                    ? formik.values.product_image.name
                    : "Choose File"}
                </label>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Button size="sm" className="mx-auto" type="submit" color="indigo">Add</Button>
            </div>
          </form>
        </Card>
      </section>
    </>
  );
}

export default ProductForm;
