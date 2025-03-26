import Image from "next/image";
import type { FC } from "react";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
	date: string;
	title: string;
	slug: string;
	imageUrl: string;
}

const BlogCard: FC<BlogCardProps> = ({ date, title, imageUrl,slug }) => {
	return (
		<div className="bg-gray-100 rounded-lg overflow-hidden group hover:scale-105 shadow-sm">
			<div className="relative w-full h-64">
				<Image
					src={imageUrl || "/api/placeholder/400/300"}
					alt={title}
					fill
					className="object-cover"
				/>
			</div>
			<div className="p-4">
				<div className="text-sm text-gray-700 mb-2">{date}</div>
				<h3
					className={`text-lg mb-4 group-hover:text-blue-600 text-gray-900`}
				>
					{title}
				</h3>
				<Button onClick={() => {
                    window.location.href = `/media/${slug}`;
                  }}
					className={`w-full py-2 px-4 rounded font-semibold  group-hover:bg-gray-200
							bg-white border border-gray-700 !text-black  transition-colors`}
				>
					Read More
				</Button>
			</div>
		</div>
	);
};

export default BlogCard;
