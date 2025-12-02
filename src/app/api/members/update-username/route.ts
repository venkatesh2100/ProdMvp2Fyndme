export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URI as string;
const dbName = "test";
const collectionName = "admin-portfoliodb";

if (!uri) {
  throw new Error("Please define MONGO_URI in .env");
}

// Re-use existing DB connection
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}

const clientPromise = globalWithMongo._mongoClientPromise;

/**
 * POST /api/members/update-username
 * body: { memberId?: string, username: string }
 */
export async function POST(req: Request) {
  try {
    const { memberId, username } = await req.json();

    if (!memberId || !username) {
      return NextResponse.json(
        { success: false, error: "memberId and username are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.updateOne(
      { _id: new ObjectId(memberId) },
      { $set: { Username: username.trim() } }
    );

    return NextResponse.json({ success: true, username: username.trim() });
  } catch (error) {
    console.error("Error updating username:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update username" },
      { status: 500 }
    );
  }
}
