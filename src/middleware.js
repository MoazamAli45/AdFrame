import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Public routes that authenticated users shouldn't access
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.some(
    (route) => request.nextUrl.pathname === route
  );

  // Protected routes that require authentication
  const protectedPaths = ["/advertisement"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If user is on auth routes and already has a token, redirect to dashboard
  if (isAuthRoute && token) {
    try {
      // Verify the token is valid before redirecting
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.redirect(new URL("/advertisement", request.url));
    } catch (error) {
      // If token verification fails, clear the invalid token
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // Handle protected routes
  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // Add the user info to the request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("user", JSON.stringify(payload));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      // If token verification fails, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/advertisement"],
};
