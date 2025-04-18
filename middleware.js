import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getSessionCookie } from 'better-auth/cookies';
import { routing } from './i18n/routing';
 
const i18nMiddleware = createMiddleware(routing);
 
const localeRegex = `(${routing.locales.join('|')})`;

const allowedRoutes = ['/admin/login', '/admin/signup']
  .map((route) => (
    new RegExp(`^/${localeRegex}${route}`)
  ));

function authMiddleware(request, response) {
  const cookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;
  const locale = pathname.match(localeRegex)?.[0] ?? routing.defaultLocale;
  if (pathname.includes('admin') && !allowedRoutes.some((route) => pathname.match(route)) && !cookie) {
    return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
  }

  return response;
}

export default function middleware(request) {
  const response = i18nMiddleware(request);

  const { pathname } = request.nextUrl;
  
  response.cookies.set('x-current-pathname', pathname);

  if (!response?.ok) return response;

  return authMiddleware(request, response);
};
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)',
  ],
}