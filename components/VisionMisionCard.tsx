const VisionMisionCard = () => {
  return (
    <div className="flex flex-col font-light bg-[#E5EBF880] justify-center items-center mx-auto gap-4 py-12">
      <div className="flex justify-center items-center w-[80%]">
        <p className="text-2xl leading-[2.5rem] text-black">
        Upright Kids Foundation is a nonprofit organization based in Bukavu, Democratic Republic of Congo. We are dedicated to reducing poverty and improving the lives of underprivileged, vulnerable children by providing them with access to free vocational skills, medical care, and nutritious food. Our goal is to equip these children with the tools and support they need to build a better future for themselves and their communities.
        </p>
      </div>{" "}
      <div className="grid md:grid-cols-2 mt-14 gap-8  w-[80%] scroll-mt-[200px]" id="mission">
        <div className="flex">
          <div>
            <h2 className="font-bold text-[#1D2130] py-6">
              OUR VISION
            </h2>
            <p className="text-2xl leading-[2rem] text-black">
            Our vision is to build a peaceful community where vulnerabilities and discrimination no longer exist, and where the well-being of children is guaranteed. 
            </p>
          </div>
        </div>
        <div className="md:flex grid">
          <div>
            <h2 className="font-bold text-[#1D2130] py-6">
              OUR MISSION
            </h2>
            <p className="text-2xl leading-[2rem] text-black">
            Our mission is to create a world where all vulnerable children can fulfill their potential and that they grow up to become valuable members of their communities, contributing positively to society and leading lives full of opportunity and hope.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMisionCard;
