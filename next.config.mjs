/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{
			protocol: 'https',
			hostname: 'placehold.co',
			// port: '',
			// pathmame: '',
		}]
	}
};

export default nextConfig;
