import ColorFilter from "./ColorFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";

function Filter({ products }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="space-y-5  bg-white shadow-sm p-3">
        <PriceFilter products={products} />
      </div>
      <div className="bg-white shadow-sm p-3">
        <SizeFilter />
      </div>
      <div className="bg-white shadow-sm p-3">
        <ColorFilter />
      </div>
    </div>
  );
}

export default Filter;
