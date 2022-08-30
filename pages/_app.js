import '../styles/globals.css';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Loading from '../components/Loading/Loading';
import { m } from '../magic/magic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const userStatus = async () => {
			try {
				const isLoggedIn = await m.user.isLoggedIn();
				const cookie = document.cookie;
				const cookieValue = cookie.split('=')[1];
				console.log({
					cookieValue,
				});
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
			setLoading(false);
			NProgress.start();
		};
		router.events.on('routeChangeStart', startRoute);
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());
		return () => {
			router.events.off('routeChangeStart', () => NProgress.start());
			router.events.off('routeChangeComplete', () => NProgress.done());
			router.events.off('routeChangeError', () => NProgress.done());
		};
	}, [router]);
	if (loading) return <Loading />;

	return <Component {...pageProps} />;
}

export default MyApp;

{
	/* <Component {...pageProps} /> */
}
