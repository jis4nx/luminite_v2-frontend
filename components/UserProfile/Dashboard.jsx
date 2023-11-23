"use client";
import Profile from "@components/Profile/Profile";
import SideBar from "./SideBar";
import { useState } from "react";
import Orders from "@components/Profile/Orders/Orders";
import ChangePasswordForm from "./ChangePasswordForm";

function Dashboard() {
  const [mode, setMode] = useState("Profile");

  let div = <Profile />;
  switch (mode) {
    case "Orders":
      div = <Orders />;
      break;
    case "Account":
      div = <ChangePasswordForm />;
      break;
  }
  return (
    <section className="flex bg-white shadow-md rounded-sm ">
      <SideBar mode={mode} setMode={setMode} />
      <div className="w-9/12">
        {div}
      </div>
    </section>
  );
}

export default Dashboard;
