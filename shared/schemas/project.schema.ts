import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    gallery: z.string().url("Invalid image URL").optional().nullable(),
});

export type ProjectType = z.infer<typeof projectSchema>;
