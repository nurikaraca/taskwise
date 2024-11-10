// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";

// const protectedRoutes = ["/middleware"];

// export default async function (request: NextRequest) {
//     const session = await auth();

//     const isProtected = protectedRoutes.some((route) =>
//         request.nextUrl.pathname.startsWith(route)
//     );
//     if (!session && isProtected) {
//         const absoluteUrl = new URL("/", request.nextUrl.origin);
//         return NextResponse.redirect(absoluteUrl.toString());
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
//   };


import { auth } from "@/auth"
 
export default auth((req) => {
 if (!req.auth && req.nextUrl.pathname !== "/sign-in") {
 const newUrl = new URL("/sign-in", req.nextUrl.origin)
 return Response.redirect(newUrl)
 }
})

export const config = {
 matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}