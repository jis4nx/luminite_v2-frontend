import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactSlider from "react-slider";
import "../slider.css";
import { setFilterItems } from "@redux/reducers/searchResult";
import { Checkbox, Input } from "@material-tailwind/react";

function Filter({ products }) {
  const [userInp, setUserInp] = useState({ min: 50, max: 30000 });
  const [userSize, setUserSize] = useState([]);
  const [filterSize, setFilterSize] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const sizes = new Set(
      products.flatMap((product) =>
        product.items.map((item) => item.product_size)
      ),
    );
    setFilterSize([...sizes]);
  }, []);

  useEffect(() => {
    dispatch(setFilterItems({ price: userInp, sizes: userSize }));
  }, [userInp, userSize]);

  const handleFilterSize = (size, e) => {
    if (e) {
      setUserSize([...userSize, size]);
    } else {
      setUserSize(userSize.filter((item) => item !== size));
    }
  };

  return filterSize && (
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
      <section className="bg-white shadow-sm p-3">
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
      </section>
      <section>
      </section>
    </div>
  );
}

export default Filter;
