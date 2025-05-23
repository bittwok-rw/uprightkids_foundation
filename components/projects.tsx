import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Project {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
}

const Projects = () => {
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data: Project[] = await response.json();
        setOtherProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const displayedProjects = showAll ? otherProjects : otherProjects.slice(0, 3);

  if (loading) return <p className="text-center text-lg font-bold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
                  backgroundImage: `url(${project.imageUrl})`,
                  filter: "brightness(50%)",
                }}
              ></div>

              {/* Project Content */}
              <div className="relative z-10 p-6 flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold uppercase mb-4">{project.title}</h3>
                  <p
                    className="text-sm mb-6"
                    dangerouslySetInnerHTML={{
                      __html:
                        project.description.length > 200
                          ? project.description.slice(0, 200) + "..."
                          : project.description,
                    }}
                  ></p>
                </div>
                <div>
                  <button
                    onClick={() => router.push(`/projects/${project.slug}`)}
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
        {otherProjects.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-primary-900 text-white px-6 py-3 rounded-md font-bold hover:bg-primary-800 transition"
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
