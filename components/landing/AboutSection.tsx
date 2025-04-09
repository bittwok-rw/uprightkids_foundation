"use client";
import { useState, useRef, useEffect } from "react";
import ContentSection from "@/components/content/ContentSection";


export default function AboutSection() {
  const [showModal, setShowModal] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [showModal]);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handlePlayClick = () => {
    setShowModal(true);
  };

  return (
    <div className="relative">
      <ContentSection
        smallHeading={{
          text: "Know About Us",
          showLine: true,
          linePosition: "right",
        }}
        mainHeading={{
          content: `CHILDREN HAVE THE RIGHT TO A <span className="hidden lg:inline"><br /></span> SUSTAINABLE FUTURE`,
          isHtml: true,
        }}
        paragraphs={[
          {
            content: `Through education, support, and innovative programs, we provide 
              the tools and resources needed to help children build a brighter 
              future.<br /><br />Our mission is to create a world where all vulnerable children 
              can fulfill their potential and that they grow up to become 
              valuable members of their communities, contributing positively 
              to society and leading lives full of opportunity and hope.`,
            isHtml: true,
          },
        ]}
        button={{
          text: "Learn More",
          href: "/about",
        }}
        media={{
          type: "video",
          src: "/images/about/we-empower-children-out-of-poverty.png",
          showPlayIcon: true,
          onPlayClick: handlePlayClick, 
        }}
      />

      {/* Modal Video Player */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative w-full max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Video Player */}
            <div className="w-full overflow-hidden bg-black rounded-lg shadow-xl">
              <video
                ref={videoRef}
                src="/video/INCLUSIVE CARE FOR CHILDREN WITH SPECIAL 2025-04-07.mp4"
                className="w-full"
                controls
                autoPlay
                onError={() => {
                  console.error("Video failed to load");
                  setVideoError(true);
                }}
              />
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
                  <p>
                    Sorry, there was an error loading the video. Please try
                    again later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
