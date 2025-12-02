export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGO_URI as string;
const dbName = 'test';
const collectionName = 'admin-portfoliodb';

if (!uri) {
  throw new Error('Please define MONGO_URI in .env');
}

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}

const clientPromise = globalWithMongo._mongoClientPromise;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
  }
}

/**
 * PATCH /api/members
 * body: { id?: string, username?: string, action: 'approve'|'reject' }
 * Sets "ID Verification" to "Verified" (approve) or "Not Verified" (reject)
 */
export async function PATCH(req: Request) {
  try {
    const { id, username, action } = await req.json();

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action; must be "approve" or "reject".' },
        { status: 400 }
      );
    }

    if (!id && !username) {
      return NextResponse.json(
        { success: false, error: 'Provide id or username to identify the member.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const filter = id
      ? { _id: new ObjectId(id) }
      : { Username: username };

    const newStatus = action === 'approve' ? 'Verified' : 'Not Verified';

    const result = await collection.updateOne(filter, {
      $set: { 'ID Verification': newStatus },
    });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'No matching member found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, status: newStatus });
  } catch (error) {
    console.error('Error updating member verification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update verification status' },
      { status: 500 }
    );
  }
}
