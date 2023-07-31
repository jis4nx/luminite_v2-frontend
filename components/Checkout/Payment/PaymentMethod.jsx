import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setPaymentType } from "@redux/reducers/checkout";

function PaymentMethod() {
  const dispatch = useDispatch();

  return (
    <div className="w-full max-w-[24rem] p-5">
      <div className="p-2">
        Payment Method
      </div>
      <List className="flex-row">
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="horizontal-list"
                value="BKASH"
                id="horizontal-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
                onClick={(e) => dispatch(setPaymentType(e.target.value))}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium text-sm">
              Bkash
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="horizontal-list"
                id="horizontal-list-vue"
                value="NAGAD"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
                onClick={(e) => dispatch(setPaymentType(e.target.value))}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium text-sm">
              Nagad
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-svelte"
            className="flex w-full cursor-pointer items-center"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="horizontal-list"
                id="horizontal-list-svelte"
                value="COD"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
                onClick={(e) => dispatch(setPaymentType(e.target.value))}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium text-sm">
              Cash on Delivery
            </Typography>
          </label>
        </ListItem>
      </List>
    </div>
  );
}

export default PaymentMethod;
