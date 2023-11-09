import React from "react";

function CategoryTree({categories}) {
  return (
    <ul className="bg-white block">
      {categories.map((category) => (
        <li key={category.id}>
          {category.name}
          {category.parent && category.parent.length > 0 && (
            <CategoryTree categories={category.parent} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default CategoryTree;
