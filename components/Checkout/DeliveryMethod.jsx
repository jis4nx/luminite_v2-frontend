import React from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { setDeliveryMethod } from "@redux/reducers/checkout";
import { useDispatch } from "react-redux";

function DeliveryMethod() {
  const dispatch = useDispatch();
  return (
    <div className="w-full max-w-[24rem] p-5">
      <div className="p-2">
        Deliver Method
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
                value="PTH"
                id="horizontal-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
                onClick={(e) => dispatch(setDeliveryMethod(e.target.value))}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Pathao
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
                value="FEDX"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
                onClick={(e) => dispatch(setDeliveryMethod(e.target.value))}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              FedEx
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="horizontal-list"
                id="horizontal-list-svelte"
                value="DHL"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
                onClick={(e) => dispatch(setDeliveryMethod(e.target.value))}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              DHL
            </Typography>
          </label>
        </ListItem>
      </List>
    </div>
  );
}

export default DeliveryMethod;
