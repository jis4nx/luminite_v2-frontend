"use client";
import {
  Badge,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faX } from "@fortawesome/free-solid-svg-icons";
import AccountMenu from "@components/AccountMenu/AccountMenu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "@components/ProfileMenu/ProfileMenu";
import CartDrawer from "@components/Shop/CartDrawer/CartDrawer";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { searchProduct } from "@app/api/productapi/productapi";
import { SearchProduct } from "./SearchProduct";
import { useRouter } from "next/navigation";
import { setSearchResult } from "@redux/reducers/searchResult";
import SearchButton from "./SearchButton";

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const [searchQuery, setSearchQuery] = useState();
  const [inpFocus, setInpFocus] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const closeDrawer = () => setIsCartOpen(false);
  const openDrawer = () => setIsCartOpen(true);

  const { data: searchData } = useQuery(
    ["search", searchQuery],
    () => searchProduct("product", searchQuery),
    {
      enabled: !!searchQuery,
    },
  );

  const handleClick = () => {
    dispatch(setSearchResult({ products: searchData }));
    router.push("/shop/search");
    setInpFocus(false);
  };
  return (
    <>
      <CartDrawer openDrawer={isCartOpen} closeDrawer={closeDrawer} />
      <nav className="w-screen px-3 py-1 shadow-md my-3">
        <div className="flex justify-between text-black items-center">
          <div className="flex justify-evenly items-center ml-10">
            <Link href="/">
              <Typography variant="h5" color="indigo">
                LUMINITE V2
              </Typography>
            </Link>
          </div>
          <div className="w-5/12">
            <SearchButton
              searchQuery={searchQuery}
              setInpFocus={setInpFocus}
              setSearchQuery={setSearchQuery}
              handleClick={handleClick}
            />
            {inpFocus
              ? (
                <div>
                  <SearchProduct
                    items={searchData}
                    handleClickProduct={() => setInpFocus(false)}
                    query={searchQuery}
                  />
                </div>
              )
              : null}
          </div>
          {isAuthenticated ? <ProfileMenu /> : <AccountMenu />}
          <div className="flex items-center px-2 gap-4 py-2">
            <Badge
              content={cartCount}
              className="bg-indigo-700 font-bold"
            >
              <IconButton variant="text" onClick={openDrawer}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-indigo-600 h-5 w-5"
                />
              </IconButton>
            </Badge>
            <IconButton variant="text" color="indigo">
              <BellIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </nav>
    </>
  );
}
