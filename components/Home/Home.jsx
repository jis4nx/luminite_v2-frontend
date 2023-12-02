import CategoryBar from "@components/Navbar/CategoryBar";
import Products from "@components/Shop/Products/Products";
import SimpleSlider from "./Carousel";
function Home() {
  return (
    <div className="flex flex-col space-y-32">
      <div className="flex gap-5">
        <CategoryBar />
        <SimpleSlider />
      </div>
      <div className="">
        <Products />
      </div>
    </div>
  );
}

export default Home;
