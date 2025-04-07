import React from "react";
import Image from "next/image";
import { areasOfDevelopment } from "@/utils/areasOfDevelopment";
import FundamentalValuesCarousel from "@/components/FundamentalValuesCarousel";
import LogoSlider from "@/components/Partners";
import BlogSection from "@/components/landing/BlogSection";
import Projects from "@/components/projects";
import { SupportSection } from "./joinus";

const WhatWeDo = () => {

  return (
<div className="flex flex-col items-center w-full px-6 md:px-0">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full md:w-[80%]">
    <div className="flex text-black items-center">
      <div className="flex flex-col w-full">
        {/* Inline black line and "WHAT WE DO" */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-[2px] bg-black" />
          <p className="uppercase font-semibold text-sm tracking-wide text-gray-800">
            What we do
          </p>
        </div>

        {/* Adjusted spacing for heading */}
        <h2 className="font-bold text-3xl md:text-4xl mt-3 md:mt-4 leading-tight">
          Our Comprehensive Care Model
        </h2>

        {/* Adjusted spacing for paragraph */}
        <p className="mt-3 md:mt-4 text-gray-800 leading-relaxed">
          We believe in nurturing every aspect of a child’s growth,
          helping them reach their fullest potential.
        </p>
      </div>
    </div>
        <div className="relative h-[30vh] md:min-h-[50vh]">
          <Image
            src="/images/whatwedo.png"
            alt="Children learning"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        </div>
      </div>
      <div className="py-8 px-4 xl:px-8 bg-gray-100 flex flex-col items-center">
        <div className="py-8 px-4 flex flex-col gap-8 xl:px-8 w-[80%]">
          <h2 className="font-bold mb-6 text-black">Areas of Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areasOfDevelopment.map((area, index) => (
              <div key={index} className="p-4 ">
                <h4 className="text-2xl font-bold mb-2 text-black">
                  {area.title}
                </h4>
                <p className="text-gray-700">{area.description}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700">These core areas of development guide our efforts to create lasting, positive change in the lives of children and families.</p>

        </div>
      </div>
      <FundamentalValuesCarousel />

      <div className="flex bg-primary/10 items-center justify-center">
        <div className="w-[80%] grid md:grid-cols-2 gap-12 py-8">
          <div className="flex flex-col gap-8">
            <h2>Why We Do This</h2>
            <p className="text-black">
            Upright Kids Foundation protects and promotes children&#39;s rights, focusing on those marginalized by poverty, abandonment, and neglect. In the Democratic Republic of Congo, many children, especially in rural areas, lack access to resources and are unregistered, healthcare, and inheritance rights. Extreme poverty often forces families into heartbreaking decisions, leading to abandonment. In an overcrowded city like Bukavu, countless children end up on the streets, struggling to survive. Upright Kids Foundation believes every child deserves a better future and works to provide the care and opportunities they need.
            </p>
          </div>
          <div className="relative min-h-[50vh] h-full ">
            <Image
              src="/images/33333.png"
              alt="Unlock digital potential"
              className="w-full h-full object-cover rounded-md"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-center scroll-mt-[150px]"
        id="conflict"
      >
        <div className="w-[80%] grid md:grid-cols-2 gap-12 py-8">
          <div className="relative min-h-[50vh] h-full ">
            <Image
              src="/images/Rectangle 3463480.png"
              alt="Unlock digital potential"
              className="w-full h-full object-cover rounded-md"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2>The Crisis</h2>
            <h3 className="font-bold text-black/50">Conflict</h3>
            <p className="text-black">
            The Eastern Congo, despite its scenic beauty, is one of the world’s most violent regions. Armed groups terrorize rural communities, causing mass displacement and countless deaths, particularly in North and South Kivu. Women and children suffer most, enduring violence and exploitation, including the forced recruitment of child soldiers. Survivors face deep emotional scars, making reintegration challenging. Upright Kids Foundation is dedicated to supporting these children, offering critical care, education, and rehabilitation to help them rebuild their lives and envision a safer, brighter future.
            </p>
          </div>
        </div>
      </div>
      <Projects />
          {/* Partners Section */}
          <section id="partners" className="flex justify-center w-full py-8 md:py-12 px-4 md:px-0">
        <div className="w-full md:w-[80%] grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          <div>
            <div className="h-1.5 bg-black w-full md:w-1/4" />
            <h2 className="mt-2">Meet Our Supporters and Partners</h2>
          </div>
          <div className="md:col-span-2 xl:col-span-4">
            <LogoSlider />
          </div>
        </div>
      </section>
      <section
        className="min-h-[90vh] w-full bg-no-repeat flex justify-center bg-cover"
        style={{
          backgroundImage: `url("/images/Frame1241.png")`,
        }}
      >
        <div className="w-full px-4 sm:px-6 md:w-[90%] lg:w-[80%] xl:w-[80%] 2xl:w-[70%] flex justify-end">
        <div className="w-full md:w-1/2 bg-black flex flex-col gap-8 md:gap-16 bg-opacity-80 my-8 md:my-16 p-4 sm:p-6 md:p-8">
        <p className="font-bold text-xl md:text-2xl lg:text-3xl">
        “We would like to extend our deepest gratitude to our best friends and families, specially Famille HARRIET ANDRIESSEN, Dr WILLEM LAMMERS, Famille ESTHER BORRA & ERNST AEBI, Susie Gessey and Global Community, Edwin Fietsverkoop, Carolyn Peters, Sarah Sheldon, Agnija Kazusha and Peace Walker (Carolyn), who have stood with us in this journey.”
            </p>
            <p className="text-2xl">
              School materials have been provided, kids have fed, and homeless
              children have been rescued. your kindness has transformed lives
            </p>
            <p className="text-2xl">We thank you for your generosity</p>
          </div>
        </div>
      </section>
      <div className="w-full">
        <SupportSection />
      </div>
      <div className="w-full">
        <BlogSection />
      </div>
    </div>
  );
};

export default WhatWeDo;
