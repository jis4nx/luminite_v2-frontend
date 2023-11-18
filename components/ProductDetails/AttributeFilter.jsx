import Select from "react-select";
import { useEffect, useState } from "react";
import { filterItem, setProductItem } from "@redux/reducers/product";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Radio } from "@material-tailwind/react";
import "./style.css";

export default function AttributeFilter({ items, selectedItem, attributes }) {
  const [color, setColor] = useState();
  const [queryAttr, setQueryAttr] = useState({});
  const [colorList, setColorList] = useState([]);
  const { attributeList, itemList } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleAttrValue = (k, v, checked) => {
    let queryData = { ...queryAttr };
    if (checked) {
      queryData[k] = v;
    }
    setQueryAttr(queryData);
  };

  useEffect(() => {
    const colorArr = items.map((item) => item.product_color);
    setColorList(colorArr);
  }, [items]);

  const filterItems = (items, color, attr) => {
    return items.filter((item) => {
      const hasMatchingColor = color ? item.product_color === color : true;

      const hasMatchingAttributes = attr
        ? Object.entries(attr).every(([key, value]) =>
          item.attributes[key] === value
        )
        : true;

      return hasMatchingColor && hasMatchingAttributes;
    });
  };
  useEffect(() => {
    const filteredItems = itemList.filter((item) => {
      const hasMatchingColor = color ? item.product_color === color : true;

      const hasMatchingAttributes = queryAttr
        ? Object.keys(queryAttr).every((key) =>
          item.attributes[key] == queryAttr[key]
        )
        : true;

      return hasMatchingColor && hasMatchingAttributes;
    });
    const item = filteredItems[0];
    dispatch(setProductItem({ ...item }));
    // dispatch(filterItem({ color: color, attr: queryAttr }));
    // const filterColor = items.reduce((result, item) => {
    //   if (!result.some((obj) => obj.product_color === item.product_color)) {
    //     result.push(item);
    //   }
    //   return result;
    // }, []);
    // setFilteredItems(filterColor);
    // if (color !== undefined) {
    //   const filteredSizes = items.filter((item) => {
    //     return color === item.product_color;
    //   });
    //   if (filteredSizes.length) {
    //     const fItem = filteredSizes[0];
    //     setFilterSizeItems(filteredSizes);
    //     dispatch(
    //       setProductItem({
    //         id: fItem.id,
    //         name: fItem.name,
    //         color: fItem.product_color,
    //         image: fItem.image,
    //         price: fItem.price,
    //         stockQty: fItem.qty_in_stock,
    //         attributes: fItem.attributes,
    //         product_type: fItem.product_type,
    //       }),
    //     );
    //   }
    // } else {
    //   const defaultSizes = items.filter((item) => {
    //     return selectedItem.color === item.product_color;
    //   });
    //   setFilterSizeItems(defaultSizes);
    // }
  }, [color, queryAttr]);

  return (
    <div className="text-gray-900 space-y-3">
      <div className="btn-selected">
        <p className="text-sm text-gray-700 pb-1">Color Family</p>
        {colorList?.map((color, i) => (
          <input
            className="attribute-filter m-btn p-3 appearance-none"
            key={i}
            type="radio"
            name="color"
            id={`color${i}`}
            style={{ backgroundColor: color }}
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        ))}
      </div>
      <div className="flex items-start">
        {Object.entries(attributeList).map((item) => {
          const [k, v] = item;
          return (
            <section className="" key={k}>
              <p className="text-gray-700 text-sm pb-1">
                {k.replace(k[0], k[0].toUpperCase())}
              </p>
              <div className="space-x-3">
                {v.map((item) => {
                  return (
                    <Radio
                      label={item}
                      key={item}
                      color="indigo"
                      name="attr"
                      value={item}
                      onChange={(e) =>
                        handleAttrValue(k, e.target.value, e.target.checked)}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
