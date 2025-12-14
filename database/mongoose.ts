import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

declare global {
	var mongooseCache: {
		conn: typeof mongoose | null;
		promise: Promise<typeof mongoose> | null;
	};
}

let cached = global.mongooseCache;

if (!cached) {
	cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<typeof mongoose> => {
	// Only skip DB when `SKIP_DB=true` AND there is no `MONGODB_URI` available.
	// This lets production runtime (where MONGODB_URI is set) connect to the
	// real DB even if SKIP_DB was used for build/preview steps.
	if (process.env.SKIP_DB === 'true' && !process.env.MONGODB_URI) {
		console.log('SKIP_DB=true and no MONGODB_URI — skipping MongoDB connection (build-time)');
		const fakeDb = {
			collection: (_name: string) => ({
				findOne: async () => null,
				find: () => ({ toArray: async () => [] }),
				insertOne: async () => ({}),
				updateOne: async () => ({}),
				deleteOne: async () => ({}),
				createIndex: async () => undefined,
			}),
		};

		const fakeMongoose = {
			connection: { db: fakeDb },
		} as unknown as typeof mongoose;

		return fakeMongoose;
	}

	if (process.env.SKIP_DB === 'true' && process.env.MONGODB_URI) {
		console.log('SKIP_DB=true but MONGODB_URI present — overriding SKIP_DB to connect to MongoDB (runtime)');
	}

	if (!MONGODB_URI) {
		throw new Error('MONGODB_URI must be defined');
	}

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
	}

	try {
		cached.conn = await cached.promise;
	} catch (err) {
		cached.promise = null;
		throw err;
	}

	console.log(`Connected to MongoDB (${process.env.NODE_ENV})`);
	return cached.conn!;
};
