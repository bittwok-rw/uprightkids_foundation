import Image from "next/image";

const holisticApproachCards = [
	{
		title: "Education",
		description:
			"We ensure that children have everything they need for academic success, from school supplies to tuition assistance, along with mentorship to guide their learning journey.",
	},
	{
		title: "Socioeconomic Empowerment (Vocational Training)",
		description:
			"By offering practical skills such as sewing, we empower young girls to gain independence and build their own financial security.",
	},
	{
		title: "Health and Nutrition",
		description:
			"We prioritize access to healthcare and nourishing food, keeping children strong and healthy so they can thrive.",
	},
	{
		title: "Psychosocial Support",
		description:
			"Through trauma care and counseling, we help children heal from past hardships and build emotional resilience.",
	},
	{
		title: "Family Reintegration",
		description:
			"We assist in reconnecting children with their families, offering support and counseling to foster stronger relationships and create a stable, nurturing home environment.",
	},
];

export default function HolisticApproach() {
	return (
		<section className="bg-primary-50 py-16 mt-10 flex justify-center">
			<div className=" w-[80%]">
				<div className="bg-[#0E2D58] py-6 px-5 flex flex-col lg:flex-row gap-6">
					<div className="lg:w-[25%] flex flex-col items-center space-y-2 sm:space-y-4">
						<h2 className="text-white/90 text-2xl sm:text-3xl font-bold leading-tight mb-4">
							OUR <br className="hidden lg:block" />
							HOLISTIC <br className="hidden lg:block" />
							APPROACH
						</h2>
						<div className="w-full h-96 lg:h-full overflow-hidden">
							<Image
								src="/images/hollistic-approach.png"
								alt="Holistic Approach"
								layout="responsive"
								width={360}
								height={500}
								className="w-full h-full object-cover object-center"
							/>
						</div>
					</div>
					<div className="lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="text-white/80 text-xl">
							We believe in nurturing every aspect of a child’s growth, helping
							them reach their fullest potential. Our approach is designed to
							support children in multiple key areas of life:
						</div>
						{holisticApproachCards.map((card) => (
							<div
								key={card.title}
								className="bg-primary-900 shadow-md p-6 text-white"
							>
								<h3 className="text-lg uppercase font-bold mb-4">
									{card.title}
								</h3>
								<p className="text-sm">{card.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
