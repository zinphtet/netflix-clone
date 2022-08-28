import React, { useState, useEffect } from 'react';
import style from './Video.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Head from 'next/head';
import { getVideoInfo } from '../../youtube/youtube';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading/Loading';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { verifyToken } from '../../cookie/verifyToken';
import { updateStatsFromClient } from '../../Hasura/helper';
// 4zH5iYM4wJo
// bLvqoHBptjg
// uO3HUjiWc8k

export async function getStaticProps(context) {
	const { videoId } = context.params;
	const video = await getVideoInfo(videoId);
	// const video = null;
	return {
		props: {
			video,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 10, // In seconds
	};
}

export async function getStaticPaths() {
	const somePaths = ['4zH5iYM4wJo', 'bLvqoHBptjg', 'uO3HUjiWc8k'];
	// Get the paths we want to pre-render based on posts
	const paths = somePaths.map((id) => ({
		params: { videoId: id },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: 'blocking' };
}

const VideoPage = ({ video }) => {
	const router = useRouter();
	const { videoId } = router.query;

	const [like, setLike] = useState(false);
	const [disLike, setDisLike] = useState(false);

	const [token, setToken] = useState(null);
	const [issuer, setIssuer] = useState(null);
	const handleLike = () => {
		if (!token || !issuer) return;
		if (like) {
			setLike(false);
			updateStatsFromClient({ videoId, issuer, token, favourited: 3 });
		} else {
			setDisLike(like);
			setLike((prev) => !prev);
			updateStatsFromClient({ videoId, issuer, token, favourited: 1 });
		}
	};
	const handleDisLike = () => {
		if (!token || !issuer) return;
		if (disLike) {
			setDisLike(false);

			updateStatsFromClient({ videoId, issuer, token, favourited: 3 });
		} else {
			setLike(disLike);
			setDisLike((prev) => !prev);
			updateStatsFromClient({ videoId, issuer, token, favourited: 2 });
		}
	};

	useEffect(() => {
		const cookie = document.cookie;
		const cookieValue = cookie.split('=')[1];
		setToken(cookieValue);
		const { issuer } = verifyToken(cookieValue);
		setIssuer(issuer);
		const data = {
			videoId,
			cookies: cookieValue,
			title: video.title,
		};
		const fetchVideo = async () => {
			// console.log('cookie from clinet side', document.cookie);
			await fetch('/api/stats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		};
		fetchVideo();
	}, [video.title, videoId]);

	useEffect(() => {
		const getFavourited = async () => {
			const res = await fetch(
				`/api/stats?token=${token}&issuer=${issuer}&videoId=${videoId}`
			);
			const data = await res.json();
			if (data.favourited === 1) setLike(true);
			if (data.favourited === 2) setDisLike(true);
			if (data.favourited === 3) {
				setLike(false);
				setDisLike(false);
			}
		};
		getFavourited();
	}, [token, issuer, videoId]);
	if (!video) return <Loading />;
	const { description, publishedAt, views, title, cast } = video;
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<div className={style.video_page}>
				<Navbar />
				<div className={`container ${style.video}`}>
					<div className={style.iframe}>
						<iframe
							id="ytplayer"
							type="text/html"
							src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com`}
							frameBorder="0"
						></iframe>
						<div className={style.rate_btns}>
							<div style={style.btn_wrapper} onClick={handleLike}>
								<AiFillLike color={`${like ? 'blue' : 'white'}`} />
							</div>
							<div style={style.btn_wrapper} onClick={handleDisLike}>
								<AiFillDislike color={`${disLike ? 'blue' : 'white'}`} />
							</div>
						</div>
					</div>
					<div className={style.video_info}>
						<p className={style.date}>Date : {publishedAt}</p>
						<p className={style.cast}>Cast : {cast}</p>
						<p className={style.view}>Views Count : {views}</p>
						<h3 className={style.title}>{title} </h3>
						<p className={style.description}>{description}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default VideoPage;

// const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
