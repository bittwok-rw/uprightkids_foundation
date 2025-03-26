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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonateForm from "./DonateForm";

export function DonationTabs() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("one");
  const [selectedAmount, setSelectedAmount] = useState<number | "custom" | null>(null);
  const [customAmount, setCustomAmount] = useState<number | "">(0);

  const handleAmountSelection = (amount: number | "custom") => {
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setCustomAmount(""); // Clear custom amount when switching to a preset
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value ? parseFloat(value) : "");
  };

  return (
    <Tabs defaultValue="one" onValueChange={(value) => { setSelectedTab(value); setShowForm(false); }}>
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
                    className={`p-2 rounded-lg border ${selectedAmount === amount ? "bg-accent text-black" : "bg-white text-black"}`}
                    onClick={() => handleAmountSelection(amount)}
                  >
                    ${amount}{selectedTab === "monthly" && "/month"}
                  </button>
                ))}
                <button
                  className={`p-2 rounded-lg border ${selectedAmount === "custom" ? "bg-accent text-black" : "bg-white text-black"}`}
                  onClick={() => handleAmountSelection("custom")}
                >
                  Custom
                </button>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedAmount === "custom" && (
              <div>
                <Label htmlFor="custom-amount">Enter custom amount (USD)</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount || ""}
                  onChange={handleCustomAmountChange}
                  className="text-black bg-white"
                />
              </div>
            )}

            {/* Display selected amount */}
            {selectedAmount && selectedAmount !== "custom" && (
              <div className="mt-4 text-white">
                <p><strong>Selected Amount: </strong>${selectedAmount}{selectedTab === "monthly" && "/month"}</p>
              </div>
            )}
            {selectedAmount === "custom" && customAmount && (
              <div className="mt-4 text-white">
                <p><strong>Custom Amount: </strong>${customAmount}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setShowForm(true)}
              className="w-full rounded-full bg-accent text-black p-3"
              disabled={!selectedAmount}
            >
              Donate Now
            </Button>
          </CardFooter>
          {showForm && <DonateForm selectedAmount={selectedAmount === "custom" ? customAmount : selectedAmount} />}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
