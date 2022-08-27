import { Magic } from '@magic-sdk/admin';

export const magicAdmin = new Magic(process.env.MAGIC_SERVER_KEY);

// const metadata = await mAdmin.users.getMetadataByToken(DIDToken);

// const createMagic = () => {
// 	return (
// 		typeof window !== 'undefined' && new Magic(process.env.MAGIC_SERVER_KEY)
// 	);
// };

// export const magicAdmin = createMagic();
