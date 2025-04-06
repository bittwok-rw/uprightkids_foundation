/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { mediaData } from "@/utils/media";

const MediaCarousel = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="w-full relative">
  <Swiper
  ref={swiperRef}
  effect="coverflow"
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={1}
  spaceBetween={40}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 2,
    slideShadows: false,
  }}
  autoplay={{ delay: 5000, disableOnInteraction: false }} // Increased delay (5000ms = 5s)
  speed={2000} // Slower transition (2000ms = 2s)
  pagination={{ clickable: true }}
  modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
  className="w-full"
  breakpoints={{
    640: { slidesPerView: 2, spaceBetween: 30 },
    768: { slidesPerView: 3, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 },
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
              <img
                src={"/images/projects/sewing.png"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 bg-black bg-opacity-10 hover:bg-opacity-50 flex items-end justify-between p-4">
                <h3 className="text-white text-sm sm:text-lg font-bold">
                  {item.title}
                </h3>
              </div>
              <div className="absolute top-0 z-10 p-4">
                <h3 className="text-white text-sm sm:text-lg font-bold">
                  {item.date}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Navigation Arrows */}
      <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center gap-[20.5rem] z-20">


      <button 
  onClick={handlePrev}
  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-400 transition-colors"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>
        <button 
  onClick={handleNext}
  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-400 transition-colors"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
</button>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default MediaCarousel;