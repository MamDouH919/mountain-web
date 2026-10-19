import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 renamed middleware to proxy. Redirects "/" to "/en" or "/ar"
// based on the NEXT_LOCALE cookie, then the Accept-Language header.
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
