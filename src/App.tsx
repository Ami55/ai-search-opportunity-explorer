import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  BarChart2, 
  Zap, 
  FileText, 
  Sun, 
  Moon, 
  Globe, 
  Radar, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  Cpu,
  BookOpen,
  Info
} from "lucide-react";
import { GeoAnalysisResult } from "./types";
import AnalysisForm from "./components/AnalysisForm";
import ExecutiveDashboard from "./components/ExecutiveDashboard";
import PromptSimulator from "./components/PromptSimulator";
import AgencyReport from "./components/AgencyReport";
import HowItWorksModal from "./components/HowItWorksModal";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [analysisResult, setAnalysisResult] = useState<GeoAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "simulator" | "report">("dashboard");
  const [error, setError] = useState<string | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Trigger default run on mount to display ready-made metrics on the dashboard instantly
  useEffect(() => {
    triggerDefaultAudit();
  }, []);

  const triggerDefaultAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://gemini-proxy-2.vercel.app/api/ai-search-explorer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyze",
          primaryKeyword: "private tour guide italy",
          websiteDomain: "toursbylocals.com",
          competitors: ["viator.com", "getyourguide.com", "airbnb.com"],
          country: "Italy",
          industry: "Travel & Tours"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to initialize target optimization scan.");
      }
      
      const data = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during database profiling.");
    } finally {
      setLoading(false);
    }
  };

  const handleRunAudit = async (inputs: {
    primaryKeyword: string;
    websiteDomain: string;
    country: string;
    industry: string;
    competitors: string[];
    language: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://gemini-proxy-2.vercel.app/api/ai-search-explorer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyze", ...inputs })
      });

      if (!response.ok) {
        throw new Error("Failed to process conversational indexing parameters.");
      }

      const data = await response.json();
      setAnalysisResult(data);
      setActiveTab("dashboard"); // Settle onto dashboard tab to show results
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during custom model analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={theme === "dark" ? "dark bg-slate-950 text-slate-100 min-h-screen selection:bg-blue-600/30 font-sans" : "bg-slate-50 text-slate-900 min-h-screen selection:bg-blue-200 font-sans"}>
      {/* ================= NAVIGATION BAR ================= */}
      <header className="border-b ${theme === 'dark' ? 'border-slate-900 bg-slate-950/80' : 'border-slate-200 bg-white/80'} backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Radar className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 block uppercase">
                AI Search Opportunity Explorer
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-widest font-mono">
                GEO & LLM Intelligence Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 border border-blue-500/20 text-xs font-semibold transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>How it Works</span>
            </button>

            {/* Theme state selector trigger */}
            <button
              onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 transition cursor-pointer"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
            </button>
            <span className="text-xs font-mono py-1 px-2.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 hidden md:inline-block">
              GEO v1.4
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Intro Hero with modern GEO contextual details */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-2 border-b border-slate-800/20">
          <div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 tracking-tight">
              AI Search Opportunity Scanner
            </h1>
            <p className="text-sm text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
              Analyze citation likelihood, capture competitor share of voice, extract missing entities, and secure citations within generative AI search outcomes (GEO / Generative Engine Optimization).
            </p>
          </div>
        </div>

        {/* Input panel block */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <AnalysisForm onAnalyze={handleRunAudit} loading={loading} />
        </div>

        {/* Result views coordinate spaces */}
        {analysisResult ? (
          <div className="space-y-6">
            {/* Tab navigation links */}
            <div className="flex border-b border-slate-800 pb-px gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`py-3 px-5 text-sm font-semibold tracking-tight transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                  activeTab === "dashboard"
                    ? "border-blue-500 text-blue-400 bg-blue-500/5 rounded-t-lg"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <BarChart2 className="w-4 h-4" /> Executive Dashboard
              </button>
              <button
                onClick={() => setActiveTab("simulator")}
                className={`py-3 px-5 text-sm font-semibold tracking-tight transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                  activeTab === "simulator"
                    ? "border-blue-500 text-blue-400 bg-blue-500/5 rounded-t-lg"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Cpu className="w-4 h-4" /> Interactive Prompt Simulator
              </button>
              <button
                onClick={() => setActiveTab("report")}
                className={`py-3 px-5 text-sm font-semibold tracking-tight transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                  activeTab === "report"
                    ? "border-blue-500 text-blue-400 bg-blue-500/5 rounded-t-lg"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="w-4 h-4" /> Agency Performance Report
              </button>
            </div>

            {/* Render selected workspace frame tab */}
            {activeTab === "dashboard" && (
              <ExecutiveDashboard data={analysisResult} />
            )}

            {activeTab === "simulator" && (
              <PromptSimulator 
                websiteDomain={analysisResult?.websiteDomain || ""} 
                competitors={(analysisResult?.competitorMentions || []).map(c => c.brand).filter(b => b !== analysisResult?.websiteDomain)} 
              />
            )}

            {activeTab === "report" && (
              <AgencyReport data={analysisResult} />
            )}
          </div>
        ) : (
          !loading && (
            <div className="p-12 text-center text-slate-500 border border-slate-800 rounded-2xl bg-slate-900/50">
              <HelpCircle className="w-10 h-10 mx-auto opacity-40 mb-2 stroke-1" />
              <p className="text-sm">Initiate a seed search above to compile your GEO platform analytics reports.</p>
            </div>
          )
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-900/60 bg-slate-950 text-slate-500 text-xs mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span>&copy; 2026 AI Search Opportunity Explorer. Developed by <strong className="text-slate-300">Ami - SEO Girl</strong>. All rights reserved.</span>
            <span className="block text-[10px] text-slate-600 mt-1 font-mono">Generative Engine Optimization research and opportunity analysis</span>
          </div>
          <div className="flex gap-4 text-[10.5px] font-mono">
            <span className="hover:text-slate-300 cursor-pointer">Security Protocol</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">GEO Guidelines v1.2</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Safeguards</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
