/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { donationData } from "@/utils/donationData";
import { Autoplay } from "swiper/modules";
import Modal from "react-modal";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import DonateForm from "./DonateForm";
import { CircleX } from "lucide-react";

const DonationCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIsOpenPayment, setIsOpenPayment] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(100);


  const openModalPayment = () => setIsOpenPayment(true);
  const closeModalPayment = () => setIsOpenPayment(false);
  const handleDonateNowClick = (amount: number) => {
    setSelectedAmount(amount); // Set the selected amount from the card
    openModalPayment(); // Open the payment modal
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <Swiper
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={1.2} // Default to 1.2 slides per view for mobile
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 10 }, // For tablets
          1024: { slidesPerView: 1.2, spaceBetween: 16 }, // For larger screens
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full"
        modules={[Autoplay]}
      >
        {donationData.map((donation, index) => (
          <SwiperSlide
            key={donation.id}
            className="flex justify-center items-center"
          >
            <div
              className={`w-full p-4 rounded-xl bg-white border border-black h-full shadow-xl overflow-hidden flex flex-col transition-all duration-500 ${
                index === activeIndex ? "min-h-[60vh]" : "md:h-[50vh]"
              }`}
            >
              {/* Image */}
              <div className="relative h-[50%] md:h-[60%]">
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col justify-between items-stretch h-full">
                <div className="p-2">
                  <h3 className="text-black text-lg md:text-xl font-bold mb-2">
                    {donation.title}
                  </h3>
                  {/* Cost per Meal */}
                  <p className="text-sm text-gray-500 mt-2">
                    Cost per Meal:{" "}
                    <span className="font-semibold">
                      <span className="text-primary text-lg md:text-xl">
                        ${donation.costPerMeal}
                      </span>
                      /meal
                    </span>
                  </p>
                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 my-2">
                    {donation.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{
                        width: `${
                          (donation.amountRaised / donation.goal) * 100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-700">
                    <span>
                      Raised:{" "}
                      <span className="font-semibold">
                        ${donation.amountRaised}
                      </span>
                    </span>
                    <span>
                      Goal:{" "}
                      <span className="font-semibold">${donation.goal}</span>
                    </span>
                  </div>
                </div>

                {/* Donate Button */}
                <div className="mt-4 bottom-0">
                  <button                     onClick={() => handleDonateNowClick(donation.costPerMeal)}
 className="w-full py-2 bg-primary text-white rounded-full hover:text-white hover:bg-blue-700">
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        isOpen={modalIsOpenPayment}
        onRequestClose={closeModalPayment}
        contentLabel="Modal"
        bodyOpenClassName="modal-open"
        style={customStyles}
      >
        <>
          <DonateForm selectedAmount={selectedAmount} />
          <button
            onClick={closeModalPayment}
            className="absolute top-2 right-2 text-white p-2 rounded-full bg-transparent hover:bg-gray-600 transition duration-200"
          >
            <CircleX />
          </button>
        </>
      </Modal>
    </div>
  );
};

export default DonationCarousel;

const customStyles = {
  overlay: {
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "#000",
    maxWidth: "50vw",
    maxHeight: "80vh",
    width: "100%",
    height: "auto",
    zIndex: 9999,
    padding: 0,
    overflow: "auto",
  },
};