import Link from "next/link";
import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative mx-auto h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] flex justify-center items-center">
			<Image
				src="/images/hero-bg.svg"
				alt="Hero background"
				fill
				priority
				className="object-cover object-top"
			/>

			<div className="w-[80%] text-left text-white z-10 space-y-20 lg:space-y-28 flex flex-col justify-between">
				<h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl uppercase font-bold text-white">
				WE EMPOWER{" "}
					<span className="hidden lg:inline">
						<br />
					</span>
					CHILDREN OUT{" "}
					<span className="hidden lg:inline">
						<br />
					</span>
					OF POVERTY 
				</h1>

				<div>
					<Link
						href="/joinus"
						className="px-8 py-4 bg-primary text-lg text-white rounded-md hover:bg-yellow-500 font-semibold stroke-tertiary-900 transition-colors duration-300"
					>
						Be an advocate
					</Link>
				</div>
			</div>
		</section>
	);
}
