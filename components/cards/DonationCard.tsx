interface DonationCardProps {
	amount: string;
	description: string;
	className?: string;
}

export default function DonationCard({
	amount,
	description,
	className = "",
}: DonationCardProps) {
	return (
		<div className={`p-10 px-8 rounded-lg ${className}`}>
			<h3 className="text-2xl font-bold text-white mb-2">{amount}</h3>
			<p className="text-base text-white">{description}</p>
		</div>
	);
}
