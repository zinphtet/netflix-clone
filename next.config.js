/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['i.ytimg.com'],
	},
};

module.exports = nextConfig;
