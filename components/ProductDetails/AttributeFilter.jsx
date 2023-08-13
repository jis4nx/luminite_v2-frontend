import Select from "react-select";
import { useEffect, useState } from "react";
import { setItem } from "@redux/reducers/product";
import { useDispatch } from "react-redux";

export default function AttributeFilter({ items, selectedItem}) {
  const [color, setColor] = useState();
  const [filteredSizeItems, setFilterSizeItems] = useState([]);
  const [size, setSize] = useState();
  const [filteredItems, setFilteredItems] = useState([]);
  const dispatch = useDispatch();

  const handleSizeChange = (selectedOption) => {
    if (selectedOption) {
      const {
        id,
        product_size: size,
        product_color: color,
        image,
        price,
        qty_in_stock: stockQty,
      } = selectedOption.value;
      setItem({ id, size, color, image, price, stockQty });
      setSize(selectedOption.label);
    }
  };

  useEffect(() => {
    const filterColor = items.reduce((result, item) => {
      if (!result.some((obj) => obj.product_color === item.product_color)) {
        result.push(item);
      }
      return result;
    }, []);
    setFilteredItems(filterColor);
    if (color !== undefined) {
      const filteredSizes = items.filter((item) => {
        return color === item.product_color;
      });
      if (filteredSizes.length) {
        const fItem = filteredSizes[0];
        setFilterSizeItems(filteredSizes);
        dispatch(
          setItem({
            id: fItem.id,
            size: fItem.product_size,
            color: fItem.product_color,
            image: fItem.image,
            price: fItem.price,
            stockQty: fItem.qty_in_stock,
          }),
        );
      }
    } else {
      const defaultSizes = items.filter((item) => {
        return selectedItem.color === item.product_color;
      });
      setFilterSizeItems(defaultSizes);
    }
  }, [color, dispatch, items]);

  return (
    <div className="flex items-center text-gray-900 ">
      <div className="flex items-center">
        <div className="btn-selected">
          {filteredItems.map((item, i) => (
            <input
              className="attribute-filter m-btn p-3 appearance-none"
              key={i}
              type="radio"
              name="color"
              id={`color${i}`}
              style={{ backgroundColor: item.product_color }}
              value={item.product_color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex ml-6 items-center">
        <div>
          <Select
            className="w-40"
            options={filteredSizeItems.length > 1
              ? filteredSizeItems.map((item) => ({
                value: item,
                label: item.product_size,
              }))
              : [{ value: selectedItem, label: selectedItem.size }]}
            onChange={handleSizeChange}
            defaultValue={size}
            isSearchable={false}
            placeholder="Size"
            key={color}
          />
        </div>
      </div>
    </div>
  );
}
