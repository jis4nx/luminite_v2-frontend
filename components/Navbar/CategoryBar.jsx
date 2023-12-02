import { getCategories } from "@app/api/productapi/productapi";
import MenuItems from "@components/Category/MenuItem";
import { useEffect } from "react";
import { useQuery } from "react-query";

const CategoryBar = () => {

  const { data: categoriesData } = useQuery("categories", getCategories);
  return categoriesData && (
    <div className="inline-block">
      {categoriesData?.map((menu, index) => {
        const depthLevel = 0;
        return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
      })}
    </div>
  );
};

export default CategoryBar;
