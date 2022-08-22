import { Magic } from '@magic-sdk/admin';

export const magicAdmin = new Magic(process.env.MAGIC_SERVER_KEY); // ✨

// const metadata = await mAdmin.users.getMetadataByToken(DIDToken);
