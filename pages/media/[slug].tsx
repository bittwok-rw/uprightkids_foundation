import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Calendar, LightbulbIcon } from "lucide-react";
import BlogCard from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/button";
import GetInvolved from "@/components/GetInvolved";

interface MediaItem {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  image: string[];
  description: string[];
}

const MediaPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [mediaItem, setMediaItem] = useState<MediaItem | null>(null);
  const [otherMedia, setOtherMedia] = useState<MediaItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug || typeof slug !== "string") return;

    const fetchMedia = async () => {
      try {
        const res = await fetch(`https://backenduprightkid.vercel.app/api/media/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch media item");
    
        const data: MediaItem = await res.json();
        setMediaItem(data);
    
        const allMediaRes = await fetch("https://backenduprightkid.vercel.app/api/media");
        if (!allMediaRes.ok) throw new Error("Failed to fetch other media");
    
        const allMediaData: MediaItem[] = await allMediaRes.json();
        setOtherMedia(allMediaData.filter((item) => item.slug !== slug));
      } catch {
        setError("Failed to load media content");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  if (!mediaItem) return <div className="min-h-screen flex items-center justify-center">Media item not found</div>;

  const displayedMedia = showAll ? otherMedia : otherMedia.slice(0, 4);

  return (
    <div className="flex flex-col items-center gap-8 md:gap-16 pb-8 md:pb-16">
      {/* Main Media Section */}
      <div
        className="w-full flex min-h-[40vh] md:min-h-[50vh] justify-center items-center px-4"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('${mediaItem.image[0]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full md:w-[80%]">
          <div className="w-full md:w-3/4 p-4 font-bold capitalize">
            <div className="flex items-center gap-2 md:gap-4 py-2 md:py-4">
              <Calendar className="text-white w-4 h-4 md:w-6 md:h-6" />
              <div>
                <h3 className="text-accent text-sm md:text-[25px] font-semibold">
                  {mediaItem.date || "No Date"}
                </h3>
              </div>
            </div>
            <div className="my-2 md:my-4">
              <h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl">{mediaItem.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="w-[90%] md:w-[80%] mx-auto space-y-4 md:space-y-6">
  {mediaItem.description.map((paragraph, index) => (
    <div 
      key={index}
      className="text-base md:text-lg text-black max-w-full prose prose-sm md:prose-base lg:prose-lg xl:prose-xl"
      dangerouslySetInnerHTML={{ 
        __html: paragraph
          .replace(/<img([^>]*)>/g, '<div class="flex justify-center my-2 md:my-4"><img$1 class="w-full h-auto rounded-lg shadow-md block" style="max-width: 100%; max-height: 60vh; object-fit: contain;"></div>')
          .replace(/<p([^>]*)>/g, '<p$1 class="text-left m-0 p-0 w-full break-words">')
          .replace(/<h1([^>]*)>/g, '<h1$1 class="text-2xl md:text-3xl lg:text-4xl font-bold my-2 md:my-3 break-words">')
          .replace(/<h2([^>]*)>/g, '<h2$1 class="text-xl md:text-2xl lg:text-3xl font-bold my-2 md:my-3 break-words">')
          .replace(/<h3([^>]*)>/g, '<h3$1 class="text-lg md:text-xl lg:text-2xl font-bold my-2 md:my-3 break-words">')
          .replace(/<ul([^>]*)>/g, '<ul$1 class="list-disc pl-5 my-2 md:my-3 break-words">')
          .replace(/<ol([^>]*)>/g, '<ol$1 class="list-decimal pl-5 my-2 md:my-3 break-words">')
          .replace(/<li([^>]*)>/g, '<li$1 class="my-1 md:my-2 break-words">')
      }}
    />
  ))}
</div>

      {/* Other Media Section */}
      <section className="w-[90%] md:w-[80%] mx-auto py-6 md:py-10 mt-6 md:mt-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl">Other stories</h2>
          <div className="bg-blue-600 rounded-full p-1 md:p-2">
            <LightbulbIcon className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {displayedMedia.map((story) => (
            <BlogCard
              key={story.slug}
              date={story.date || "No Date"}
              title={story.title}
              slug={story.slug}
              imageUrl={story.image[0]}
            />
          ))}
        </div>
        {otherMedia.length > 4 && (
          <div className="flex justify-center my-6 md:my-8">
            <Button onClick={() => setShowAll(!showAll)} size="sm" className="md:size-default">
              {showAll ? "Show Less" : "Read All Stories"}
            </Button>
          </div>
        )}
      </section>

      <div className="w-full px-4 md:px-0">
        <GetInvolved />
      </div>
    </div>
  );
};

export default MediaPage;