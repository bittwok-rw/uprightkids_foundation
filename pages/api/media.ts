import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const response = await fetch("http://localhost:5000/api/media"); // Call backend API
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching media:", error);
  
      // ✅ Fix: Explicitly cast `error` to `Error`
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
  
      return res.status(500).json({ message: "Internal Server Error", error: errorMessage });
    }
  }
  