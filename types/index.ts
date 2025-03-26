// import type { Users } from "@prisma/client";
import type { AxiosError } from "axios";

export interface IUser  {
	accessToken?: string;
}

export interface IResponse<T> {
	tags: string[];
	createdAt: string | number | Date;
	message: string;
	data: T;
}

export type ApiErrorResponse<T = unknown> = AxiosError<{
	error: string;
	data: T;
}>;

export interface IFormValidationErrors<T> {
	field: T;
	error: string;
}

export interface IBlog {
	id: string;
	title: string;
	content: string;
	userId: string;
	user: IUser;
	createdAt: string;
	updatedAt: string;
	tags: string[];
}

export interface IProject {
	id: string;
	name: string;
	content: string;
	image: string;
	userId: string;
	user: IUser;
	createdAt: string;
	updatedAt: string;
	tags: string[];
	gallery: IGallery[];
	Gallery: IGallery[];
}

export interface IGallery {
	id: string;
	name: string;
	url: string;
	projectId: string;
	createdAt: string;
	updatedAt: string;
}

export * from "./components";
