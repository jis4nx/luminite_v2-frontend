import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function SimpleSlider() {
  return (
    <div className="h-[300px] w-[600px]">
      <Carousel
        autoPlay={true}
        showArrows={true}
        infiniteLoop={true}
        showStatus={false}
        swipeable={true}
        emulateTouch={true}
        showIndicators={false}
        showThumbs={false}
      >
        <div className="rounded-xl max-h[400px]">
          <Image
            height={400}
            width={500}
            src={"/car1.jpeg"}
            alt="Carousel Pic"
          />
        </div>
        <div className="rounded-xl max-h[400px]">
          <Image
            height={400}
            width={500}
            src={"/car2.jpeg"}
            alt="Carousel Pic"
          />
        </div>

        <div className="rounded-xl max-h[400px]">
          <Image
            height={400}
            width={500}
            src={"/car3.jpeg"}
            alt="Carousel Pic"
          />
        </div>
      </Carousel>
    </div>
  );
}
