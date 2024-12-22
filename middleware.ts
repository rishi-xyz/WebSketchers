import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/agency/sign-in(.*)",
  "/agency/sign-up(.*)",
  "/site",
  "/api/uploadthing",
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get("host") || process.env.NEXT_PUBLIC_DOMAIN!;
  const domainParts = hostname.split(`.${process.env.NEXT_PUBLIC_DOMAIN}`);
  const customSubDomain = domainParts.length > 1 ? domainParts[0] : null;
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `${searchParams}` : ""
  }`;

  if (customSubDomain) {
    const redirectUrl = new URL(
      `/${customSubDomain}${url.pathname}`,
      `${req.nextUrl.origin}`
    );
    if (searchParams) {
      redirectUrl.search = searchParams;
    }
    return NextResponse.redirect(redirectUrl);
  }

  if (url.pathname === "/sign-in") {
    return NextResponse.redirect(
      new URL("/agency/sign-in", req.nextUrl.origin)
    );
  }

  if (url.pathname === "/sign-up") {
    return NextResponse.redirect(
      new URL("/agency/sign-up", req.nextUrl.origin)
    );
  }

  if (
    url.pathname === "/" ||
    (url.pathname == "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }

  if (
    url.pathname.startsWith("/agency") ||
    url.pathname.startsWith("/subaccount")
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
