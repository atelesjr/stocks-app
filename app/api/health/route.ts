import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/mongoose';
import type { Mongoose } from 'mongoose';
import type { Db } from 'mongodb';

export async function GET() {
  try {
    const mongooseClient = await connectToDatabase();
    const db = (mongooseClient as unknown as Mongoose).connection?.db as Db | undefined;
    // Try a cheap command to verify connectivity
    if (db && typeof db.admin === 'function') {
      await db.admin().ping();
    }
    return NextResponse.json({ ok: true, message: 'Connected to MongoDB' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
