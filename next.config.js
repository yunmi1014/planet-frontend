module.exports = {
	reactStrictMode: false,
	images: {
		domains: ['picsum.photos', 'elasticbeanstalk-ap-northeast-2-816344967183.s3.ap-northeast-2.amazonaws.com', 'ifh.cc', 'storage.googleapis.com', 'img1.daumcdn.net', 'search.pstatic.net', 'firebasestorage.googleapis.com'],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
};
