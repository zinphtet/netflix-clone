import React, { useState, useEffect } from 'react';
import style from './Login.module.css';
import Image from 'next/image';
import Head from 'next/head';
import { m } from '../../magic/magic';
import { useRouter } from 'next/router';
const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [isLoading, setLoading] = useState(false);
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			const didToken = await m.auth.loginWithMagicLink({
				email,
			});

			if (didToken) {
				const res = await fetch('/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${didToken} `,
					},
				});
				const data = await res.json();
				if (data.done) {
					router.push('/');
				} else {
					console.error('Error sending request to Login Api');
				}
			}
		} catch (err) {
			setLoading(false);
			console.error('Error login in With Email ', err.message);
		}
	};

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

	return (
		<>
			<Head>
				<title>Netflix | SignIn</title>
			</Head>
			<div className={`${style.login} `}>
				<div className={`${style.login_wrapper} container`}>
					<div className={`${style.img_container}  `}>
						<Image
							src="/netflix.svg"
							layout="fill"
							objectFit="contain"
							alt="Netflix logo"
						/>
					</div>
					<form className={style.form} onSubmit={handleLogin}>
						<h5>Sign In</h5>
						<input
							value={email}
							onChange={handleEmail}
							type="email"
							required
							placeholder="Enter your Email"
						/>
						<button className={style.signin_btn} type="submit">
							{isLoading ? 'Loading...' : 'Sign In'}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
