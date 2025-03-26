interface StatsCardProps {
	title: string;
	description: string;
	className?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}

export default function StatsCard({
	title,
	description,
	className = "",
	titleClassName = "",
	descriptionClassName = "",
}: StatsCardProps) {
	return (
		<div
			className={`w-full h-full p-8 flex flex-col items-center justify-start text-center gap-4 ${className}`}
		>
			<h3 className={`xl:text-3xl text-xl font-bold leading-tight ${titleClassName}`}>
				{title}
			</h3>
			<p className={`text-lg leading-tight ${descriptionClassName}`}>
				{description}
			</p>
		</div>
	);
}
