import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the 'public/uploads' directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    upload.single("file")(req as any, res as any, (err) => {
      if (err) {
        return res.status(500).json({ message: "Upload failed", error: err });
      }
      const filePath = `/uploads/${(req as any).file.filename}`;
      return res.status(200).json({ filePath });
    });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Required for Multer
  },
};
