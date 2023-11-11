"use client";
import Profile from "@components/Profile/Profile";
import SideBar from "./MarchantSidebar";
import { useState } from "react";
import MerchantOrder from "../MerchantOrders/MerchantOrder";
import MainProductForm from "../MerchantProducts/MainProductForm";
import ListProductItems from "../MerchantProducts/ListProductItems";

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
    case "Product Items":
      div = <ListProductItems />;
      break;
  }
  return (
    <section className="flex bg-white shadow-md rounded-sm h-[calc(100vh-1rem)] w-full">
      <SideBar mode={mode} setMode={setMode} />
      <div className="w-full">
        {div}
      </div>
    </section>
  );
}

export default MerchantDashboard;
