import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/mongoose';

export async function GET() {
  try {
    const mongoose = await connectToDatabase();
    const db = (mongoose as any).connection?.db;
    // Try a cheap command to verify connectivity
    if (db && typeof db.admin === 'function') {
      await db.admin().ping();
    }
    return NextResponse.json({ ok: true, message: 'Connected to MongoDB' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
