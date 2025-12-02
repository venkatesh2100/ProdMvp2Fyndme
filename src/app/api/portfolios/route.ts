import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const uri = process.env.MONGO_URI as string;
const dbName = "test";
const collectionName = "admin-portfoliodb";

if (!uri) {
  throw new Error("Please define MONGO_URI in .env");
}

let clientPromise: Promise<MongoClient>;
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise_block: Promise<MongoClient> | undefined;
}
if (!global._mongoClientPromise_block) {
  const client = new MongoClient(uri, { ignoreUndefined: true });
  global._mongoClientPromise_block = client.connect();
}
clientPromise = global._mongoClientPromise_block!;

export async function POST(req: Request) {
  try {
    const { memberId, index } = (await req.json()) as {
      memberId?: string;
      index?: number;
    };

    if (!memberId || typeof index !== "number" || index < 0) {
      return NextResponse.json(
        { success: false, error: "memberId and index are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const col = client.db(dbName).collection(collectionName);
    const _id = new ObjectId(memberId);

    // Save exact "Blocked" at row and at top-level pill
    const status = "Blocked";

    const result = await col.updateOne(
      { _id },
      {
        $set: {
          [`portfolios.${index}.status`]: status,
          "Portfolio Verification": status,
        },
      }
    );

    if (result.matchedCount === 1 && result.modifiedCount === 0) {
      const doc = await col.findOne({ _id }, { projection: { portfolios: 1 } });
      const portfolios: any[] = Array.isArray(doc?.portfolios) ? doc!.portfolios : [];
      while (portfolios.length <= index) portfolios.push({});
      portfolios[index] = { ...(portfolios[index] || {}), status };

      await col.updateOne(
        { _id },
        {
          $set: {
            portfolios,
            "Portfolio Verification": status,
          },
        }
      );
    }

    return NextResponse.json({
      success: true,
      statusSaved: status,
      overallSaved: status,
    });
  } catch (e: any) {
    console.error("block-portfolio error:", e);
    return NextResponse.json(
      { success: false, error: e?.message || "Internal error" },
      { status: 500 }
    );
  }
}
