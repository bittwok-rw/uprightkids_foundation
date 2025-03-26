/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IProject, IResponse } from "@/types";
// import type { Project } from "@prisma/client";
import { httpClient } from "../httpClient";

export const createNewProject = async (
    data: Partial<any>,
): Promise<IResponse<any>> => {
    return (await httpClient.post("/project", data)).data;
};

export const getAllProject = async (): Promise<IResponse<any[]>> => {
    return (await httpClient.get("/project")).data;
};

export const deleteProject = async (projectId: string): Promise<IResponse<null>> => {
    return (await httpClient.delete("/project", { data: { projectId } })).data;
};

export const getProjectById = async (id: string): Promise<IResponse<IProject>> => {
    return (await httpClient.get(`/project/${id}`)).data;
};

export const updateProject = async (
    data: Partial<any>,
): Promise<IResponse<any>> => {
    return (await httpClient.put(`/project/${data.id}`, data)).data;
};
