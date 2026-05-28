import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-4-5-20250929";

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
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "ANTHROPIC_API_KEY is not configured." },
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

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: validMessages.map((m) => ({
        role: m.role,
        content: m.content.trim(),
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply =
      textBlock && textBlock.type === "text"
        ? textBlock.text
        : "I couldn't generate a response. Please try again.";

    return Response.json({ message: reply });
  } catch (error) {
    console.error("[/api/chat]", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate response.";
    return Response.json({ error: message }, { status: 500 });
  }
}
