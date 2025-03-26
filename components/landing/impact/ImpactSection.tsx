"use client";

import ContentSection from "@/components/content/ContentSection";
import { FaPenFancy, FaHeart } from "react-icons/fa6";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import ImpactStats from "./ImpactStats";

export default function ImpactSection() {
	return (
		<>
			<ContentSection
				smallHeading={{
					text: "Our Impact",
					showLine: true,
					linePosition: "left",
				}}
				mainHeading={{
					content: "Since 2017, we’ve supported over 800 children with education, trained 150 girls in sewing, and provided psychosocial care to hundreds of children and families.",
					className: "lg:w-full",
				}}
				paragraphs={[
					{
						content:
							"The Upright Kids Foundation is dedicated to reducing the marginalization of children, especially those in underserved and conflict-affected regions, while promoting community outreach that fosters a more equitable and dignified future for all. We are committed to ensuring that vulnerable children are given the opportunity to thrive in a supportive and nurturing environment. By addressing the root causes of marginalization—such as:",
					},
					{
						content: (
							<ul className="space-y-4 pl-5 lg:pl-20 my-6 text-lg">
								<li className="flex items-start gap-4">
									<FaPenFancy className="w-5 h-5 mt-1 text-primary" />
									<span className="text-tertiary-700">
										lack of access to education.
									</span>
								</li>
								<li className="flex items-start gap-4">
									<FaHeart className="w-5 h-5 mt-1 text-primary" />
									<span className="text-tertiary-700">healthcare, and</span>
								</li>
								<li className="flex items-start gap-4">
									<HiMiniSquare3Stack3D className="w-5 h-5 mt-1 text-primary" />
									<span className="text-tertiary-700">basic necessities.</span>
								</li>
							</ul>
						),
						isHtml: false,
					},
					{
						content:
							"we empower both children and their communities to overcome challenges and create lasting change. Our work ensures that every child is treated with dignity, respect, and care, and that all individuals are provided with the tools and opportunities to build a better, more inclusive future.",
					},
				]}
			/>
			<ImpactStats />
		</>
	);
}
