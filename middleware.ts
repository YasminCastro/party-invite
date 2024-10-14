import { NextResponse, type NextRequest } from "next/server";
import authMiddleware from "./config/joseAuth";
import * as jose from "jose";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token") as any;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isAuth = await authMiddleware(token.value);

  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.url.includes("/admin")) {
    const { result } = (await jose.decodeJwt(token.value)) as any;

    if (result && !result.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|convidades|fonts).*)",
  ],
};
