"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFormik } from "formik";
import { Button, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Address from "@components/Checkout/Address";
import { useUserAdressQuery } from "@hooks/addressQuery";
import AddressEdit from "@components/UserProfile/AddressEdit";
import AddressList from "@components/UserProfile/AddressList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@app/api/accountApi/accountApi";

function Profile() {
  const [mounted, setMounted] = React.useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  const { user, address, profile_image, firstName, lastName, phoneNumer } =
    useSelector((
      state,
    ) => state.profile);
  const userProfile = useSelector((state) => state.profile);
  const [editMode, setEditMode] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const { data: addressData } = useUserAdressQuery();
  const fields = [
    { label: "First name", value: "firstName" },
    { label: "Last name", value: "lastName" },
    { label: "Email", value: "user" },
    { label: "Phone", value: "phoneNumber" },
  ];

  const updateProfileData = useMutation(updateProfile);

  let data = {};
  fields.map((item) => {
    data[item.value] = userProfile[item.value];
  });
  const formik = useFormik({
    initialValues: {
      ...data,
    },
    onSubmit: (values) => {
      let payload = new FormData();
      const data = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phoneNumber,
        id: userProfile.id,
      };
      for (let x in data) {
        payload.append(x, data[x]);
      }
      updateProfileData.mutate(payload, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ["checkExpiry"] });
          setEditMode(false);
        },
      });
    },
  });
  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/account/login");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return addressData && mounted && !isLoading
    ? (
      <div className="flex">
        <IconButton
          size="sm"
          className="top-4 left-7"
          onClick={() => setEditMode(!editMode)}
        >
          <FontAwesomeIcon icon={faPen} color="black" />
        </IconButton>
        <div className="flex flex-col items-center justify-center p-5 space-y-2">
          <div className="flex justify-center items-center">
            {profile_image && (
              <Image
                width={150}
                height={150}
                src={profile_image}
                alt="Profile Image"
              />
            )}
          </div>
          <span className="text-indigo-600 font-medium">{user}</span>
          <div>
            <form
              onSubmit={formik.handleSubmit}
            >
              <div className="font-body">
                <table className="text-sm address-table">
                  {Object.entries(formik.values).map((item, i) => {
                    return (
                      <tr key={item[0]}>
                        <th className="text-gray-800 font-medium">
                          {fields[i].label}
                        </th>
                        <td className="font-medium text-gray-800">
                          <input
                            className={editMode &&
                              `outline-none border-[1px] border-gray-600 px-3 py-1 rounded-md focus:border-2 focus:border-indigo-600`}
                            value={item[1]}
                            name={item[0]}
                            onChange={formik.handleChange}
                            disabled={!editMode}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              {editMode &&
                (
                  <div className="mt-3 pl-[50px]">
                    <Button size="sm" color="indigo" type="submit">
                      Save
                    </Button>
                  </div>
                )}
            </form>
          </div>
        </div>
        <div>
          {editAddress
            ? <AddressEdit address={editAddress} setEdit={setEditAddress} />
            : (
              <div>
                <Address />
                <AddressList
                  addressList={addressData}
                  setEditAddress={setEditAddress}
                />
              </div>
            )}
        </div>
      </div>
    )
    : null;
}

export default Profile;
