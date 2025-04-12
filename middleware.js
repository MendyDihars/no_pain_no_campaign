import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getSessionCookie } from 'better-auth/cookies';
import { routing } from './i18n/routing';
 
const i18nMiddleware = createMiddleware(routing);
 
const allowedRoutes = ['/admin/login', '/admin/signup'];

function authMiddleware(request, response) {
  const cookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !allowedRoutes.includes(pathname) && !cookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return response;
}

export default function middleware(request) {
  const response = i18nMiddleware(request);

  if (!response?.ok) return response;

  return authMiddleware(request, response);
};
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}