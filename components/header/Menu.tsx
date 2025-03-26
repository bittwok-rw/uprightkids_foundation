import Link from "next/link";
import NavbarActions from "./Actions";
import type { MenuProps } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Menu = ({ menuItems }: MenuProps) => {
  const pathname = usePathname();
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

  const isActive = (href?: string) => {
    if (!href || !pathname) return false;
    return pathname === href || pathname.startsWith(href);
  };

  const isSubMenuActive = (subMenu?: { href?: string }[]) => {
    if (!subMenu) return false;
    return subMenu.some((item) => isActive(item.href));
  };

  return (
    <div className="h-full w-full px-5 py-8 overflow-y-auto">
      <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-tertiary-900 lg:w-full lg:justify-center">
        {menuItems.map((item, index) =>
          item.subMenu ? (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredMenu(index)} // Show dropdown on hover
              onMouseLeave={() => setHoveredMenu(null)} // Hide dropdown on mouse leave
            >
              <div
                className={cn(
                  "flex items-center gap-1 cursor-pointer transition-colors hover:text-primary-900 text-base",
                  isSubMenuActive(item.subMenu) && "text-primary-900"
                )}
              >
                <span>{item.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {hoveredMenu === index && (
                <div className="absolute top-full left-0 bg-white shadow-lg p-2 z-10 rounded">
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href || "#"}
                      className="block px-4 py-2 text-base hover:bg-primary-900 hover:text-white rounded transition"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ) : (
            <li
              key={index}
              className="hover:text-primary-900 transition-colors text-base"
            >
              <Link href={item.link || "#"}>{item.label}</Link>
            </li>
          )
        )}
      </ul>
      <div className="lg:hidden">
        <NavbarActions />
      </div>
    </div>
  );
};

export default Menu;
