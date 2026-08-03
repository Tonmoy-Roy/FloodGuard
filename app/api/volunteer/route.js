// app/api/volunteer/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "floodguard";

let client;
async function getDb() {
  if (!uri) throw new Error("MONGODB_URI is not configured.");
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(dbName);
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file buffer to Cloudinary
async function uploadToCloudinary(file, folder, resourceType = "auto") {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        access_mode: "public",  // ← public করো
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
}

// POST /api/volunteer — save new application
export async function POST(req) {
  try {
    const formData = await req.formData();

    // Upload photo
    let photoUrl = null;
    const photoFile = formData.get("photo");
    if (photoFile && photoFile.size > 0) {
      photoUrl = await uploadToCloudinary(photoFile, "floodguard/volunteers/photos");
    }

    // Upload NID
    let nidUrl = null;
    const nidFile = formData.get("nid");
    if (nidFile && nidFile.size > 0) {
      // সব file ই image হিসেবে upload করো
      // PDF হলেও Cloudinary image convert করবে
      nidUrl = await uploadToCloudinary(
        nidFile,
        "floodguard/volunteers/nids",
        "auto"  // ← "raw" বা "image" না, শুধু "auto"
      );
    }

    const doc = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      age: Number(formData.get("age")),
      gender: formData.get("gender"),
      district: formData.get("district"),
      upazila: formData.get("upazila"),
      address: formData.get("address"),
      occupation: formData.get("occupation"),
      emergencyContact: formData.get("emergencyContact"),
      skills: JSON.parse(formData.get("skills") || "[]"),
      experience: formData.get("experience"),
      availability: formData.get("availability"),
      photo: photoUrl,   // Cloudinary URL
      nid: nidUrl,     // Cloudinary URL
      status: "Pending",
      rejectionReason: null,
      createdAt: new Date(),
      approvedAt: null,
    };

    const db = await getDb();
    const result = await db.collection("volunteers").insertOne(doc);

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });

  } catch (err) {
    console.error("Volunteer POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET /api/volunteer
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const district = searchParams.get("district");
    const email = searchParams.get("email");

    const filter = {};
    if (status) filter.status = status;
    if (district) filter.district = district;
    if (email) filter.email = email;

    const db = await getDb();
    const volunteers = await db.collection("volunteers")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    // Convert _id to string
    const data = volunteers.map(v => ({
      ...v,
      _id: v._id.toString(),
    }));

    return NextResponse.json({ success: true, data });

  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}