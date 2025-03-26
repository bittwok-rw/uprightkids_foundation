import type { ReactNode } from "react";

export interface ContentSectionProps {
	smallHeading?: {
		text: string;
		showLine?: boolean;
		linePosition?: "left" | "right";
		className?: string;
	};
	mainHeading: {
		content: string;
		isHtml?: boolean;
		className?: string;
	};
	paragraphs: Array<{
		content: string | ReactNode;
		isHtml?: boolean;
		className?: string;
	}>;
}

export interface ImpactListItem {
	id: string;
	text: string;
	icon: "education" | "health" | "necessities";
}

export interface ImpactStats {
	id: string;
	title: string;
	description: string;
	className?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	slug: string;
	buttonText: string;
	href: string;
}

export interface Story {
	id: number;
	date: string;
	title: string;
	imageUrl: string;
	variant: "primary" | "secondary";
}

// Header
export interface SubMenuItem {
	label: string;
	href: string;
}

export interface MenuItem {
	label: string;
	link?: string;
	subMenu?: SubMenuItem[];
}

export interface MenuProps {
	openNavbar: boolean;
	menuItems: MenuItem[];
}

export interface NavbarProps {
	menuItems: MenuItem[];
	openNavbar: boolean;
	toggleNavbar: () => void;
}

export interface NavbarBrandProps {
	logoSrc: string;
	logoAlt: string;
	brandName: string;
}

export interface NavbarToggleProps {
	toggleNavbar: () => void;
	openNavbar: boolean;
}

export interface NavbarContentProps {
	openNavbar: boolean;
	menuItems: MenuItem[];
}

export interface NavbarMenuProps {
	item: MenuItem;
}

export interface NavbarActionsProps {
	onDonateClick: () => void;
}

export interface Language {
	code: string;
	label: string;
}
