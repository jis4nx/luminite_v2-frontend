import { Input } from "@material-tailwind/react";
import { setFilterItems, setFilterResult } from "@redux/reducers/searchResult";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactSlider from "react-slider";
import "../slider.css"

function PriceFilter({ products }) {
  const [userInp, setUserInp] = useState({ min: 50, max: 30000 });
  const dispatch = useDispatch();

  useEffect(() => {
    ((min, max) => {
      const filteredItems = products.reduce((acc, product) => {
        const itemsInRange = product.items.filter((item) =>
          item.price >= min && item.price <= max
        );
        return [
          ...acc,
          ...itemsInRange.map((item) => ({ name: product.name, item })),
        ];
      }, []);

      dispatch(setFilterResult([...filteredItems]));
      dispatch(setFilterItems([...filteredItems]));
    })(userInp.min, userInp.max);
  }, [userInp]);

  return (
    <section>
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
          onChange={(e) => setUserInp({ ...userInp, min: e.target.value })}
        />
        <Input
          type="number"
          value={userInp.max}
          max={100000}
          onChange={(e) => setUserInp({ ...userInp, max: e.target.value })}
        />
      </div>
    </section>
  );
}

export default PriceFilter;
