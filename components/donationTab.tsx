import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import DonateForm from "./DonateForm";

export function DonationTabs() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("one");
  const [selectedAmount, setSelectedAmount] = useState<
    number | "custom" | null
  >(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleAmountSelection = (amount: number | "custom") => {
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setCustomAmount("");
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numeric input
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value);
      if (value !== "") {
        setSelectedAmount(parseInt(value, 10));
      }
    }
  };

  return (
    <Tabs
      defaultValue="one"
      onValueChange={(value) => {
        setSelectedTab(value);
        setShowForm(false);
      }}
    >
      <TabsList className="grid w-full md:grid-cols-2 gap-4 overflow-auto">
        <TabsTrigger value="one">One-Time Donation</TabsTrigger>
        <TabsTrigger value="monthly">Monthly Donation</TabsTrigger>
      </TabsList>

      {/* Donation Content */}
      <TabsContent value={selectedTab}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-white">
              {selectedTab === "one" ? "One-Time Donation" : "Monthly Donation"}
            </CardTitle>
            <CardDescription>
              <p className="text-white">
                {selectedTab === "one"
                  ? "A single act of generosity can create lasting change."
                  : "Your ongoing support can make a bigger difference."}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                {[20, 50, 100, 200, 500, 1000].map((amount) => (
                  <button
                    key={amount}
                    className={`p-2 rounded-lg border ${
                      selectedAmount === amount
                        ? "bg-accent text-black"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleAmountSelection(amount)}
                  >
                    ${amount}
                    {selectedTab === "monthly" && "/month"}
                  </button>
                ))}
                <button
                  className={`p-2 rounded-lg border ${
                    selectedAmount === "custom" || 
                    (selectedAmount && 
                     ![20, 50, 100, 200, 500, 1000].includes(selectedAmount))
                      ? "bg-accent text-black"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleAmountSelection("custom")}
                >
                  Custom
                </button>
              </div>
              
              {/* Custom amount input */}
              {(selectedAmount === "custom" || 
                (selectedAmount && 
                 ![20, 50, 100, 200, 500, 1000].includes(selectedAmount))
               ) && (
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <Input
                      type="text"
                      className="pl-8 bg-white text-black"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                  </div>
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedAmount && selectedAmount !== "custom" && (
              <div className="mt-4 text-white">
                <p>
                  <strong>Selected Amount: </strong>${selectedAmount}
                  {selectedTab === "monthly" && "/month"}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full rounded-full bg-accent hover:bg-accent/90 hover:text-white text-black p-3"
                disabled={!selectedAmount || (selectedAmount === "custom" && !customAmount)}
              >
                Donate Now
              </Button>
            )}
          </CardFooter>
          {showForm && (
            <DonateForm 
              selectedAmount={
                selectedAmount === "custom" 
                  ? parseInt(customAmount, 10) 
                  : selectedAmount
              } 
            />
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}