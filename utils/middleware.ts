import { type NextRequest, NextResponse } from "next/server";

const publicPaths = [
	"/",
	"/about",
	"/media",
	"/donation",
	"/contact",
	"/join-us",
	"/api",
	"/favicon.ico",
];

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Check if path is dashboard route
	// if (pathname.startsWith("/dashboard")) {
	// 	const token = await getToken({ req, secret: process.env.AUTH_SECRET });
	// 	if (!token) {
	// 		const loginUrl = new URL("/auth/signin", req.url);
	// 		loginUrl.searchParams.set("callbackUrl", req.url);
	// 		return NextResponse.redirect(loginUrl);
	// 	}
	// }

	// Allow public routes
	if (
		publicPaths.some(
			(path) => pathname === path || pathname.startsWith(`${path}/`),
		)
	) {
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
