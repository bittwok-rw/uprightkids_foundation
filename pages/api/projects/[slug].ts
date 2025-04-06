import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://backenduprightkid.vercel.app";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;

    if (req.method === "GET") {
      const response = await fetch(`${BACKEND_URL}/api/projects/${slug}`);

      if (!response.ok) throw new Error(`Failed to fetch project: ${response.statusText}`);

      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error: unknown) {
    console.error("Error fetching project:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ message: "Internal Server Error", error: errorMessage });
  }
}
