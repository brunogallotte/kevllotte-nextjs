import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = Boolean(request.cookies.get('tokenAccess'))

  if (isAuthenticated) {
    return NextResponse.redirect(new URL('/feed', request.url))
  } else {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/'], // Apply middleware to the root route
}
