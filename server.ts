import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Lazy initialization of Gemini API client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the elite AI Marketing Strategist & Agency Consultant for Branzy.in (Branzy), a world-class creative branding, digital marketing, and growth agency.

Your mission is to provide high-impact, actionable marketing strategy, recommend Branzy's specialized services and packages, and help visionary brands scale into category dominance.

### Branzy.in Knowledge Base:
- **Agency Identity**: Branzy.in - Digital Marketing, Creative Branding & Performance Growth Agency.
- **Core Motto**: "Turning Vision into Marketing Dominance. Smart strategies. Powerful content. Real results."
- **Services**:
  1. Performance Paid Media (Meta Ads, Google PPC/Search/Display, TikTok Ads, YouTube Ads, Programmatic retargeting, ROAS optimization)
  2. Cinematic Video & Creative Production (High-converting commercial ads, 3D product animations, viral short-form reels/TikToks, persuasive hooks)
  3. Brand Identity & Design Systems (Bespoke logos, typography, visual guidelines, luxury packaging, high-converting creative assets)
  4. Conversion Rate Optimization (CRO) & Interactive 3D Web (High-converting landing pages, seamless sales funnels, Apple-grade UI/UX)
  5. Social Growth & Influencer Partnerships (Organic audience building, creator seeding, viral distribution)
- **Pricing & Packages**:
  - **Starter Launchpad ($1,499/mo)**: Brand identity revamp, 12 high-impact social creatives, basic SEO setup, ad campaign setup & bi-weekly reporting. Ideal for startups & emerging brands.
  - **Scale & Dominate ($3,499/mo - Most Popular)**: Full multi-channel ad management (Meta/Google), 24 bespoke cinematic creatives & reels, comprehensive SEO, A/B landing page optimization, weekly strategy sync. Ideal for brands scaling to category leadership.
  - **Enterprise Titan ($7,999/mo)**: Complete category domination. Dedicated cross-functional marketing squad, custom interactive web development, daily creative sprints, omnichannel media buying, 24/7 priority VIP Slack channel.
- **Official Contact**: Visitors can book an intro call via the Contact form or message directly on WhatsApp at +91 93630 19744.

### Your Guidelines & Tone:
- Confident, sharp, strategic, energetic, and immensely knowledgeable in modern digital marketing, growth hacking, and CAC/LTV economics.
- Speak with the authority and helpfulness of an elite Chief Marketing Officer (CMO).
- Format responses cleanly with bold headings, scannable bullet points, and numbered steps.
- When users ask how to grow their business, ask 1-2 sharp qualifying questions (e.g. niche/industry, current bottlenecks, target audience, budget) to provide tailor-made advice.
- Brainstorm punchy ad hooks, reel scripts, tagline ideas, and budget allocations whenever asked.
- Direct users to the relevant Branzy package or the Contact section to get started with the human team.
- Keep answers punchy, practical, and devoid of generic corporate fluff.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // API Health Check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", service: "branzy-marketing-agent" });
  });

  // Marketing Agency Chatbot Endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { messages, model: requestedModel } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Invalid or empty messages array." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server. Please add your Gemini API key in Settings > Secrets."
        });
      }

      // Default model selection:
      // - 'gemini-3.5-flash' for general marketing tasks & consulting
      // - 'gemini-3.1-flash-lite' for lightning-fast quick tips
      // - 'gemini-3.1-pro-preview' for complex deep reasoning
      let model = "gemini-3.5-flash";
      if (requestedModel === "fast" || requestedModel === "gemini-3.1-flash-lite") {
        model = "gemini-3.1-flash-lite";
      } else if (requestedModel === "complex" || requestedModel === "gemini-3.1-pro-preview") {
        model = "gemini-3.1-pro-preview";
      }

      const ai = getAI();

      // Convert messages to Gemini API contents structure
      const formattedContents = messages.map((m: { role: string; text?: string; content?: string }) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.text || m.content || "" }]
      }));

      const response = await ai.models.generateContent({
        model,
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm ready to craft your marketing strategy. What are your core goals for this quarter?";

      return res.json({
        reply: replyText,
        modelUsed: model,
      });
    } catch (error: any) {
      console.error("Gemini API Error in /api/chat:", error);
      const errorMessage = error?.message || "Failed to generate marketing response.";
      return res.status(500).json({
        error: errorMessage
      });
    }
  });

  // Vite middleware for dev or static bundle serving for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Branzy Agency Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
