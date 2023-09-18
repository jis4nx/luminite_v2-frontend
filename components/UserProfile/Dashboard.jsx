"use client";
import Profile from "@components/Profile/Profile";
import SideBar from "./SideBar";
import { useState } from "react";
import Orders from "@components/Profile/Orders/Orders";

function Dashboard() {
  const [mode, setMode] = useState("Profile");

  let div = <Profile />;
  switch (mode) {
    case "Orders":
      div = <Orders />;
  }
  return (
    <section className="flex bg-white shadow-md rounded-sm h-[calc(100vh-4rem)]">
      <SideBar mode={mode} setMode={setMode} />
      <div className="mx-auto">
        {div}
      </div>
    </section>
  );
}

export default Dashboard;
