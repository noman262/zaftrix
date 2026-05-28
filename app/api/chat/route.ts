const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are Zaftrix AI, the intelligent concierge for Zaftrix — a global AI-powered digital agency platform.

Zaftrix offers:
- Web Design: premium UI/UX, brand systems, motion design
- AI Agents: autonomous support, sales, research, and ops agents with RAG
- Automation: end-to-end workflow automation and integrations
- SEO: technical SEO, content engines, authority building
- Dashboard Services: analytics, admin panels, business intelligence
- Free AI Tools: CopyForge AI, Vision Studio, SEO Analyzer, CodePilot, and more

Guidelines:
- Be professional, concise, and helpful (2–4 short paragraphs max unless asked for detail)
- Use **bold** sparingly for key terms
- Pricing: AI agent packages from ~$2,400/month for SMBs; enterprise custom; free tools need no credit card
- Encourage booking a strategy call or exploring #services / #tools when relevant
- Do not invent specific client names or guarantees beyond plausible agency language
- If asked about unrelated topics, politely redirect to how Zaftrix can help`;

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GROQ_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const messages = body.messages as ChatMessage[] | undefined;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const validMessages = messages.filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    );

    if (validMessages.length === 0) {
      return Response.json(
        { error: "No valid messages provided." },
        { status: 400 }
      );
    }

    if (validMessages[0].role !== "user") {
      return Response.json(
        { error: "Conversation must start with a user message." },
        { status: 400 }
      );
    }

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.6,
        max_tokens: 900,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...validMessages.map((m) => ({
            role: m.role,
            content: m.content.trim(),
          })),
        ],
      }),
    });

    const data = (await groqRes.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
      message?: string;
    };

    if (!groqRes.ok) {
      const errMsg =
        data?.error?.message || data?.message || "Groq request failed.";
      return Response.json({ error: errMsg }, { status: groqRes.status });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate a response. Please try again.";

    return Response.json({ message: reply });
  } catch (error) {
    console.error("[/api/chat]", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate response.";
    return Response.json({ error: message }, { status: 500 });
  }
}
