/* eslint-disable @next/next/no-img-element */
import DonationCarousel from "@/components/DonationCarousel";
import { DonationTabs } from "@/components/donationTab";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Projects from "@/components/projects";
import GetInvolved from "@/components/GetInvolved";

const Donation = () => {
  return (
    <div>
      <div className="w-full flex min-h-[70vh] py-8 justify-start bg-[#E5EBF8] overflow-hidden items-center">
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 w-[80%] gap-16 place-content-center">
            <div className="font-bold  rounded justify-between items-center capitalize text-primary text-lg">
              <div className="flex items-start py-4">
                <div className="w-[72px] md:mr-2  my-4 border-t-2 border-primary">
                  {""}
                </div>
                <div>
                  <h3 className="text-primary text-[20px] font-semibold">
                    DONATE
                  </h3>
                  <div className="my-4 flex flex-col gap-8">
                    <h2 className="text-5xl leading-[3.5rem]">
                      JOIN OUR CIRCLE OF HOPE TO END MARGINALIZATION
                    </h2>
                    <p className="text-black">
                      At Upright Kids Foundation, we believe that every child
                      deserves the opportunity to thrive. Together, we can break
                      the cycle of poverty, end marginalization, and build
                      brighter futures for vulnerable children and families in
                      the Democratic Republic of Congo. By donating to Upright
                      Kids Foundation, you’re joining a global community
                      committed to making a difference.
                    </p>
                    <div>
                      <Button  onClick={() => {
                window.location.href = `/donation#donate`;
              }} className="bg-primary hover:text-white text-white">
                        Donate Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-black p-4 flex flex-col gap-4 ">
              <DonationCarousel />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-16 py-16">
        <div className="w-[80%] grid md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <h2>GIVE WITH CONFIDENCE</h2>
            <p className="font-bold text-black">
              Your generosity matters, and we ensure your contributions are used
              where they are needed most:
            </p>
            <div className="flex gap-4">
              <div className="rounded-full h-6 flex justify-center items-center text-sm w-6 p-1 bg-primary/30 text-primary">
                <Check size={20} />
              </div>
              <div className="flex flex-col text-black">
                <p className="font-bold text-black">Direct Impact:</p>
                <span>
                  99% of our team is based in the DRC, meaning your donation
                  directly supports local initiatives.
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-full h-6 flex justify-center items-center text-sm w-6 p-1 bg-primary/30 text-primary">
                <Check size={20} />
              </div>
              <div className="flex flex-col text-black">
                <p className="font-bold text-black">Transparency:</p>
                <span>
                  We provide detailed reports, updates, and success stories so
                  you can see the tangible impact of your giving.
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-full h-6 flex justify-center items-center text-sm w-6 p-1 bg-primary/30 text-primary">
                <Check size={20} />
              </div>
              <div className="flex flex-col text-black">
                <p className="font-bold text-black">Secure Giving:</p>
                <span>
                  Your donations are processed securely, with oversight by our
                  teams in Belgium and the DRC to ensure every dollar goes to
                  empowering children and families.
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-[50vh] ">
            <Image
              src="/images/blog/happy-people.png"
              alt="Unlock digital potential"
              className="w-full h-full object-cover rounded-md"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="w-[80%] grid xl:grid-cols-2 gap-16 scroll-mt-40" id="donate">
          <div className="flex flex-col gap-8">
            <h2>Choose How to Make an Impact</h2>
            <div className="relative h-[50vh] ">
              <Image
                src="/images/blog/happy-people.png"
                alt="Unlock digital potential"
                className="w-full h-full object-cover rounded-md"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="bg-primary px-8 py-16 rounded-xl">
            <DonationTabs />
          </div>
        </div>
        <div className="w-[80%] grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <h2>Why your support matters</h2>
            <p className="text-black">
              Your donation to Upright Kids Foundation supports a dedicated,
              Congolese-led team working directly in the Democratic Republic of
              Congo. With 99% of our staff on the ground, your contribution
              reaches the heart of our mission—eliminating marginalization and
              uplifting vulnerable children. There are no intermediary, ensuring
              every dollar you give goes straight to our impactful projects,
              creating real, tangible change.
            </p>
          </div>
          <Tabs defaultValue="overview" className="">
            <TabsList className="grid w-full grid-cols-2 p-0 bg-transparent">
              <TabsTrigger
                value="overview"
                className="inline-flex items-center justify-center p-4 text-sm font-medium data-[state=active]:shadow-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:border-accent data-[state=active]:text-black text-black/20"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="impact"
                className="inline-flex items-center justify-center p-4 text-sm font-medium data-[state=active]:shadow-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:border-accent data-[state=active]:text-black text-black/20"
              >
                Impact
              </TabsTrigger>
            </TabsList>

            {/* One-Time Donation */}
            <TabsContent value="overview">
              <p className="mb-4 text-black/50">
                When you donate to Upright Kids Foundation, you’re not just
                giving money—you’re investing in a future where children have
                access to education, healthcare, and the tools they need to
                succeed.
              </p>
              <p className="mb-4 text-black/50">
                Together, we can give these children the chance to build a life
                filled with hope and opportunity.
              </p>
            </TabsContent>
            <TabsContent value="impact">
              <div className="mb-4 flex gap-4 text-black/50">
                <img src="/Small.svg" alt="" />{" "}
                <p>Reintegrate street children into supportive families.</p>
              </div>
              <div className="mb-4 flex gap-4 text-black/50">
                <img src="/Small.svg" alt="" />{" "}
                <p>Equip girls with life-changing vocational skills.</p>
              </div>
              <div className="mb-4 flex gap-4 text-black/50">
                <img src="/Small.svg" alt="" />{" "}
                <p>
                  Provide healthcare and psychological support to children in
                  need.
                </p>
              </div>
              <div className="mb-4 flex gap-4 text-black/50">
                <img src="/Small.svg" alt="" />{" "}
                <p>
                  Provide healthcare and psychological support to children in
                  need.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="flex justify-center bg-[#E7EEEC] py-16 text-black">
        <div className="w-[80%] grid md:grid-cols-2 items-center gap-8">
          <h2>How we use your donation</h2>
          <div className="flex flex-col gap-4">
            <span>
              We understand that when you make a  donation, you want to know
              exactly where your money is going and we pledge to be transparent.
            </span>
            <div className="grid xl:grid-cols-3 grid-cols-2 gap-4">
              <div className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-green-200 rounded-md" />
                <span>40% child care home</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-[#AC94F1] rounded-md" />
                <span>35% cleanliness program</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-[#FFF0CA] rounded-md" />
                <span>10% helping people</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-[#F9CF64] rounded-md" />
                <span>10% excursions</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-[#F38FBF] rounded-md" />
                <span>5% feeding the poor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center py-16">
        <div className="w-[80%] flex flex-col gap-12 p-8 bg-primary items-center">
          <h2 className="text-white">Different Ways to Give</h2>
          <div className="grid grid-cols-2 gap-16">
            <div className="bg-white/10 p-4 text-center">
              <h3 className="text-white">Donate Online</h3>
              <p className="text-white">
                Click below to make a secure donation. Choose between a one-time
                or monthly gift and select the amount that works best for you.
              </p>
            </div>
            <div className="bg-white/10 p-4 text-center">
              <h3 className="text-white">Mail a Check</h3>
              <p className="text-white">
                Send your contribution to:Upright Kids Foundation 204, Avenue
                Emery Patrice Lumumba,Bukavu, DRC
              </p>
            </div>
            <div className="bg-white/10 p-4 text-center">
              <h3 className="text-white">Bank Transfer</h3>
              <p className="text-white">
                Contact us at info@uprightkidsfoundation.org to request banking
                details for direct transfers.
              </p>
            </div>
            <div className="bg-white/10 p-4 text-center">
              <h3 className="text-white">In-Kind Donations</h3>
              <p className="text-white">
                We also accept stocks, supplies, and other in-kind
                contributions. Reach out to discuss how your gifts can support
                our mission.
              </p>
            </div>
          </div>
        </div>
        <Projects />
        <GetInvolved/>
      </div>
    </div>
  );
};

export default Donation;
