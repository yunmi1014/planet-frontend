import React from 'react';
import { AppProps } from 'next/app';
import { Box, ChakraProvider, CSSReset, useEditable } from '@chakra-ui/react';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { QueryParamProvider } from 'use-query-params';
import NextAdapterPages from 'next-query-params/pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthStateChanged from '../src/components/AuthStateChanged';
import { UserAgent } from '../src/utils/userAgent';
import Head from 'next/head';
import { title } from './_document';
import '../src/styles/globals.css';
import { theme } from '../src/theme';

if (process.env.NODE_ENV === 'development') {
	RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0" />
			</Head>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<RecoilRoot>
						<QueryParamProvider adapter={NextAdapterPages}>
							<CSSReset />
							<Box overflowX={'hidden'}>
								<AuthStateChanged />
								<Component {...pageProps} />
							</Box>
						</QueryParamProvider>
					</RecoilRoot>
					<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
				</QueryClientProvider>
			</ChakraProvider>
		</>
	);
};

App.getInitialProps = async ({ ctx }) => {
	// useAgent 확인하기
	const { isMobile, isInApp, isLine } = UserAgent.getUserAgent(ctx);

	return { pageProps: { isMobile, isInApp, isLine } };
};

export default App;
