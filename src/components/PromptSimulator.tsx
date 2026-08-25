import React, { useState } from "react";
import { Sparkles, Play, Search, AlertCircle, RefreshCw, BarChart2, ShieldCheck, ArrowRight, FileText } from "lucide-react";
import { SimulationResult } from "../types";

interface PromptSimulatorProps {
  websiteDomain: string;
  competitors: string[];
}

export default function PromptSimulator({ websiteDomain, competitors }: PromptSimulatorProps) {
  const [promptInput, setPromptInput] = useState("Best private tour guides in Italy");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    "Best private tour guides in Italy",
    "Best local tour guide companies",
    `How to book custom excursions via ${websiteDomain || "independent sites"}`,
    "Cheapest private guide Rome reviews",
    "Are personal travel guides safe in Venice?"
  ];

  const handleSimulate = async (textToSimulate: string) => {
    if (!textToSimulate.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://gemini-proxy-2.vercel.app/api/ai-search-explorer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "simulate",
          prompt: textToSimulate,
          websiteDomain: websiteDomain || "yourdomain.com",
          competitors: competitors.filter(Boolean)
        })
      });
      if (!response.ok) {
        throw new Error("Failed to compile simulation from AI endpoint.");
      }
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during simulation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-prompt-simulator" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Flagship Module
          </span>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            AI Prompt Simulator <span className="text-xs text-slate-400 font-mono font-normal">Active Simulation Sandbox</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Test custom queries to see simulated LLM answers, cited sources, and real-time retrieval probability scores.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block font-mono">Target Agent</span>
          <span className="text-sm font-semibold text-emerald-400 font-mono">gemini-3.6-flash</span>
        </div>
      </div>

      {/* Input section */}
      <div className="mt-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Conversational Search Query Prompt
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Best local guides in Rome..."
              className="w-full bg-slate-950/80 hover:bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-100 placeholder-slate-500 rounded-xl pl-11 pr-4 py-3 text-sm transition focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => handleSimulate(promptInput)}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors shrink-0 shadow-lg shadow-blue-900/20"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Run Simulation
              </>
            )}
          </button>
        </div>

        {/* Presets */}
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-slate-500">Quick suggestions:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(preset);
                handleSimulate(preset);
              }}
              className="text-xs bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-850 hover:border-slate-700 px-3 py-1.5 rounded-full transition"
            >
              "{preset}"
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-6 p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex gap-3 text-red-200 text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Query Simulation Failed</p>
            <p className="text-red-300/80 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Results Workspace */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left pane: Predicted Answer */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col min-h-[320px]">
          <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Conversational Answer Feed
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Cites Verified Sources
            </span>
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 text-center">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-3" />
              <p className="text-sm font-medium text-slate-200">Querying Virtual Agent State</p>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Triggering vector indexing and synthetic citation synthesis via generative engine model...
              </p>
            </div>
          ) : result ? (
            <div className="flex-1 text-slate-300 text-sm leading-relaxed prose prose-invert max-w-none">
              <div className="whitespace-pre-line">
                {result.simulatedAnswer}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 text-center">
              <Sparkles className="w-10 h-10 text-slate-700 mb-3" />
              <p className="text-sm font-medium text-slate-400">Simulator Sandbox Idle</p>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Choose a query above or write your own custom conversational prompt, then press 'Run Simulation'.
              </p>
            </div>
          )}
        </div>

        {/* Right pane: Visibility probabilities */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-850 pb-3 mb-4">
              <BarChart2 className="w-3.5 h-3.5 text-blue-400" /> Retrieval Probability Index
            </h3>

            {loading ? (
              <div className="space-y-4 py-8 animate-pulse">
                <div className="h-4 bg-slate-900 rounded w-1/3"></div>
                <div className="h-6 bg-slate-900 rounded"></div>
                <div className="h-6 bg-slate-900 rounded"></div>
                <div className="h-6 bg-slate-900 rounded"></div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-blue-400 block tracking-wider">
                      Optimal Target Domain
                    </span>
                    <span className="text-sm font-bold text-slate-200 truncate block max-w-[200px]">
                      {websiteDomain}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Predicted Rank</span>
                    <span className="text-base font-black text-slate-100 font-mono">
                      {(result.probabilities || []).find((p) => p.brand?.toLowerCase() === websiteDomain?.toLowerCase())?.score && 
                       (result.probabilities || []).find((p) => p.brand?.toLowerCase() === websiteDomain?.toLowerCase())!.score > 50 ? "#2" : "Unranked"}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-slate-400 block">
                  Probability of citation & recall in generative answers:
                </span>

                <div className="space-y-3.5">
                  {(result.probabilities || []).map((prob, index) => {
                    const isUser = prob.brand?.toLowerCase() === websiteDomain?.toLowerCase();
                    return (
                      <div key={index} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-mono truncate max-w-[220px] ${isUser ? "text-blue-400 font-bold" : "text-slate-300"}`}>
                            {prob.brand} {isUser && <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded ml-1">You</span>}
                          </span>
                          <span className="font-mono font-bold text-slate-100">{prob.score}%</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isUser ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-slate-600 to-slate-500"
                            }`}
                            style={{ width: `${prob.score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 p-3.5 rounded-lg bg-slate-900/60 border border-slate-850 flex items-start gap-2 text-xs text-slate-400 leading-normal">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>GEO Strategy Tip:</strong> Answers tend to retrieve from directories having multiple domain-level links pointing to identical schema names. Increase entity frequency to level up citation probability.
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-600">
                <BarChart2 className="w-8 h-8 mx-auto stroke-1 stroke-slate-700 mb-2" />
                <p className="text-xs">No active probability projection generated.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
