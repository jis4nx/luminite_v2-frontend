import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { getAddress } from "@app/api/accountApi/accountApi";
import { useQuery } from "react-query";
import { setDeliveryAddress } from "@redux/reducers/checkout";
import { useDispatch } from "react-redux";

function Address() {
  const { data: addressData } = useQuery("address", getAddress);
  const [addressList, setAddressList] = useState();
  const [defaultAddress, setDefaultAddress] = useState();
  const dispatch = useDispatch();

  const handleAddressChange = (selectedOption) => {
    if (selectedOption) {
      dispatch(setDeliveryAddress(selectedOption.value));
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: "",
      backgroundColor: "#e5e7eb",
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "white" : "white",
        color: "#525252",
        "&:hover": {
          color: "white",
          backgroundColor: "#6366f1",
        },
      };
    },
  };

  useEffect(() => {
    setAddressList(addressData);
    if (addressList) {
      addressList.forEach((item) => {
        if (item.default === true) {
          let addr =
            `${item.flat_no}, ${item.street_no}, ${item.address_line1}, ${
              item.address_line2 ? `${item.address_line2}, ` : ""
            }${item.city} ${item.postal_code}`;
          setDefaultAddress(addr);
          dispatch(setDeliveryAddress(item));
        }
      });
    }
  }, [addressData, addressList, dispatch]);

  return addressList && addressData && defaultAddress && (
    <div className="p-5">
      <div className="flex items-center gap-2 p-3 rounded-md">
        <IconButton
          variant="gradient"
          className="w-4 h-4 rounded-full"
          color="indigo"
        />
        <Select
          className="w-full"
          options={addressList.map((item) => ({
            value: item,
            label:
              `${item.flat_no}, ${item.street_no}, ${item.address_line1}, ${
                item.address_line2 ? `${item.address_line2}, ` : ""
              }${item.city} ${item.postal_code}`,
          }))}
          styles={selectStyles}
          defaultValue={defaultAddress}
          placeholder={defaultAddress}
          onChange={handleAddressChange}
        />
      </div>
      <div className="flex mt-5 items-center gap-2 pl-5">
        <FontAwesomeIcon icon={faPlus} className="text-indigo-700" />
        <p className="text-sm text-indigo-700 cursor-pointer hover:text-indigo-900">
          Create new address
        </p>
      </div>
    </div>
  );
}

export default Address;
