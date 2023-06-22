"use client";
import React from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { logoutUser } from "@app/api/accountApi/accountApi";
import { useDispatch } from "react-redux";
import { resetUser } from "@redux/reducers/auth";
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(resetUser());
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
        <Button
          {...triggers}
          variant="text"
          className="flex items-center gap-3 capitalize tracking-normal"
        >
          <Typography
            className="text-indigo-600 font-medium"
            variant="h6"
          >
            Profile
          </Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform text-indigo-800 ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList
        {...triggers}
        className="hidden gap-3 overflow-visible lg:grid w-3/12"
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
                Profile
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
