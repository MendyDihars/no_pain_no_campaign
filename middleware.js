import { NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
 
const allowedRoutes = ['/admin/login', '/admin/signup'];

export function middleware(request) {
  const cookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !allowedRoutes.includes(pathname) && !cookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}