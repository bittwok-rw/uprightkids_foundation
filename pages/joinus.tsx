/* eslint-disable @typescript-eslint/no-explicit-any */
import FAQSection from "@/components/FAQSection";
import VolunteerForm from "@/components/VolunteerForm";
import { CircleX } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-modal";

const partnerOptions = [
  {
    title: "PARTNER WITH US",
    description:
      "If you're part of an organization or company, partner with us to help amplify our efforts. Together, we can reach even more children in need and create lasting change.",
    buttonText: "Partner With Us",
  },
  {
    title: "JOIN AS A VOLUNTEER",
    description:
      "Stay connected with the work we're doing. By staying informed, you can learn more about our projects, the issues children face, and how we're addressing them.",
    buttonText: "Volunteer",
  },
];

const PartnerSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [modalIsOpenPayment, setIsOpenPayment] = useState(false);

  const openModalPayment = (e:any) => {
    e.stopPropagation();
    setIsOpenPayment(true);
  };

  const closeModalPayment = () => setIsOpenPayment(false);

  return (
    <div className="py-10 px-4 md:px-8 max-w-6xl mx-auto mt-[20px]" id="partner">
      <div className="w-16 h-1 bg-black mb-4"></div>
      <h2 className="text-4xl font-bold mb-4">Become a Partner</h2>
      <p className="text-lg mb-10 max-w-3xl text-black">
      We are deeply grateful for the support and collaboration of our global supporters, who are an essential part of our global family. Their dedication and contributions help us empower children and families out of poverty in Congo. 
      </p>
      <p className="text-lg mb-10 max-w-3xl text-black">
      We are always open to partnering with individuals, organizations, social enterprises and like-minded businesses. Together, we can create lasting change, expand our reach, and continue building brighter futures for children.      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partnerOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)} // Set active card
            className={`relative p-8 flex flex-col justify-between items-center rounded-lg shadow-lg transition-all duration-300 ease-in-out cursor-pointer 
              ${
                index === activeIndex
                  ? `border-t-4 border-green-500 bg-primary text-white scale-105 shadow-2xl`
                  : `border-t-4 border-red-500 bg-white text-black`
              }`}
          >
            <div>
            <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
            <p className="mb-6">{option.description}</p>
            </div>
           <div> <button
              onClick={openModalPayment}
              className="bg-blue-500 text-white py-2 px-6 rounded transition duration-300 hover:bg-blue-700"
            >
              {option.buttonText}
            </button></div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpenPayment}
        onRequestClose={closeModalPayment}
        contentLabel="Modal"
        bodyOpenClassName="modal-open"
        style={customStyles}
      >
        <div className="relative">
          <VolunteerForm />
          <button
            onClick={closeModalPayment}
            className="absolute top-2 right-2 text-primary p-2 rounded-full bg-transparent hover:bg-gray-600 transition duration-200"
          >
            <CircleX />
          </button>
        </div>
      </Modal>
    </div>
  );
};

const DonateSection = () => {
  return (
    <div className="bg-[#033AB9] text-white py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl text-white font-bold text-center mb-12">
          Different Ways to Give
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Donate Online */}
          <div className="bg-blue-500 p-6 rounded">
            <h3 className="text-2xl font-bold mb-3 text-center">
              Donate Online
            </h3>
            <p className="text-center mb-4">
              Click below to make a secure donation. Choose between a one-time
              or monthly gift and select the amount that works best for you.
            </p>
          </div>

          {/* Mail a Check */}
          <div className="bg-blue-500 p-6 rounded">
            <h3 className="text-2xl font-bold mb-3 text-center">
              Mail a Check
            </h3>
            <p className="text-center">
              Send your contribution to:
              <br />
              <strong>Upright Kids Foundation</strong>
              <br />
              204, Avenue Emery Patrice Lumumba,
              <br />
              Bukavu, DRC
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Transfer */}
          <div className="bg-[#005BBF] p-6 rounded">
            <h3 className="text-2xl font-bold mb-3 text-center">
              Bank Transfer
            </h3>
            <p className="text-center">
              Contact us at{" "}
              <span className=" font-bold ">
                info@uprightkidsfoundation.org
              </span>{" "}
              to request banking details for direct transfers.
            </p>
          </div>

          {/* In-Kind Donations */}
          <div className="bg-blue-500 p-6 rounded">
            <h3 className="text-2xl font-bold mb-3 text-center">
              In-Kind Donations
            </h3>
            <p className="text-center">
              We also accept stocks, supplies, and other in-kind contributions.
              Reach out to discuss how your gifts can support our mission.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

const SupportWaysSection = () => {
  const [modalIsOpenPayment, setIsOpenPayment] = useState(false);
  const openModalPayment = () => setIsOpenPayment(true);
  const closeModalPayment = () => setIsOpenPayment(false);

  const supportWays = [
    {
      title: "Be an advocate",
      description:
        "Upright Kids Foundation is a vibrant community of advocates, volunteers, and supporters, and we invite you to join us in ending the marginalization faced by children. Whether through donating your time, making a financial contribution, launching a fundraising campaign, or exploring a brand partnership, there are countless ways to make a meaningful impact. Raise your voice and spread awareness about the challenges faced by children in underserved regions. Inspire others to take action and support our mission.",
    },
    {
      title: "Get Involved",
      description:
        "Whether through volunteering, offering your skills, or helping us in other ways, your involvement is crucial to creating lasting change for these children.",
    },
    {
      title: "Stay Informed",
      description:
        "Stay connected with the work we're doing. By staying informed, you can learn more about our projects, the issues children face, and how we're addressing them.",
    },
    {
      title: "Fundraise With Us",
      description:
        "Help us raise the funds needed to support our projects. Organize fundraising campaigns, events, or activities to contribute to our mission and directly support the children in need.",
    },
  ];
  return (
    <div className="bg-primary flex flex-col items-center" id="join">
      <div className="bg-primary py-10 px-4 md:px-8 w-[80%] text-white">
        <h1 className="text-4xl font-bold mb-8 text-white">
          Know how you can support us
        </h1>

        <div className="flex flex-col space-y-8">
          {supportWays.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-accent rounded-full w-6 h-6 mt-1 flex items-center justify-center">
                <span className="text-primary">✓</span>
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-white">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={openModalPayment} className="bg-accent text-primary font-bold py-3 px-8 flex items-center">
            Join Us
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpenPayment}
        onRequestClose={closeModalPayment}
        contentLabel="Modal"
        bodyOpenClassName="modal-open"
        style={customStyles}
      >
        <>
          <VolunteerForm />
          <button
            onClick={closeModalPayment}
            className="absolute top-2 right-2 text-primary p-2 rounded-full bg-transparent hover:bg-gray-600 transition duration-200"
          >
            <CircleX />
          </button>
        </>
      </Modal>

    </div>
  );
};

export const SupportSection = () => {
  return (
    <div className="bg-primary text-white p-8 text-center">
      <h2 className="text-4xl font-bold mb-4 text-white">
        Donate to support children
      </h2>
      <p className="text-lg mb-6">
        Your gift can help protect a child, providing them with safety, care,
        and hope for a brighter future.
      </p>
      <button
        onClick={() => {
          window.location.href = `/donation#donate`;
        }}
        className="bg-accent text-blue-900 font-bold py-3 px-8 rounded hover:bg-yellow-500 transition duration-300"
      >
        Donate Now
      </button>
    </div>
  );
};

const UprightKidsFoundation = () => {
  return (
    <div className="font-sans">
      <div
        className={`w-full flex min-h-[70vh] py-8 justify-start items-center`}
        style={{
          backgroundImage: `linear-gradient(
        to right,
        rgba(0, 0, 0, 0.91), 
        rgba(0, 0, 0, 0.1)
      ), 
      url('/images/Rectangle 3463481.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "transparent", // Transparent since an image is provided
        }}
      >
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 w-[80%] gap-16 place-content-center">
            <div className="font-bold  rounded justify-between items-center capitalize text-primary text-lg">
              <div className="flex items-start py-4">
                <div className="w-[72px] mr-2  my-2 border-t-2 border-white">
                  {""}
                </div>
                <div className="flex flex-col gap-8">
                  <h2 className="text-white font-bold">Join Us</h2>
                  <div className="my-4 text-white flex flex-col gap-8">
                    <p className=" text-white ">
                    Upright Kids Foundation is reaching out to the global community to support its important projects and help transform the lives of vulnerable children in the Democratic Republic of Congo. Together, we can make a real difference. Here are some ways you can get involved
                    </p>
                  </div>
                  <div>
					<Link
						href="/joinus#partner"
						className="px-8 py-4 bg-primary text-lg text-white rounded-md hover:bg-yellow-500 font-semibold stroke-tertiary-900 transition-colors duration-300"
					>
					Get involved
					</Link>
				</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SupportWaysSection />
      <PartnerSection />
      <DonateSection />
      <FAQSection />
      <SupportSection />


  
    </div>
  );
};
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
    maxWidth: "80vw",
    maxHeight: "80vh",
    width: "100%",
    height: "auto",
    zIndex: 9999,
    padding: 0,
    overflow: "hidden",
  },
};
export default UprightKidsFoundation;
