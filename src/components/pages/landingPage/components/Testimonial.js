"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import {
  Autoplay,
  FreeMode,
  Mousewheel,
  Pagination,
  Navigation,
} from "swiper/modules";
import Image from "next/image";

export default function Testimonials() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (cardIndex, section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [`${cardIndex}-${section}`]: !prev[`${cardIndex}-${section}`],
    }));
  };

  const projectCards = [
    {
      id: 1,
      title: "“",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      name: " Katty koew",
      designation: "Founder and CEO OF January ",
    },
    {
      id: 2,
      title: "“",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      name: " Katty koew",
      designation: "Founder and CEO OF January ",
    },
    {
      id: 3,
      title: "“",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      name: " Katty koew",
      designation: "Founder and CEO OF January ",
    },
    {
      id: 4,
      title: "“",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      name: " Katty koew",
      designation: "Founder and CEO OF January ",
    },
    {
      id: 5,
      title: "“",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      name: " Katty koew",
      designation: "Founder and CEO OF January ",
    },
  ];

  return (
    <div className="sm:px-3 xl:px-24 py-20 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8">Testimonials</h1>
      <div className="relative grid grid-cols-1">
        <Swiper
          cssMode={true}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          // slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          mousewheel={true}
          modules={[Autoplay, FreeMode, Mousewheel,Pagination, Navigation]}
          keyboard={{ enabled: true }}
          // spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 3,
            },
          }}
          className="swiper-container !mx-12"
        >
          {projectCards.map((card, index) => (
            <SwiperSlide key={card.id} className="max-w-sm shadow-md">
              <div className="bg-[#F2F2F2] sm:p-3 md:p-4 min-h-[70vh] flex flex-col justify-between relative rounded-lg">
                <p className=" text-6xl text-black font-extrabold">
                  {card?.title}
                </p>
                <p className="text-sm md:text-[16px] leading-8 px-3 text-black ">
                  {card?.description}
                </p>
                <div className=" flex flex-col gap-y-2 px-3">
                  <p className="text-[#454545] text-md ">{card?.name}</p>
                  <p className="text-[#454545] text-sm ">{card?.designation}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination !relative space-x-4 !mt-2 "></div>
        <div className="swiper-button-prev text-[#A0A0A08A] !left-0 sm:!hidden md:!block"></div>
        <div className="swiper-button-next !right-0 sm:!hidden md:!block"></div>
      </div>
    </div>
  );
}
