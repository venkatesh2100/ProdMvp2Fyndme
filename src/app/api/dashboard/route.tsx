import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGO_URI as string;
const dbName = 'test';
const collectionName = 'admin-metrics';

if (!uri) {
  throw new Error('Please define MONGO_URI in .env.local');
}

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}

const clientPromise = globalWithMongo._mongoClientPromise;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const timeFrame = url.searchParams.get("timeFrame") || "yearly";

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const data = await db.collection(collectionName).findOne({ timeFrame });

    if (!data) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ MongoDB fetch error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
