"use client";

import ContentSection from "@/components/content/ContentSection";

export default function AboutSection() {

	return (
		<ContentSection
			smallHeading={{
				text: "Know About Us",
				showLine: true,
				linePosition: "right",
			}}
			mainHeading={{
				content: `CHILDREN HAVE THE RIGHT TO A <span className="hidden lg:inline"><br /></span> SUSTAINABLE FUTURE`,
				isHtml: true,
			}}
			paragraphs={[
				{
					content: `Through education, support, and innovative programs, we provide
          the tools and resources needed to help children build a brighter
          future.<br /><br />Our mission is to create a world where all vulnerable children
          can fulfill their potential and that they grow up to become
          valuable members of their communities, contributing positively
          to society and leading lives full of opportunity and hope.`,
          isHtml: true
        }
      ]}
      button={{
        text: "Learn More",
        href: "/about"
      }}
      media={{
        type: "video",
        src: "/images/about/we-empower-children-out-of-poverty.png",
        showPlayIcon: true
      }}
    />
  );

}
