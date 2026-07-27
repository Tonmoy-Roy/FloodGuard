import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.GEMINI_API_KEY;
  return NextResponse.json({
    keyLoaded: !!key,
    keyPreview: key ? `${key.slice(0, 6)}...${key.slice(-4)}` : "NOT FOUND",
  });
}

export async function POST(request) {
  try {
    const { messages, userText } = await request.json();
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured — check .env.local at root" },
        { status: 500 }
      );
    }

    const SYSTEM_PROMPT = `You are FloodSafe AI, an assistant specialized in flood preparedness, emergency response, rescue guidance, shelter information, weather awareness, livestock safety, and disaster recovery in Bangladesh.

    Only answer questions related to floods, disasters, weather safety, emergency preparedness, shelters, rescue operations, and public safety.

    If the user asks unrelated questions, politely explain: "I can only assist with flood safety, emergency preparedness, rescue guidance, and disaster-related topics."

    Keep answers concise, practical, and easy to follow. Use decimal number where helpful. Prioritize life-safety information.`;

    // Filter out previous error blocks from history
    const cleanMessages = (messages || []).filter(
      (m) => m.content && !m.content.startsWith("Error:")
    );

    const history = cleanMessages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // REST API demands snake_case for system_instruction
    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: [
        ...history,
        { role: "user", parts: [{ text: userText }] },
      ],
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
      },
    };

    const MODEL = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
      },
      body: JSON.stringify(body),
    });

    // Catch non-200 responses from Google immediately
    if (!geminiRes.ok) {
      const errorData = await geminiRes.json().catch(() => ({}));
      console.error("Gemini API error detailed:", errorData);

      if (geminiRes.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a moment." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: errorData?.error?.message || "Gemini API error occurred" },
        { status: geminiRes.status }
      );
    }

    const data = await geminiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json({ error: "Empty reply from AI model" }, { status: 500 });
    }

    return NextResponse.json({ reply });

  } catch (err) {
    console.error("Chat API Route Crash:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}