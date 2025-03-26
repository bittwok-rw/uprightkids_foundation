import GetInvolved from "@/components/GetInvolved";
import BlogSection from "@/components/landing/BlogSection";
import MeetTeamCard from "@/components/MeetTeamCard";
import WelcomeCard from "@/components/ui/welcomecard";
import VisionMisionCard from "@/components/VisionMisionCard";

const AboutUs = () => {
	return (
		<div className="">
			<WelcomeCard backgroundImage="https://res.cloudinary.com/ds04ivdrj/image/upload/v1738964623/homepagepiccompressed_frdlpt.png">
				<div className=" md:w-1/2 md:h-1/2  p-4 font-bold  rounded justify-between items-center capitalize text-primary text-lg">
					<div className="flex items-center py-4">
						<div className="w-[72px] mr-2 border-t-2 border-white">{""}</div>
						<div>
							<h3 className="text-white text-[20px] font-semibold">
								KNOW ABOUT US
							</h3>
						</div>
					</div>
					<div className="my-4">
						<p className=" text-white text-3xl  md:text-5xl md:leading-[3.5rem]">
							Upright Kids Foundation is a nonprofit organization based in
							Bukavu, Democratic Republic of Congo.
						</p>
					</div>
				</div>
			</WelcomeCard>
			<VisionMisionCard />
			<MeetTeamCard />
			<GetInvolved />
			<BlogSection />
		</div>
	);
};
export default AboutUs;
