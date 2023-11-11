"use client";
import React, { useEffect } from "react";
import { Alert, Button, Card, Input, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useFormik } from "formik";
import { addProduct, getCategories } from "@app/api/productapi/productapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeProduct } from "@app/api/productapi/merchant";

function ProductForm({ productData, create }) {
  const [open, setOpen] = React.useState(false);
  const category = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const addProductData = useMutation(addProduct);
  const changeProductData = useMutation(changeProduct);
  const queryClient = useQueryClient();
  let initProductData = create
    ? {
      name: "",
      desc: "",
      base_price: null,
    }
    : { ...productData, category: productData.category.id };
  const formik = useFormik({
    initialValues: {
      ...initProductData,
    },
    onSubmit: (values) => {
      const formData = new FormData();
      const data = { ...values, category: values.category.value };
      for (let x in data) {
        formData.append(x, data[x]);
      }
      if (create) {
        addProductData.mutate(formData, {
          onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({
              queryKey: ["merchantProductList"],
            });
          },
        });
      } else {
        changeProductData.mutate(values, {
          onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({
              queryKey: ["merchantProductList"],
            });
          },
        });
      }
    },
  });
  //
  return (
    <>
      <section>
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
          Product {create ? "Added" : "Saved"}
        </Alert>
        <Card className="" shadow={false}>
          <h4 className="text-indigo-600 font-bold text-center mt-2">
            {create ? "Add" : "Save"} Product
          </h4>
          <form onSubmit={formik.handleSubmit} className="mt-2">
            <div className="space-y-4">
              <Input
                label="Product Name"
                color="indigo"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <Textarea
                label="Product description"
                color="indigo"
                name="desc"
                value={formik.values.desc}
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
                defaultValue={productData.category.id}
                placeholder={create
                  ? "Select Category"
                  : productData.category.name}
                onChange={(option) => formik.setFieldValue("category", option)}
                onBlur={formik.handleBlur("category")}
              />
            </div>
            <div className="flex items-center mt-4">
              <Button
                size="sm"
                className="mx-auto"
                type="submit"
                color="indigo"
              >
                {create ? "Add" : "Save"}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </>
  );
}

export default ProductForm;
