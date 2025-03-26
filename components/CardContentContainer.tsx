import { Button } from "./ui/button";

interface CardContentContainerprops {
  title?: string;
  content?: string;
  btnCaption?: string;
  background?: string;
  btnBackground?: string;
  textColor?: string;
  btnChildren?: React.ReactNode;
  //   //   height?: string;
  //   //   width?: string;
  //   buttonBackground?: string;
  //   styles?: string;
}

const CardContainer: React.FC<CardContentContainerprops> = ({
  background = "#F3F4F6",
  title,
  content,
  btnCaption,
  btnChildren
  //   width = "309px",
  //   height = "342px",
  //   styles,
  //   buttonBackground = "#1C4DC0"
}) => {
  return (
    <div className="group">
    <div
      className={`flex border border-b-gray-300 shadow-md group ${background} group-hover:bg-[#1C4DC0] group-hover:text-white flex-col w-[309px] h-[342px] mx-auto my-4 p-4`}
    >
      <div className="flex justify-center items-center">
        <h1 className={`font-bold text-2xl py-4 group-hover:text-white`}>{title}</h1>
      </div>
      <div>
        <p className={`font-light text-black text-left leading-[1.8rem] group-hover:text-white`}>
          {content}
        </p>
      </div>
      <div className="flex justify-center border border-none items-center mt-auto w-full h-[50px]">
        {" "}
        <Button
          className={`flex gap-4 rounded-md justify-center items-center group-hover:bg-accent  py-2 px-4 font-semibold`}
        >
          <p>{btnCaption}</p> {btnChildren}
        </Button>
      </div>
    </div>
    </div>
  );
};

export default CardContainer;
