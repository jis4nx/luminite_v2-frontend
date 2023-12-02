import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const IMAGELIST = ["car1", "car2", "car3"];
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
        {IMAGELIST.map((image) => {
          return (
            <div className="rounded-xl object-contain" key={image}>
              <Image
                height={200}
                width={600}
                src={`/${image}.jpeg`}
                alt="Carousel Pic"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
