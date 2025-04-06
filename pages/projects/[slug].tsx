import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import GetInvolved from "@/components/GetInvolved";
import DonationSection2 from "@/components/landing/DonationSection2";

// Define proper interfaces for your project data
interface Project {
  slug: string;
  title: string;
  imageUrl: string;
  description: string;
}

const ProjectDetails = () => {
  const router = useRouter();
  const { slug } = router.query; // ✅ Get slug from URL

  const [project, setProject] = useState<Project | null>(null);
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${slug}`); // ✅ Calls API

        if (!response.ok) throw new Error("Failed to fetch project");

        const data = await response.json();
        setProject(data);

        // Fetch other projects (excluding current one)
        const projectsResponse = await fetch(`/api/projects`);
        const allProjects = await projectsResponse.json();
        setOtherProjects(allProjects.filter((item: Project) => item.slug !== slug));
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  // Function to create safe HTML from rich text content
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  if (loading) return <h1 className="text-center text-xl font-bold">Loading...</h1>;

  if (error || !project) return <h1 className="text-center text-red-500">Project not found</h1>;

  return (
    <div className="w-full px-4 pt-8 pb-16 flex flex-col gap-16">
      {/* Hero Section */}
      <div className="w-full flex min-h-[50vh] py-8 justify-start bg-[#E5EBF8] overflow-hidden items-center">
        <div className="flex justify-center w-full">
          <div className="grid md:grid-cols-2 w-[80%] gap-16 place-content-center">
            <div className="font-bold w-full rounded justify-between items-center capitalize text-primary text-lg">
              <div className="flex items-start py-4">
                <div className="w-[72px] md:mr-2 my-2 border-t-2 border-primary"></div>
                <div>
                  <h3 className="text-black font-semibold">OUR PROJECT</h3>
                  <h2 className="text-5xl leading-[3.5rem]">{project.title}</h2>
                </div>
              </div>
            </div>
            <div className="relative h-[60vh] w-full shadow-xl">
              <Image
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover rounded-md"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description - Now with dangerouslySetInnerHTML to render HTML content */}
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="w-[80%] prose max-w-none">
          <div 
            className="rich-text-content text-gray-700"
            dangerouslySetInnerHTML={createMarkup(project.description)}
          />
        </div>
      </div>

      <DonationSection2 />

      {/* More Projects Section */}
      <section className="bg-gray-100 flex justify-center py-12">
        <div className="w-[80%] px-6">
          <div className="w-3/4 mb-10">
            <h2 className="font-bold uppercase text-gray-600 tracking-wide">
              More Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => {
              // Create a plain text version of the description for the cards
              const plainTextDesc = project.description.replace(/<[^>]*>?/gm, '');
              const truncatedDesc = plainTextDesc.length > 200 
                ? plainTextDesc.slice(0, 200) + "..."
                : plainTextDesc;
                
              return (
                <div
                  key={index}
                  className="relative bg-black min-h-[40vh] text-white p-4 rounded-lg overflow-hidden shadow-lg"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${project.imageUrl})`,
                      filter: "brightness(50%)",
                    }}
                  ></div>

                  <div className="relative z-10 p-6 flex h-full flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold uppercase mb-4">
                        {project.title}
                      </h3>
                      <p className="text-sm mb-6">{truncatedDesc}</p>
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
              );
            })}
          </div>
        </div>
      </section>

      <GetInvolved />
    </div>
  );
};

export default ProjectDetails;