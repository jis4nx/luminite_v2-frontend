import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createAddress, updateAddress } from "@app/api/accountApi/accountApi";
import { useSelector } from "react-redux";

function AddressEdit({ address, setEdit, create }) {
  const [defaultAddr, setDefaultAddr] = useState(false);
  const [isAddressError, setIsAddressError] = useState(false);
  const updateAddressMut = useMutation(updateAddress);
  const createAddressMut = useMutation(createAddress);
  const { id } = useSelector((state) => state.profile);

  useEffect(() => {
    let timeoutId;
    if (isAddressError) {
      timeoutId = setTimeout(() => {
        setIsAddressError(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAddressError]);
  let addressValues = create
    ? {
      flat_no: "",
      street_no: "",
      address_line1: "",
      address_line2: "",
      city: "",
      postal_code: "",
      default: false,
      user_profile: id,
    }
    : { ...address };

  const formik = useFormik({
    initialValues: {
      ...addressValues,
    },
    onSubmit: (values) => {
      let data;
      data = {
        ...values,
        default: defaultAddr,
        ...(create
          ? { user_profile: id }
          : { id: address.id, user_profile: address.user_profile }),
      };
      if (create) {
        createAddressMut.mutate(data, {
          onSuccess: (res) => {
            console.log("Yay Created");
            setEdit(false);
          },
          onError: (res) => {
            console.log(res.response.data);
          },
        });
      } else {
        updateAddressMut.mutate(data, {
          onSuccess: (res) => {
            setEdit(false);
          },
          onError: (err) => {
            setIsAddressError(err.response.data.non_field_errors[0]);
          },
        });
      }
    },
  });
  return (
    <div className="p-5">
      <div className="bg-white">
        <p className="p-3 text-lg text-indigo-700 border-b-4 border-b-indigo-600 flex justify-center items-center uppercase">
          Address Form
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col p-5 gap-5">
            <div className="flex gap-3">
              <Input
                type="text"
                label="Flat No"
                color="indigo"
                name="flat_no"
                onChange={formik.handleChange}
                value={formik.values.flat_no}
              />
              <Input
                type="text"
                label="Street No"
                color="indigo"
                name="street_no"
                onChange={formik.handleChange}
                value={formik.values.street_no}
              />
            </div>
            <div className="flex gap-3">
              <Input
                type="text"
                label="City"
                color="indigo"
                name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              <Input
                type="text"
                label="Postal Code"
                color="indigo"
                name="postal_code"
                value={formik.values.postal_code}
                onChange={formik.handleChange}
              />
            </div>
            <div className="space-y-1">
              <Typography variant="small" color="gray" className="font-normal">
                Address Line 1
              </Typography>
              <Input
                type="text"
                color="indigo"
                name="address_line1"
                className="w-full"
                onChange={formik.handleChange}
                value={formik.values.address_line1}
              />
            </div>
            <div className="space-y-1">
              <Typography variant="small" color="gray" className="font-normal">
                Address Line 2
              </Typography>
              <Input
                type="text"
                color="indigo"
                name="address_line2"
                onChange={formik.handleChange}
                value={formik.values.address_line2}
              />
            </div>
            {isAddressError && (
              <p className="text-sm font-bold text-red-600">
                {isAddressError}
              </p>
            )}
            <div className="flex items-center text-blue-gray-900">
              <p>Set as default address</p>
              <Checkbox
                color="indigo"
                onChange={(e) => setDefaultAddr(e.target.checked)}
                defaultChecked={address?.default}
              />
            </div>

            <div className="flex items-center">
              <Button type="submit" color="indigo" size="sm">Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressEdit;
