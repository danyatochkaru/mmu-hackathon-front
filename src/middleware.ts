import {auth} from "@/lib/auth";
import {ROUTES} from "@/constants/routes";

export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== ROUTES.login && req.nextUrl.pathname !== ROUTES.registration) {
        const newUrl = new URL(ROUTES.login, req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}