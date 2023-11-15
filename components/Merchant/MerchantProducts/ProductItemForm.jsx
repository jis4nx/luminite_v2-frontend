"use client";
import { Alert, Button, input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProductItem } from "@app/api/productapi/productapi";
import {
  getMerchantProducts,
  getProductTypes,
} from "@app/api/productapi/merchant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import { getMerchantProductList } from "@hooks/merchantProducts";

const ProductItemForm = () => {
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#1c4c96",
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "white" : "white",
        color: "black",
        "&:hover": {
          color: "white",
          backgroundColor: "#1c4c96",
        },
      };
    },
  };

  const [attributes, setAttributes] = useState([]);
  const [productAttributes, setProductAttributes] = useState({});
  const [isVisible, setIsVisible] = useState();
  const [product_type, setProductType] = useState();
  const { data: listProducts } = getMerchantProductList();
  const { data: productTypes } = useQuery({
    queryKey: ["listProductTypes"],
    queryFn: getProductTypes,
  });
  const addProductItemData = useMutation(addProductItem);

  const handleProductTypeChange = (selectedOption) => {
    setAttributes(selectedOption.value);
    setProductType(selectedOption.label);
  };

  useEffect(() => {
    let timeoutId;
    if (isVisible) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible]);
  const formik = useFormik({
    initialValues: {
      product: "",
      price: "",
      qty_in_stock: "",
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        attributes: { ...productAttributes },
        product_id: values.product.value,
        product_type: product_type,
      };
      addProductItemData.mutate(data, { onSuccess: () => setIsVisible(true) });
    },
  });
  const handleInputChange = (attr, event) => {
    const updatedAttributes = {
      ...productAttributes,
      [attr]: event.target.value,
    };
    if (event.target.value === "") {
      delete updatedAttributes[attr];
    }
    setProductAttributes(updatedAttributes);
    formik.handleChange(event);
  };
  return listProducts && productTypes && (
    <>
      <div className="max-w-xl m-auto">
        <form onSubmit={formik.handleSubmit}>
          {isVisible
            ? (
              <Alert
                icon={
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size="lg"
                    style={{ color: "#65d639" }}
                  />
                }
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
                className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                color="indigo"
              >
                Product Item Added!
              </Alert>
            )
            : null}

          <h4 className="text-indigo-600 font-bold text-center mt-2">
            Add Product Item
          </h4>
          <section className="flex flex-col gap-5 mt-5">
            <div className="select-product space-y-4">
              <Select
                options={listProducts.map((product) => ({
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
              <Select
                options={productTypes.map((type) => ({
                  value: type.attributes,
                  label: type.product_type,
                }))}
                isSearchable
                noOptionsMessage={() => "No Product Type Found!"}
                defaultValue=""
                styles={selectStyles}
                placeholder="Product Type"
                onChange={handleProductTypeChange}
              />
              <div className="space-y-4">
                {attributes.map((attr) => {
                  return (
                    <div key={attr}>
                      <input
                        type="text"
                        name={attr}
                        placeholder={attr.replace(
                          attr[0],
                          attr[0].toUpperCase(),
                        )}
                        value={productAttributes[attr] || ""}
                        onChange={(e) => handleInputChange(attr, e)}
                        className="border-site-blue text-indigo-600 appearance-none border-b-2 font-medium"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <input
              type="number"
              placeholder="Qty"
              min={0}
              name="qty_in_stock"
              className="product-input border-site-blue"
              onChange={formik.handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              min={0}
              className="focus:outline-none border-site-blue            text-indigo-600 appearance-none
            border-b-2 font-medium"
              onChange={formik.handleChange}
            />
          </section>
          <div className="flex mt-5 flex-col">
            <div className="mt-5">
              <div className="inline-block border-2 border-indigo-800
              text-indigo-800
              rounded-lg p-1 px-2 hover:bg-indigo-800 hover:text-white hover:transition duration-300">
                <input
                  type="file"
                  id="upload"
                  hidden
                  accept="images/*"
                  onChange={(e) =>
                    formik.setFieldValue("image", e.target.files[0])}
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
                  {formik.values.image
                    ? formik.values.image.name
                    : "Choose File"}
                </label>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Button
              type="submit"
              variant="outlined"
              size="sm"
              className="bg-site-blue text-white border-transparent"
            >
              Create Item
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductItemForm;
