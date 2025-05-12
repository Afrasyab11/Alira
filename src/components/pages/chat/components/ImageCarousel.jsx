import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageCarousel = ({ images = [] }) => {
  // If no images provided, return null
  if (!images || images.length === 0) {
    return null;
  }

  // If only one image, show it without carousel
  if (images.length === 1) {
    return (
      <div className="mt-4 rounded-lg overflow-hidden">
        <div className="w-full aspect-[1/1] md:aspect-[4/3]">
          <img
            src={images[0]}
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  // If multiple images, show carousel
  return (
    <div className="mt-4 rounded-lg overflow-hidden">
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: #000 !important;
            background: rgba(255, 255, 255, 0.4);
            width: 30px !important;
            height: 30px !important;
            border-radius: 50%;
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 16px !important;
            font-weight: bold;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 0.95);
          }
          .swiper-pagination-bullet {
            background: #000 !important;
            opacity: 0.5;
            width: 6px !important;
            height: 6px !important;
          }
          .swiper-pagination-bullet-active {
            opacity: 1;
          }
          @media (min-width: 768px) {
            .swiper-button-next,
            .swiper-button-prev {
              width: 40px !important;
              height: 40px !important;
            }
            .swiper-button-next:after,
            .swiper-button-prev:after {
              font-size: 20px !important;
            }
            .swiper-pagination-bullet {
              width: 8px !important;
              height: 8px !important;
            }
          }
        `}
      </style>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full aspect-[1/1] md:aspect-[4/3]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
