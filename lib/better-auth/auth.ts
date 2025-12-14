import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { connectToDatabase } from '@/database/mongoose';
import { nextCookies } from 'better-auth/next-js';

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
	if (authInstance) return authInstance;

	const mongoose = await connectToDatabase();
	const db = mongoose.connection.db;

	if (!db) throw new Error('MongoDB connection not found');

	authInstance = betterAuth({
		database: mongodbAdapter(db),
		secret: process.env.BETTER_AUTH_SECRET,
		baseURL: process.env.BETTER_AUTH_URL,
		emailAndPassword: {
			enabled: true,
			disableSignUp: false,
			requireEmailVerification: false,
			minPasswordLength: 8,
			maxPasswordLength: 128,
			autoSignIn: true,
		},
		plugins: [nextCookies()],
	});

	return authInstance;
};

// NOTE: Do not initialize `auth` at module load time (top-level await).
// Server components may be evaluated at build-time; call `getAuth()` at
// runtime where needed to ensure a real MongoDB connection is used.
