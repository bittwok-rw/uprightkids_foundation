import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://backenduprightkid.vercel.app";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Required to handle file uploads with formidable
  },
};

// Helper function to parse form data (supports files)
const parseForm = async (req: NextApiRequest) => {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = formidable(); // <-- Use it as a function instead of a constructor

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const response = await fetch(`${BACKEND_URL}/api/projects`);

      if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);

      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { fields, files } = await parseForm(req);
      const { title, description, slug } = fields;

      let imageUrl = "";
      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        const imagePath = file.filepath;

        // Upload image to Cloudinary
        try {
          const uploadResult = await cloudinary.uploader.upload(imagePath, {
            upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          });
          imageUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
        } finally {
          // Remove temp file after uploading
          fs.unlinkSync(imagePath);
        }
      }  else if (typeof fields.imageUrl === "string") {
        imageUrl = fields.imageUrl; // Use the provided URL if no file is uploaded
      }

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

      const response = await fetch(`${BACKEND_URL}/api/projects/${slug}`, {
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
      const { fields, files } = await parseForm(req);
      const { slug, title, description } = fields;

      if (!slug) {
        return res.status(400).json({ message: "Slug is required" });
      }

      let imageUrl = "";
if (Array.isArray(fields.imageUrl)) {
  imageUrl = fields.imageUrl[0] || ""; // If it's an array, take the first element or default to an empty string
} else if (typeof fields.imageUrl === "string") {
  imageUrl = fields.imageUrl; // If it's a single string, assign it directly
} // Default to empty string if no image URL is provided

      // Handle image upload if a file is present
      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        const imagePath = file.filepath;

        try {
          const uploadResult = await cloudinary.uploader.upload(imagePath, {
            upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          });
          imageUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
        } finally {
          fs.unlinkSync(imagePath); // Remove temp file after uploading
        }
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
