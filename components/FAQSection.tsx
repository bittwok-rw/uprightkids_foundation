import React from "react";

const FAQSection = () => {
  const [activeQuestion, setActiveQuestion] = React.useState<null | string>(null);

  const faqs = [
    {
      question: "How can I partner with Upright Kids Foundation?",
      answer: `We welcome partnerships with individuals, organizations, and businesses that align with our mission. To partner with us, please reach out via email at 
        <a href="mailto:info@uprightkidsfoundation.org" class="text-primary font-bold">info@uprightkidsfoundation.org</a>.`,
    },
    {
      question: "How can I join as a volunteer?",
      answer: `Volunteering with Upright Kids Foundation is a rewarding way to make a difference. We offer both on-the-ground and remote volunteering opportunities. Whether you have skills in education, healthcare, fundraising, or administration, we’d love to have you on board. To apply, please send your resume and a brief statement of interest to 
        <a href="mailto:info@uprightkidsfoundation.org" class="text-primary font-bold">info@uprightkidsfoundation.org</a>. Our team will review your application and match you with a role that aligns with your skills and our needs.`,
    },
    {
      question: "Can I make a donation to a specific project?",
      answer: `Yes, you can direct your donation to a specific project or program that resonates with you, such as our education initiatives, healthcare services, or vocational training programs. When making your donation, please specify the project you’d like to support, and we’ll ensure your funds are allocated accordingly.`,
    },
    {
      question: "How can I send or mail a check to Upright Kids Foundation?",
      answer: `You can mail your check to the following address: <br/>
        Upright Kids Foundation <br/>
        Dagwandstraat 8 <br/>
        1933 Sterrebeek Belgium <br/>
        Please include a note indicating whether your donation is general or designated for a specific project.`,
    },
    {
      question: "How does international giving work?",
      answer: `International donors can contribute through bank transfers, online donation platforms, or partnerships facilitated by our Belgium office. Please contact us for banking details or further assistance. We ensure all donations, no matter where they come from, are handled transparently and directed to the intended cause.`,
    },
    {
      question: "Can I make in-kind donations, such as stock or goods?",
      answer: `Yes, we gratefully accept in-kind donations, including stock, equipment, supplies, or other goods that support our programs. To discuss in-kind contributions, please email 
        <a href="mailto:info@uprightkidsfoundation.org" class="text-primary font-bold">info@uprightkidsfoundation.org</a>.`,
    },
    {
      question: "What other ways can I give to support Upright Kids Foundation?",
      answer: `There are several ways to contribute, including:<br/>
        ◦ <strong>Fundraising with us:</strong> Organize events or campaigns to raise funds for our initiatives.<br/>
        ◦ <strong>Corporate Sponsorships:</strong> Collaborate with us to create tailored sponsorship opportunities.<br/>
        ◦ <strong>Planned Giving:</strong> Include Upright Kids Foundation in your will or your gala event.<br/>
        ◦ <strong>Monthly Giving:</strong> Set up recurring donations to provide ongoing support.<br/>
        ◦ <strong>Volunteer Grants:</strong> If your employer offers volunteer grant programs, your time volunteering with us could result in a donation to our foundation.`,
    },
    {
      question: "How are donations processed by your team?",
      answer: `Donations are managed with the utmost transparency and accountability:<br/>
        ◦ <strong>In Belgium:</strong> Our Belgium office oversees international donations, ensuring they are properly documented and routed to the appropriate programs in the DRC.<br/>
        ◦ <strong>In Congo:</strong> Our DRC team directly allocates the funds, ensuring they reach the intended projects and beneficiaries efficiently.`,
    },
    {
      question: "Are donations tax-deductible?",
      answer: `Yes, depending on your country of residence. Our team can provide necessary documentation to assist with your tax filings.`,
    },
    {
      question: "How can I stay updated on the impact of my donation?",
      answer: `We keep our donors informed through regular updates, newsletters, and impact reports. You’ll see how your contributions are transforming lives and empowering communities in the DRC.`,
    },
    {
      question: "Who can I contact for more information?",
      answer: `For any additional questions or support, please contact us at:<br/>
        ◦ <strong>Email:</strong> <a href="mailto:info@uprightkidsfoundation.org" class="text-primary font-bold">info@uprightkidsfoundation.org</a><br/>
        ◦ <strong>Phone:</strong> +243 991170888`,
    },
  ];

  return (
    <div className="bg-white py-10 px-4 md:px-8 border border-blue-200">
      <div className="max-w-7xl p-8 mx-auto border shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Questions Column */}
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`p-3 cursor-pointer ${
                    activeQuestion === faq.question
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setActiveQuestion(activeQuestion === faq.question ? null : faq.question)
                  }
                >
                  {faq.question}
                  {activeQuestion === faq.question && (
                    <span className="float-right text-accent">★</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Answer Column */}
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Answer</h2>
            {activeQuestion ? (
              <div className="bg-accent p-6 text-black flex gap-2">
                <div className="mb-2">★</div>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      faqs.find((faq) => faq.question === activeQuestion)?.answer || "",
                  }}
                />
              </div>
            ) : (
              <div className="text-gray-500">
                Select a question to view the answer.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
