import StatCard from "@/components/cards/StatsCard";

export default function ImpactStats() {
	const stats = [
		{
			title: "2100 Children",
			description: "Received school materials",
			className: "bg-primary-900",
			titleClassName: "text-white",
			descriptionClassName: "text-white",
		},
		{
			title: "250 young people and 60 social workers",
			description:
				"Trained to resolve psychological trauma through our seminars",
			titleClassName: "text-tertiary-900",
			descriptionClassName: "text-tertiary-600",
		},
		{
			title: "20 Schools",
			description: "Joined our education literacy programs",
			titleClassName: "text-tertiary-900",
			descriptionClassName: "text-tertiary-600",
		},
		{
			title: "150 Young girls",
			description: "Trained in sewing skills",
			titleClassName: "text-tertiary-900",
			descriptionClassName: "text-tertiary-600",
		},
	];

	return (
		<section className="bg-primary-50 py-10">
			<div className="max-w-[70%] mx-auto bg-white shadow-md">
				<div className="grid grid-cols-1 sm:grid-cols-2">
					{stats.map((stat, index) => (
						<div
							key={stat.title}
							className={`relative shadow-xl h-[30vh] ${index < 2 ? "sm:border-b-2" : ""} ${
								index % 2 === 0 ? "sm:border-r-2" : ""
							} border-primary-600`}
						>
							<StatCard {...stat} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
