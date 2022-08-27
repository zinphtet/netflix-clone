import { magicAdmin } from '../../magic/magic_server';
import jwt from 'jsonwebtoken';
import { createNewUser, fetchUserHasura } from '../../Hasura/hasura';
import { setTokenCookie } from '../../cookie/cookie';
export default async function login(req, res) {
	if (req.method === 'POST') {
		try {
			const auth = req.headers.authorization;
			
			const didToken = auth && auth.substr(7);
			
			const metadata = await magicAdmin.users.getMetadataByToken(didToken);

			const jwtToken = jwt.sign(
				{
					...metadata,
					iat: Date.now() / 1000 - 1000,
					exp: Date.now() / 1000 + 7 * 24 * 60 * 60,
					'https://hasura.io/jwt/claims': {
						'x-hasura-allowed-roles': ['user', 'admin'],
						'x-hasura-default-role': 'user',
						'x-hasura-user-id': metadata.issuer,
					},
				},
				process.env.NEXT_PUBLIC_JWT_SECRET
			);

			const user = await fetchUserHasura(jwtToken);

			user.users.length === 0 && (await createNewUser(jwtToken, metadata));
			const cookie = setTokenCookie(jwtToken, res);

			res.send({ done: true, metadata, didToken, jwtToken, user });
		} catch (err) {
			res.status(500).send({ done: false });
		}
	} else {
		res.send({ error: 'not POST Method' });
	}
}
