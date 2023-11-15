"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ProductItemFilter from "./ProductItemFilter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterItems } from "@redux/reducers/searchResult";

function ListProductItems({ items, id }) {
  const dispatch = useDispatch();
  const { filteredResults } = useSelector((state) => state.searchResult);

  const itemList = items.items;
  const attributes = items.attributes;

  let attributeLables = [];
  let attributeKeys = [...Object.keys(attributes)];

  attributeKeys.map((attr) => {
    attributeLables.push(attr.replace(attr[0], attr[0].toUpperCase()));
  });

  useEffect(() => {
    dispatch(setFilterItems({ items: itemList }));
  }, [items]);
  const TABLE_HEAD = ["Name", ...attributeLables, "Price", "In Stock"];
  return items && (
    <div className="flex gap-3">
      <div className="w-1/3">
        <ProductItemFilter attributes={attributes} id={id} />
      </div>
      <Card className="h-full w-full">
        <CardBody className="overflow-scroll ">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-site-blue p-4"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredResults?.map(
                (
                  {
                    id,
                    name,
                    attributes,
                    qty_in_stock,
                    price,
                    image,
                  },
                  index,
                ) => {
                  const isLast = index === items.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={Math.random()}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={image}
                            alt={image}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      {attributeKeys.map((attr) => {
                        return (
                          <td key={Math.random()} className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {attributes[attr]}
                            </Typography>
                          </td>
                        );
                      })}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>

                      <td
                        className={`${classes} bg-blue-gray-50/50`}
                      >
                        <Typography
                          as="a"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {qty_in_stock}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ListProductItems;
