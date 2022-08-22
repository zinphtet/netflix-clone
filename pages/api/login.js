import { magicAdmin } from '../../magic/magic_server';
import jwt from 'jsonwebtoken';
import { createNewUser, fetchUserHasura } from '../../Hasura/hasura';
export default async function login(req, res) {
	if (req.method === 'POST') {
		try {
			const auth = req.headers.authorization;
			const didToken = auth && auth.substr(7);
			console.log({ didToken });
			const metadata = await magicAdmin.users.getMetadataByToken(didToken);
			console.log({ metadata });
			const jwtToken = jwt.sign(
				{
					...metadata,
					iat: Date.now() / 1000,
					exp: Date.now() / 1000 + 7 * 24 * 60 * 60,
					'https://hasura.io/jwt/claims': {
						'x-hasura-allowed-roles': ['user', 'admin'],
						'x-hasura-default-role': 'user',
						'x-hasura-user-id': metadata.issuer,
					},
				},
				process.env.JWT_SECRET
			);
			console.log({ jwtToken });
			const user = await fetchUserHasura(jwtToken);
			console.log({ userFromHasura: user });
			if (user.users.length === 0) {
				//create user
				console.log('User is not registered');
				const res = await createNewUser(jwtToken, metadata);
				console.log('Registered On the Fly ', res);
			} else {
				console.log('User Already Existed ', user);
			}
			res.send({ done: true, metadata, didToken, jwtToken, user });
		} catch (err) {
			res.status(500).send({ done: false });
		}
	} else {
		res.send({ error: 'not POST Method' });
	}
}
