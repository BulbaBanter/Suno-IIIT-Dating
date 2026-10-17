import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Sarvam API key is not configured." }, { status: 500 });
  }

  const { names = ["you", "your match"], languages = "English" } = await request.json();
  const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": apiKey,
    },
    body: JSON.stringify({
      model: "sarvam-105b-conversations",
      temperature: 0.8,
      max_tokens: 90,
      messages: [
        {
          role: "system",
          content:
            "You write warm, specific first-call icebreakers for consenting college students. Keep it safe, playful, and under 35 words. Never assume personal facts or suggest meeting in private.",
        },
        {
          role: "user",
          content: `Create one opening prompt for ${names[0]} and ${names[1]}. They share ${languages}, are at IIIT Hyderabad, and have matched through voice introductions.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Suno could not create an icebreaker right now." }, { status: response.status });
  }

  const result = await response.json();
  return NextResponse.json({ icebreaker: result.choices?.[0]?.message?.content ?? "Tell each other about a campus ritual you secretly love." });
}
