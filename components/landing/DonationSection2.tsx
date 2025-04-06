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
    <section className="bg-[#0d1f45] flex justify-center py-12 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[90%] md:w-[80%]">
        {/* Left Text Section */}
        <div className="lg:pr-10 text-white">
          <h3 className="text-xs font-bold uppercase text-gray-300 mb-4">DONATE NOW</h3>
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight text-white">
            Make your gift today and join the movement to end marginalization:
          </h2>
        </div>

        {/* Right Donation Cards Section */}
        <div className="lg:col-span-2 bg-[#0C2445] p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[{ amount: "$50" }, { amount: "$100" }, { amount: "$250" }, { amount: "$500" }].map((donation, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 rounded-lg flex items-center justify-center transition-all text-white text-lg font-semibold border border-transparent ${
                  selectedAmount === donation.amount ? "bg-[#0052B4] border-white" : "bg-[#102A50]"
                }`}
                onClick={() => handleCardClick(donation.amount)}
              >
                <span className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-yellow-400 rounded-full text-black font-bold">
                    ✓
                  </div>
                  Donate {donation.amount}
                </span>
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleDonateClick}
              className="group w-full sm:w-2/3 lg:w-1/2 bg-yellow-400 text-black text-lg py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all font-semibold"
            >
              <span className="text-lg">Set Up Your Giving</span>
              <MoveRight className="w-8 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
