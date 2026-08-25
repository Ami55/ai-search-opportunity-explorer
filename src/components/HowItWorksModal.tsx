import React from "react";
import { 
  X, 
  Sparkles, 
  Cpu, 
  Layers, 
  Search, 
  Compass, 
  BarChart3, 
  Database, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  Bot,
  Zap,
  Target
} from "lucide-react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: "01",
      badge: "Discovery & Intent",
      title: "Conversational Query & Intent Prediction",
      description: "Unlike traditional search with 2-3 word queries, users ask AI engines complex, conversational, multi-part prompts. The platform predicts 100+ intent-clustered query variations across informational, commercial, transactional, and comparative journeys.",
      icon: Search,
      accentColor: "blue",
      keyMetrics: ["Search Intent Clustering", "Prompt Variation Depth", "Volume & Demand Index"]
    },
    {
      stepNumber: "02",
      badge: "Entity Graphs",
      title: "Knowledge Vector & Entity Alignment",
      description: "Generative engines rely on semantic knowledge graphs (Wikidata, Schema.org nodes, contextual citations). The scanner checks your brand's presence across these registers to identify uncovered entities and authority relationships.",
      icon: Database,
      accentColor: "indigo",
      keyMetrics: ["Wikidata Entity Mapping", "Schema Node Completeness", "Topical Authority Score"]
    },
    {
      stepNumber: "03",
      badge: "Share of Voice",
      title: "AI Share of Voice & Citation Simulation",
      description: "Using probabilistic LLM retrieval modeling, we simulate multi-engine answers (ChatGPT, Gemini, Perplexity, Claude, Copilot) to evaluate how often your brand is cited vs. competitors for target prompts.",
      icon: BarChart3,
      accentColor: "purple",
      keyMetrics: ["Brand Mention Frequency", "Comparative SOV %", "Retrieval Source Importance"]
    },
    {
      stepNumber: "04",
      badge: "Gap Identification",
      title: "Content Gap & Opportunity Matrix",
      description: "Discover exactly which comparison guides, FAQ schema structures, technical specifications, and informational pages your competitors possess that give them preferential citation in AI syntheses.",
      icon: Target,
      accentColor: "emerald",
      keyMetrics: ["Competitor Gap Scores", "Recommended URL Slugs", "Impact vs. Effort Quadrant"]
    },
    {
      stepNumber: "05",
      badge: "Execution Plan",
      title: "Prioritized 30-Day GEO Action Plan",
      description: "Receive a tactical, step-by-step roadmap structured into immediate quick wins, medium-term content builds, and long-term knowledge graph integrations to systematically capture top generative citations.",
      icon: Zap,
      accentColor: "amber",
      keyMetrics: ["30-Day Focus Items", "Fastest Traffic Gaps", "Schema Implementation Code"]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-800 flex items-start justify-between gap-4 sticky top-0 bg-slate-900/90 backdrop-blur-sm z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Generative Engine Optimization (GEO) Framework
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              How the AI Search Opportunity Explorer Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Understand how modern Generative Engine Optimization (GEO) algorithms extract, measure, and optimize brand visibility across LLM search engines.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition border border-slate-700/50 shrink-0 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300">
          {/* Overview Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="text-slate-100 font-semibold block mb-0.5">
                The Shift from Traditional SEO to Generative Engine Optimization (GEO):
              </strong>
              AI search engines (ChatGPT Search, Google AI Overviews, Perplexity, Gemini, Microsoft Copilot) don't rank 10 blue links; they synthesize answers and cite authoritative semantic nodes. Our platform analyzes and secures your brand's presence in these generative syntheses.
            </div>
          </div>

          {/* 5-Step Process Cards */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              The 5-Phase GEO Intelligence Pipeline
            </h3>

            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-850 hover:border-slate-750 transition flex flex-col sm:flex-row gap-4 items-start"
                >
                  <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      {item.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {item.badge}
                      </span>
                      <h4 className="text-sm font-bold text-slate-100">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-2">
                      {item.keyMetrics.map((metric, mIdx) => (
                        <span 
                          key={mIdx}
                          className="text-[11px] bg-slate-900/90 text-slate-300 border border-slate-800/80 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Advantages Matrix */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Key Features & Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850">
                <span className="font-bold text-slate-200 block mb-1">Interactive Prompt Simulator</span>
                <p className="text-slate-400 text-[11.5px]">Test any custom user prompt in real-time to simulate citation likelihood, predicted rankings, and synthesis snippets.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850">
                <span className="font-bold text-slate-200 block mb-1">Executive Agency Reporting</span>
                <p className="text-slate-400 text-[11.5px]">Export clean CSV datasets of 100+ predicted queries or generate PDF-ready executive briefs for clients and teams.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850">
                <span className="font-bold text-slate-200 block mb-1">Schema & Knowledge Graphs</span>
                <p className="text-slate-400 text-[11.5px]">Detect missing SameAs, About, and Mentions Wikidata entity bindings to strengthen topical relevance.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-850">
                <span className="font-bold text-slate-200 block mb-1">GEO Readiness Index (0-100)</span>
                <p className="text-slate-400 text-[11.5px]">Unified composite readiness score combining query coverage, entity saturation, content parity, and domain authority.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 font-mono text-center sm:text-left">
            © 2026 AI Search Opportunity Explorer. Developed by Ami - SEO Girl. All rights reserved.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-blue-900/20 cursor-pointer"
          >
            Got it, Let's Optimize!
          </button>
        </div>
      </div>
    </div>
  );
}
