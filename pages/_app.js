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
				setLoading(true);
				const cookie = document.cookie;
				const cookieValue = cookie.split('=')[1];
				console.log({ isLoggedIn, cookieValue });

				// if (isLoggedIn) {
				// 	router.push('/');
				// }
				// if (!isLoggedIn) {
				// 	router.push('/login');
				// }
				if (!cookieValue || !isLoggedIn) {
					router.push('/login');
				} else {
					router.push('/');
				}

				// console.log(isLoggedIn); // => `true` or `false`
			} catch (err) {
				console.error('AUTH ERROR from _app.js', err.message);
			}
		};
		userStatus();
	}, []);

	useEffect(() => {
		const routeStart = () => setLoading(true);
		const routeEnd = () => setLoading(false);
		router.events.on('routeChangeStart', routeStart);
		router.events.on('routeChangeComplete', routeEnd);
		return () => {
			router.events.off('routeChangeStart', routeStart);
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
