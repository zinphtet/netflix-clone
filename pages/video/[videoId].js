import React, { useState, useEffect } from 'react';
import style from './Video.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Head from 'next/head';
import { getVideoInfo } from '../../youtube/youtube';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading/Loading';
import format from 'date-fns/format';

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
	// const [video, setVideo] = useState(null);
	// useEffect(() => {
	// 	console.log('VIDEO ID', videoId);
	// 	const getInfo = async () => {
	// 		const data = await getVideoInfo(videoId);
	// 		setVideo(data);
	// 		console.log('VIDEO INFO', data);
	// 	};
	// 	getInfo();
	// }, []);
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
