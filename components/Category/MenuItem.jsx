import { useEffect, useRef, useState } from "react";
import Dropdown from "./DropDown";
import { List } from "@material-tailwind/react";
import Link from "next/link";
const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdown]);

  const handleMouseEnter = () => {
    if (window.innerWidth > 960) {
      setDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 960) {
      setDropdown(false);
    }
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <List
      className="menu-items"
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.subcategories
        ? (
          <>
            <Link
              type="button"
              href={`/product/category/${items.id}`}
              aria-haspopup="menu"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={toggleDropdown}
            >
              {items.name}
              {depthLevel > 0
                ? <span>&raquo;</span>
                : <span className="arrow" />}
            </Link>
            <Dropdown
              depthLevel={depthLevel}
              submenus={items.subcategories}
              dropdown={dropdown}
            />
          </>
        )
        : <p>{items.name}</p>}
    </List>
  );
};

export default MenuItems;
