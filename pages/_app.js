import '../styles/globals.css';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Loading from '../components/Loading/Loading';
import { m } from '../magic/magic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const userStatus = async () => {
			try {
				const isLoggedIn = await m.user.isLoggedIn();
				const cookie = document.cookie;
				const cookieValue = cookie.split('=')[1];

				if (!cookieValue || !isLoggedIn) {
					router.push('/login');
				} else {
					router.push('/');
				}
			} catch (err) {
				console.error('AUTH ERROR from _app.js', err.message);
			}
		};
		userStatus();
	}, []);

	useEffect(() => {
		const startRoute = () => {
			NProgress.start();
			return <Loading />;
		};
		router.events.on('routeChangeStart', startRoute);
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.off('routeChangeError', () => NProgress.done());
		return () => {
			router.events.off('routeChangeStart', () => NProgress.start());
			router.events.off('routeChangeComplete', () => NProgress.done());
		};
	}, [router]);

	return <Component {...pageProps} />;
}

export default MyApp;

{
	/* <Component {...pageProps} /> */
}
