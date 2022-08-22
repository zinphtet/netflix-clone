// const res = await fetch(
//     `https:youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=disney movies&key=AIzaSyDn59b8t5I0KQcO1tdt-vXg_4epdG-qB4g`
// );
// const data = await res.json();
// console.log('Youtube Data ', data.items);

export const getVideos = async (query) => {
	try {
		const res = await fetch(
			`https:youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
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
export const getVideoInfo = async (id) => {
	// console.log('getVideoInfo VideoId', id);
	try {
		const res = await fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
		);
		const data = await res.json();
		const myData = data.items[0];
		// console.log('Video Information', data);
		return {
			description: myData.snippet.description,
			publishedAt: myData.snippet.publishedAt,
			title: myData.snippet.title,
			views: myData.statistics.viewCount,
			cast: myData.snippet.channelTitle,
		};
	} catch (err) {
		console.log('Error Fetching Video Detail Data ', err.message);
	}
};
// GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
