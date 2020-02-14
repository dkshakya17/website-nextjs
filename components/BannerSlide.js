import React from 'react';
import { Carousel } from "react-responsive-carousel";

function BannerSlide({slides, onClickCarousal}) {
  return (
    <Carousel autoPlay onClickItem={(e)=> {onClickCarousal(e)}} showIndicators={false} showStatus={false} className="main_banner_slide" infiniteLoop={true}>
      {slides.map(slide => (
          <div>
              <img
              className="d-block w-100"
              src={slide.url}
              alt={slide.caption}
              />
          </div>
      ))}
    </Carousel>
  );
}  

  
export default BannerSlide;