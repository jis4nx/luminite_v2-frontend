import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductItemForm from "./ProductItemForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

function MainProductForm() {
  const [isProdctForm, setIsProductForm] = useState(false);
  return (
    <section className="flex p-3 gap-3">
      <div className={isProdctForm ? "basis-2/3" : "basis-2/3"}>
        <ProductItemForm create={true} />
      </div>
      <div className="vertical-line"></div>
      {isProdctForm
        ? (
          <div className="basis-2/3">
            <div
              className="top-0 inline-block justify-self-end cursor-pointer"
              onClick={() => setIsProductForm(false)}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="lg"
                style={{ color: "#1c4c96" }}
              />
            </div>
            <ProductForm className="basis-2/3" create={true} />
          </div>
        )
        : (
          <div className="">
            <div
              className="bg-site-blue text-white p-2 rounded-md shadow-md text-sm space-x-3 cursor-pointer"
              onClick={() => setIsProductForm(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
              Create New Product
            </div>
          </div>
        )}
    </section>
  );
}

export default MainProductForm;
