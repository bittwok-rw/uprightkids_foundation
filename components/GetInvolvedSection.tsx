/* eslint-disable @typescript-eslint/no-explicit-any */

import { services } from "@/utils/services";
import { FaArrowRightLong } from "react-icons/fa6";
import CardContainer from "./CardContentContainer";

const GetInvolvedSection = () => {

  return (
    <div className="flex flex-wrap justify-center" id="getinvolved">
    <div className="flex flex-wrap gap-16 justify-between w-[80%]">
      {" "}
      {services.map((item:any) => (
        <CardContainer
          key={item.title}
          title={item.title}
          content={item.content}
          btnCaption={item.btnCaption}
          btnChildren={
            <div>
              <FaArrowRightLong />
            </div>
          }
        />
      ))}
    </div>
    </div>
  );
};

export default GetInvolvedSection;
