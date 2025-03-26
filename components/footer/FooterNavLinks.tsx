import Link from "next/link";

interface FooterNavLinksProps {
  title: string;
  links: Array<{ text: string; href: string }>;
}

const FooterNavLinks = ({ title, links }: FooterNavLinksProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.text}>
            <Link href={link.href} className="text-gray-300 hover:text-white">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavLinks;
