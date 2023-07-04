import { NextResponse, type NextRequest } from "next/server";
import authMiddleware from "./config/joseAuth";

// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token") as any;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isAuth = await authMiddleware(token.value);

  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|convidades|admin).*)",
  ],
};
