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
        const response = await fetch("/api/media");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (Array.isArray(data)) {
          setMediaData(data);
        } else {
          console.error("Invalid API response format:", data);
          setMediaData([]);
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
        <div className="flex justify-center w-full px-4 sm:px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 place-content-center w-full">
            <div className="font-bold rounded justify-between items-center capitalize text-primary text-base sm:text-lg">
              <div className="flex items-start py-2 sm:py-4">
                <div className="w-10 sm:w-[72px] mr-2 my-2 sm:my-4 border-t-2 border-white"></div>
                <div className="flex-1">
                  <h3 className="text-blue text-lg sm:text-[20px] font-semibold">TOP NEWS</h3>

                  <div className="my-2 sm:my-4 text-white flex flex-col gap-4 sm:gap-8">
                  <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight sm:leading-[3.5rem]">
                   Our goal is to provide inclusive care for children with special needs
                    </p>
                    <p className="text-white normal-case text-sm sm:text-base">
                       We address every aspect of a child&apos;s well-being to help them grow, thrive, and reach their full potential
                     </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FEFDFC] text-black p-3 sm:p-4 flex flex-col gap-2 sm:gap-4">
              {loading ? (
                <p>Loading recent news...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : mediaData.length > 0 ? (
                mediaData.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => window.location.href = `/media/${item.slug}`}
                    className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 md:grid-cols-3 hover:scale-105 transition-transform gap-2 sm:gap-4 items-center w-full"
                  >
                    <div className="relative h-32 sm:h-40 md:h-[20vh]">
                      <Image
                        src={item.image?.[0] || "/images/blog/happy-people.png"}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-md"
                        fill
                      />
                    </div>
                    <div className="sm:col-span-1 md:col-span-2">
                      <h4 className="text-base sm:text-lg md:text-xl line-clamp-2">{item.title}</h4>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-black/50">{item.date}</p>
                      <p className="text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                      {item.description?.[0]
                        ? item.description[0]
                            .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '$1 ')
                            .replace(/<[^>]+>/g, ' ')
                            .toLowerCase()
                            .trim()
                            .replace(/^([a-z])/, (match) => match.toUpperCase())
                            : ""}
                          </p>

                    </div>
                  </div>
                ))
              ) : (
                <p>No recent news available.</p>
              )}
            </div>
          </div>
        </div>
      </WelcomeCard>

      <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6" id="news">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl">Events and News</h1>

        <MediaCarousel />

        {mediaData.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 border border-black/30 w-full sm:w-[90%] md:w-[85%] lg:w-[80%]">
            <div className="w-full relative h-64 sm:h-72 md:h-80 lg:h-[50vh]">
              <Image
                src={mediaData[0]?.image?.[0] || "/images/blog/happy-people.png"}
                alt={mediaData[0]?.title || "Default Image"}
                className="w-full h-full object-cover rounded-md"
                fill
              />
            </div>
            <div className="p-3 sm:p-4 relative text-black">
              <h3 className="text-lg sm:text-xl md:text-2xl mb-2">{mediaData[0]?.title}</h3>
              <p className="line-clamp-3 sm:line-clamp-4 md:line-clamp-6 text-sm sm:text-base">
              {mediaData[0]?.description?.[0] ? 
               <span dangerouslySetInnerHTML={{ 
                 __html: (() => {
                 const raw = mediaData[0].description[0]
                 .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '$1 ')
                  .replace(/<([^>]+)>/g, '<$1>') // Keep other tags
                  .toLowerCase()
                  .trim();

                    // Capitalize first visible character
                    const capitalized = raw.replace(/(^|>)([^<])/,
                      (_, before, char) => `${before}${char.toUpperCase()}`
                    );

                    return capitalized;
                      })()
                   }}></span> : ""
                      }
                   </p>

              <div
                onClick={() => window.location.href = `/media/${mediaData[0]?.slug}`}
                className="bg-primary absolute bottom-2 sm:bottom-4 right-2 sm:right-4 p-2 sm:p-4 hover:scale-110 transition-transform cursor-pointer rounded-md"
              >
                <ArrowRightCircle className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        )}

        <section className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-6 sm:py-8 md:py-10 mt-4 sm:mt-8 md:mt-10 px-4 sm:px-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl">All stories</h2>
            <div className="bg-blue-600 rounded-full p-1 sm:p-2">
              <LightbulbIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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

          <div className="flex justify-center my-6 sm:my-8">
            <Button 
              onClick={() => setShowAll(!showAll)}
              className="text-sm sm:text-base"
            >
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