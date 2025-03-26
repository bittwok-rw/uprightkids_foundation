import { httpClient } from "@/utils/httpClient";
import axios from "axios";

export const forgotPassword = async (data: { email: string }) => {
	return axios.post("/api/auth/forgot-password", data);
};

export const resetPassword = async (data: {
	token: string | null;
	newPassword: string;
	confirmPassword: string;
}) => {
	return httpClient.post("/api/auth/reset-password", data);
};
