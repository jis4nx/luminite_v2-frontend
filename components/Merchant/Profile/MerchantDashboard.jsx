"use client";
import Profile from "@components/Profile/Profile";
import SideBar from "./MarchantSidebar";
import { useState } from "react";
import MerchantOrder from "../MerchantOrders/MerchantOrder";
import MainProductForm from "../MerchantProducts/MainProductForm";
import ListProducts from "../MerchantProducts/ListProduct";
import SalesData from "../MerchantOrders/SalesData/SalesData";

function MerchantDashboard() {
  const [mode, setMode] = useState("Profile");

  let div = <Profile />;
  switch (mode) {
    case "Orders":
      div = <MerchantOrder />;
      break;
    case "Add Product Item":
      div = <MainProductForm />;
      break;
    case "Products":
      div = <ListProducts />;
      break;
    case "Analytics":
      div = <SalesData />;
      break;
  }
  return (
    <section className="flex bg-white shadow-md rounded-sm w-full">
      <SideBar mode={mode} setMode={setMode} />
      <div className="w-full p-5">
        {div}
      </div>
    </section>
  );
}

export default MerchantDashboard;
