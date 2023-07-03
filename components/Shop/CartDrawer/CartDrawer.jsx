import React from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function CartDrawer({ openDrawer, closeDrawer }) {
  return (
    <Drawer
      placement="right"
      open={openDrawer}
      onClose={closeDrawer}
      size={400}
      className="p-4"
    >
      <div className="mb-6 flex items-center justify-between">
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <FontAwesomeIcon icon={faX} className="text-indigo-700"/>
        </IconButton>
      </div>
    </Drawer>
  );
}

export default CartDrawer;
