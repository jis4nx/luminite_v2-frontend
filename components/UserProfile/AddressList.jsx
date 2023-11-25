import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function AddressList({ addressList, setEditAddress }) {
  return addressList && setEditAddress && (
    <div className="mt-5">
      <ul class="pl-5 mt-2 space-y-1 flex flex-col gap-3">
        {addressList.map((item, i) => {
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
  );
}

export default AddressList;
