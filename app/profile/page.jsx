"use client";
import Dashboard from "@components/UserProfile/Dashboard";
import { getUserType } from "@hooks/checkTypeQuery";
import MerchantDashboard from "@components/Merchant/Profile/MerchantDashboard";

function Page() {
  const { data: userType } = getUserType();
  if (userType?.is_seller) {
    return <MerchantDashboard />;
  } else if (userType?.is_user) {
    return <Dashboard />;
  }
}

export default Page;
