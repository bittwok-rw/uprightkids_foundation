import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value; // Check if user is authenticated

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next(); // Allow access if authenticated
}

// Apply middleware to dashboard pages
export const config = {
  matcher: ["/dashboard/:path*"], // Protect all /dashboard routes
};
