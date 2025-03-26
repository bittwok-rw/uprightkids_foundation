import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5, // Show 5 items
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function HighlightedCarouselAbsolute() {
  const [activeIndex, setActiveIndex] = useState(2); // Default active card index

  const handleBeforeChange = (nextSlide: number) => {
    setActiveIndex(nextSlide); // Update active index during slide change
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto ">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        centerMode={true}
        containerClass="carousel-container relative"
        itemClass="carousel-item-padding-40-px"
        focusOnSelect={true}
        beforeChange={(nextSlide) => handleBeforeChange(nextSlide)}
        showDots={false}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                scale: isActive ? 1.2 : 1,
                zIndex: isActive ? 10 : 1,
              }}
              whileHover={{
                scale: isActive ? 1.3 : 1.1,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{
                position: "absolute",
                top: 0,
              }}
            >
              <div className="bg-blue-500 text-white font-bold text-xl flex items-center justify-center h-40 w-40 rounded-md shadow-md">
                Card {index + 1}
              </div>
            </motion.div>
          );
        })}
      </Carousel>
    </div>
  );
}
