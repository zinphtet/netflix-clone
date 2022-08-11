// const res = await fetch(
//     `https:youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=disney movies&key=AIzaSyDn59b8t5I0KQcO1tdt-vXg_4epdG-qB4g`
// );
// const data = await res.json();
// console.log('Youtube Data ', data.items);

export const getVideos = async (query) => {
	try {
		const res = await fetch(
			`https:youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${process.env.YOUTUBE_API_KEY}`
		);
		const data = await res.json();
		// console.log('Youtube Data ', data.items);
		// if(!data) return []
		return data.items?.map((data) => {
			return {
				imgUrl: data.snippet.thumbnails.high.url,
				title: data.snippet.title,
				videoId: data.id.videoId,
			};
		});
	} catch (err) {
		console.error('Youtube data fetching error ', err.message);
	}
};
