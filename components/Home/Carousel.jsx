import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#1c4c96",
        borderRadius: "100px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#1c4c96",
        borderRadius: "100px",
      }}
      onClick={onClick}
    />
  );
}

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="h-[300px] w-[600px]">
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
}
