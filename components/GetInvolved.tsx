import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const GetInvolved = () => {
  return (
    <div className="flex justify-center text-black">
      <div className="flex flex-col gap-16 w-[80%] items-center">
        <div className="">
          <div className="md:w-3/4">
            <h2>GET INVOLVED</h2>
            <p className="text-black">
              Join us as a strategic partner to expand our impact. Whether
              through corporate partnerships or community collaborations,
              together we can build a brighter future for the children.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-primary/5 hover:bg-primary group p-8 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              {" "}
              <h4 className="group-hover:text-white">Be an advocate</h4>
              <p className="group-hover:text-white">
                Upright Kids Foundation is a vibrant community of advocates,
                volunteers and supporters and we invite you to join us in ending
                the marginalization faced by children.
              </p>
            </div>
            <Button
              onClick={() => {
                window.location.href = `/joinus#join`;
              }}
              className="flex justify-center gap-2 group-hover:bg-accent group-hover:text-black"
            >
              Read More <ArrowRight />
            </Button>
          </div>

          <div className="bg-primary/5 hover:bg-primary group p-8 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              {" "}
              <h4 className="group-hover:text-white">Get Involved</h4>
              <p className="group-hover:text-white">
                Upright Kids Foundation is a vibrant community of advocates,
                volunteers and supporters and we invite you to join us in ending
                the marginalization faced by children.
              </p>
            </div>
            <Button
              onClick={() => {
                window.location.href = `/joinus#join`;
              }}
              className="flex justify-center gap-2 group-hover:bg-accent group-hover:text-black"
            >
              Read More <ArrowRight />
            </Button>
          </div>
          <div className="bg-primary/5 hover:bg-primary group p-8 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              {" "}
              <h4 className="group-hover:text-white">Join as a volunteer</h4>
              <p className="group-hover:text-white">
                Upright Kids Foundation is a vibrant community of advocates,
                volunteers and supporters and we invite you to join us in ending
                the marginalization faced by children.
              </p>
            </div>
            <Button
              onClick={() => {
                window.location.href = `/joinus#join`;
              }}
              className="flex justify-center gap-2 group-hover:bg-accent group-hover:text-black"
            >
              Read More <ArrowRight />
            </Button>
          </div>
          <div className="bg-primary/5 hover:bg-primary group p-8 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              {" "}
              <h4 className="group-hover:text-white">Fundraise With Us</h4>
              <p className="group-hover:text-white">
                Help us raise the funds needed to support our projects. Organise
                fundraisiing compnaing event, or activities
              </p>
            </div>
            <Button
              onClick={() => {
                window.location.href = `/joinus#join`;
              }}
              className="flex justify-center gap-2 group-hover:bg-accent group-hover:text-black"
            >
              Read More <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
