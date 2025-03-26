import { Request, Response } from "express";
import Media from "../models/Media";


export const createMedia = async (req: Request, res: Response) => {
  try {
    const media = new Media(req.body);
    await media.save();
    res.status(201).json({ message: "Media uploaded successfully", media });
  } catch (error) {
    res.status(500).json({ message: "Error uploading media", error });
  }
};

export const getAllMedia = async (_req: Request, res: Response) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Error fetching media", error });
  }
};


// ✅ Delete Media by ID
export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedMedia = await Media.findByIdAndDelete(id);
  
      if (!deletedMedia) {
        res.status(404).json({ message: "Media not found" });
        return;
      }
  
      res.status(200).json({ message: "Media deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting media", error });
    }
  };


  // ✅ Get media by slug
  export const getMediaBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const { slug } = req.params;
        console.log("Received slug:", slug); // ✅ Debugging log

        const media = await Media.findOne({ slug });

        if (!media) {
            console.log("Media not found for slug:", slug); // ✅ Debugging log
            res.status(404).json({ message: "Media not found" });
            return;
        }

        res.status(200).json(media);
    } catch (error) {
        console.error("Error fetching media:", error); // ✅ Debugging log
        res.status(500).json({ message: "Error fetching media", error });
    }
};
