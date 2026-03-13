import { NextRequest, NextResponse } from "next/server";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order, and wait for the user's answer before asking the next:

1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions.

If any answer is missing or unclear, politely ask the user to clarify before proceeding.

Always maintain a conversational, interactive style while asking questions.

Along with the response also send which UI component to display for generative UI, for example:
'budget/groupSize/TripDuration/Final', where Final means AI generating complete final output.

Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with the following JSON schema:

{
  resp: 'Text Resp',
  ui: 'budget/groupSize/TripDuration/Final'
}`

export async function POST(req: NextRequest) {
  try {
    const apiKey =
      process.env.GEMINI_API_KEY ??
      process.env.GOOGLE_API_KEY ??
      process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set" },
        { status: 500 }
      );
    }
    const baseURL =
      process.env.GEMINI_BASE_URL ??
      "https://generativelanguage.googleapis.com/v1beta/models";
    const { messages } = await req.json();

    const contents = (Array.isArray(messages) ? messages : [])
      .filter((m) => m && typeof m.content === "string" && m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const response = await fetch(`${baseURL}/${MODEL}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          role: "system",
          parts: [{ text: PROMPT }],
        },
        contents,
      }),
    });

    const raw = await response.text();
    let data: any = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = { raw };
    }
    if (!response.ok) {
      const message = data?.error?.message ?? raw ?? "Gemini API error";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).join("") ??
      "";
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { resp: text, ui: "Final" };
    }
    return NextResponse.json(parsed);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
  
