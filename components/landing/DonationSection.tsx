import DonationCard from "@/components/cards/DonationCard";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/router";

export default function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<string>("$50");
  const router = useRouter();

  const handleCardClick = (amount: string) => {
    setSelectedAmount(amount);
  };

  const handleDonateClick = () => {
    if (selectedAmount) {
      router.push(`/donation?amount=${encodeURIComponent(selectedAmount)}`);
    } else {
      alert("Please select a donation amount first.");
    }
  };

  return (
    <section className="bg-primary-50 flex justify-center py-10 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-[90%] md:w-[80%]">
        {/* Left Text Section */}
        <div className="lg:pr-10">
        <h3 className="text-sm font-bold uppercase text-gray-700 mb-6">SUPPORT OUR WORK</h3>
        <h2 className="text-3xl lg:text-4xl font-extrabold uppercase leading-tight text-gray-900">
          Join our circle of hope to end marginalization in rural communities
          </h2>
        </div>

        {/* Right Donation Cards Section */}
        <div className="lg:col-span-2 bg-[#0C2445] py-4 px-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5 mb-6">
            {[{ amount: "$50", description: "Provides school materials and educational support for one child for a year." },
              { amount: "$100", description: "Sponsors vocational training for a young girl, giving her the skills to become financially independent." },
              { amount: "$250", description: "Covers health and nutrition support for several children in need." },
              { amount: "$500", description: "Funds psychosocial counseling for children recovering from trauma." }]
              .map((donation, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-4 rounded-lg transition-all ${
                    selectedAmount === donation.amount ? "bg-[#0052B4]" : "bg-[#253B80]"
                  }`}
                  onClick={() => handleCardClick(donation.amount)}
                >
                  <DonationCard amount={donation.amount} description={donation.description} className="text-white" />
                </div>
              ))}
          </div>

          {/* Donate Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleDonateClick}
              className="group w-full sm:w-2/3 lg:w-1/2 bg-secondary-900 text-tertiary-900 text-lg py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary-800 transition-all font-semibold"
            >
              <span className="text-lg">Donate Today</span>
              <MoveRight className="w-8 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}