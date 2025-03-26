import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface LoaderProps {
	message?: string;
}

export function Loader({ message = "Loading..." }: LoaderProps) {
	return (
		<div className="flex justify-center items-center space-x-2">
			<ArrowPathIcon className="text-primary w-8 animate-spin" />
			<span>{message}</span>
		</div>
	);
}
