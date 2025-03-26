import { FC, useEffect, useState } from "react";
import { LightbulbIcon } from "lucide-react";
import BlogCard from "@/components/cards/BlogCard";

type MediaItem = {
  slug: string;
  title: string;
  date: string;
  description: string[];
  image: string[];
};

const BlogSection: FC = () => {
  const [mediaData, setMediaData] = useState<MediaItem[]>([]);
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

  return (
    <section className="w-[80%] mx-auto py-10 mt-10">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="font-bold">New stories</h2>
        <div className="bg-blue-600 rounded-full p-2">
          <LightbulbIcon className="w-6 h-6 text-white" />
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : mediaData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaData.slice(0, 4).map((story) => (
            <BlogCard
              key={story.slug}
              date={story.date}
              title={story.title}
              slug={story.slug}
              imageUrl={story.image?.[0] || "/images/blog/default.jpg"}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No stories available.</p>
      )}
    </section>
  );
};

export default BlogSection;
