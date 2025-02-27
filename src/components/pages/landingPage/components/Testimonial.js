"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

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
      title: "Detatched House",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Detatched House",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Detatched House",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Detatched House",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Detatched House",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8">Project Reports</h1>
      <div className="relative grid grid-cols-1">
        <Swiper
          cssMode={true}
          // slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          mousewheel={true}
          modules={[Autoplay, FreeMode, Mousewheel, Navigation]}
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
          }}
          className="swiper-container !mx-12"
        >
          {projectCards.map((card, index) => (
            <SwiperSlide key={card.id} className="max-w-sm shadow-md">
              <div className="bg-white rounded-lg">
                {/* <Image
                  src={icons?.house}
                  alt="house"
                  className="w-full object-cover"
                /> */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                  {[
                    "Purchase Price",
                    "Market Value",
                    "Energy Efficiency",
                    "Return on Equity",
                  ].map((section) => (
                    <div key={section} className="mb-2">
                      <button
                        onClick={() => toggleSection(index, section)}
                        className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-800"
                      >
                        <span>{section}</span>
                        {/* {expandedSections[`${index}-${section}`] ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )} */}
                      </button>
                      {expandedSections[`${index}-${section}`] && (
                        <div className="mt-2 text-sm text-gray-500">
                          Details for {section}
                        </div>
                      )}
                    </div>
                  ))}
                  <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                    View Complete Report
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev !left-0"></div>
        <div className="swiper-button-next !right-0"></div>
      </div>
      <div className="pl-16 mt-8">
        <button className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition duration-300">
          Back
        </button>
      </div>
    </div>
  );
}
