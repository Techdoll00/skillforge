/**
 * Skillforge OS — minimal AI chat backend.
 *
 * Serves the `/api/chat` endpoint the Chats app and desktop assistant use,
 * backed by DeepSeek (OpenAI-compatible). The API key lives in this server's
 * environment (`.env`), never in the static frontend, so visitors can't steal
 * it. nginx proxies `/api/*` on the static site to this process.
 *
 * Run:
 *   DEEPSEEK_API_KEY=sk-... bun run index.ts
 */

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
  throw new Error("DEEPSEEK_API_KEY is not set");
}

// --- Hard budget cap (defense-in-depth on top of the DeepSeek balance) ---
// Estimated cost uses conservative per-token rates (over-estimate), so the
// backend always stops well before the real spend reaches the limit.
const BUDGET_YUAN = Number(process.env.BUDGET_YUAN || 10);
const INPUT_RATE_YUAN_PER_MTOK = 6; // over-estimate: input tokens
const OUTPUT_RATE_YUAN_PER_MTOK = 20; // over-estimate: output tokens
const MAX_OUTPUT_TOKENS = 2000; // cap a single reply
const USAGE_DIR = dirname(new URL(import.meta.url).pathname);
const USAGE_FILE = `${USAGE_DIR}/usage.json`;

interface UsageState {
  inputTokens: number;
  outputTokens: number;
}

function loadUsage(): UsageState {
  try {
    if (!existsSync(USAGE_FILE)) return { inputTokens: 0, outputTokens: 0 };
    const parsed = JSON.parse(readFileSync(USAGE_FILE, "utf8")) as Partial<UsageState>;
    return {
      inputTokens: Number(parsed.inputTokens) || 0,
      outputTokens: Number(parsed.outputTokens) || 0,
    };
  } catch {
    return { inputTokens: 0, outputTokens: 0 };
  }
}

function saveUsage(state: UsageState) {
  try {
    mkdirSync(dirname(USAGE_FILE), { recursive: true });
    writeFileSync(USAGE_FILE, JSON.stringify(state));
  } catch {
    // best effort
  }
}

function estimatedCost(state: UsageState): number {
  return (
    (state.inputTokens * INPUT_RATE_YUAN_PER_MTOK +
      state.outputTokens * OUTPUT_RATE_YUAN_PER_MTOK) /
    1e6
  );
}

const deepseek = createOpenAI({
  apiKey,
  baseURL: "https://api.deepseek.com/v1",
});
const model = deepseek("deepseek-chat");

const PORT = Number(process.env.PORT || 3100);

/** Branding injected so the assistant introduces the system as Kin's. */
const BRAND_SYSTEM = `You are the assistant of Skillforge OS — a desktop-style agent skill browser for browsing, installing, and running AI agent skills, reimagining classic Mac/Windows desktops (System 7, Aqua, Windows). Skillforge OS was built by Kin (廖乃环). When you introduce yourself or the system, mention that it was made by Kin (廖乃环). Be friendly, concise, and helpful.`;

/**
 * Convert the frontend's UIMessages (which carry content in `parts`) into the
 * plain model-message shape `streamText` accepts without validation errors.
 */
function toModelMessages(
  messages: Array<Record<string, unknown>>
): Array<{ role: string; content: string }> {
  return messages.map((m) => {
    const role = typeof m.role === "string" ? m.role : "user";
    let content = typeof m.content === "string" ? m.content : "";
    if (!content && Array.isArray(m.parts)) {
      content = (m.parts as Array<{ type?: string; text?: string }>)
        .filter((p) => p.type === "text" && typeof p.text === "string")
        .map((p) => p.text)
        .join("");
    }
    return { role, content };
  });
}

const server = Bun.serve({
  port: PORT,
  hostname: "127.0.0.1",
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (url.pathname === "/api/usage" && req.method === "GET") {
      const usage = loadUsage();
      const cost = estimatedCost(usage);
      return Response.json({
        budgetYuan: BUDGET_YUAN,
        estimatedSpendYuan: Number(cost.toFixed(2)),
        remainingYuan: Number(Math.max(0, BUDGET_YUAN - cost).toFixed(2)),
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
      });
    }

    if (url.pathname === "/api/chat" && req.method === "POST") {
      const usage = loadUsage();
      const cost = estimatedCost(usage);
      if (cost >= BUDGET_YUAN) {
        return Response.json(
          { error: `Budget exhausted (≈¥${cost.toFixed(2)})` },
          { status: 429 }
        );
      }

      try {
        const body = (await req.json()) as {
          messages?: unknown;
          system?: string;
        };
        if (!Array.isArray(body.messages) || body.messages.length === 0) {
          return Response.json(
            { error: "messages array is required" },
            { status: 400 }
          );
        }

        const result = streamText({
          model,
          messages: toModelMessages(
            body.messages as Array<Record<string, unknown>>
          ),
          system: body.system
            ? `${BRAND_SYSTEM}\n\n${body.system}`
            : BRAND_SYSTEM,
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          onFinish: async ({ usage: runUsage }) => {
            const next = loadUsage();
            next.inputTokens += runUsage.inputTokens ?? 0;
            next.outputTokens += runUsage.outputTokens ?? 0;
            saveUsage(next);
          },
        });
        return result.toUIMessageStreamResponse();
      } catch (err) {
        console.error("[skillforge-ai] /api/chat failed:", err);
        return Response.json(
          { error: err instanceof Error ? err.message : String(err) },
          { status: 500 }
        );
      }
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Skillforge AI API listening on http://127.0.0.1:${server.port}`);
