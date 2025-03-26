import Image from "next/image";

const Brand = () => {
  return (
    <div className="flex items-end gap-3">
      <Image
        src="/logo-white.svg"
        alt="UKF Logo"
        width={118}
        height={86}
        className="object-contain"
      />
      <h2 className="font-serif text-white text-xl font-bold">
        Upright
        <br />
        Kids Foundation
      </h2>
    </div>
  );
};

export default Brand;
