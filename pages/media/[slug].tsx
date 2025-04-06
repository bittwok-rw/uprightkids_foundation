import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Calendar, LightbulbIcon } from "lucide-react";
import BlogCard from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/button";
import GetInvolved from "@/components/GetInvolved";

// Define the expected shape of media data
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
        const res = await fetch(`http://localhost:5000/api/media/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch media item");

        const data: MediaItem = await res.json();
        setMediaItem(data);

        // Fetch all media to get related stories
        const allMediaRes = await fetch("http://localhost:5000/api/media");
        if (!allMediaRes.ok) throw new Error("Failed to fetch other media");

        const allMediaData: MediaItem[] = await allMediaRes.json();
        setOtherMedia(allMediaData.filter((item) => item.slug !== slug));
      } catch (err) {
        setError("Failed to load media content");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!mediaItem) return <p>Media item not found</p>;

  const displayedMedia = showAll ? otherMedia : otherMedia.slice(0, 4);

  return (
    <div className="flex flex-col items-center gap-16 pb-16">
      {/* Main Media Section */}
      <div
        className="w-full flex min-h-[50vh] justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('${mediaItem.image[0]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-[80%]">
          <div className="w-3/4 p-4 font-bold capitalize">
            <div className="flex items-center gap-4 py-4">
              <Calendar className="text-white" />
              <div>
                <h3 className="text-accent text-[25px] font-semibold">
                  {mediaItem.date || "No Date"}
                </h3>
              </div>
            </div>
            <div className="my-4">
              <h1 className="text-white">{mediaItem.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="text-left w-[80%] space-y-8">
        {mediaItem.description.map((paragraph, index) => (
          <p key={index} className="text-lg text-black" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>

      {/* Other Media Section */}
      <section className="w-[80%] mx-auto py-10 mt-10">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-bold">Other stories</h2>
          <div className="bg-blue-600 rounded-full p-2">
            <LightbulbIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedMedia.map((story) => (
           <BlogCard
             key={story.slug}
             date={story.date || "No Date"}  // ✅ Ensure date is always a string
             title={story.title}
             slug={story.slug}
             imageUrl={story.image[0]}
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
  );
};

export default MediaPage;
