import CategoryBar from "@components/Navbar/CategoryBar";
import Products from "@components/Shop/Products/Products";
import SimpleSlider from "./Carousel";
function Home() {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-20">
          <CategoryBar />
          <SimpleSlider />
        </div>
      </div>
      <div className="pt-36">
        <Products />
      </div>
    </div>
  );
}

export default Home;
