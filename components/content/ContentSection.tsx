"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import PlayIcon from "@/components/icons/play-icon";
import parse from "html-react-parser";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

export interface ContentSectionProps {
	smallHeading?: { 
		text: string;
		showLine?: boolean;
		linePosition?: "left" | "right";
		className?: string;
	};
	mainHeading: {
		content: string;
		isHtml?: boolean;
		className?: string;
	};
	paragraphs: Array<{
		content: string | React.ReactNode;
		isHtml?: boolean;
		className?: string;
	}>;
	button?: {
		text: string;
		href: string;
		className?: string;
	};
	media?: {
		type: "video" | "image";
		src: string;
		showPlayIcon?: boolean;
		className?: string;
	};
}

interface HeadingWithLineProps {
	text: string;
	linePosition?: "left" | "right";
	className?: string;
}

interface VideoOrImageProps {
	media: {
		type: "video" | "image";
		src: string;
		showPlayIcon?: boolean;
		className?: string;
	};
	onVideoClick: () => void;
}

const HeadingWithLine = ({ text, className }: HeadingWithLineProps) => (
	<div
		className={`w-fit flex flex-row-reverse lg:flex-row items-center gap-5 ${
			className || ""
		}`}
	>
		<div className="w-16 h-[2px] bg-onyx" />
		<h3 className="text-lg font-semibold uppercase text-black">{text}</h3>
	</div>
);

const VideoOrImage = ({ media, onVideoClick }: VideoOrImageProps) => (
	<div
		className={`lg:w-1/3 aspect-video lg:aspect-auto relative group cursor-pointer ${
			media.className || ""
		}`}
		onClick={media.type === "video" ? onVideoClick : undefined}
	>
		<div
			className="w-full h-full bg-cover bg-top rounded-lg"
			style={{ backgroundImage: `url('${media.src}')` }}
		/>
		{media.showPlayIcon && (
			<div className="absolute inset-0 flex items-center justify-center">
				<PlayIcon
					width={64}
					height={64}
					className="transition-transform group-hover:scale-110"
				/>
			</div>
		)}
	</div>
);

export default function ContentSection({
	smallHeading,
	mainHeading,
	paragraphs,
	button,
	media,
}: ContentSectionProps) {
	const [showVideo, setShowVideo] = useState(false);

	

	const renderParagraphContent = (
		paragraph: {
			content: string | React.ReactNode;
			isHtml?: boolean;
			className?: string;
		},
		index: number,
	) => {
		if (typeof paragraph.content === "string" && paragraph.isHtml) {
			const sanitized = sanitizeHtml(paragraph.content);
			return (
				<p
					key={index}
					className={`text-lg text-tertiary-700 leading-relaxed ${paragraph.className || ""}`}
				>
					{parse(sanitized)}
				</p>
			);
		}

		return (
			<div
				key={index}
				className={`text-lg text-tertiary-700 leading-relaxed ${paragraph.className || ""}`}
			>
				{paragraph.content}
			</div>
		);
	};

	return (
		<section className="overflow-x-hidden w-[80%] mx-auto">
			<Container>
				<div
					className={`flex flex-col ${media ? "lg:flex-row gap-12" : "gap-8"}`}
				>
					<div className={`space-y-6 ${media ? "lg:w-2/3" : "w-full mx-auto"}`}>
						{smallHeading && (
							<HeadingWithLine
								text={smallHeading.text}
								linePosition={smallHeading.linePosition}
								className={smallHeading.className}
							/>
						)}

						<h1
							className={`text-2xl lg:text-4xl font-bold pl-0 lg:pl-20 ${mainHeading.className || ""}`}
						>
							{mainHeading.isHtml
								? parse(sanitizeHtml(mainHeading.content))
								: mainHeading.content}
						</h1>

						<div className="pl-0 lg:pl-20 space-y-8">
							{paragraphs.map((paragraph, i) =>
								renderParagraphContent(paragraph, i),
							)}

							{button && (
								<Link
									href={button.href}
									className={`inline-block px-8 py-3 bg-primary text-white text-lg rounded-md hover:bg-yellow-500 transition-colors duration-300 font-semibold ${
										button.className || ""
									}`}
								>
									{button.text}
								</Link>
							)}
						</div>
					</div>

					{media && (
						<VideoOrImage
							media={{ ...media, className: media.className }}
							onVideoClick={() => setShowVideo(true)}
						/>
					)}
				</div>
			</Container>

			{showVideo && media?.type === "video" && (
				<div
					className="fixed inset-0 bg-tertiary-900/70 z-50 flex items-center justify-center p-4"
					onClick={() => setShowVideo(false)}
				>
					<div className="relative w-full max-w-4xl aspect-video">
						<video className="w-full h-full rounded-lg" controls autoPlay>
							<source src={media.src} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			)}
		</section>
	);
}
