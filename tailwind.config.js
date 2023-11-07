module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/foundations/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				title: 'Pretendard, sans-serif',
			},
			fontSize: {
				'4xl': [{ lineHeight: 1.25 }],
				'5xl': [{ lineHeight: 1.25 }],
				'6xl': ['58px', { lineHeight: 1.25 }],
				'7xl': ['4.5rem', { lineHeight: 1.2 }],
				'8xl': ['6rem', { lineHeight: 1.1 }],
			},
			plugins: [
				function ({ addVariant }) {
					addVariant('child', '& > *');
					addVariant('child-hover', '& > *:hover');
				},
			],
		},
	},
	plugins: [],
};
