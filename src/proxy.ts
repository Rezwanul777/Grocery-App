import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function proxy(req:NextRequest) {
    const {pathname}= req.nextUrl;
    const publicroutes=["/login","/register","/api/auth"];
    if (publicroutes.some((route)=>pathname.startsWith(route))) {
       return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    console.log("Token:", token);
    if (!token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', req.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
    
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}