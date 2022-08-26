import { decode } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { createStats, fetchVideoStats } from '../../Hasura/hasura';
import { updateStats, fetchFavourited } from '../../Hasura/hasura';
export default async function Stats(req, res) {
	// console.log('Cookie ', req.cookies.jwtToken);
	// console.log('Req Body', req.body);
	// const { videoId } = req.body;
	if (req.method === 'GET') {
		// console.log('Get Request', req);
		// console.log('get request ', req.query);

		const { token, issuer, videoId } = req.query;
		if (token) {
			const data = await fetchFavourited(token, {
				issuer,
				videoId,
			});
			res.send({ msg: 'HELLO THIS IS SEND', favourited: data });
		}
		// console.log({ token, issuer, videoId });
		// const data = await fetchFavourited(token, {
		// 	issuer,
		// 	videoId,
		// });
		res.send({ msg: 'HELLO THIS IS SEND' });
	}

	if (req.method === 'POST') {
		try {
			if (req.body.favourited) {
				console.log('It Works UPDATE');
				const { token, favourited, videoId, issuer } = req.body;

				const updateReturn = await updateStats(token, {
					videoId,
					favourited,
					issuer,
				});
				console.log({ updateReturn });
				return;
			}
			const jwtToken = req.body.cookies;

			const decoded = jwt.verify(jwtToken, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!decoded.issuer) return;
			const fetchedVideoData = await fetchVideoStats(jwtToken, {
				issuer: decoded.issuer,
				videoId: req.body.videoId,
			});
			if (fetchedVideoData.stats.length === 0) {
				const res = await createStats(jwtToken, {
					favourited: 3,
					watched: req.body.title,
					userId: decoded.issuer,
					videoId: req.body.videoId,
				});
			}
			res.send({
				msg: 'Stats api resolved',
				cookie: req.cookies.jwtToken,
				decodedJwt: decoded,
				fetchedVideoData: fetchedVideoData.stats[0],
			});
		} catch (err) {
			res.status(500).send({ err: 'error occured' });
		}
	} else {
		res.send({
			msg: 'NOT Post Request',
		});
	}
}
