/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{
			protocol: 'https',
			hostname: '*',
			// port: '',
			// pathmame: '',
		}]
	}
};

export default nextConfig;
