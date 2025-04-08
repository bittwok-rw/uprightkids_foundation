/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface MediaItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  image: string[];
  description: string[];
}

const MediaCarousel = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [mediaData, setMediaData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const response = await fetch('/api/media');
        if (!response.ok) {
          throw new Error('Failed to fetch media data');
        }
        const data = await response.json();
        setMediaData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMediaData();

    // Handle responsive behavior
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

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

  // Calculate gap size based on window width
  const getNavigationGap = () => {
    if (windowWidth < 480) return 'gap-16'; // Smallest screens
    if (windowWidth < 640) return 'gap-24'; // Extra small screens
    if (windowWidth < 768) return 'gap-32'; // Small screens
    if (windowWidth < 1024) return 'gap-48'; // Medium screens
    return 'gap-80'; // Large screens and above (20rem)
  };

  if (loading) return <div className="w-full h-[300px] flex items-center justify-center">Loading...</div>;
  if (error) return <div className="w-full h-[300px] flex items-center justify-center text-red-500">{error}</div>;
  if (!mediaData.length) return <div className="w-full h-[300px] flex items-center justify-center">No media items found</div>;

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
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={2000}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        className="w-full"
        breakpoints={{
          200: { slidesPerView: 1, spaceBetween: 20 }, // Extra small screens
          480: { slidesPerView: 1, spaceBetween: 30 }, // Extra small screens
          640: { slidesPerView: 1, spaceBetween: 30 }, // Small screens
          768: { slidesPerView: 2, spaceBetween: 40 }, // Medium screens
          1024: { slidesPerView: 3, spaceBetween: 50 }, // Large screens
        }}
      >
        {mediaData.map((item) => (
          <SwiperSlide key={item._id} className="relative cursor-pointer">
            <div
              onClick={() => {
                window.location.href = `/media/${item.slug}`;
              }}
              className="relative w-full h-[250px] xs:h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
            >
              <img
                src={item.image[0] || "/images/projects/sewing.png"} // Fallback image
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 bg-black bg-opacity-10 hover:bg-opacity-50 flex items-end justify-between p-2 sm:p-4">
                <h3 className="text-white text-xs xs:text-sm sm:text-base md:text-lg font-bold line-clamp-2">
                  {item.title}
                </h3>
              </div>
              <div className="absolute top-0 z-10 p-2 sm:p-4">
                <h3 className="text-white text-xs xs:text-sm sm:text-base font-bold">
                  {new Date(item.date).toLocaleDateString()} {/* Formatted date */}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Navigation Arrows - Responsive gap */}
      <div className={`absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center ${getNavigationGap()} z-20`}>
        <button 
          onClick={handlePrev}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-400 transition-colors"
          aria-label="Previous slide"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16"
            className="sm:w-5 sm:h-5 md:w-6 md:h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button 
          onClick={handleNext}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-400 transition-colors"
          aria-label="Next slide"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16"
            className="sm:w-5 sm:h-5 md:w-6 md:h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
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