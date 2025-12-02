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
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, { ignoreUndefined: true });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise!;

type Status = "Verified" | "Not Verified" | "In Progress" | "Blocked";

export async function POST(req: Request) {
  try {
    const { memberId, index, status } = (await req.json()) as {
      memberId?: string;
      index?: number;
      status?: Status;
    };

    if (!memberId || typeof index !== "number" || index < 0 || !status) {
      return NextResponse.json(
        { success: false, error: "memberId, index, and status are required" },
        { status: 400 }
      );
    }

    const allowed: Status[] = ["Verified", "Not Verified", "In Progress", "Blocked"];
    if (!allowed.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const col = client.db(dbName).collection(collectionName);

    const _id = new ObjectId(memberId);

    // Save exact status at row level and top-level pill
    const overall = status;

    const updateResult = await col.updateOne(
      { _id },
      {
        $set: {
          [`portfolios.${index}.status`]: status,
          "Portfolio Verification": overall,
        },
      }
    );

    // If index doesn't exist, upsize and retry once
    if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 0) {
      const doc = await col.findOne({ _id }, { projection: { portfolios: 1 } });
      const portfolios: any[] = Array.isArray(doc?.portfolios) ? doc!.portfolios : [];
      while (portfolios.length <= index) portfolios.push({});
      portfolios[index] = { ...(portfolios[index] || {}), status };

      await col.updateOne(
        { _id },
        {
          $set: {
            portfolios,
            "Portfolio Verification": overall,
          },
        }
      );
    }

    return NextResponse.json({
      success: true,
      statusSaved: status,
      overallSaved: overall,
    });
  } catch (e: any) {
    console.error("update-verification error:", e);
    return NextResponse.json(
      { success: false, error: e?.message || "Internal error" },
      { status: 500 }
    );
  }
}
