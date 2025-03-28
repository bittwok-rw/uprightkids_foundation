import { projectData } from "@/utils/projectData";
import React, { useState } from "react";

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  
  // Determine which projects to display
  const displayedProjects = showAll ? projectData : projectData.slice(0, 3);

  return (
    <section className="bg-gray-100 flex justify-center py-12">
      <div className="w-[80%] px-6">
        {/* Section Header */}
        <div className="w-3/4 mb-10">
          <h2 className="text-sm font-bold uppercase text-gray-600 tracking-wide">
            Our Current Projects
          </h2>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            We are creating a place where children with special needs can thrive
          </h1>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="relative bg-black min-h-[40vh] text-white p-4 rounded-lg overflow-hidden shadow-lg"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.images[0]})`,
                  filter: "brightness(50%)",
                }}
              ></div>

              {/* Project Content */}
              <div className="relative z-10 p-6 flex h-full flex-col justify-between">
                <div>
                  {" "}
                  <h3 className="text-xl font-bold uppercase mb-4">
                    {project.name}
                  </h3>
                  <p className="text-sm mb-6">
                    {" "}
                    {project.description[0].length > 200
                      ? project.description[0].slice(0, 200) + "..."
                      : project.description[0]}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      window.location.href = `/projects/${project.slug}`;
                    }}
                    className="bg-white text-black px-4 py-2 rounded-md font-bold hover:bg-gray-200 transition"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {projectData.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className=" bg-primary-900 text-white px-6 py-3 rounded-md font-bold hover:bg-primary-800 transition"
            >
              {showAll ? "Show Less" : "Show All Projects"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;