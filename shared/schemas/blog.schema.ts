import { z } from "zod";

export const blogSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	content: z.string().min(1, { message: "Content is required" }),
	// imageUrl: z.string().url({ message: "Invalid image URL" }).optional(),
	// authorId: z.string().min(1, { message: "Author ID is required" }),
});

export type BlogSchema = z.infer<typeof blogSchema>;

export interface IBlogSchema {
	id: string;
	data: BlogSchema;
}
