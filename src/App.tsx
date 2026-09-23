/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  TreePine,
  Activity,
  Terminal as TerminalIcon,
  Sliders,
  ShoppingBag,
  TrendingUp,
  Globe,
  Cpu,
  Layers,
  ShieldCheck,
  Scale,
  Flame,
  Zap,
  Play,
  CheckCircle2,
  Trash2,
  HelpCircle,
  RefreshCw,
  Compass,
  DollarSign,
  Award,
  FileText,
  ExternalLink,
  Coffee,
  Volume2,
  Tv,
  Users,
  Search,
  BookOpen,
  Info
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

import {
  PortalProduct,
  HotStackTemplate,
  VibeAppResult,
  TerminalLog,
  CoreTelemetry
} from "./types";

// Standard artisan products in Fruitful Portals
const PRODUCTS: PortalProduct[] = [
  {
    id: "prod-hat",
    name: "Fruitful Safari Hat",
    emoji: "👒",
    priceUsd: 39,
    description: "Premium sun-protection hat, hand-stitched by local artisans with Ndebele-pattern band.",
  },
  {
    id: "prod-pot",
    name: "Elim Clay Pottery",
    emoji: "🏺",
    priceUsd: 69,
    description: "Authentic earthware pottery crafted in Elim, paired with copper-wire geometric accents.",
  },
  {
    id: "prod-romper",
    name: "Boutique Kids' Romper",
    emoji: "👶",
    priceUsd: 35,
    description: "Traditional lore-miss crocheted set supporting young mother cooperatives in Mahalapye.",
  },
  {
    id: "prod-pancake",
    name: "Ecosystem Pancake + Coffee",
    emoji: "🥞",
    priceUsd: 5,
    description: "A freshly flipped cinnamon-sugar pancake served with organic Rooibos-infused blend.",
  }
];

// Interactive HotStack templates
const HOTSTACK_TEMPLATES: HotStackTemplate[] = [
  {
    id: "tpl-cola",
    name: "Botswana Artisan Cola Portal",
    category: "Commerce",
    icon: "🥤",
    description: "Direct-seller hub connecting rural cola brewers to urban trade networks.",
    examplePrompt: "A sovereign beverage registry managing bottle batch metrics, deposit returns, and direct payouts to Botswana youth hubs.",
  },
  {
    id: "tpl-dance",
    name: "Crate Arena Scoring System",
    category: "Dashboards",
    icon: "🕺",
    description: "Live score calculations for regional Crate Dance Showcases with Red Bull TV integrations.",
    examplePrompt: "Real-time arena crowd-intensity meters, choreographer scoring logs, and payout ledger for the top 10 finalists.",
  },
  {
    id: "tpl-sekelbos",
    name: "Sekelbos Tracker Hub",
    category: "Analytics",
    icon: "🪵",
    description: "Tracks wooden crafts sourcing pipelines to guarantee organic, sustainable bush wood extraction.",
    examplePrompt: "Barcodes for wood carvings traceable to specific coordinates in the Kalahari bush with artisan profit shares.",
  },
  {
    id: "tpl-pancake",
    name: "Solar-Powered Pancake Cart Controller",
    category: "Portals",
    icon: "🥞",
    description: "An IoT dashboard tracking skillet temperature and sale velocity of mobile pancake units.",
    examplePrompt: "Skillet telemetry logs, inventory checks for flour and sugar, and instant peer-to-peer customer checkout.",
  },
];

const REVENUE_DATA = [
  { name: "Ticket Sales", value: 105, color: "#FF5A1F" },
  { name: "Sponsorship", value: 23, color: "#E31E24" },
  { name: "Merchandise", value: 8.5, color: "#F5C842" },
  { name: "Content Licensing", value: 12, color: "#00B4FF" },
  { name: "Franchise Fees", value: 33, color: "#29E06F" },
  { name: "Vendor Commission", value: 22.5, color: "#FF8C42" },
];

const PROJECTIONS_GROWTH = [
  { year: "Year 1", Revenue: 29, EBITDA: 8.5 },
  { year: "Year 2", Revenue: 62, EBITDA: 19.8 },
  { year: "Year 3", Revenue: 115, EBITDA: 43.1 },
  { year: "Year 4", Revenue: 155, EBITDA: 62.0 },
  { year: "Year 5", Revenue: 185, EBITDA: 79.5 },
];

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState<"dashboard" | "business-plan" | "hotstack" | "portals">("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Local Terminal Logs state
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: "log-1",
      timestamp: new Date().toLocaleTimeString(),
      type: "system",
      message: "🌳 Baobab Master Orchestrator initialized. Segment vs111.111 Trunk locked."
    },
    {
      id: "log-2",
      timestamp: new Date().toLocaleTimeString(),
      type: "success",
      message: "🦒 Giraffe vision alignment confirmed (33km range scanning enabled)."
    },
    {
      id: "log-3",
      timestamp: new Date().toLocaleTimeString(),
      type: "warning",
      message: "🦁 120 Immortal Lions awakened from stone. Perimeter tracking fully active."
    }
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Core Pulse Telemetry state
  const [telemetry, setTelemetry] = useState<CoreTelemetry | null>(null);
  const [pulseWave, setPulseWave] = useState(false);
  const [roarWave, setRoarWave] = useState(false);
  const [activeSegment, setActiveSegment] = useState<string>("baobab");

  // Pancake mini-game states
  const [pancakeFlips, setPancakeFlips] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [pancakeState, setPancakeState] = useState<"uncooked" | "golden" | "burnt">("uncooked");
  const [pancakeQuality, setPancakeQuality] = useState("");

  // Portal Shopping Cart states
  const [cart, setCart] = useState<{ product: PortalProduct; quantity: number }[]>([]);
  const [checkoutResult, setCheckoutResult] = useState<any>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // UI Interactive ROI Sliders
  const [sponsorInflow, setSponsorInflow] = useState(20); // standard R20M ask from Red Bull
  const [vendorBooths, setVendorBooths] = useState(300); // 300 booths target

  // HotStack Vibe state
  const [categoryType, setCategoryType] = useState("Commerce");
  const [userPrompt, setUserPrompt] = useState("");
  const [compilingLogs, setCompilingLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [vibeResult, setVibeResult] = useState<VibeAppResult | null>(null);
  const [vibeError, setVibeError] = useState<string | null>(null);

  // Poll server state on mount
  useEffect(() => {
    async function fetchState() {
      try {
        const res = await fetch("/api/state");
        const data = await res.json();
        setTelemetry(data);
      } catch (err) {
        console.error("Error reading system state from Express server:", err);
      }
    }
    fetchState();
    const interval = setInterval(fetchState, 6000);
    return () => clearInterval(interval);
  }, []);

  // Sync scroll on new terminal log
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Handle 9s pulsing simulation matching leaf signal
  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulseWave(true);
      setTimeout(() => setPulseWave(false), 2400);

      // Append standard leaf pulse to terminal status
      addLog(
        "success",
        `⚡ Leaf Signal Pulse: 7,038 nodes synchronized. 13,713 local African brand ledgers refreshed [vs111.111 Trunk locked]`
      );
    }, 9000);
    return () => clearInterval(pulseTimer);
  }, []);

  // Helper to push to custom console
  const addLog = (type: TerminalLog["type"], message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: "log-" + Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        type,
        message
      }
    ]);
  };

  // Trigger global actions
  const triggerAction = async (command: "roar" | "pulse" | "scan") => {
    if (command === "roar") {
      setRoarWave(true);
      setTimeout(() => setRoarWave(false), 3000);
    }
    addLog("system", `[MANUAL CONTROL] Requesting perimeter command: /${command}`);
    try {
      const res = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      if (data.success) {
        addLog(command === "roar" ? "roar" : "success", data.message);
      }
    } catch (err) {
      addLog("error", `Failed trigger action: /${command}. Falling back to client-simulated ledger.`);
    }
  };

  // Pancake flip mechanic
  const handlePancakeFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setPancakeFlips((prev) => prev + 1);

    // Calculate quality outcomes
    const flipPower = Math.random() * 100;
    setTimeout(() => {
      setIsFlipping(false);
      if (flipPower < 15) {
        setPancakeState("uncooked");
        setPancakeQuality("A bit doughy. Keep flipping to reach golden honey perfection!");
        addLog("warning", "🥞 Pancake Flip: Soft throw. The pancake landed but remains uncooked.");
      } else if (flipPower > 85) {
        setPancakeState("burnt");
        setPancakeQuality("Oh no! Burnt to a crisp in the Kalahari heat! Start fresh!");
        addLog("error", "🔥 Pancake Flip: Over-flipped directly into the fire! Burnt crisp!");
      } else {
        setPancakeState("golden");
        setPancakeQuality("SENSATIONAL! Golden honey color. Spot on! Ready to serve with cinnamon sugar!");
        addLog("success", "🥞 Pancake Flip: Clean golden flip! Perfect height and consistency.");
      }
    }, 1000);
  };

  // Add Product to Cart
  const addToCart = (product: PortalProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    addLog("system", `🛒 Cart: Added ${product.emoji} ${product.name} to transaction workspace.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addLog("warning", "🛒 Cart: Removed item from local checkout.");
  };

  // Clear Checkout process
  const performCheckout = async () => {
    if (cart.length === 0) return;
    setIsSubmittingOrder(true);
    addLog("system", "🛒 Cart checkout triggered. Bundling single-VAT trade metrics across subdivisions...");
    
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delay(1200);

    const totalMoney = cart.reduce((sum, item) => sum + item.product.priceUsd * item.quantity, 0);

    try {
      const res = await fetch("/api/portal/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(i => ({ id: i.product.id, name: i.product.name, qty: i.quantity })),
          totalAmount: totalMoney
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutResult(data);
        addLog("success", `🧾 Order Confirmed! Unique ID: ${data.orderId}. Handshake fully logged.`);
        setCart([]);
      }
    } catch (err) {
      addLog("error", "Backend checkout transaction failed. Directing to offline local fallback state.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // HotStack Compile Trigger
  const handleCompileVibe = async () => {
    if (!userPrompt.trim()) return;
    setIsCompiling(true);
    setVibeResult(null);
    setVibeError(null);
    setCompilingLogs([]);

    const logSteps = [
      "🌱 [SEED LAYER] Planted core concept seed...",
      "🏛️ [ATOM LEVEL] Scanning Adams & Adams global trademark catalogs...",
      "🛡️ [COMPLIANCE] Verification parameters set for classes 35 & 41...",
      "🔬 [MOLECULE ENGINE] Mapping co-branded sponsorship targets with Red Bull Media House...",
      "📱 [STRUCTURE] Assembling mobile UI and telemetry layouts...",
      "🔗 [LATTICE INTERFACE] Pulling latest 13,713 brand vectors...",
      "🚀 [COMPILING] HotStack bundling complete. Sending schema mapping to Gemini API..."
    ];

    for (let i = 0; i < logSteps.length; i++) {
      setCompilingLogs((prev) => [...prev, logSteps[i]]);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    try {
      const res = await fetch("/api/gemini/vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt, category: categoryType }),
      });
      const payload = await res.json();
      if (payload.success) {
        setVibeResult(payload.data);
        if (payload.simulated) {
          addLog("warning", "[HOTSTACK] Compiled concept successfully in Offline Simulated Mode.");
        } else {
          addLog("success", `⚡ [HURCULES] Fresh generative vision created for "${payload.data.appName}".`);
        }
      } else {
        throw new Error(payload.error || "Failed blueprint compile.");
      }
    } catch (err: any) {
      setVibeError(err.message || "Something went wrong.");
      addLog("error", `HotStack Error: ${err.message}`);
    } finally {
      setIsCompiling(false);
    }
  };

  // Terminal CLI submission
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    addLog("user", `> ${terminalInput}`);
    setTerminalInput("");

    if (cmd === "/help") {
      addLog("system", "📚 Available CLI commands: \n  /lions roar  - Trigger 120 Immortal Lions roar\n  /pulse       - Forces leaf pulse to 7,038 nodes\n  /scan        - Performs 33km Giraffe vision sweep\n  /clear       - Clears logging board");
    } else if (cmd === "/lions roar") {
      triggerAction("roar");
    } else if (cmd === "/pulse") {
      triggerAction("pulse");
    } else if (cmd === "/scan") {
      triggerAction("scan");
    } else if (cmd === "/clear") {
      setLogs([]);
    } else if (cmd.startsWith("/vibe ")) {
      const promptText = cmd.slice(6);
      setUserPrompt(promptText);
      setActiveTab("hotstack");
      addLog("system", `⚡ Redirecting you to HotStack UI to compile: "${promptText}"`);
    } else {
      addLog("error", `Unrecognized command: "${cmd}". Type /help for assistance.`);
    }
  };

  // Calculated ROI values using sliders
  const sponsorFeeTarget = sponsorInflow * 1000000; // standard defaults to R20M
  const boothTotalRevenue = vendorBooths * (2500 + (Math.random() * 200)); // booth fee target math
  const calculatedThreeYearROI = Math.floor((30750000 / sponsorFeeTarget) * 100);

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col font-sans selection:bg-[#FF5A1F] selection:text-black">
      {/* Dynamic Full Screen Shaking Roar Indicator */}
      <AnimatePresence>
        {roarWave && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-950/45 mix-blend-color-dodge z-50 pointer-events-none flex items-center justify-center border-8 border-red-600"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 0.95, 1.1, 1], rotate: [0, -1, 1, -1, 0] }}
              transition={{ duration: 0.5, repeat: 4 }}
              className="text-center p-8 bg-black/90 border border-red-500 rounded-2xl max-w-lg shadow-[0_0_50px_rgba(227,30,36,0.6)]"
            >
              <h1 className="text-7xl font-display text-red-500 tracking-wider">LIONS ROARING</h1>
              <p className="text-zinc-400 font-mono text-xs mt-4 tracking-widest uppercase">
                120 Immortal guards sector grid alert!
              </p>
              <p className="text-[#F5C842] font-semibold text-lg mt-2 font-mono">
                接入已准 · 獅群已醒 · 包柏永安!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER */}
      <header className="border-b border-white/5 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Heart Shield Logo */}
            <div className="w-10 h-11 bg-zinc-900 border border-white/10 rounded flex items-center justify-center p-1 cursor-pointer hover:border-brand-orange transition-all">
              <svg viewBox="0 0 220 240" className="w-full h-full" fill="none">
                <path d="M118 28 Q128 8 135 14" stroke="#FF5A1F" strokeWidth="15" strokeLinecap="round" />
                <path d="M110 35 Q72 35 56 72 Q40 108 54 136" stroke="#FF5A1F" strokeWidth="15" strokeLinecap="round" />
                <path d="M110 35 Q148 35 164 72 Q180 108 166 136" stroke="#FF5A1F" strokeWidth="15" strokeLinecap="round" />
                <path d="M54 136 Q80 162 110 162 Q140 162 166 136" stroke="#FF5A1F" strokeWidth="15" strokeLinecap="round" />
                <path d="M56 118 Q36 128 28 122" stroke="#FF5A1F" strokeWidth="14" strokeLinecap="round" />
                <path d="M164 118 Q184 128 192 122" stroke="#FF5A1F" strokeWidth="14" strokeLinecap="round" />
                <ellipse cx="88" cy="95" rx="10" ry="14" fill="#FF5A1F" />
                <ellipse cx="132" cy="95" rx="10" ry="14" fill="#FF5A1F" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-bold tracking-wider text-white">FRUITFUL GLOBAL LATTICE</h1>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#FF5A1F]/15 text-[#FF5A1F] border border-[#FF5A1F]/30 rounded">
                  VS111.111
                </span>
              </div>
              <p className="text-[10.5px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                Trunk signal LOCKED · 7,038 active pulsing nodes
              </p>
            </div>
          </div>

          {/* Navigation layout */}
          <nav className="flex flex-wrap items-center gap-1.5 bg-zinc-900/60 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "dashboard"
                  ? "bg-[#FF5A1F] text-black shadow-lg shadow-[#FF5A1F]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              🌳 Baobab Master
            </button>
            <button
              onClick={() => setActiveTab("business-plan")}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "business-plan"
                  ? "bg-[#FF5A1F] text-black shadow-lg shadow-[#FF5A1F]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              📖 Business Plan
            </button>
            <button
              onClick={() => setActiveTab("hotstack")}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all relative ${
                activeTab === "hotstack"
                  ? "bg-[#FF5A1F] text-black shadow-lg shadow-[#FF5A1F]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ⚡ HotStack™ Vibe
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("portals")}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "portals"
                  ? "bg-[#FF5A1F] text-black shadow-lg shadow-[#FF5A1F]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              🏺 Bush Portals
            </button>
          </nav>
        </div>
      </header>

      {/* GLOBAL MARQUEE TICKER */}
      <div className="bg-[#FF5A1F] text-black py-1 overflow-hidden select-none border-y border-white/5 whitespace-nowrap text-xs font-display flex tracking-wider">
        <div className="animate-marquee inline-block mr-12 uppercase flex-shrink-0">
          ✦ CRATE DANCE GLOBAL SHOWCASE ✦ RED BULL PRESENTING EXCLUSIVE PARTNERSHIP ✦ SEKELBOS TANK ARTISAN ECOSYSTEM ✦ 7,038 PULSING NODES ✦ SOVEREIGN IP PROTECTION GIRAFFE VISION ✦ 120 IMMORTAL LION GUARDS SECTORS ACTIVE ✦ R391,000,000 REVENUE TARGET
        </div>
        <div className="animate-marquee inline-block uppercase flex-shrink-0">
          ✦ CRATE DANCE GLOBAL SHOWCASE ✦ RED BULL PRESENTING EXCLUSIVE PARTNERSHIP ✦ SEKELBOS TANK ARTISAN ECOSYSTEM ✦ 7,038 PULSING NODES ✦ SOVEREIGN IP PROTECTION GIRAFFE VISION ✦ 120 IMMORTAL LION GUARDS SECTORS ACTIVE ✦ R391,000,000 REVENUE TARGET
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* TAB 1: MASTER LANDING & TELEMETRY */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            
            {/* HER0 / GENERAL INTRO METAPHOR */}
            <div className="p-8 rounded-2xl bg-zinc-950 border border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
              <div className="hero-grid absolute inset-0 z-0 opacity-30"></div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#FF5A1F]">
                  <TreePine className="w-4 h-4" /> Baobab Growth Model — Living Organism
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-none">
                  SEEDS PLANETED · <br />
                  <span className="text-[#FF5A1F]">FUTURES IN GROWING STATE</span>
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  The Baobab tree lives for thousands of years. It starts from a small seed (the 2024 local blueprint),
                  grows deep roots (FAA™ compliance and Trademark filing), builds an immutable trunk (vs111.111 locked system),
                  and bears infinite fruit across 8+ massive global target markets.
                </p>
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab("business-plan")}
                    className="px-4 py-2 bg-zinc-900 border border-[#FF5A1F]/30 rounded text-xs font-semibold uppercase tracking-wider text-white hover:bg-zinc-800 transition-all flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-[#FF5A1F]" /> View Global Business Plan
                  </button>
                  <button
                    onClick={() => setActiveTab("hotstack")}
                    className="px-4 py-2 bg-[#FF5A1F] text-black rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#FF8C42] transition-all flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" /> Go to HotStack™ Vibe
                  </button>
                </div>
              </div>

              {/* Big KPI summary side panel */}
              <div className="relative z-10 p-6 bg-zinc-900/80 border border-white/15 rounded-xl w-full md:w-80 space-y-4">
                <span className="text-[10px] text-[#F5C842] uppercase font-mono tracking-widest block">
                  Ecosystem Velocity Metrics
                </span>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-xs text-zinc-400">Locked Signal:</span>
                    <span className="text-xs text-white font-mono font-medium">vs111.111</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-xs text-zinc-400">Scan Radius:</span>
                    <span className="text-xs text-white font-mono font-medium">33 Kilometers</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-xs text-zinc-400">Total Revenue target:</span>
                    <span className="text-xs text-[#29E06F] font-mono font-bold">R391,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-400">Active Lions:</span>
                    <span className="text-xs text-red-500 font-mono font-bold">120 Guards</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="w-full bg-zinc-950 p-2.5 rounded border border-white/5 text-center text-[10px] font-mono text-zinc-500">
                    STATUS: SECURE &amp; CONDUCIIVE
                  </div>
                </div>
              </div>
            </div>

            {/* HIGH IMPACT VISUAL LIVE LATTICE & CORE NODES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Pulse & Radar Telemetry Visualizer */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-950 border border-white/5 space-y-6 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-display tracking-wider text-white">LATTICE PULSE GRAPH (7,038 NODES)</h3>
                    <p className="text-xs text-zinc-400 font-mono">Heartbeat timing synchronicity: 9 seconds pulse interval</p>
                  </div>
                  <span className="flex h-3 w-3 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 ${pulseWave ? "scale-200" : ""}`}></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>

                {/* Animated svg grid mapping nodes */}
                <div className="h-64 bg-[#0a0a0f] border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial-gradient from-[#FF5A1F]/5 to-transparent pointer-events-none"></div>
                  
                  {/* Rotating scanner sweep simulation representing Giraffe scanning */}
                  <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full flex items-center justify-center pointer-events-none">
                    <div className="w-[300px] h-[300px] border border-[#FF5A1F]/5 rounded-full"></div>
                    <div className="w-[150px] h-[150px] border border-white/5 rounded-full"></div>
                    {/* Sweeping arm */}
                    <div className="absolute w-[200px] h-0.5 bg-gradient-to-r from-transparent to-[#FF5A1F]/30 origin-left left-1/2 top-1/2 animate-spin-slow"></div>
                  </div>

                  {/* Nodes lattice display */}
                  <svg className="w-full h-full p-4 absolute inset-0 z-10" viewBox="0 0 500 200">
                    {/* Simulated pulse wave circle */}
                    {pulseWave && (
                      <circle
                        cx="250"
                        cy="100"
                        r="120"
                        fill="none"
                        stroke="#29E06F"
                        strokeWidth="1.5"
                        className="animate-pulse"
                        opacity={0.3}
                      />
                    )}
                    
                    {/* Lattice points */}
                    {Array.from({ length: 32 }).map((_, i) => {
                      const x = 40 + (i % 8) * 60 + Math.sin(i) * 6;
                      const y = 30 + Math.floor(i / 8) * 45 + Math.cos(i) * 4;
                      const isHot = i % 5 === 0;
                      return (
                        <g key={i}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isHot ? 4.5 : 2.5}
                            fill={isHot ? "#FF5A1F" : "#71717a"}
                            className={pulseWave ? "transition-all duration-1000 fill-brand-green scale-110" : ""}
                          />
                          {isHot && (
                            <circle
                              cx={x}
                              cy={y}
                              r="8"
                              fill="none"
                              stroke="#FF5A1F"
                              strokeWidth="1"
                              className="animate-ping"
                              style={{ animationDuration: "3s" }}
                            />
                          )}
                        </g>
                      );
                    })}

                    {/* Handshake line vectors */}
                    <path
                      d="M 40 30 L 100 75 L 160 30 L 220 75 L 280 30 L 340 75 L 400 30"
                      fill="none"
                      stroke="rgba(255, 90, 31, 0.15)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 100 120 L 160 75 L 220 165 L 340 120"
                      fill="none"
                      stroke="rgba(41, 224, 111, 0.12)"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Active radar overlay details */}
                  <div className="absolute bottom-3 left-4 z-20 flex gap-4 text-[9.5px] font-mono text-zinc-500">
                    <span>📡 RADAR RADIUS: 33km</span>
                    <span>🌊 FREQUENCY: 9600 P/D</span>
                    <span className="text-[#FF5A1F]">📶 SECTOR STATUS: ALL STATIONS COMPLIANT</span>
                  </div>
                </div>

                {/* Simulated manual manual actions row */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => triggerAction("roar")}
                    className="p-3 bg-zinc-900 border border-brand-red/30 rounded-lg text-center hover:bg-zinc-800 transition-all cursor-pointer select-none"
                  >
                    <Volume2 className="w-5 h-5 text-brand-red mx-auto mb-1.5" />
                    <span className="text-xs uppercase font-semibold font-condensed tracking-wider block text-white">🦁 Lions Roar</span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">Alert 120 Guards</span>
                  </button>
                  <button
                    onClick={() => triggerAction("pulse")}
                    className="p-3 bg-zinc-900 border border-brand-green/30 rounded-lg text-center hover:bg-zinc-800 transition-all cursor-pointer select-none"
                  >
                    <Zap className="w-5 h-5 text-brand-green mx-auto mb-1.5" />
                    <span className="text-xs uppercase font-semibold font-condensed tracking-wider block text-white">⚡ Pulse Tree</span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">Flush Node heartbeat</span>
                  </button>
                  <button
                    onClick={() => triggerAction("scan")}
                    className="p-3 bg-zinc-900 border border-brand-orange-light/30 rounded-lg text-center hover:bg-zinc-800 transition-all cursor-pointer select-none"
                  >
                    <Compass className="w-5 h-5 text-brand-orange-light mx-auto mb-1.5" />
                    <span className="text-xs uppercase font-semibold font-condensed tracking-wider block text-white">🦒 Vision scan</span>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">Horizontal check (33km)</span>
                  </button>
                </div>
              </div>

              {/* 5 Sync Nests Telemetry panel */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-display tracking-wider text-white">🏗️ INTEGRATED 5 NESTS</h3>
                  <p className="text-xs text-zinc-400 font-mono">Coordinated server segments pulsing synchronously</p>
                </div>

                <div className="space-y-3 pt-2">
                  {telemetry?.activeNests.map((nest) => {
                    const isSelected = activeSegment === nest.id;
                    return (
                      <div
                        key={nest.id}
                        onClick={() => {
                          setActiveSegment(nest.id);
                          addLog("system", `Focused telemetry viewport on segment: ${nest.name}`);
                        }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                          isSelected
                            ? "bg-zinc-900/90 border-[#FF5A1F]"
                            : "bg-zinc-900/40 border-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-semibold text-xs tracking-wider uppercase block text-white">
                            {nest.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono block">
                            Capacity: {nest.nodes} nodes · {nest.pulseRate}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-green-500/10 text-green-400 border border-green-500/20 uppercase font-semibold">
                            {nest.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3.5 bg-zinc-900/30 rounded-xl border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase mb-1">
                    Selected Nest Telemetry Status
                  </span>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Segment <strong className="text-white uppercase">{activeSegment}</strong> is fully active with atomic verification layers. No data bleed has been recorded.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE BUSINESS PLAN ARCHIVE */}
        {activeTab === "business-plan" && (
          <div className="space-y-8">
            
            {/* Header and section search tool */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
              <div>
                <h2 className="text-3xl font-display font-medium text-white tracking-widest uppercase">
                  Fruitful Holdings Pty Ltd — <span className="text-[#FF5A1F]">Business Plan Archive</span>
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  Corporate alignment under single VAT registration network. Trademark Class 35 &amp; 41 protected.
                </p>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search plan chapters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/15 rounded-lg pl-9 pr-4 py-2 text-xs focus:border-[#FF5A1F] focus:outline-none"
                />
              </div>
            </div>

            {/* TWO COLUMN GRID — SIDEBAR FOR DOCUMENT CHAPTERS & DYNAMIC WORKSPACE SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Document side menu tabs */}
              <div className="lg:col-span-1 space-y-2">
                <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl">
                  <span className="text-[10.5px] uppercase font-mono text-[#F5C842] tracking-wider block">
                    Document Context Key
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Each component maps to independent trading operations (t/a) legally shielded from liability.
                  </p>
                </div>

                <div className="p-2.5 bg-zinc-900/60 rounded-xl border border-white/5 space-y-1">
                  <div className="p-2 bg-zinc-950 rounded text-xs leading-relaxed text-zinc-400">
                    <span className="text-[#FF5A1F] font-semibold block uppercase text-[10px]">LATTICE REVENUE</span>
                    Target R391,000,000 with a baseline R20,000,000 Red Bull presenting sponsorship inflow.
                  </div>
                </div>
              </div>

              {/* Central Chapter Reader */}
              <div className="lg:col-span-3 space-y-8 bg-zinc-950 p-8 rounded-2xl border border-white/5">
                
                {/* Chapter 1: The Metaphor & General Vision */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-[10.5px] font-mono text-[#FF5A1F] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-1 rounded">
                    Chapter 01. Sovereign Metaphor &amp; Core Vision
                  </div>
                  <h3 className="text-3xl font-display text-white tracking-wider">THE SOVEREIGN METAPHOR</h3>
                  <div className="p-5 bg-zinc-900 border-l-4 border-brand-green italic rounded-r text-sm text-zinc-400 leading-relaxed font-mono">
                    "Some seeds sprout quickly. Some take time. Some grow roots long before they grow grains. But nothing fails to expand when planted with conviction."
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Fruitful Holdings acts as an elastic container for youth empowerment initiatives throughout Southern Africa and the wider development community.
                    By creating events (like Crate Dance Showcase, powered by massive regional street performers cooperatives) and platforms
                    (the Sekelbos Tank artisan exchange hubs, RA Cellular mobile integrations, and Tupperware consultant loops), the business
                    channels abundance directly to the micro-economy.
                  </p>
                </div>

                {/* Chapter 2: Projections & Real-Time Slider ROI Analytics Engine */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="inline-flex items-center gap-2 text-[10.5px] font-mono text-[#FF5A1F] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-1 rounded">
                    Chapter 02. Compound Multi-Year Projection Engine
                  </div>
                  <h3 className="text-3xl font-display text-white tracking-wider">PROJECTIONS &amp; ROI SIMULATOR</h3>
                  
                  {/* CHART WRAPPERS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5">
                      <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase block mb-3 text-center">
                        Multi-Year Asset Projections (Millions Rands)
                      </span>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={PROJECTIONS_GROWTH}>
                            <defs>
                              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF5A1F" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#FF5A1F" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                            <XAxis dataKey="year" stroke="#4b5563" fontSize={10} />
                            <YAxis stroke="#4b5563" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: "#060608", borderColor: "rgba(255,255,255,0.1)" }} />
                            <Area type="monotone" dataKey="Revenue" stroke="#FF5A1F" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5">
                      <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase block mb-3 text-center">
                        Structured Income Outflow Distribution
                      </span>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={REVENUE_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                            <XAxis dataKey="name" stroke="#4b5563" fontSize={8} />
                            <YAxis stroke="#4b5563" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: "#060608", borderColor: "rgba(255,255,255,0.1)" }} />
                            <Bar dataKey="value" fill="#FF5A1F">
                              {REVENUE_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* INTERACTIVE COMPONENT: ROI SLIDERS */}
                  <div className="p-6 bg-zinc-900 border border-[#F5C842]/20 rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h4 className="text-sm font-semibold tracking-wider font-mono text-[#F5C842] uppercase">
                        🎛️ Real-Time ROI &amp; Sponsorship Value Slider
                      </h4>
                      <span className="px-2 py-0.5 bg-brand-gold/15 text-[#F5C842] border border-[#F5C842]/30 rounded text-[9px] font-mono">
                        SOVEREIGN SIMULATION
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-zinc-400">Red Bull Ask Rate:</span>
                          <span className="text-white font-bold text-brand-orange">R {sponsorInflow} Million</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="50"
                          value={sponsorInflow}
                          onChange={(e) => setSponsorInflow(Number(e.target.value))}
                          className="w-full accent-[#FF5A1F] h-1.5 bg-zinc-950 rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-zinc-500 leading-normal block">
                          Suggested exclusive Year 1 asks setup is R20M. Sliders dynamically update Year 1 metrics.
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-zinc-400">Sekelbos Tank Vendor Count:</span>
                          <span className="text-white font-bold text-brand-gold">{vendorBooths} Active Booths</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="1000"
                          value={vendorBooths}
                          onChange={(e) => setVendorBooths(Number(e.target.value))}
                          className="w-full accent-[#F5C842] h-1.5 bg-zinc-950 rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-zinc-500 leading-normal block">
                          Calculates vendor activation fees + 20% commission on average transaction handshakes.
                        </span>
                      </div>
                    </div>

                    {/* Simulation output panels */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="p-3.5 bg-zinc-950 rounded-lg border border-white/5">
                        <span className="text-[9.5px] text-zinc-500 font-mono block uppercase">Computed Sponsor ROI</span>
                        <span className="text-2xl font-display text-[#29E06F] block mt-1">{calculatedThreeYearROI}%</span>
                        <span className="text-[9px] text-zinc-400">Return multiplier in brand equity</span>
                      </div>
                      <div className="p-3.5 bg-zinc-950 rounded-lg border border-white/5">
                        <span className="text-[9.5px] text-zinc-500 font-mono block uppercase">Vendor Commission Outflow</span>
                        <span className="text-2xl font-display text-[#FF8C42] block mt-1">
                          R {(boothTotalRevenue / 1000000).toFixed(2)}M
                        </span>
                        <span className="text-[9px] text-zinc-400">Circulating local economy capital</span>
                      </div>
                      <div className="p-3.5 bg-zinc-950 rounded-lg border border-white/5">
                        <span className="text-[9.5px] text-zinc-500 font-mono block uppercase">Total Aggregated Velocity</span>
                        <span className="text-2xl font-display text-white block mt-1">
                          R {(sponsorFeeTarget / 1000000 + boothTotalRevenue / 1000000 + 40).toFixed(1)}M
                        </span>
                        <span className="text-[9px] text-zinc-400">Aggregated Year 1 scale value</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter 3: Red Bull Ask & Value Convergence */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="inline-flex items-center gap-2 text-[10.5px] font-mono text-[#FF5A1F] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-1 rounded">
                    Chapter 03. Strategic Red Bull Integration Matrix
                  </div>
                  <h3 className="text-3xl font-display text-white tracking-wider">CONVERGENCE &amp; POWER</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Red Bull stands in elite spaces for brand alignment. Our format represents ideal synthesis:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-900 border-l-2 border-brand-red rounded">
                      <h4 className="text-sm font-semibold uppercase text-white font-mono tracking-wide">
                        Unified Co-Branded Media (Red Bull Media House)
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        By integrating Crate Dance finalists' backstory videos into Red Bull TV, we cross-pollinate traditional urban networks
                        with pristine digital engagement, guaranteeing multi-year broadcast audience values.
                      </p>
                    </div>
                    <div className="p-4 bg-zinc-900 border-l-2 border-[#00B4FF] rounded">
                      <h4 className="text-sm font-semibold uppercase text-white font-mono tracking-wide">
                        The Sponsorship ask Structure
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Looking for a mult-year anchor sponsor. Presenting tier holds priority placements on standard wire crafts,
                        crate packaging branding, official judge uniforms, and interactive local registration codes blocks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chapter 4: Corporate Divisions t/a Structure */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="inline-flex items-center gap-2 text-[10.5px] font-mono text-[#FF5A1F] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-1 rounded">
                    Chapter 04. Single VAT &amp; Adams Patent Alignment
                  </div>
                  <h3 className="text-3xl font-display text-white tracking-wider">TAX &amp; TRADEMARK OPTIMIZATION</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Rather than complicating overhead costs with multiple corporate filings, all secondary systems sit strictly
                    under **Fruitful Holdings (Pty) Ltd** as registered t/a (trading as) operating subdivisions.
                  </p>

                  <div className="p-5 bg-zinc-900 border border-white/5 rounded-xl space-y-4">
                    <span className="text-[10px] text-[#29E06F] font-mono uppercase tracking-widest block">
                      Legal Division Flowchart
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-zinc-950 border border-brand-orange/30 rounded text-center">
                        <span className="text-[11px] text-white block font-bold">Parent Shield</span>
                        <span className="text-[9px] text-[#FF5A1F] font-mono uppercase mt-1 block">Fruitful Holdings</span>
                      </div>
                      <div className="p-3 bg-zinc-950 border border-white/5 rounded text-center">
                        <span className="text-[11px] text-zinc-400 block font-medium">Trademark Class</span>
                        <span className="text-[9px] text-[#F5C842] font-mono uppercase mt-1 block">Adams 35 &amp; 41</span>
                      </div>
                      <div className="p-3 bg-zinc-950 border border-white/5 rounded text-center">
                        <span className="text-[11px] text-zinc-400 block font-medium">Direct Seller</span>
                        <span className="text-[9px] text-[#29E06F] font-mono uppercase mt-1 block">Going Fruitful</span>
                      </div>
                      <div className="p-3 bg-zinc-950 border border-white/5 rounded text-center">
                        <span className="text-[11px] text-zinc-400 block font-medium">Compliance Core</span>
                        <span className="text-[9px] text-[#00B4FF] font-mono uppercase mt-1 block">FAA algorithm</span>
                      </div>
                    </div>
                    <p className="text-[10.5px] text-zinc-500 leading-normal">
                      Corporate structure operates with an unified, centralized account tracking pipeline. This maximizes tax flexibility that channels local business earnings directly to under-utilized youth networks without unnecessary structural drain.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 3: CUSTOM HOTSTACK VIBE BUILDER USING OFFICIAL GEMINI ROUTE */}
        {activeTab === "hotstack" && (
          <div className="space-y-8">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-3xl font-display font-medium text-white tracking-widest uppercase">
                HotStack™ Vibe Builder — <span className="text-[#FF5A1F]">FAA Advanced Algorithm Workspace</span>
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                Utilize the official server-side Gemini 3.5 LLM to analyze ideas and compile creative business structures live!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Prompt formulation console */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl space-y-4">
                  <span className="text-[10px] text-brand-orange uppercase font-mono tracking-widest block">
                    Vibe Parameters formulation
                  </span>

                  {/* Category Type selector */}
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 font-mono block">Ecosystem Category:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Commerce", "Dashboards", "Portals", "Analytics"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryType(cat)}
                          className={`p-2 rounded text-xs font-mono font-medium border text-center transition-all ${
                            categoryType === cat
                              ? "bg-brand-orange-light/10 text-brand-orange-light border-brand-orange-light"
                              : "bg-zinc-900 border-white/5 text-zinc-400 hover:border-white/10"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Prompt input */}
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 font-mono block">Vibe Concept Prompt:</label>
                    <textarea
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="Type any brand concept, e.g. Botswana bush clinic trackers or solar-powered cinnamon pancake loops..."
                      rows={5}
                      className="w-full bg-zinc-900/60 border border-white/10 rounded-lg p-3 text-xs focus:border-[#FF5A1F] focus:outline-none placeholder-zinc-600 text-white leading-relaxed resize-none"
                    />
                  </div>

                  {/* Run Button */}
                  <button
                    onClick={handleCompileVibe}
                    disabled={isCompiling || !userPrompt.trim()}
                    className="w-full py-3 bg-[#FF5A1F] text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-[#FF8C42] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FF5A1F]/15"
                  >
                    {isCompiling ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Compiling lattice vectors...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-black" /> Compile with FAA™ Core
                      </>
                    )}
                  </button>
                </div>

                {/* Prebuilt Quick templates Selection */}
                <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl space-y-4">
                  <span className="text-[10px] text-brand-gold uppercase font-mono tracking-widest block">
                    Featured Quick Templates
                  </span>

                  <div className="space-y-3">
                    {HOTSTACK_TEMPLATES.map((tpl) => (
                      <div
                        key={tpl.id}
                        onClick={() => {
                          setCategoryType(tpl.category);
                          setUserPrompt(tpl.examplePrompt);
                          addLog("system", `Loaded HotStack template query: ${tpl.name}`);
                        }}
                        className="p-3 bg-zinc-900/40 hover:bg-zinc-900/80 border border-white/5 rounded-xl cursor-pointer hover:border-[#FF5A1F]/30 transition-all text-left"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                            <span>{tpl.icon}</span> {tpl.name}
                          </span>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded">
                            {tpl.category}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-zinc-500 line-clamp-2 leading-relaxed">
                          {tpl.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Live compiler logger AND generative outcomes display */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Active compiling logger box */}
                {isCompiling && (
                  <div className="p-5 rounded-2xl bg-black border border-[#FF5A1F]/30 shadow-[0_0_20px_rgba(255,90,31,0.1)] font-mono text-xs text-brand-orange-light space-y-2 max-h-64 overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-[#FF5A1F]/20 pb-2 mb-3">
                      <span className="font-bold flex items-center gap-2">
                        <Activity className="w-4 h-4 animate-pulse text-[#FF5A1F]" /> FAA VIBE PIPELINE COMPILER
                      </span>
                      <span className="text-[10px] text-zinc-500 animate-pulse">COMPILING...</span>
                    </div>
                    {compilingLogs.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-zinc-600">[{idx + 1}]</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main 결과 panels */}
                <AnimatePresence mode="wait">
                  {vibeResult ? (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Brand identity overview */}
                      <div className="p-8 rounded-2xl bg-zinc-950 border border-brand-orange/30 shadow-xl space-y-4">
                        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center border-b border-white/5 pb-4 gap-4">
                          <div>
                            <span className="text-[10.5px] font-mono uppercase tracking-widest text-brand-green bg-brand-green/10 border border-brand-green/20 px-2.5 py-0.5 rounded">
                              ✓ VERIFIED SECURE &amp; ACTIVE
                            </span>
                            <h3 className="text-3xl font-display text-white mt-2 leading-none">
                              {vibeResult.appName}
                            </h3>
                            <p className="text-xs text-[#FF5A1F] font-mono uppercase tracking-wider mt-1">
                              {vibeResult.tagline}
                            </p>
                          </div>

                          {/* Radar quality circles */}
                          <div className="flex gap-3">
                            <div className="p-2.5 bg-zinc-900 border border-white/10 rounded-lg text-center w-16">
                              <span className="text-[9px] text-zinc-500 block uppercase font-mono">Truth</span>
                              <span className="text-sm font-bold text-[#FF5A1F] font-display">
                                {vibeResult.vibeScore.truth}%
                              </span>
                            </div>
                            <div className="p-2.5 bg-zinc-900 border border-white/10 rounded-lg text-center w-16">
                              <span className="text-[9px] text-zinc-500 block uppercase font-mono">Beauty</span>
                              <span className="text-sm font-bold text-brand-gold font-display">
                                {vibeResult.vibeScore.beauty}%
                              </span>
                            </div>
                            <div className="p-2.5 bg-zinc-900 border border-white/10 rounded-lg text-center w-16">
                              <span className="text-[9px] text-zinc-500 block uppercase font-mono">Curiosity</span>
                              <span className="text-sm font-bold text-brand-green font-display">
                                {vibeResult.vibeScore.curiosity}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div className="space-y-2">
                            <h4 className="text-xs uppercase font-mono text-[#F5C842] tracking-wider">
                              Atom Compliance Report (Adams Filed)
                            </h4>
                            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                              {vibeResult.atomCompliance}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xs uppercase font-mono text-[#F5C842] tracking-wider">
                              Direct Placement &amp; Brand Strategy
                            </h4>
                            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                              {vibeResult.brandStrategy}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-2">
                          <h4 className="text-xs uppercase font-mono text-zinc-400 tracking-wider">
                            Market Fit Strategy &amp; Expansion Metrics
                          </h4>
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            {vibeResult.marketFitAnalysis}
                          </p>
                        </div>
                      </div>

                      {/* Growth timeline Phases */}
                      <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5 space-y-4">
                        <span className="text-[10px] text-brand-green uppercase font-mono tracking-widest block">
                          3-Phase Sovereign Scaling Timeline
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {vibeResult.growthPhases.map((ph, idx) => (
                            <div key={idx} className="p-4 bg-zinc-900/60 rounded-xl space-y-2 border-t-2 border-brand-green">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-mono text-brand-green uppercase font-bold">
                                  Phase {idx + 1}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded">
                                  {ph.timeline}
                                </span>
                              </div>
                              <h4 className="text-sm font-display text-white tracking-wider block">
                                {ph.phase}
                              </h4>
                              <p className="text-[11px] text-zinc-400 leading-normal">
                                {ph.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CODE LAYOUT PREVIEW WITH COPY UTILITY */}
                      {vibeResult.generatedCodeSnippet && (
                        <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5 space-y-4 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-[10px] text-[#FF5A1F] uppercase font-bold tracking-widest">
                              💻 React UI Code blueprint
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(vibeResult.generatedCodeSnippet || "");
                                addLog("success", "💻 React blueprint payload copied securely to clipboard.");
                              }}
                              className="px-2 py-1 bg-zinc-900 border border-white/10 hover:border-[#FF5A1F] text-zinc-300 hover:text-white rounded text-[10px] uppercase font-semibold tracking-wider transition-all cursor-pointer"
                            >
                              Copy Blueprint Code
                            </button>
                          </div>
                          <pre className="bg-[#050507] p-4 rounded text-zinc-400 overflow-x-auto text-[10.5px] max-h-80 select-all leading-relaxed border border-white/5">
                            {vibeResult.generatedCodeSnippet}
                          </pre>
                        </div>
                      )}

                    </motion.div>
                  ) : (
                    !isCompiling && (
                      <div className="h-96 rounded-2xl bg-zinc-950 border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center space-y-4">
                        <TerminalIcon className="w-12 h-12 text-zinc-600 animate-pulse" />
                        <div className="max-w-md">
                          <h4 className="text-lg font-display text-white uppercase tracking-wider">AWAITING HOTSTACK INITIALIZATION</h4>
                          <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                            Select one of our standard co-branded templates above or write down your own design vision. 
                            Clicking compile routes the query via the modern Express API layer.
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>
        )}

        {/* TAB 4: BUSH PORTALS SHOP & PANCAKE GAME */}
        {activeTab === "portals" && (
          <div className="space-y-8">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-3xl font-display font-medium text-white tracking-widest uppercase">
                🏺 Fruitful Bush Portals — <span className="text-[#FF5A1F]">Ecosystem Commerce Outflow</span>
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                Local SA &amp; Botswana artisans shop catalog. Handshake commission structures directly fund local community streams!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Product list */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PRODUCTS.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-5 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col justify-between hover:border-[#FF5A1F]/30 transition-all group"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-4xl block group-hover:scale-110 transition-transform">
                            {prod.emoji}
                          </span>
                          <span className="font-display font-bold text-2xl text-brand-orange-light">
                            ${prod.priceUsd} USD
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-display text-white tracking-wider group-hover:text-brand-orange transition-all">
                            {prod.name}
                          </h3>
                          <p className="text-xs text-zinc-500 mt-1 leading-normal">
                            {prod.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(prod)}
                        className="mt-6 w-full py-2 bg-zinc-900 hover:bg-[#FF5A1F] text-white hover:text-black font-semibold text-xs uppercase tracking-widest rounded border border-white/10 hover:border-transparent transition-all cursor-pointer"
                      >
                        Add to local basket
                      </button>
                    </div>
                  ))}
                </div>

                {/* INTERACTIVE COMPONENT: Pancake flipping mini game */}
                <div className="p-6 bg-zinc-950 border border-[#29E06F]/20 rounded-2xl relative overflow-hidden space-y-4">
                  <div className="absolute right-4 top-4">
                    <Coffee className="w-8 h-8 text-brand-green/30 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-green font-mono uppercase tracking-widest block">
                      🎮 Baobab Terminal Break — Micro Skillet Game
                    </span>
                    <h3 className="text-2xl font-display text-white mt-1">THE SOVEREIGN BUSH PANCAKE MAKER</h3>
                    <p className="text-xs text-zinc-400 leading-normal max-w-lg">
                      Flip South African pancakes on our client-side virtual skillet while waiting for your AI codes to compile! Golden honey throws add clean morale logs.
                    </p>
                  </div>

                  {/* Skillet display with flipping state */}
                  <div className="h-44 bg-zinc-900/60 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial-gradient from-brand-orange/5 to-transparent"></div>
                    
                    {/* Cooking flat skillet circle base */}
                    <div className="w-32 h-2.5 bg-zinc-950 border border-t border-white/10 rounded-full absolute bottom-8 z-0"></div>

                    {/* Flipped pancake element */}
                    <motion.div
                      animate={
                        isFlipping
                          ? { y: [-20, -110, -20], rotate: [0, 180, 360], scale: [1, 1.25, 0.95, 1] }
                          : { y: -20 }
                      }
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className={`w-20 h-4 rounded-full flex items-center justify-center font-bold text-[10px] uppercase font-mono shadow-md z-15 ${
                        pancakeState === "uncooked"
                          ? "bg-zinc-700 text-zinc-400 border border-zinc-600"
                          : pancakeState === "burnt"
                          ? "bg-zinc-950 text-red-600 border border-red-950"
                          : "bg-brand-gold text-black border border-amber-300 pulsing-glow"
                      }`}
                    >
                      {pancakeState}
                    </motion.div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex gap-4 text-xs font-mono">
                        <span>Pancakes Flipped: <strong className="text-white bg-zinc-900 px-2 py-0.5 rounded">{pancakeFlips}</strong></span>
                        <span>State: <strong className="text-[#FF5A1F]">{pancakeState.toUpperCase()}</strong></span>
                      </div>
                      <p className="text-[10px] text-zinc-500 italic max-w-sm">
                        {pancakeQuality || "Skillet is preheated! Hit flip to initiate baking."}
                      </p>
                    </div>

                    <button
                      onClick={handlePancakeFlip}
                      disabled={isFlipping}
                      className="px-4 py-2 bg-brand-green text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-[#86efac] disabled:opacity-50 transition-all flex items-center gap-1.5"
                    >
                      <Coffee className="w-4 h-4" /> Flip Pancake
                    </button>
                  </div>
                </div>

              </div>

              {/* Shopping basket & custom print-ready voucher invoice generator */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl space-y-4">
                  <h3 className="text-lg font-display tracking-wider text-white uppercase">🛒 TRANSACTION WORKSPACE</h3>
                  
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-zinc-600 font-mono text-xs">
                      Basket is empty.<br />Add artisan goods to begin check ledger.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between items-center p-2.5 bg-zinc-900 border border-white/5 rounded"
                          >
                            <div className="space-y-0.5">
                              <span className="text-xs text-white font-medium flex items-center gap-2">
                                <span>{item.product.emoji}</span> {item.product.name}
                              </span>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                ${item.product.priceUsd} USD × {item.quantity}
                              </span>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-zinc-600 hover:text-red-500 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-white/10 pt-3 space-y-2 text-xs font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Aggregate Items Total:</span>
                          <span>
                            ${cart.reduce((sum, item) => sum + item.product.priceUsd * item.quantity, 0)} USD
                          </span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Trade Commission Outflow (20%):</span>
                          <span className="text-brand-green">
                            ${(cart.reduce((sum, item) => sum + item.product.priceUsd * item.quantity, 0) * 0.2).toFixed(1)} USD
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={performCheckout}
                        disabled={isSubmittingOrder}
                        className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-light text-black font-semibold text-xs uppercase tracking-widest rounded transition-all disabled:opacity-50"
                      >
                        {isSubmittingOrder ? "Registering checkout..." : "Complete local order"}
                      </button>
                    </div>
                  )}
                </div>

                {/* Print Voucher Outcome panel */}
                {checkoutResult && (
                  <div className="p-6 bg-zinc-900 border-2 border-brand-green rounded-2xl space-y-4 font-mono text-xs text-zinc-400 shadow-[0_0_20px_rgba(41,224,111,0.15)] relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-8 h-8 bg-zinc-920 border-b border-l border-brand-green/20 flex items-center justify-center text-brand-green">
                      ✓
                    </div>
                    
                    <div className="text-center pb-2 border-b border-white/5 space-y-1">
                      <span className="text-[10.5px] font-bold text-white uppercase block">
                        FRUITFUL HOLDINGS TAX SLIP
                      </span>
                      <span className="text-[9px] text-zinc-500 block">
                        VAT Registration: Consolidated division ledger
                      </span>
                    </div>

                    <div className="space-y-1 text-[10.5px]">
                      <div className="flex justify-between">
                        <span>RECEIPT ID:</span>
                        <span className="text-white font-bold">{checkoutResult.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DELIVERY STATUS:</span>
                        <span className="text-brand-green font-bold uppercase">{checkoutResult.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Artisan payout:</span>
                        <span className="text-zinc-500">80% Directly funded</span>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded text-[10px] leading-relaxed text-zinc-500">
                      {checkoutResult.message}
                    </div>

                    <span className="w-full text-center text-[8.5px] text-zinc-600 block leading-none uppercase">
                      ─ THANK YOU FOR SUPPORTING INDIGENOUS COMMUNITIES ─
                    </span>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* CLIs SYSTEM CONSOLE / TERMINAL BOARD WRAPPER */}
      <footer className="border-t border-white/5 bg-zinc-950 p-4 mt-12">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* CLI Display Panel */}
          <div className="p-4 bg-zinc-900/80 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold font-mono tracking-widest text-[#FF5A1F] uppercase flex items-center gap-1.5 animate-pulse">
                <TerminalIcon className="w-4 h-4 text-[#FF5A1F]" /> Baobab Lattice CLI Console Workspace
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                Type <strong className="text-zinc-300">/help</strong> to list active operations
              </span>
            </div>

            {/* Simulated Live logs */}
            <div className="space-y-1 font-mono text-[10.5px] max-h-36 overflow-y-auto pr-2 flex flex-col">
              {logs.map((log) => {
                let col = "text-zinc-400";
                if (log.type === "success") col = "text-brand-green";
                if (log.type === "warning") col = "text-brand-gold";
                if (log.type === "error") col = "text-brand-red";
                if (log.type === "user") col = "text-brand-blue";
                if (log.type === "roar") col = "text-brand-orange-light font-bold saturate-150";

                return (
                  <div key={log.id} className="flex gap-2 leading-relaxed">
                    <span className="text-zinc-600">[{log.timestamp}]</span>
                    <span className={col}>{log.message}</span>
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Interactive Terminal Input Command fields */}
            <form onSubmit={handleTerminalSubmit} className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-xs text-zinc-600 font-mono self-center select-none">&gt;</span>
              <input
                type="text"
                placeholder="Submit live terminal action here (e.g. /lions roar, /pulse, /scan, /clear)..."
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent border-none text-xs font-mono focus:outline-none focus:ring-0 placeholder-zinc-700 text-brand-orange-light text-[11px]"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white rounded text-[10px] uppercase font-mono font-bold tracking-wider hover:border-[#FF5A1F]/50 transition-all cursor-pointer"
              >
                Execute
              </button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-zinc-600 text-[10.5px] font-mono uppercase tracking-widest gap-2">
            <div>
              Fruitful Holdings (Pty) Ltd × Red Bull × Global Ecosystem · 2026
            </div>
            <div>
              Designed with Truth, Beauty, &amp; Curiosity · 接入已准 
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
