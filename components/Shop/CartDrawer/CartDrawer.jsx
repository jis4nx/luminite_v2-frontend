import React, { useEffect } from "react";
import {
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faX } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { removeFromCart } from "@redux/reducers/cart";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { setProducts } from "@redux/reducers/checkout";

function CartDrawer({ openDrawer, closeDrawer }) {
  const dispatch = useDispatch();
  const TABLE_HEAD = ["Product", "QTY", "Price", "Total", ""];
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  };
  return (
    <Drawer
      placement="right"
      open={openDrawer}
      onClose={closeDrawer}
      size={500}
    >
      <div>
        <div className="flex justify-between p-3">
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <FontAwesomeIcon icon={faX} className="text-indigo-700" />
          </IconButton>
          <Link href="/checkout">
            <Button color="indigo" onClick={() => dispatch(setProducts(cartItems))}>
              Checkout
            </Button>
          </Link>
        </div>

        <div className="p-3">
          <table className="w-full min-w-max table-auto text-left border-b-2 border-gray-600">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartItems.map(
                (
                  {
                    id,
                    title,
                    image,
                    price,
                    qty,
                  },
                  index,
                ) => {
                  const isLast = index === cartItems.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Image
                            src={image}
                            alt={title}
                            width={50}
                            height={50}
                            className="bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {title}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {qty}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {price * qty}
                      </td>
                      <td className={classes}>
                        <IconButton
                          variant="text"
                          color="red"
                          size="sm"
                          onClick={() => dispatch(removeFromCart({ id: id }))}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} size="xl" />
                        </IconButton>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
          <div className="flex ml-2 justify-between mt-2 ">
            <p>Total Price</p>
            <p className="mr-5 font-semibold">BDT {totalPrice}</p>
          </div>
          <div className="flex ml-2 justify-between mt-2 ">
            <p>Total Items</p>
            <p className="mr-5 font-semibold">{getTotalItems()} Pc</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default CartDrawer;
