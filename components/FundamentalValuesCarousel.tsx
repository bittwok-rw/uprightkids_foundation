import React from "react";
import { fundamentalValues } from "@/utils/fundamentalValues";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FundamentalValuesCarousel = () => {
  return (
    <div className="py-8 px-4 md:px-8 flex justify-center">
      <div className="py-8 px-4 md:px-8 w-[80%] flex flex-col gap-8 items-center">
        <div className="w-1/2 px-8 bg-gradient-to-b from-[#E5EBF8] rounded-md to-transparent mb-6">
          <h2 className="font-bold text-center">Fundamental Values</h2>
        </div>
        <div className="relative w-full grid overflow-hidden">
          <div className="mx-12 overflow-hidden">
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              pagination
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              loop={true}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              modules={[Navigation]}
              className="fundamental-values-carousel w-full pointer-events-none"
            >
              {fundamentalValues.map((value, index) => {
                const borderColors = [
                  "border-[#033AB9]",
                  "border-[#FF3A21]",
                  "border-[#0A97D9]",
                ];
                const borderColor = borderColors[index % borderColors.length];
                return (
                  <SwiperSlide key={index}>
                    <div
                      className={`bg-[#E5F6F1] ${borderColor} border-t-4 p-6 h-full flex flex-col justify-between items-stretch rounded-md shadow-md text-center`}
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-4">
                          {value.title}
                        </h3>
                        <p className="text-gray-700 mb-6">
                          {value.description}
                        </p>
                      </div>
                      <div>
                        <Button className="text-white px-4 py-2 rounded hover:bg-purple-700">
                          {value.buttonText}
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Navigation Buttons */}
          <button
            className="custom-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-[#242e3b] hover:bg-[#242e3b]/95 text-white flex items-center justify-center w-10 h-10 rounded-full pointer-events-auto"
            aria-label="Previous Slide"
          >
            <ChevronLeft />
          </button>
          <button
            className="custom-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-[#242e3b] hover:bg-[#242e3b]/95 text-white flex items-center justify-center w-10 h-10 rounded-full pointer-events-auto"
            aria-label="Next Slide"
          >
            <ChevronRight />
          </button>
        </div>
 
      </div>
    </div>
  );
};

export default FundamentalValuesCarousel;
