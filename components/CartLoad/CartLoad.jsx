"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { cartLoad } from "@redux/reducers/cart";
import { useEffect } from "react";

function CartLoad() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storage = localStorage.getItem("carts");
    if (storage) {
      const cartItems = JSON.parse(storage).products;
      const totalPrice = storage && JSON.parse(storage).totalPrice;
      dispatch(cartLoad({ cartItems: cartItems, totalPrice: totalPrice }));
    }
  }, [dispatch]);
}

export default CartLoad;
