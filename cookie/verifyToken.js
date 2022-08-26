import jwt from 'jsonwebtoken';
export function verifyToken(jwtToken) {
	const decoded = jwt.verify(jwtToken, process.env.NEXT_PUBLIC_JWT_SECRET);
	return decoded;
}
