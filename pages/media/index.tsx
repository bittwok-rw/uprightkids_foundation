import { useEffect, useState } from "react";
import BlogCard from "@/components/cards/BlogCard";
import GetInvolved from "@/components/GetInvolved";
import MediaCarousel from "@/components/MediaCarousel";
import { Button } from "@/components/ui/button";
import WelcomeCard from "@/components/ui/welcomecard";
import { ArrowRightCircle, LightbulbIcon } from "lucide-react";
import Image from "next/image";

type MediaItem = {
  slug: string;
  title: string;
  date: string;
  description: string[];
  image: string[];
};

const Media = () => {
  const [mediaData, setMediaData] = useState<MediaItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/media"); // Ensure this is the correct API route
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (Array.isArray(data)) {
          setMediaData(data);
        } else {
          console.error("Invalid API response format:", data);
          setMediaData([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching media data:", error);
        setError("Failed to load media content. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const displayedMedia = showAll ? mediaData : mediaData.slice(0, 4);

  return (
    <>
      <WelcomeCard backgroundImage="/images/media/BG.png">
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-16 place-content-center">
            <div className="font-bold rounded justify-between items-center capitalize text-primary text-lg">
              <div className="flex items-start py-4">
                <div className="w-[72px] mr-2 my-4 border-t-2 border-white"></div>
                <div>
                  <h3 className="text-white text-[20px] font-semibold">TOP NEWS</h3>

                  {loading ? (
                    <p className="text-white">Loading...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : mediaData.length > 0 ? (
                    <div className="my-4 text-white flex flex-col gap-8">
                      <p className="text-white text-5xl leading-[3.5rem]">{mediaData[0]?.title}</p>
                      <p className="text-white normal-case">{mediaData[0]?.description?.[0]}</p>
                      <div>
                        <Button
                          onClick={() => window.location.href = `/media/${mediaData[0]?.slug}`}
                          className="bg-primary hover:text-white text-white"
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white">No news available.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#FEFDFC] text-black p-4 flex flex-col gap-4">
              {mediaData.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  onClick={() => window.location.href = `/media/${item.slug}`}
                  className="grid cursor-pointer md:grid-cols-3 hover:scale-105 gap-4 items-center w-full"
                >
                  <div className="relative h-[20vh]">
                    <Image
                      src={item.image?.[0] || "/images/blog/happy-people.png"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-md"
                      fill
                    />
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-xl">{item.title}</h4>
                    <p className="text-lg font-bold text-black/50">{item.date}</p>
                    <p className="text-sm">
                      {item.description?.[0]?.length > 150
                        ? item.description[0].slice(0, 150) + "..."
                        : item.description?.[0] || ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WelcomeCard>

      <div className="flex flex-col gap-16 items-center py-16" id="news">
        <h1 className="text-center">Events and News</h1>

        <MediaCarousel />

        {mediaData.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 border border-black/30 w-[80%]">
            <div className="w-full relative h-[50vh]">
              <Image
                src={mediaData[0]?.image?.[0] || "/images/blog/happy-people.png"}
                alt={mediaData[0]?.title || "Default Image"}
                className="w-full h-full object-cover rounded-md"
                fill
              />
            </div>
            <div className="p-4 relative text-black">
              <h3>{mediaData[0]?.title}</h3>
              <p>
                {mediaData[0]?.description?.[0]?.length > 1000
                  ? mediaData[0].description[0].slice(0, 1000) + "..."
                  : mediaData[0]?.description?.[0] || ""}
              </p>
              <div
                onClick={() => window.location.href = `/media/${mediaData[0]?.slug}`}
                className="bg-primary absolute bottom-4 right-4 p-4 hover:scale-110 cursor-pointer rounded-md"
              >
                <ArrowRightCircle className="text-white" />
              </div>
            </div>
          </div>
        )}

        <section className="w-[80%] mx-auto py-10 mt-10">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-bold">All stories</h2>
            <div className="bg-blue-600 rounded-full p-2">
              <LightbulbIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedMedia.map((story) => (
              <BlogCard
                key={story.slug}
                date={story.date}
                title={story.title}
                slug={story.slug}
                imageUrl={story.image?.[0] || "/images/blog/happy-people.png"}
              />
            ))}
          </div>

          <div className="flex justify-center my-8">
            <Button onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Read All Stories"}
            </Button>
          </div>
        </section>

        <GetInvolved />
      </div>
    </>
  );
};

export default Media;
