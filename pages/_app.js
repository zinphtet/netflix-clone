import '../styles/globals.css';
import Loading from '../components/Loading/Loading';
import { m } from '../magic/magic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }) {
	const router = useRouter();

	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const userStatus = async () => {
			try {
				const isLoggedIn = await m.user.isLoggedIn();
				// setAuthReady(true);
				// setUser(isLoggedIn);
				// setLoading(true);
				if (isLoggedIn) {
					router.push('/');
					// setLoading(false);
				}
				if (!isLoggedIn) {
					router.push('/login');
					// setLoading(false);
				}
				// setLoading(false);
				console.log(isLoggedIn); // => `true` or `false`
			} catch (err) {
				// setAuthReady(true);
				console.error('AUTH ERROR from _app.js', err.message);
			}
		};
		userStatus();
	}, []);

	useEffect(() => {
		// const routeStart = () => setLoading(true);
		const routeEnd = () => setLoading(false);
		router.events.on('routeChangeComplete', routeEnd);
		// router.events.off('Route Change Start', routeEnd);
		router.events.on('routeChangeError', routeEnd);
		return () => {
			router.events.off('routeChangeComplete', routeEnd);
			router.events.off('routeChangeError', routeEnd);
		};
	}, [router]);

	if (isLoading) return <Loading />;
	return <Component {...pageProps} />;
}

export default MyApp;

{
	/* <Component {...pageProps} /> */
}
