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
		<div className={`p-2 px-5 rounded-lg ${className}`}>
			<h3 className="text-xl font-bold text-white mb-1">{amount}</h3>
			<p className="text-sm text-white">{description}</p>
		</div>
	);
}
