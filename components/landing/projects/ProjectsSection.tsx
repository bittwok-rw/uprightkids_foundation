"use client";

import { useState, useEffect } from "react";
import ContentSection from "@/components/content/ContentSection";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ✅ Define the correct Project type
export type Project = {
  id: string;
  title: string;
  description: string;
  slug: string;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <ContentSection
      smallHeading={{
        text: "Projects",
        showLine: true,
        linePosition: "left",
      }}
      mainHeading={{
        content: "OUR PROJECTS",
      }}
      paragraphs={[
        {
          content:
            "We run a variety of transformative projects designed to empower vulnerable children and families. Our programs provide education, vocational training, healthcare, and psychosocial support to ensure a holistic approach to overcoming poverty.",
        },
        {
          content: (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col space-y-8"></div>

              {loading ? (
                <p className="text-center text-gray-600">Loading projects...</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : (
                <Carousel className="relative w-full">
                  <CarouselPrevious className="absolute left-[-3rem] z-10 !bg-[#242e3b] !hover:bg-[#242e3b]/95 text-white hover:text-white flex items-center justify-center w-10 h-10 rounded-full" />

                  <CarouselContent>
                    {projects.map((project) => (
                      <CarouselItem key={project.slug} className="!basis-auto">
                        <Card className="group max-w-80 min-h-full flex flex-col gap-4 items-stretch justify-between bg-primary-50 hover:bg-primary-900 hover:!text-white transition-colors duration-300 p-4 shadow-lg">
                          <CardHeader className="p-0 space-y-4">
                            <CardTitle className="!text-3xl !font-semibold text-black group-hover:text-white transition-colors">
                              {project.title}
                            </CardTitle>
                            <CardDescription
                              className="!text-base !text-black group-hover:!text-white"
                              dangerouslySetInnerHTML={{
                                __html:
                                  project.description.length > 200
                                    ? project.description.slice(0, 200) + "..."
                                    : project.description,
                              }}
                            ></CardDescription>
                          </CardHeader>
                          <CardFooter className="p-0">
                            <Button
                              asChild
                              variant={"outline"}
                              className="!bg-white !text-black !border-2 !border-black group-hover:!border-transparent group-hover:!bg-secondary-900 group-hover:text-white transition-colors"
                            >
                              <Link href={`/projects/${project.slug}`}>
                                Read More <FaArrowRightLong className="ml-2" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselNext className="absolute right-[-3rem] z-10 !bg-[#242e3b] !hover:bg-[#242e3b]/95 text-white hover:text-white flex items-center justify-center w-10 h-10 rounded-full" />
                </Carousel>
              )}
            </div>
          ),
        },
      ]}
      media={{
        type: "image",
        src: "/images/projects/sewing.png",
        showPlayIcon: false,
      }}
    />
  );
}
