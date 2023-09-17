import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";
import "../slider.css";
import { setFilterItems } from "@redux/reducers/searchResult";
import { Checkbox, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { filterProduct } from "@app/api/productapi/productapi";

function Filter({ products }) {
  const [userInp, setUserInp] = useState({ min: 50, max: 30000 });
  const [userValue, setUserValue] = useState({});
  const dispatch = useDispatch();
  const { product_attrs } = useSelector((state) => state.searchResult);

  const filterProducts = useMutation(filterProduct);

  useEffect(() => {
    let data = { price: { ...userInp }, attributes: { ...userValue } };
    filterProducts.mutate(data, {
      onSuccess: (res) => {
        dispatch(setFilterItems({ items: res }));
      },
    });
  }, [userValue, userInp]);

  const handleAttrValue = (key, value, e) => {
    const updatedUserValue = { ...userValue };
    if (!e) {
      if (updatedUserValue.hasOwnProperty(key)) {
        updatedUserValue[key] = updatedUserValue[key].filter((item) =>
          item !== value
        );
      }
    } else {
      if (!updatedUserValue.hasOwnProperty(key)) {
        updatedUserValue[key] = [];
      }
      if (!updatedUserValue[key].includes(value)) {
        updatedUserValue[key].push(value);
      }
    }
    setUserValue(updatedUserValue);
  };

  return product_attrs && (
    <div className="flex flex-col gap-3">
      <section className="space-y-5  bg-white shadow-sm p-3">
        <div>
          <p className="p-3 text-gray-800 text-lg">Price Range</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[userInp.min, userInp.max]}
            value={[userInp.min, userInp.max]}
            min={50}
            max={30000}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            minDistance={20}
            step={50}
            onChange={(renderThumb) =>
              setUserInp({
                ...userInp,
                min: renderThumb[0],
                max: renderThumb[1],
              })}
          />
        </div>
        <div className="pt-10 flex justify-between">
          <Input
            type="number"
            value={userInp.min}
            min={50}
            max={30000}
            onChange={(e) => {
              setUserInp({ ...userInp, min: e.target.value });
            }}
          />
          <Input
            type="number"
            value={userInp.max}
            min={50}
            max={30000}
            onChange={(e) => {
              setUserInp({ ...userInp, max: e.target.value });
            }}
          />
        </div>
      </section>
      {Object.entries(product_attrs).map((item) => {
        const [k, v] = item;
        return (
          <section className="bg-white shadow-sm p-3" key={k}>
            <p className="p-3 text-gray-800 text-lg">{k.toUpperCase()}</p>
            <div className="space-x-5">
              {v.map((item) => {
                return (
                  <Checkbox
                    label={item}
                    className="text-lg text-red-500"
                    key={item}
                    color="indigo"
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
  );
}

export default Filter;
