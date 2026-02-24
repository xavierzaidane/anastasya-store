import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Get the path
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === "/admin/login" || path === "/admin/register";

    // Check if the path is an admin path
    const isAdminPath = path.startsWith("/admin");

    // Get the token from cookies
    const token = request.cookies.get("token")?.value || "";

    // If it's an admin path (and not a public path like login/register)
    if (isAdminPath && !isPublicPath) {
        // If no token, redirect to login
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
        }
    }

    // If it's a public path (login/register) and user has a token
    if (isPublicPath && token) {
        // Redirect to admin dashboard
        return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        // Match all paths starting with /admin
        "/admin/:path*",
    ],
};
