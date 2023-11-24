"use client";
import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { logoutUser } from "@app/api/accountApi/accountApi";
import { useDispatch } from "react-redux";
import { resetUser } from "@redux/reducers/auth";
import { useRouter } from "next/navigation";
import { resetProfile } from "@redux/reducers/profile";
import { useSelector } from "react-redux";

export default function ProfileMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile_image } = useSelector((state) => state.profile);

  const logOut = () => {
    dispatch(resetUser());
    dispatch(resetProfile());
    logoutUser();
    router.push("/account/login");
  };
  const [openMenu, setOpenMenu] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenMenu(true),
    onMouseLeave: () => setOpenMenu(false),
  };

  return (
    <Menu open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="Profile Image"
          className="cursor-pointer"
          src={profile_image && profile_image}
        />
      </MenuHandler>
      <MenuList
        {...triggers}
        className="hidden gap-3 overflow-visible lg:grid w-6"
      >
        <MenuItem className="flex items-center gap-2">
          <div className="space-y-1">
            <Link href="/profile">
              <Button
                type="button"
                color="indigo"
                size="md"
                variant="text"
                className="px-0 hover:bg-transparent transform-all ease-linear hover:scale-105 duration-200 hover:text-indigo-800"
              >
                My Profile
              </Button>
            </Link>
          </div>
        </MenuItem>
        <MenuItem>
          <Button
            type="button"
            color="indigo"
            size="md"
            variant="text"
            className="px-0 hover:bg-transparent transform-all ease-linear hover:scale-105 duration-200 hover:text-indigo-800"
            onClick={logOut}
          >
            Logout
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
