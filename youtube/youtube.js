export const getVideos = async (query) => {
	try {
		const res = await fetch(
			`https:youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
		);
		const data = await res.json();

		return data.items?.map((data) => {
			return {
				// imgUrl: data.snippet.thumbnails.high.url,
				// `https://img.youtube.com/vi/${data.id.videoId}/maxresdefault.jpg` ||
				imgUrl:
					`https://i.ytimg.com/vi/${data.id.videoId}/maxresdefault.jpg` ||
					data.snippet.thumbnails.high.url,
				title: data.snippet.title,
				videoId: data.id.videoId,
			};
		});
	} catch (err) {
		console.error('Youtube data fetching error ', err.message);
	}
};
export const getVideoInfo = async (id) => {
	try {
		const res = await fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
		);
		const data = await res.json();
		const myData = data.items[0];

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
