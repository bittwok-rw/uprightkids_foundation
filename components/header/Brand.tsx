import Image from "next/image";
import Link from "next/link";

const NavbarBrand = () => {
  return (
    <div className="flex items-end min-w-max">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="Upright Kids Foundation"
          width={56}
          height={43}
        />
        <div className="font-semibold text-primary-900 leading-tight font-serif text-base">
          <span className="block">Upright</span>
          <span className="block">Kids Foundation</span>
        </div>
      </Link>
    </div>
  );
};

export default NavbarBrand;
