// app/api/auth/route.js
// Called after Firebase login/register to sync user with MongoDB

import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// POST /api/auth — create user in MongoDB if not exists, return role
export async function POST(req) {
  try {
    const { uid, name, email, photo } = await req.json();

    if (!uid || !email) {
      return NextResponse.json({ error: "uid and email required" }, { status: 400 });
    }

    const db  = await getDb();
    const col = db.collection("users");

    // Check if user already exists
    const existing = await col.findOne({ uid });

    if (existing) {
      // User exists — just return their role
      return NextResponse.json({
        success: true,
        role:    existing.role,
        name:    existing.name,
        email:   existing.email,
      });
    }

    // New user — save with default role "user"
    const newUser = {
      uid,
      name:      name || "Unknown",
      email,
      photo:     photo || null,
      role:      "user",      // ← default. Change to "admin" in MongoDB for yourself
      createdAt: new Date(),
    };

    await col.insertOne(newUser);

    return NextResponse.json({
      success: true,
      role:    "user",
      name:    newUser.name,
      email:   newUser.email,
    }, { status: 201 });

  } catch (err) {
    console.error("Auth API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET /api/auth?uid=xxx — fetch user role
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) return NextResponse.json({ error: "uid required" }, { status: 400 });

    const db   = await getDb();
    const user = await db.collection("users").findOne({ uid });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      role:    user.role,
      name:    user.name,
      email:   user.email,
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}