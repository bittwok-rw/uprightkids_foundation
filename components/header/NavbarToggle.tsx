import { Menu, X } from "lucide-react";
import { NavbarToggleProps } from "@/types";

const MenuToggle = ({ toggleNavbar, openNavbar }: NavbarToggleProps) => {
  return (
    <div className="flex items-center lg:hidden gap-x-4">
      <button
        onClick={toggleNavbar}
        aria-label="Toggle navbar"
        className="outline-none"
      >
        {openNavbar ? (
          <X className="w-6 h-6 text-gray-800" />
        ) : (
          <Menu className="w-6 h-6 text-gray-800" />
        )}
      </button>
    </div>
  );
};

export default MenuToggle;
