"use client";
import {
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import AccountMenu from "@components/AccountMenu/AccountMenu";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NavBar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <nav className="w-screen px-3 py-2 shadow-md bg-white">
      <div className="flex justify-between text-black items-center">
        <div className="flex justify-evenly items-center ml-10">
          <Link href="/">
            <Typography variant="h5" color="indigo">
              LUMINITE V2
            </Typography>
          </Link>
        </div>
        <div className="w-5/12">
          <Input
            type="search"
            label="Search here..."
            color="indigo"
            icon={
              <div
                className="!absolute mr-0 rounded-md bg-indigo-500 px-[13px] py-2"
                color="indigo"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-white"
                />
              </div>
            }
          />
        </div>
        {isAuthenticated ? <Button>hLel</Button> : <AccountMenu />}
        <div className="flex items-center px-2 gap-3">
          <IconButton variant="text">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-indigo-600 h-5 w-5"
            />
          </IconButton>
          <IconButton variant="text" color="indigo">
            <BellIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
