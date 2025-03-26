import React, { useEffect, useState } from "react";

const ParallaxWholeSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="min-h-[90vh] section w-full bg-no-repeat flex justify-center bg-cover"
      style={{
        backgroundImage: `url("/images/Frame1241.png")`,
        transform: `translateY(${offsetY * 0.5}px)`, // Adjust speed here (0.5 = slower movement)
      }}
    >
      <div className="w-[80%] flex justify-end">
        <div className="w-1/2 bg-black flex flex-col gap-16 bg-opacity-50 my-16 p-8">
          <p className="font-bold text-3xl">
            “We would like to extend our deepest gratitude to our best friends
            and families, specially Famille HARRIET ANDRIESSEN, Dr WILLEM
            LAMMERS, Famille ESTHER BORRA & ERNST AEBI and Peace Walker
            (Carolyn), who have stood with us in this journey.”
          </p>
          <p className="text-2xl">
            School materials have been provided, kids have fed, and homeless
            children have been rescued. Your kindness has transformed lives.
          </p>
          <p className="text-2xl">We thank you for your generosity</p>
        </div>
      </div>
    </section>
  );
};

export default ParallaxWholeSection;
