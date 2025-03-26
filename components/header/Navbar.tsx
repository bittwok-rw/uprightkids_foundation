import { useState } from "react";
import NavbarBrand from "./Brand";
import NavbarMobileToggle from "./NavbarToggle";
import NavbarActions from "./Actions";
import type { MenuItem } from "@/types";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleNavbar = () => setOpenNavbar((prev) => !prev);
  const closeNavbar = () => {
    setOpenNavbar(false);
    setOpenSubmenu(null); // Close any open submenu
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  const menuItems: MenuItem[] = [
    {
      label: "Who We Are",
      link: "/about",
      subMenu: [
        { label: "Mission & Vision", href: "/about#mission" },
        { label: "Team & Board", href: "/about#team" },
        { label: "Where we work", href: "/about#locations" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      label: "What We Do",
      link: "/why-we-do-this",
      subMenu: [
        { label: "Why we do this", href: "/why-we-do-this" },
        { label: "Conflicts", href: "/why-we-do-this#conflict" },
        { label: "Supporters & Partners", href: "/why-we-do-this#partners" },
        { label: "Blog", href: "/media" },
      ],
    },
    {
      label: "Join Us",
      link: "/joinus",
      subMenu: [
        { label: "Donate", href: "/donation#donate" },
        { label: "Fundraise With us", href: "/joinus#join" },
        { label: "Partner with us", href: "/joinus#partner" },
        { label: "Get involved", href: "/joinus" },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile menu */}
      <div
        onClick={closeNavbar}
        onKeyDown={(e) => e.key === "Escape" && closeNavbar()}
        role="button"
        tabIndex={0}
        className={`fixed inset-0 bg-black bg-opacity-50 transition ${
          openNavbar ? "block" : "hidden"
        } lg:hidden`}
      />

      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-300">
        <nav className="relative flex items-center justify-between w-[90%] max-w-7xl mx-auto py-4 lg:py-6">
          <NavbarBrand />
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item, index) =>
              item.subMenu ? (
                <div key={index} className="relative group">
                  <Link
                    href={item.link || "#"}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-primary rounded focus:outline-none"
                  >
                    {item.label}
                    <ChevronDown className="ml-2 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-0 hidden w-48 bg-white shadow-lg rounded group-hover:block">
                    {item.subMenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href || "#"}
                        className="block px-4 py-2 text-black hover:bg-primary hover:text-white rounded transition"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.link || "#"}
                  className="px-4 py-2 text-gray-700 hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <div className="hidden lg:block">
            <NavbarActions />
          </div>
          {/* Mobile Menu Toggle */}
          <NavbarMobileToggle
            toggleNavbar={toggleNavbar}
            openNavbar={openNavbar}
          />
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed top-16 left-0 w-[80%] max-w-sm bg-white shadow-md rounded-md transform ${
            openNavbar ? "translate-x-0" : "-translate-x-full"
          } transition-transform lg:hidden`}
        >
          <div className="flex flex-col w-full p-4 space-y-4">
            {menuItems.map((item, index) =>
              item.subMenu ? (
                <div key={index}>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 rounded hover:text-primary focus:outline-none"
                  >
                    {item.label}
                    <ChevronDown
                      className={`ml-2 transform transition-transform ${
                        openSubmenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSubmenu === item.label && (
                    <div className="pl-6 mt-2 space-y-2">
                      {item.subMenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href || "#"}
                          className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white rounded transition"
                          onClick={closeNavbar}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.link || "#"}
                  className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white rounded transition"
                  onClick={closeNavbar}
                >
                  {item.label}
                </Link>
              )
            )}
            <NavbarActions />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
