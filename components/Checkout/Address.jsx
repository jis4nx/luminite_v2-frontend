import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { setDeliveryAddress } from "@redux/reducers/checkout";
import { useDispatch } from "react-redux";
import { useUserAdressQuery } from "@hooks/addressQuery";
import AddressDialog from "@components/UserProfile/AddressDialog";

function Address() {
  const { data: addressData } = useUserAdressQuery();
  const [addressList, setAddressList] = useState();
  const [defaultAddress, setDefaultAddress] = useState();
  const [open, setOpen] = useState(false);
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
    <div className="">
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
        <p
          className="text-sm text-indigo-700 cursor-pointer hover:text-indigo-900"
          onClick={() => setOpen(true)}
        >
          Create new address
        </p>
      </div>
      {open ? <AddressDialog open={open} setOpen={setOpen} /> : null}
    </div>
  );
}

export default Address;
