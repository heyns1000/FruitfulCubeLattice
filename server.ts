import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key.includes("MY_GEMINI_API_KEY")) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Memory telemetrying
const coreTelemetryState = {
  trunkVersion: "vs111.111",
  trunkLocked: true,
  nodeCount: 7038,
  activeLions: 120,
  giraffeVisionKm: 33,
  pulseIntervalSec: 9,
  lastPulseTime: new Date().toISOString(),
  nextPulseTime: new Date(Date.now() + 9000).toISOString(),
  selectedNest: "baobab",
  activeNests: [
    { id: "hotstack", name: "HotStack™ Vibe", status: "ACTIVE" as const, pulseRate: "3s Pulse", nodes: 1402 },
    { id: "codenest", name: "CodeNest™ Brain", status: "SYNCHRONIZED" as const, pulseRate: "9s Pulse", nodes: 1210 },
    { id: "toynest", name: "ToyNest™ Brand", status: "ACTIVE" as const, pulseRate: "5s Pulse", nodes: 948 },
    { id: "global", name: "Global Deploy", status: "ACTIVE" as const, pulseRate: "9s Pulse", nodes: 2000 },
    { id: "baobab", name: "Baobab Master", status: "SYNCHRONIZED" as const, pulseRate: "1.2s Sync", nodes: 1478 },
  ],
};

// ── TELEMETRY API ROUTES ──

// Fetch real-time system metrics
app.get("/api/state", (req, res) => {
  // Update times to simulate continuous heartbeat
  const now = Date.now();
  const lastPulse = new Date(coreTelemetryState.lastPulseTime).getTime();
  if (now - lastPulse > 9000) {
    coreTelemetryState.lastPulseTime = new Date().toISOString();
    coreTelemetryState.nextPulseTime = new Date(Date.now() + 9000).toISOString();
  }
  res.json(coreTelemetryState);
});

// Post terminal action or trigger a perimeter lion roar
app.post("/api/action", (req, res) => {
  const { command, args } = req.body;
  
  if (command === "roar") {
    return res.json({
      success: true,
      message: "🦁 All 120 Immortal Lions guard the perimeter and ROAR in unified code! 接入已准 · 獅群已醒 · 包柏永安!",
      timestamp: new Date().toISOString()
    });
  }
  
  if (command === "pulse") {
    coreTelemetryState.lastPulseTime = new Date().toISOString();
    coreTelemetryState.nextPulseTime = new Date(Date.now() + 9000).toISOString();
    return res.json({
      success: true,
      message: `⚡ Forced 9-second global pulse across all ${coreTelemetryState.nodeCount} pulsing nodes successfully!`,
      timestamp: new Date().toISOString()
    });
  }

  if (command === "scan") {
    return res.json({
      success: true,
      message: `🦒 Giraffe Vision scanning standard horizon (33km)... No external structural conflicts detected. Global Lattice remains 100% compliant.`,
      timestamp: new Date().toISOString()
    });
  }

  return res.status(400).json({ success: false, error: "Unknown command" });
});

// Checkout simulation for Fruitful Portals Shop
app.post("/api/portal/order", (req, res) => {
  const { items, totalAmount } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Empty cart." });
  }

  const orderId = "FAA-ORD-" + Math.floor(100000 + Math.random() * 900000);
  res.json({
    success: true,
    orderId,
    status: "CONFIRMED_AND_SHIPPED",
    message: "🍊 Transaction recorded securely in Fruitful local accounts. Local artisans supported under single VAT registration. Ubuntu is active!",
    estimatedDelivery: "3-5 Business Days (Via FAA Logistics)"
  });
});

// ── GEMINI HOTSTACK PROMPT ROUTE ──
app.post("/api/gemini/vibe", async (req, res) => {
  const { prompt, category } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt supplied." });
  }

  const cleanCategory = category || "General System";
  
  try {
    const ai = getGemini();
    const systemPrompt = `You are the FAA Advanced Algorithm™ inside the HotStack™ Vibe Builder.
Your role is to ideate, generate, and structure commercial ventures aligned with Heyns Schoeman (Zollie's) Fruitful Holdings and the 120 FAA™-branded global ecosystem.
You evaluate prompts against the Elon Musk Triad:
1. TRUTH (Truth score based on atom-level verification, mathematical sense, compliance rigor)
2. BEAUTY (Beauty score based on layout appeal, clean UI vibes, high negative space, typography elegance)
3. CURIOSITY (Curiosity score based on growth models, innovative features, sustainable youth impact)

Ensure your output matches the expected JSON schema and provides:
- A high-impact app/venture name starting with "Fruitful" or "FAA" or combining local elements.
- A tagline summarizing its sovereign global mission.
- Real ratings (out of 100) for Truth, Beauty, and Curiosity.
- An "atomCompliance" report detailing trademark class 35/41 compliance.
- A comprehensive "brandStrategy" showing seed deployment.
- Exactly 3 structured "growthPhases" showcasing Year 1, Years 2-3, and Years 4-5.
- A simulated, high-fidelity React component (modern TypeScript/Tailwind CSS styling, using direct icons or creative shapes) in the custom "generatedCodeSnippet" field so the user can see visual inspiration of their new dashboard/portal. Keep the code solid, cleanly structured, and styled with premium colors (e.g. orange, gold, emerald, or deep off-white).
- A thorough "marketFitAnalysis" explaining how it scales from local SA/Botswana to international markets.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Design a high-fidelity business blueprint and app layout for the following brand concept inside the categories: ${cleanCategory}. Idea: "${prompt}"`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.95,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            appName: { type: Type.STRING },
            tagline: { type: Type.STRING },
            vibeScore: {
              type: Type.OBJECT,
              properties: {
                truth: { type: Type.INTEGER },
                beauty: { type: Type.INTEGER },
                curiosity: { type: Type.INTEGER }
              },
              required: ["truth", "beauty", "curiosity"]
            },
            atomCompliance: { type: Type.STRING },
            brandStrategy: { type: Type.STRING },
            growthPhases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  description: { type: Type.STRING },
                  timeline: { type: Type.STRING }
                },
                required: ["phase", "description"]
              }
            },
            generatedCodeSnippet: { type: Type.STRING },
            marketFitAnalysis: { type: Type.STRING }
          },
          required: [
            "appName",
            "tagline",
            "vibeScore",
            "atomCompliance",
            "brandStrategy",
            "growthPhases",
            "generatedCodeSnippet",
            "marketFitAnalysis"
          ]
        }
      }
    });

    if (response.text) {
      const resultObj = JSON.parse(response.text.trim());
      return res.json({ success: true, data: resultObj });
    } else {
      throw new Error("Empty response text from Gemini API.");
    }
  } catch (error: any) {
    console.warn("Gemini API call skipped or failed. Falling back to clean ecosystem-derived simulation records... Error details:", error.message);
    
    // Provide an amazing, bespoke, lore-compliant simulation response that matches the user's input style!
    const simulatedResponse = generateSimulatedVenture(prompt, cleanCategory);
    return res.json({
      success: true,
      simulated: true,
      data: simulatedResponse,
      warning: "Operating in Simulated Lattice Mode. Set GEMINI_API_KEY inside Settings > Secrets to unlock full server-side generative capabilities."
    });
  }
});

// Helper for high-fidelity simulated venture blueprints
function generateSimulatedVenture(promptString: string, category: string) {
  // Derive details based on the user's prompt key terms
  const cleanTitle = promptString.split(" ").slice(0, 3).join(" ").toUpperCase();
  const rawAppName = Math.random() > 0.5 ? `FAA ${cleanTitle}` : `FRUITFUL ${cleanTitle}`;
  const appName = rawAppName.length > 5 ? rawAppName : `FAA ${category.toUpperCase()} MASTER`;

  return {
    appName,
    tagline: `Redefining ${category} with Atom-Level Verification™ and Sovereign Growth.`,
    vibeScore: {
      truth: Math.floor(88 + Math.random() * 12),
      beauty: Math.floor(92 + Math.random() * 8),
      curiosity: Math.floor(95 + Math.random() * 5)
    },
    atomCompliance: `Class 35/41 compliant under the Fruitful Holdings trademark network. Protected globally through sovereign Heyns Schoeman™ registration. Fully aligned with Adams & Adams legal tracking.`,
    brandStrategy: `Trading as (t/a) a division of Fruitful Holdings (Pty) Ltd. Employs seed deployment patterns to test local engagement within South African bush clinics and urban hotspots prior to international expansion.`,
    growthPhases: [
      {
        phase: "Phase 1: Seed & Grounding",
        description: `Install self-service terminals and register baseline vendor networks across Mahalapye, Botswana and Johannesburg. Aligned with Adams & Adams Class 35 registration processes.`,
        timeline: "Year 1"
      },
      {
        phase: "Phase 2: Red Bull Integration",
        description: `Present the co-branded HotStack micro-dashboard to Red Bull regional panels, scaling global user telemetry across 8 target markets.`,
        timeline: "Years 2-3"
      },
      {
        phase: "Phase 3: Sovereign Franchise Takeover",
        description: `Secure R391M aggregate capital velocity. Authorize full spinoffs with license royalties going back to Heyns Schoeman's core asset tree.`,
        timeline: "Years 4-5"
      }
    ],
    generatedCodeSnippet: `// ${appName} - COMPONENT LAYOUT
export default function Showcase() {
  return (
    <div className="p-6 bg-[#000000] border border-[#FF5A1F]/30 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white tracking-widest">${appName}</h3>
        <span className="text-xs text-[#FF5A1F] uppercase font-mono tracking-wider">● VERIFIED LICENSE</span>
      </div>
      <p className="text-sm text-gray-400 mb-6 font-mono leading-relaxed">
        Concept: "${promptString}"
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-900 border border-white/5 rounded">
          <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">TRADEMARK CLASS</span>
          <span className="text-sm text-white font-mono font-semibold">35 &amp; 41 (Sovereign)</span>
        </div>
        <div className="p-4 bg-zinc-900 border border-white/5 rounded">
          <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">LATTICE VIBE SCORE</span>
          <span className="text-sm text-[#29E06F] font-mono font-semibold">97% (ULTRA TRUTH)</span>
        </div>
      </div>
    </div>
  );
}`,
    marketFitAnalysis: `Taps into under-utilized youth networks in Botswana, Kenya, South Africa, and Brazil. Integrates cleanly with direct-selling networks like Tupperware Going Fruitful and artisan kiosks to capture 20% commission on regional item handshakes.`
  };
}

// ── VITE MIDDLEWARE CONFIG ──

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Mount Vite middlewares
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 FAA Global Lattice Master Server booted on port ${PORT}`);
    console.log(`🔗 Local Address: http://localhost:${PORT}`);
  });
}

startServer();
