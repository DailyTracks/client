import { React, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/SwiperImage.module.css";

function SwiperImage({ data }) {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  const renderSlides = data.map((url, index) => (
    <div
      key={index}
      style={{
        alignItems: "center",
        justifyContent: "center",
        // border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <img
        src={process.env.REACT_APP_PROXY + url}
        alt={url}
        style={{
          width: "95%",
          height: "300px",
          objectFit: "contain",
        }}
      />
    </div>
  ));

  return (
    <div className="flex justify-center items-center py-2 px-3">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        swipeable={true}
        emulateTouch={true}
        selectedItem={data[currentIndex]}
        onChange={handleChange}
        className="w-[400px] lg:hidden"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}

export default SwiperImage;
