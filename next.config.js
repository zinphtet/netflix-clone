/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [
			'i.ytimg.com',
			'img.youtube.com',
			'i.ytimg.com',
			'images.unsplash.com',
		],
	},
};

module.exports = nextConfig;
