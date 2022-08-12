import { Magic } from 'magic-sdk';

// export const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY);
const createMagic = () => {
	return (
		typeof window !== 'undefined' &&
		new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY)
	);
};
// export const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY);
export const m = createMagic();
