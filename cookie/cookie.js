import cookie from 'cookie';

const MAX_AGE = 7 * 24 * 60 * 60;
export const setTokenCookie = (token, res) => {
	const setCookie = cookie.serialize('jwtToken', token, {
		maxAge: MAX_AGE,
		expires: new Date(Date.now() + MAX_AGE * 1000),
		secure: process.env.NODE_ENV === 'production',
		path: '/',
	});
	// console.log('Seted Cookie');
	res.setHeader('Set-Cookie', setCookie);
};
