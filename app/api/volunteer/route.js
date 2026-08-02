// app/api/volunteer/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

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

// POST /api/volunteer — save new application
export async function POST(req) {
  try {
    const formData = await req.formData();

    const doc = {
      name:             formData.get("name"),
      email:            formData.get("email"),
      phone:            formData.get("phone"),
      age:              Number(formData.get("age")),
      gender:           formData.get("gender"),
      district:         formData.get("district"),
      upazila:          formData.get("upazila"),
      address:          formData.get("address"),
      occupation:       formData.get("occupation"),
      emergencyContact: formData.get("emergencyContact"),
      skills:           JSON.parse(formData.get("skills") || "[]"),
      experience:       formData.get("experience"),
      availability:     formData.get("availability"),
      // TODO: upload photo & nid to Cloudinary, save URLs here
      photo:            null,
      nid:              null,
      status:           "Pending",   // Pending | Approved | Rejected
      rejectionReason:  null,
      createdAt:        new Date(),
      approvedAt:       null,
    };

    const db  = await getDb();
    const col = db.collection("volunteers");
    const result = await col.insertOne(doc);

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("Volunteer POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET /api/volunteer — fetch all (admin use)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status   = searchParams.get("status");   // Pending | Approved | Rejected
    const district = searchParams.get("district");

    const filter = {};
    if (status)   filter.status   = status;
    if (district) filter.district = district;

    const db  = await getDb();
    const col = db.collection("volunteers");
    const volunteers = await col.find(filter).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data: volunteers });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}