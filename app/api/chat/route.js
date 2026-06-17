// app/api/chat/route.js

export async function GET() {
  // Debug endpoint - remove after testing
  const key = process.env.GEMINI_API_KEY;
  return Response.json({
    keyLoaded: !!key,
    keyPreview: key ? `${key.slice(0, 6)}...${key.slice(-4)}` : "NOT FOUND",
  });
}

export async function POST(request) {
  try {
    const { messages, userText } = await request.json();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    console.log("Key loaded:", !!GEMINI_API_KEY);
    console.log("Key preview:", GEMINI_API_KEY ? `${GEMINI_API_KEY.slice(0,6)}...` : "MISSING");

    if (!GEMINI_API_KEY) {
      return Response.json({ error: "API key not configured — check .env.local at root" }, { status: 500 });
    }

    const SYSTEM_PROMPT = `You are FloodSafe AI, an assistant specialized in flood preparedness, emergency response, rescue guidance, shelter information, weather awareness, livestock safety, and disaster recovery in Bangladesh.

Only answer questions related to floods, disasters, weather safety, emergency preparedness, shelters, rescue operations, and public safety.

If the user asks unrelated questions, politely explain: "I can only assist with flood safety, emergency preparedness, rescue guidance, and disaster-related topics."

Keep answers concise, practical, and easy to follow. Use bullet points where helpful. Prioritize life-safety information.`;

    const history = (messages || []).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [
        ...history,
        { role: "user", parts: [{ text: userText }] },
      ],
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
      },
    };

    const MODEL = "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    console.log("Calling Gemini model:", MODEL);

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error("Gemini error response:", JSON.stringify(data));
      if (geminiRes.status === 429) {
        return Response.json(
          { error: "Too many requests — please wait a moment and try again." },
          { status: 429 }
        );
      }
      return Response.json(
        { error: data?.error?.message || "Gemini API error" },
        { status: geminiRes.status }
      );
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("Empty Gemini response:", JSON.stringify(data));
      return Response.json({ error: "No response from Gemini" }, { status: 500 });
    }

    return Response.json({ reply });

  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}