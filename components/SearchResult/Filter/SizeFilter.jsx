import { Checkbox } from "@material-tailwind/react";
import { setFilterResult } from "@redux/reducers/searchResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SizeFilter() {
  const { products, items } = useSelector((state) => state.searchResult);
  const [userSize, setUserSize] = useState([]);
  const [filterSize, setFilterSize] = useState();
  const dispatch = useDispatch();

  const handleFilterSize = (size, e) => {
    if (e) {
      setUserSize([...userSize, size]);
    } else {
      setUserSize(userSize.filter((item) => item !== size));
    }
  };

  useEffect(() => {
    const sizes = new Set(
      products.flatMap((product) =>
        product.items.map((item) => item.product_size)
      ),
    );
    setFilterSize([...sizes]);
  }, []);

  useEffect(() => {
    if (userSize.length) {
      const filteredItems = items.filter((item) =>
        userSize.includes(item.item.product_size)
      );
      dispatch(setFilterResult(filteredItems));
    }
  }, [userSize]);

  return filterSize && (
    <div>
      <p className="p-3 text-gray-800 text-lg">Size</p>
      <div className="space-x-5">
        {filterSize.map((size) => {
          return (
            <Checkbox
              label={size}
              className="text-lg text-red-500"
              key={size}
              color="indigo"
              onChange={(e) => handleFilterSize(size, e.target.checked)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SizeFilter;
