/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { mediaData } from "@/utils/media";
import { ArrowRightCircle } from "lucide-react";

const MediaCarousel = () => {
  return (
    <div className="w-full">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1} // Default to 1 slide
        spaceBetween={40} // Increased space between cards
        coverflowEffect={{
          rotate: 0, // No rotation
          stretch: 0, // No stretch
          depth: 200, // Slight depth for visual separation
          modifier: 2,
          slideShadows: false, // Disabled shadows for clean visuals
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full"
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 30 }, // Smaller spacing for small screens
          768: { slidesPerView: 3, spaceBetween: 40 }, // Medium spacing for tablets
          1024: { slidesPerView: 3, spaceBetween: 50 }, // Larger spacing for desktops
        }}
      >
        {mediaData.map((item, index) => (
          <SwiperSlide key={index} className="relative cursor-pointer">
            <div
              onClick={() => {
                window.location.href = `/media/${item.slug}`;
              }}
              className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
            >
              {/* Image */}
              <img
                src={"/images/projects/sewing.png"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-black bg-opacity-10 hover:bg-opacity-50 flex items-end justify-between p-4">
                <h3 className="text-white text-sm sm:text-lg font-bold">
                  {item.title}
                </h3>
                <ArrowRightCircle className="text-white" />
              </div>
              {/* Date */}
              <div className="absolute top-0 z-10 p-4">
                <h3 className="text-white text-sm sm:text-lg font-bold">
                  {item.date}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination {
          display: none !important; /* Hides dots */
        }
      `}</style>
    </div>
  );
};

export default MediaCarousel;
