/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IBlog, IResponse } from "@/types";
// import type { Blog } from "@prisma/client";
import { httpClient } from "../httpClient";

export const createNewBlog = async (
	data: Partial<any>,
): Promise<IResponse<any>> => {
	return (await httpClient.post("/blog", data)).data;
};

export const getAllBlog = async (): Promise<IResponse<any[]>> => {
	return (await httpClient.get("/blog")).data;
};

export const deleteBlog = async (blogId: string): Promise<IResponse<null>> => {
	return (await httpClient.delete("/blog", { data: { blogId } })).data;
};

export const getBlogById = async (id: string): Promise<IResponse<IBlog>> => {
	return (await httpClient.get(`/blog/${id}`)).data;
};

export const updateBlog = async (
	data: Partial<any>,
): Promise<IResponse<any>> => {
	return (await httpClient.put(`/blog/${data.id}`, data)).data;
};
