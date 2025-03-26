import { mediaData } from "@/utils/media";
import { FaRegLightbulb } from "react-icons/fa6";

const RecentNews = () => {
 

  const bgColor = (id: number) => {
    return id === 1 ? "bg-[#FDD403]" : "bg-[#F3F4F6]";
  };

  const textColor = (id: number) => {
    return id === 1 ? "text-[#033AB9BF]" : "text-none";
  };

  return (
    <div className="mx-auto my-8">
      <div className="flex my-4">
        <h1 className="font-bold text-3xl mx-6 py-10">Recent News</h1>
        <div className=" p-2 w-50 h-50 bg-[#1C4DC0] rounded-full">
          <FaRegLightbulb size={100} />
        </div>
      </div>
      <div className=" flex gap-4 mx-4">
        {mediaData.slice(0,3).map((item,index) => (
          <div
            key={item.slug}
            className={`flex border bg-[#E5EBF88A] border-b-gray-300  flex-col w-[440px] h-[448px] my-4  mx-auto p-4`}
          >
            <div className="mb-6 h-[60%] w-full bg-[url('https://res.cloudinary.com/ds04ivdrj/image/upload/v1738839458/recent_feeds_compressed_suzg8d.png')] bg-cover bg-center bg-no-repeat">
              <div className="flex justify-start items-center p-4 bg-[#FDD403] h-[44px] w-[123px]">
                <p className="font-bold text-sm text-black">23 July 2023</p>
              </div>
            </div>
            <div>
              <p
                className={`font-normal text-black text-left ${textColor(
                  index
                )} text-xl leading-[2rem]`}
              >
                {item.description}
              </p>
            </div>
            <div
              className={`flex ${bgColor(
                index
              )} justify-center rounded-md border  border-[#00000033] items-center mt-auto w-full h-[50px]`}
            >
              {" "}
              <button  onClick={() => {
                    window.location.href = `/media/${item.slug}`;
                  }}
                className={`flex  gap-4 text-black  justify-center items-center  py-2 px-4 font-bold`}
              >
                <p>Read More</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
