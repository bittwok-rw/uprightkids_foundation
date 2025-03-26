import Brand from "./Brand";
import Newsletter from "./Newsletter";
import FooterNavLinks from "./FooterNavLinks";
import SocialLinks from "./SocialLinks";
import Link from "next/link";

const Footer = () => {
  const whoWeAreLinks = [
    { text: "Mission & Vision", href: "/about#mission" },
    { text: "Team & Board", href: "/about#team" },
    { text: "Where we work", href: "/about#locations" },
    { text: "Contact", href: "/contact" },
  ];

  const whatWeDoLinks = [
    { text: "Why we do this", href: "/why-we-do-this" },
    { text: "Supporters & Partners", href: "/why-we-do-this#partners" },
  ];

  const joinUsLinks = [
    { text: "Donate", href: "/donation#donate" },
    { text: "Partner with us", href: "/joinus#partner" },
    { text: "Get involved", href: "/joinus" },
  ];

  return (
    <footer className="bg-tertiary-800 pt-12 pb-6">
      <div className="mx-auto  w-[80%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Brand />
            <Newsletter />
          </div>
          <FooterNavLinks title="Who we are" links={whoWeAreLinks} />
          <FooterNavLinks title="What we do" links={whatWeDoLinks} />
          <FooterNavLinks title="Join Us" links={joinUsLinks} />
          <div className="md:col-start-2 lg:col-auto">
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-tertiary-700 flex justify-center items-center gap-2 text-tertiary-500 text-sm">
          <p>© 2025 UKF | All rights reserved</p>
          <Link href="/privacy" className="hover:text-tertiary-300 underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
