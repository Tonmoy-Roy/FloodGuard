import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "floodguard";

let client;
async function getDb() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured. Add your MongoDB Atlas connection string to .env.local.");
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(dbName);
}

export async function PATCH(req, { params }) {
  try {
    const { id }   = await params;
    const { status, rejectionReason } = await req.json();

    if (!["Approved", "Rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const update = {
      $set: {
        status,
        rejectionReason: rejectionReason || null,
        approvedAt: status === "Approved" ? new Date() : null,
      },
    };

    const db  = await getDb();
    const col = db.collection("volunteers");
    await col.updateOne({ _id: new ObjectId(id) }, update);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params; 
    const db  = await getDb();
    await db.collection("volunteers").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}