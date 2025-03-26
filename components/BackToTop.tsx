"use client";
import { useState, useEffect } from "react";
import { IoArrowUpOutline } from "react-icons/io5";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-2 rounded-full bg-tertiary-700 border-2 border-secondary-900 shadow-lg transition-all hover:scale-110"
        >
          <IoArrowUpOutline className="w-6 h-6 text-secondary-900" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
