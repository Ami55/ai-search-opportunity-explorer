import React, { useState, useEffect } from "react";
import { Sparkles, Globe, Compass, Cpu, Search, AlertCircle, RefreshCw, Layers, ArrowRight } from "lucide-react";

interface AnalysisFormProps {
  onAnalyze: (inputs: {
    primaryKeyword: string;
    websiteDomain: string;
    country: string;
    industry: string;
    competitors: string[];
    language: string;
  }) => Promise<void>;
  loading: boolean;
}

export default function AnalysisForm({ onAnalyze, loading }: AnalysisFormProps) {
  const [primaryKeyword, setPrimaryKeyword] = useState("private tour guide italy");
  const [websiteDomain, setWebsiteDomain] = useState("toursbylocals.com");
  const [country, setCountry] = useState("Italy");
  const [industry, setIndustry] = useState("Travel & Tourism");
  const [competitorsInput, setCompetitorsInput] = useState("viator.com, getyourguide.com, airbnb.com");
  const [language, setLanguage] = useState("English");
  
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Initializing Conversational Query Prediction model...",
    "Crawling site schema nodes and indexing competitors...",
    "Generating 100+ predicted intent-clustered query variations...",
    "Aligning entity coverage against Wikidata & Search Graph registers...",
    "Simulating retrieval citations and calculating GEO readiness index...",
    "Drafting prioritized 30-day action roadmaps and opportunities matrix..."
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 3500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!primaryKeyword.trim()) {
      setError("Primary Keyword is required for entity projection.");
      return;
    }
    if (!websiteDomain.trim()) {
      setError("Your Website Domain is required to calculate comparative visibility.");
      return;
    }

    // Clean competitors
    const cleanCompetitors = competitorsInput
      .split(",")
      .map(dom => dom.trim().toLowerCase())
      .filter(Boolean);

    onAnalyze({
      primaryKeyword: primaryKeyword.trim(),
      websiteDomain: websiteDomain.trim().toLowerCase(),
      country: country.trim(),
      industry: industry.trim(),
      competitors: cleanCompetitors,
      language: language.trim()
    });
  };

  const loadExample = (keyword: string, dom: string, competitors: string, ind: string, cntry: string) => {
    setPrimaryKeyword(keyword);
    setWebsiteDomain(dom);
    setCompetitorsInput(competitors);
    setIndustry(ind);
    setCountry(cntry);
  };

  return (
    <div className="bg-slate-900 border border-slate-805 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      {/* Form Title banner */}
      <div className="border-b border-slate-800 pb-5 mb-6">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" /> AI Opportunity Scanner
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Provide your target parameters below to generate advanced GEO (Generative Engine Optimization) intelligence reports.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Core inputs: Keyword and domain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Primary Seed Keyword <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                value={primaryKeyword}
                onChange={(e) => setPrimaryKeyword(e.target.value)}
                placeholder="e.g. private tour guide italy"
                required
                disabled={loading}
                className="w-full bg-slate-950/80 hover:bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs outline-none transition"
              />
            </div>
            <span className="text-[10px] text-slate-500 block">The transactional query or niche theme you wish to index.</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Your Website Domain <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                value={websiteDomain}
                onChange={(e) => setWebsiteDomain(e.target.value)}
                placeholder="e.g. toursbylocals.com"
                required
                disabled={loading}
                className="w-full bg-slate-950/80 hover:bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs outline-none transition"
              />
            </div>
            <span className="text-[10px] text-slate-500 block">The root website to compare against knowledge networks.</span>
          </div>
        </div>

        {/* Competitors domains comma-separated */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Competitor Domains (Separated by commas)
          </label>
          <div className="relative">
            <Compass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              value={competitorsInput}
              onChange={(e) => setCompetitorsInput(e.target.value)}
              placeholder="viator.com, getyourguide.com, airbnb.com"
              disabled={loading}
              className="w-full bg-slate-950/80 hover:bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs outline-none transition"
            />
          </div>
          <span className="text-[10px] text-slate-500 block">Identify 1 to 5 major domains currently commanding AI share of voice.</span>
        </div>

        {/* Optional parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="space-y-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Country Region
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Italy, United States"
              disabled={loading}
              className="w-full bg-slate-950/50 border border-slate-850 hover:border-slate-800 focus:border-blue-500 text-slate-300 rounded-lg px-2.5 py-2 text-xs outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Niche Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Travel, SaaS, Fintech"
              disabled={loading}
              className="w-full bg-slate-950/50 border border-slate-850 hover:border-slate-800 focus:border-blue-500 text-slate-300 rounded-lg px-2.5 py-2 text-xs outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Output Language
            </label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g. English, French, Italian"
              disabled={loading}
              className="w-full bg-slate-950/50 border border-slate-850 hover:border-slate-800 focus:border-blue-500 text-slate-300 rounded-lg px-2.5 py-2 text-xs outline-none transition"
            />
          </div>
        </div>

        {/* Demo suggestions shortcuts */}
        <div className="pt-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
            Try Popular Seed Presets 
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => loadExample("private tour guide italy", "toursbylocals.com", "viator.com, getyourguide.com, airbnb.com", "Travel & Tourism", "Italy")}
              className="text-[11px] bg-slate-950 hover:bg-slate-850 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-850 hover:border-slate-800 transition"
            >
              🇮🇹 Private Italy Guides (toursbylocals.com)
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => loadExample("modern scheduling API", "calendly.com", "cal.com, acuityscheduling.com", "SaaS & Productivity", "Global")}
              className="text-[11px] bg-slate-950 hover:bg-slate-850 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-850 hover:border-slate-800 transition"
            >
              📅 Scheduling APIs (calendly.com)
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => loadExample("custom visual design tools", "canva.com", "figma.com, adobe.com", "Design SaaS", "Global")}
              className="text-[11px] bg-slate-950 hover:bg-slate-850 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-850 hover:border-slate-800 transition"
            >
              🎨 Creative Design Tools (canva.com)
            </button>
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3.5 bg-red-950/30 border border-red-900/50 rounded-xl flex gap-2 text-red-200 text-xs">
            <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit action */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <span className="text-[11px] text-slate-400 font-mono hidden sm:block">
            Est. processing period: ~10 seconds
          </span>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-slate-850 text-white font-semibold text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-900/20 shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Audit Processing...
              </>
            ) : (
              <>
                Initiate GEO Scan <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Realistic loading screen state overlay */}
      {loading && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-40 transition-opacity">
          <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-4" />
          <h3 className="text-sm font-bold text-slate-100 tracking-wide flex items-center gap-1.5 justify-center">
            <Cpu className="w-4 h-4 text-blue-400 animate-pulse" /> Scanning Knowledge Vector State
          </h3>
          <p className="text-xs text-blue-400 font-mono mt-1.5 max-w-md animate-pulse">
            {loadingMessages[loadingStep]}
          </p>
          <div className="w-36 bg-slate-900 h-1 rounded-full overflow-hidden mt-4 border border-slate-850">
            <div className="bg-blue-500 h-full rounded-full animate-pulse" style={{ width: `${(loadingStep + 1) * 16.6}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
