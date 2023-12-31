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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterItems } from "@redux/reducers/searchResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setProductItem } from "@redux/reducers/product";
import ProductItemForm from "./ProductItemForm";

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

  const [editmode, setEditMode] = useState(false);
  useEffect(() => {
    dispatch(setFilterItems({ items: itemList }));
  }, [items]);

  const TABLE_HEAD = ["Name", ...attributeLables, "Price", "In Stock", ""];
  return items && (
    <div className="flex gap-3">
      <div className="w-1/3">
        <ProductItemFilter attributes={attributes} id={id} />
      </div>
      <Card className="h-full w-full">
        {editmode
          ? (
            <div>
              <FontAwesomeIcon
                onClick={() => setEditMode(false)}
                icon={faBackward}
                style={{ color: "#1c4c96" }}
                size="lg"
                className="pl-4 pt-2 cursor-pointer"
              />
              <div className="w-full p-4">
                <ProductItemForm create={false} />
              </div>
            </div>
          )
          : (
            <>
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
                          product,
                          product_type,
                          title,
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
                            <td
                              className={`cursor-pointer ${classes}`}
                              onClick={() => {
                                setEditMode(true);
                                dispatch(
                                  setProductItem({
                                    id,
                                    name,
                                    price,
                                    attributes,
                                    image,
                                    product,
                                    product_type,
                                    title,
                                    stockQty: qty_in_stock,
                                  }),
                                );
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                style={{ color: "#1c4c96" }}
                              />
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
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
            </>
          )}
      </Card>
    </div>
  );
}

export default ListProductItems;
