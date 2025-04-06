// import type { NextApiRequest, NextApiResponse } from "next";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { Request, Response } from "express"; // Import express types

// // Ensure the 'public/uploads' directory exists
// const uploadDir = path.join(process.cwd(), "public/uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Set up Multer storage
// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file
//   },
// });

// const upload = multer({ storage });

// // API route handler
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     // Type cast req and res to express.Request and express.Response
//     const expressReq = req as unknown as Request;
//     const expressRes = res as unknown as Response;

//     // Handle file upload
//     upload.single("file")(expressReq, expressRes, (err: any) => {
//       if (err) {
//         return expressRes.status(500).json({ message: "Upload failed", error: err });
//       }
//       const filePath = `/uploads/${expressReq.file?.filename}`;
//       return expressRes.status(200).json({ filePath });
//     });
//   } else {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false, // Required for Multer
//   },
// };
