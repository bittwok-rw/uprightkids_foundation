import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const response = await fetch(`${BACKEND_URL}/api/projects`);

      if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);

      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { title, description, imageUrl, slug } = req.body;

      const payload = { title, description, imageUrl, slug };

      const response = await fetch(`${BACKEND_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add project.");
      }

      const responseData = await response.json();
      return res.status(201).json(responseData);
    }

    if (req.method === "DELETE") {
      const { slug } = req.body;

      if (!slug) {
        return res.status(400).json({ message: "Slug is required" });
      }

      const response = await fetch(`/api/projects/right`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete project.");
      }

      const responseData = await response.json();
      return res.status(200).json({ message: "Project deleted successfully", data: responseData });
    }

    if (req.method === "PUT") {
      const { slug, title, description, imageUrl } = req.body;

      if (!slug) {
        return res.status(400).json({ message: "Slug is required" });
      }

      const payload = { title, description, imageUrl };

      const response = await fetch(`${BACKEND_URL}/api/projects/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update project.");
      }

      const responseData = await response.json();
      return res.status(200).json(responseData);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error: unknown) {
    console.error("Error processing request:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ message: "Internal Server Error", error: errorMessage });
  }
}
