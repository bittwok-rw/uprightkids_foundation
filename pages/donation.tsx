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
    <div className="w-full flex min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] py-4 sm:py-6 md:py-8 justify-start bg-[#E5EBF8] overflow-hidden items-center">
  <div className="flex justify-center w-full px-4 sm:px-6 md:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] gap-6 sm:gap-10 md:gap-12 lg:gap-16 place-content-center">
      <div className="font-bold rounded justify-between items-center capitalize text-primary text-base sm:text-lg">
        <div className="flex items-start py-2 sm:py-3 md:py-4">
          <div className="w-[40px] sm:w-[60px] md:w-[72px] md:mr-2 my-2 sm:my-3 md:my-4 border-t-2 border-primary">
            {""}
          </div>
          <div className="flex-1">
            <h3 className="text-primary text-base sm:text-lg md:text-[20px] font-semibold">
              DONATE
            </h3>
            <div className="my-2 sm:my-3 md:my-4 flex flex-col gap-4 sm:gap-6 md:gap-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[2rem] sm:leading-[2.5rem] md:leading-[3rem] lg:leading-[3.5rem]">
                JOIN OUR CIRCLE OF HOPE TO END MARGINALIZATION
              </h2>
              <p className="text-black lowercase text-sm sm:text-base">
                <span className="text-black uppercase">A</span>t Upright Kids Foundation, we believe that every child
                deserves the opportunity to thrive. <span className="text-black uppercase">T</span>ogether, we can break
                the cycle of poverty, end marginalization, and build
                brighter futures for vulnerable children and families in
                the Democratic Republic of Congo. <span className="text-black uppercase">B</span>y donating to Upright
                Kids Foundation, you&apos;re joining a global community
                committed to making a difference.
              </p>
              <div>
                <Button onClick={() => {
                  window.location.href = `/donation#donate`;
                }} className="bg-primary hover:text-white text-white text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2">
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
                src="/images/child.png"
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

      <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
  <div className="w-full max-w-7xl flex flex-col gap-6 p-6 md:p-8 bg-primary items-center rounded-lg">
    <h2 className="text-white text-[32px] sm:text-[40px] font-bold text-center mb-6 sm:mb-8 leading-snug">
      Different Ways to Give
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
      {[
        {
          title: "Donate Online",
          description: "Click below to make a secure donation. Choose between a one-time or monthly gift and select the amount that works best for you.",
        },
        {
          title: "Mail a Check",
          description: (
            <>
              Send your contribution to:<br />
              <strong className="text-white">Upright Kids Foundation</strong><br />
              204, Avenue Emery Patrice Lumumba,<br />
              Bukavu, DRC
            </>
          )
        },
        {
          title: "Bank Transfer",
          description: (
            <>
              Contact us at{" "}
              <span className="break-all font-bold text-white">
                info@uprightkidsfoundation.org
              </span>{" "}
              to request banking details.
            </>
          ),
        },
        {
          title: "In-Kind Donations",
          description: "We also accept stocks, supplies, and other in-kind contributions. Reach out to discuss how your gifts can support our mission.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white/10 p-4 sm:p-5 text-center rounded-lg border border-white/20 w-full min-h-[140px] sm:min-h-[150px] flex flex-col justify-center hover:bg-white/15 transition-colors"
        >
          <h3 className="text-white text-[28px] sm:text-[40px] font-bold mb-2 sm:mb-3 leading-tight">
            {item.title}
          </h3>
          <p className="text-white/90 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </div>





        <Projects />
        <GetInvolved/>
      </div>
    </div>
  );
};

export default Donation;
