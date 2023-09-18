"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFormik } from "formik";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Address from "@components/Checkout/Address";
import { useUserAdressQuery } from "@hooks/addressQuery";
import AddressEdit from "@components/UserProfile/AddressEdit";

function Profile() {
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  const { user, address, profile_image } = useSelector((state) =>
    state.profile
  );
  const [editMode, setEditMode] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const { data: addressData } = useUserAdressQuery();
  const fields = [
    { label: "Flat No", value: "flat_no" },
    { label: "Street No", value: "street_no" },
    { label: "Address Line 1", value: "address_line1" },
    { label: "Address Line 2", value: "address_line2" },
    { label: "City", value: "city" },
    { label: "Postal Code", value: "postal_code" },
  ];
  let data = {};
  fields.map((item) => {
    data[item.value] = address[item.value];
  });
  const formik = useFormik({
    initialValues: {
      ...data,
    },
    onSubmit: (values) => {
      console.log(values);
      setEditMode(false);
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
                  <div className="flex justify-end mt-3">
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
            ? <AddressEdit address={editAddress} setEdit={setEditAddress}/>
            : (
              <div>
                <Address />
                <div className="mt-5">
                  <ul class="pl-5 mt-2 space-y-1 flex flex-col gap-3">
                    {addressData.map((item, i) => {
                      let addr =
                        `${item.flat_no}, ${item.street_no}, ${item.address_line1}, ${
                          item.address_line2 ? `${item.address_line2}, ` : ""
                        }${item.city} ${item.postal_code}`;
                      return (
                        <li
                          key={item.id}
                          className="text-gray-700 text-sm space-x-2 flex"
                        >
                          <div className="text-indigo-800 font-bold">
                            {i + 1}.
                          </div>
                          <span>{addr}</span>
                          <FontAwesomeIcon
                            icon={faPen}
                            className="text-indigo-800 cursor-pointer hover:text-black"
                            onClick={() => setEditAddress(item)}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
        </div>
      </div>
    )
    : null;
}

export default Profile;
