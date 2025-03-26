/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IResponse } from "../../types/index";
import { httpClient } from "../httpClient";

export const updatePassword = async (
	data: Partial<any>,
): Promise<IResponse<any>> => {
	return (await httpClient.put("/auth/change-password", data)).data;
};
