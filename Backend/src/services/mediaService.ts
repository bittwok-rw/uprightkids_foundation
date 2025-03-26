import Media from "../models/Media";

export const createMediaService = async (data: any) => {
  const media = new Media(data);
  return await media.save();
};

export const getAllMediaService = async () => {
  return await Media.find();
};