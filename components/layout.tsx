import Navbar from "@/components/header/Navbar";
import Footer from "./footer/Footer";
import BackToTop from "./BackToTop";

export default function WebLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="relative">
			
			<Navbar />
			<div className="min- bg-[#FEFDFC]">{children}</div>
			<BackToTop />
			<Footer/>
		</main>
	);
}
