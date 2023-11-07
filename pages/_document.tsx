import Document, { Html, Head, Main, NextScript } from 'next/document';

// TODO: 프로젝트마다 다르게 설정하기
export const title = '웹사이트 제목';
export const description = '웹사이트 설명';
export const thumbnailImageUrl = '';
export const url = '';
export const naverSiteVerification = '';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<meta name="format-detection" content="telephone=yes" />
					<meta name="naver-site-verification" content={naverSiteVerification} />
					<meta name="robots" content="index,follow" />
					<meta name="description" content={description} />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={thumbnailImageUrl} />
					<meta property="og:url" content={url} />
					<link rel="apple-touch-icon" sizes="57x57" href="/favicon.ico/apple-icon-57x57.png" />
					<link rel="apple-touch-icon" sizes="60x60" href="/favicon.ico/apple-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/favicon.ico/apple-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/favicon.ico/apple-icon-76x76.png" />
					<link rel="apple-touch-icon" sizes="114x114" href="/favicon.ico/apple-icon-114x114.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/favicon.ico/apple-icon-120x120.png" />
					<link rel="apple-touch-icon" sizes="144x144" href="/favicon.ico/apple-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/favicon.ico/apple-icon-152x152.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico/apple-icon-180x180.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/favicon.ico/android-icon-192x192.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico/favicon-16x16.png" />
					<link rel="manifest" href="/favicon.ico/manifest.json" />
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="msapplication-TileImage" content="/favicon.ico/ms-icon-144x144.png" />
					<meta name="theme-color" content="#ffffff" />
					<link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css" />

					{/* 폰트로드 */}
					<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

					<script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charSet="utf-8" async />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
