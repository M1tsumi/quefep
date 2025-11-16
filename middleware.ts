import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get('host') || '';

  if (host === 'quefep.uk.invite') {
    return NextResponse.redirect('https://discord.com/invite/6nS2KqxQtj');
  }

  if (host.startsWith('swiftdisc.')) {
    if (!url.pathname.startsWith('/swiftdisc')) {
      url.pathname = '/swiftdisc' + (url.pathname === '/' ? '' : url.pathname);
      return NextResponse.rewrite(url);
    }
  } else if (host.startsWith('caelum.')) {
    if (!url.pathname.startsWith('/caelum')) {
      url.pathname = '/caelum' + (url.pathname === '/' ? '' : url.pathname);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/|.*\\..*).*)'
  ]
};
