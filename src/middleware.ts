import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define route permissions
const routePermissions: Record<string, number> = {
  '/users': 3,
  '/companies': 1,
  '/insights': 1,
  '/profile': 1,
  '/settings': 1,
};

export async function middleware(request: NextRequest) {
  // Get the JWT token from the session
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  });

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    // Add the original URL as callback URL
    // if original URL is only / then no need to set callback URL
    if (request.nextUrl.pathname !== '/')
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check route permissions
  const path = request.nextUrl.pathname;
  const requiredPermission = routePermissions[path];
  
  if (requiredPermission) {
    const userPermission = token.permission as number || 1;
    if (userPermission < requiredPermission) {
      // Redirect to dashboard if user doesn't have required permission
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)'],
}; 