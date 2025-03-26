import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/utils";
import { ChevronDown, Globe, MoveRight } from "lucide-react";
import { useState } from "react";
import type { Language } from "@/types";
import Link from "next/link";

const NavbarActions = () => {
	const languages: Language[] = [
		{ code: "en", label: "English" },
	];
	const [selectedLanguage, setSelectedLanguage] = useState<Language>(
		languages[0],
	);

	return (
		<div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-8 lg:min-w-max mt-10 lg:mt-0 overflow-x-hidden">
			<Link
				href="/donation"
				className="group px-5 py-2.5 rounded-md bg-primary-900 text-white flex justify-center items-center duration-300 ease-linear hover:bg-primary-700"
			>
				Donate
				<MoveRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
			</Link>
			<DropdownMenu>
				<DropdownMenuTrigger className="flex items-center gap-2  text-tertiary-900 hover:text-primary-900 cursor-pointer">
					<Globe className="h-5 w-5" />
					<span>{selectedLanguage.label}</span>
					<ChevronDown className="h-4 w-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className={cn("bg-white text-base")}>
					{languages.map((lang) => (
						<DropdownMenuItem
							key={lang.code}
							onClick={() => setSelectedLanguage(lang)}
							className="cursor-pointer data-[highlighted]:bg-primary-900 data-[highlighted]:text-white"
						>
							{lang.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default NavbarActions;
