"use client";

import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/subscriber", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email }),
      });

      // First check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Invalid server response');
      }

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Subscription failed");
      }

      // Success - email was sent
      setMessage("Thank you for subscribing! A confirmation email has been sent to your address.");
      setIsSuccess(true);
      setEmail("");
      
    } catch (error) {
      setMessage(
        error instanceof Error 
          ? error.message 
          : "Failed to subscribe. Please try again later."
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[22rem]">
      <h3 className="text-tertiary-100 font-semibold text-base mb-2">
        Sign up to our Newsletter
      </h3>
      <form onSubmit={handleSubscribe}>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pr-32 border rounded-xl border-gray-300 text-tertiary-900 placeholder:text-tertiary-900 text-sm placeholder:text-sm"
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="text-sm font-bold absolute rounded-r-xl right-1 top-1 bottom-1 flex justify-center items-center px-4 bg-primary-900 text-white hover:bg-primary-800 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
      {message && (
        <p className={`text-sm mt-2 text-center ${
          isSuccess ? "text-green-600" : "text-red-600"
        }`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Newsletter;