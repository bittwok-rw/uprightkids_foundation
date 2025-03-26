import axios from "axios";
import { getSession } from "next-auth/react";

const httpClient = axios.create();
httpClient.interceptors.request.use(async (config) => {
	const session = await getSession();
	config.headers.Authorization = `Bearer ${session?.user.accessToken}`;
	config.baseURL = process.env.NEXT_PUBLIC_API_URL;
	return config;
});

export { httpClient };
