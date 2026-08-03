// app/api/admin/login/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    // Compare with .env.local ADMIN_PASSWORD
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Set httpOnly cookie — browser cannot read or modify this
    const cookieStore = await cookies();
    cookieStore.set("admin_session", process.env.ADMIN_SECRET, {
      httpOnly: true,       // JS cannot access
      secure:   process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:   60 * 60 * 8, // 8 hours
      path:     "/",
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}