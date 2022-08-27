import { NextResponse } from 'next/server';
export async function middleware(req) {
	const jwtToken = req.cookies.get('jwtToken');
	if (jwtToken) {
		return NextResponse.next();
	}
	if (!jwtToken) {
		return NextResponse.rewrite(new URL('/login', req.url));
	}
}
