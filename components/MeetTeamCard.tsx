"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface TeamMember {
  _id: string;  // Keep _id here
  name: string;
  position: string;
  image: string;
  description: string;
}

const MeetTeamCard = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/team");

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Check if the response contains the expected data format
        if (!Array.isArray(data.data)) {
          throw new Error("Invalid response format from API");
        }

        // Update the state with the data received from the API
        setTeamMembers(data.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="flex flex-col justify-center font-light items-center mx-auto gap-4 w-[80%] py-12 scroll-mt-[200px]" id="team">
      <div className="w-[4%] mr-2 flex border-t-2 border-black ml-0 self-start" />

      <div>
        <h1 className="font-bold text-[#1D2130] py-2 text-3xl">
          MEET OUR TEAM
        </h1>
        <p className="text-2xl leading-[2.5rem] text-black">
          Meet our dedicated team that is empowering children and families through innovative programs and resources. Upright Kids Foundation is made up of 11 members. Together, we work tirelessly to foster resilience, confidence, and growth in every child, supporting them on their journey to a brighter, more promising future. Our collective efforts are driven by compassion, collaboration, and a belief in the potential of every young person we work with.
        </p>
      </div>

      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-xl text-gray-500">Loading team members...</p>
      ) : error ? (
        <p className="text-xl text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap my-4 gap-8 mx-auto justify-center items-center">
          {teamMembers.length > 0 ? (
            teamMembers.map((item) => (
              <div className="flip-card m-2" key={item._id}>
                <div
                  className="flip-card-inner w-full min-h-[402px] flex flex-col rounded-xl shadow-md relative"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <div className="flip-card-front">
                    <div className="mt-auto absolute bottom-0 z-10">
                      <p className="p-2 font-bold text-2xl text-white">{item.name}</p>
                      <p className="p-2 font-bold text-xl text-white">{item.position}</p>
                    </div>
                    {/* Diagonal overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-[180px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-[#033AB9] bg-opacity-[45%] rounded-b-xl"
                        style={{
                          transform: "skewY(14deg)",
                          transformOrigin: "top left",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="absolute top-1/2 -translate-y-1/2 text-center z-10">
                      <p className="p-2 font-bold text-xl text-white">{item.description}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden">
                      <div className="absolute inset-0 bg-[#033AB9] bg-opacity-[50%]" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500">No team members found.</p>
          )}
        </div>
      )}

      <div className="flex my-8 py-4 border-2 border-[#e5ebf8d9] bg-gradient-to-l from-[#033AB924] to-[#E5EBF833] scroll-mt-[200px]" id="locations">
        <div className="mx-12">
          <Image
            src="https://res.cloudinary.com/ds04ivdrj/image/upload/v1738344105/locationIcon_qa58bu.svg"
            alt="Location"
            width={200}
            height={200}
          />
        </div>
        <div>
          <h1 className="font-bold text-[#1D2130] py-2 text-4xl">
            WHERE WE WORK
          </h1>
          <p className="text-2xl leading-[2.5rem] text-black">
            Upright Kids Foundation operates in the province of {" "}
            <span className="font-bold">South Kivu, Bukavu</span>, located in
            the eastern part of the{" "}
            <span className="font-bold">
              Democratic Republic of Congo (DRC)
            </span>
            . Bukavu is a growing city situated along the shores of Lake Kivu,
            but many of its surrounding rural communities face significant
            challenges. While the city continues to develop, many areas within
            its boundaries remain under-resourced and struggle with high
            levels of poverty. We focus on serving the most vulnerable groups
            in remote areas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetTeamCard;
