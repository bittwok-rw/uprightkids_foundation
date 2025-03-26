import { httpClient } from "@/utils/httpClient";

export const deleteProjectGalleryImage = (imageId: string) => {
	return httpClient.post(`/project/gallery/${imageId}`);
};
