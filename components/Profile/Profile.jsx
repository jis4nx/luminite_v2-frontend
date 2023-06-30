"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@material-tailwind/react";

function Profile() {
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  const { user, address, profile_image } = useSelector((state) =>
    state.profile
  );
  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/account/login");
  }

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted && !isLoading
    ? (
      <Card className="mx-auto w-96 mt-5 flex flex-col items-center justify-center p-5 space-y-2">
        {profile_image && (
          <Image
            width={200}
            height={200}
            src={profile_image}
            alt="Profile Image"
          />
        )}

        <span className="text-indigo-600 font-medium">{user}</span>
        <div className="font-body">
          <table className="text-sm address-table">
            <tr>
              <th>Flat No</th>
              <td>{address.flat_no}</td>
            </tr>
            <tr>
              <th>Street No</th>
              <td>{address.street_no}</td>
            </tr>
            <tr>
              <th>Address Line 1</th>
              <td>{address.address_line1}</td>
            </tr>
            <tr>
              <th>Address Line 2</th>
              <td>{address.address_line2}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{address.city}</td>
            </tr>
            <tr>
              <th>Postal Code</th>
              <td>{address.postal_code}</td>
            </tr>
          </table>
        </div>
      </Card>
    )
    : null;
}

export default Profile;
