import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
import { 
  TrendingUp, 
  AlertCircle, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  FileText, 
  Target, 
  Award, 
  Zap, 
  Bookmark, 
  ArrowUpRight, 
  ChevronRight, 
  Filter,
  Flame,
  MousePointerClick
} from "lucide-react";
import { GeoAnalysisResult, IntentType, PredictedQuestion, TaskRecord } from "../types";

interface ExecutiveDashboardProps {
  data: GeoAnalysisResult;
}

export default function ExecutiveDashboard({ data }: ExecutiveDashboardProps) {
  const [questionFilter, setQuestionFilter] = useState<IntentType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleQuestionsCount, setVisibleQuestionsCount] = useState(15);

  const websiteDomain = data?.websiteDomain || "";
  const searchDemand = data?.searchDemand || { demandScore: 0, estimatedVolumeScore: 0, intentDistribution: {} };
  const predictedQuestions = data?.predictedQuestions || [];
  const competitorMentions = data?.competitorMentions || [];
  const gapAnalysis = data?.gapAnalysis || { gapScore: 0, competitorGaps: [] };
  const contentGaps = data?.contentGaps || [];
  const entityAnalysis = data?.entityAnalysis || { entityCoverageScore: 0, entities: [] };
  const retrievalSources = data?.retrievalSources || [];
  const citationOpportunities = data?.citationOpportunities || [];
  const geoReadiness = data?.geoReadiness || {
    totalScore: 0,
    queryCoverageScore: 0,
    entityCoverageScore: 0,
    contentCoverageScore: 0,
    authorityScore: 0,
    competitorVisibilityScore: 0,
    tier: "Weak" as const,
    overallVerdict: ""
  };
  const actionPlan = data?.actionPlan || {
    phase30Days: { title: "30-Day Plan Focus", tasks: [] },
    quickWins: [],
    mediumTerm: [],
    longTerm: []
  };

  // Colors for Intent Segments
  const intentColors: { [key: string]: string } = {
    commercial: "#F59E0B",   // Amber
    informational: "#3B82F6", // Blue
    comparison: "#A855F7",    // Purple
    trust: "#10B981",         // Emerald
    transactional: "#F43F5E"  // Rose
  };

  // 1. Intent Distribution Chart Data
  const intentChartData = Object.entries(searchDemand?.intentDistribution || {}).map(([key, val]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: Number(val) || 0,
    color: intentColors[key] || "#94A3B8"
  }));

  // 2. Share of Voice Chart Data
  const baseMentionColors = ["#3B82F6", "#F59E0B", "#10B981", "#EC4899", "#A855F7"];
  const competitorMentionChartData = (competitorMentions || []).map((item, idx) => ({
    name: item.brand,
    SOV: item.shareOfVoice,
    Mentions: item.mentions,
    color: baseMentionColors[idx % baseMentionColors.length]
  }));

  // Filtered Questions list
  const filteredQuestions = (predictedQuestions || []).filter(q => {
    const matchesIntent = questionFilter === "all" || q.intent === questionFilter;
    const matchesSearch = q.question?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return matchesIntent && matchesSearch;
  });

  // Matrix Representation for Content gaps
  const contentGapMatrix = (contentGaps || []).map((item, index) => ({
    id: index + 1,
    name: item.pageTitle,
    priority: item.priority,
    score: item.priorityScore,
    url: item.recommendedUrlSlug,
    question: item.targetedQuestion
  }));

  // Geo readiness color level
  const getReadinessColor = (score: number) => {
    if (score >= 90) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 75) return "text-blue-400 border-blue-500/30 bg-blue-500/10";
    if (score >= 50) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-rose-400 border-rose-500/30 bg-rose-500/10";
  };

  const getReadinessBg = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 75) return "bg-blue-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  // Opportunity Heatmap payload
  // Map Estimated Impact (X-Axis: Low=1, Medium=2, High=3) and Difficulty (Y-Axis: Hard=1, Medium=2, Easy=3)
  const heatmapData = (citationOpportunities || []).map((op, idx) => {
    let x = 1;
    if (op.estimatedImpact === "Medium") x = 2;
    if (op.estimatedImpact === "High") x = 3;

    let y = 1;
    if (op.difficulty === "Medium") y = 2;
    if (op.difficulty === "Easy") y = 3;

    return {
      id: idx + 1,
      source: op.source,
      xVal: x,
      yVal: y,
      impact: op.estimatedImpact,
      diff: op.difficulty,
      desc: op.description
    };
  });

  return (
    <div className="space-y-8">
      {/* ================= HEADER OVERVIEW STATE ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Core GEO Score Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Award className="w-24 h-24 text-blue-400" />
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider font-mono">
              GEO Readiness
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-slate-100 tracking-tight">
                {geoReadiness.totalScore}
              </span>
              <span className="text-sm text-slate-400 font-mono">/100</span>
            </div>
            <div className="mt-2.5">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wider ${getReadinessColor(geoReadiness.totalScore)}`}>
                {geoReadiness.tier} Tier
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 leading-normal bg-slate-950/40 p-2.5 rounded border border-slate-800/50">
            {geoReadiness.totalScore >= 75 ? "Excellent index coverage." : "Authority triggers are lacking in main search directories."}
          </p>
        </div>

        {/* AI Query volume/score index */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider font-mono">
              AI Query Demand
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-slate-100 tracking-tight">
                {searchDemand.demandScore}%
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center font-mono">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" /> High
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-snug">
              Generative answers query volume score is index calculated at <span className="text-slate-200 font-bold font-mono">{searchDemand.estimatedVolumeScore}/100</span>.
            </p>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-3 border border-slate-850">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${searchDemand.demandScore}%` }} />
          </div>
        </div>

        {/* Gap index score */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider font-mono">
              Competitor Gap Score
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-slate-100 tracking-tight">
                {gapAnalysis.gapScore}
              </span>
              <span className="text-xs uppercase px-2 py-0.5 rounded font-bold font-mono bg-amber-500/10 text-amber-500 border border-amber-500/15">
                Significant
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-snug">
              Competitors are visible in several unique categories of long-tail queries where you are absent.
            </p>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-3 border border-slate-850">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${gapAnalysis.gapScore}%` }} />
          </div>
        </div>

        {/* Entity coverage */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider font-mono">
              Entity Coverage Index
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-slate-100 tracking-tight">
                {entityAnalysis.entityCoverageScore}%
              </span>
              <span className="text-xs text-rose-400 font-bold font-mono">
                {100 - entityAnalysis.entityCoverageScore}% Missing
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-snug">
              Percentage of crucial schema nodes and knowledge graph relations verified on your target site.
            </p>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-3 border border-slate-850">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${entityAnalysis.entityCoverageScore}%` }} />
          </div>
        </div>
      </div>

      {/* ================= OVERALL VERDICT SECTION ================= */}
      <div className="p-5 rounded-xl border border-blue-500/20 bg-slate-900/50 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-blue-500" />
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-400" /> Strategic Executive Summary
        </h3>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          {geoReadiness.overallVerdict}
        </p>
      </div>

      {/* ================= STEP 1 & 2: INTENT & PREDICTED QUERIES ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer: Query Intent distribution and Volume */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" /> 1. Query Intent Chart
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Estimated distribution of conversational search queries.
          </p>
          <div className="h-60 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={intentChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {intentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px" }}
                  itemStyle={{ color: "#f8fafc", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center flex flex-col justify-center">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Dominant Intent</span>
              <span className="text-lg font-black text-slate-200">
                {intentChartData.sort((a,b)=>b.value - a.value)[0]?.name}
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {intentChartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-slate-950 transition">
                <span className="flex items-center gap-2 font-medium text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-mono font-bold text-slate-100 bg-slate-950 px-2 py-0.5 rounded">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1 workspace: 100+ predicted queries search and index */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" /> 100+ Predicted AI Prompts
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic dataset of search queries users ask conversational engines.
              </p>
            </div>
            <div className="text-xs bg-slate-950 font-mono px-3 py-1.5 rounded-lg border border-slate-850 text-slate-300">
              Found <span className="text-blue-400 font-bold">{predictedQuestions.length} Total Prompts</span>
            </div>
          </div>

          {/* Filtering and search row */}
          <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search predicted queries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-xs border border-slate-800 hover:border-slate-750 focus:border-blue-500 placeholder-slate-500 text-slate-200 rounded-lg px-3 py-2.5 outline-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setQuestionFilter("all")}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition ${questionFilter === "all" ? "bg-blue-600 text-white" : "bg-slate-950 hover:bg-slate-850 text-slate-400"}`}
              >
                All Intents
              </button>
              {Object.keys(intentColors).map((intent) => (
                <button
                  key={intent}
                  onClick={() => setQuestionFilter(intent as IntentType)}
                  className={`px-2.5 py-1.5 rounded text-xs font-medium transition capitalize ${questionFilter === intent ? "text-white" : "bg-slate-950 hover:bg-slate-850 text-slate-400"}`}
                  style={questionFilter === intent ? { backgroundColor: intentColors[intent] } : {}}
                >
                  {intent}
                </button>
              ))}
            </div>
          </div>

          {/* Questions table */}
          <div className="overflow-x-auto flex-1 max-h-[400px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-950/50">
                  <th className="p-3 font-semibold">Predicted Prompt</th>
                  <th className="p-3 font-semibold text-center w-24">Intent Category</th>
                  <th className="p-3 font-semibold text-center w-20">Volume Score</th>
                  <th className="p-3 font-semibold w-40">AI Mention Lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {filteredQuestions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No matching predicted queries found. Try adjusting filters or typing another keyword.
                    </td>
                  </tr>
                ) : (
                  filteredQuestions.slice(0, visibleQuestionsCount).map((q, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/60 transition-colors">
                      <td className="p-3 font-mono text-slate-200 leading-normal max-w-[320px] truncate" title={q.question}>
                        {q.question}
                      </td>
                      <td className="p-3 text-center">
                        <span 
                          className="inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase transition"
                          style={{ backgroundColor: `${intentColors[q.intent]}15`, color: intentColors[q.intent], border: `1px solid ${intentColors[q.intent]}25` }}
                        >
                          {q.intent}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono text-slate-300">
                        {q.volumeScore}
                      </td>
                      <td className="p-3">
                        {q.likelyMentions && q.likelyMentions.length > 0 ? (
                          <div className="flex flex-col gap-0.5 text-[11px]">
                            <span className="font-bold text-slate-300 truncate max-w-[150px]">
                              1. {q.likelyMentions[0].brand}
                            </span>
                            {q.likelyMentions[1] && (
                              <span className="text-slate-500 truncate max-w-[150px]">
                                2. {q.likelyMentions[1].brand}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-600">Uncalculated</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {filteredQuestions.length > visibleQuestionsCount && (
            <div className="mt-3 text-center border-t border-slate-850 pt-3">
              <button
                onClick={() => setVisibleQuestionsCount(prev => prev + 15)}
                className="text-xs bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-lg transition inline-flex items-center gap-1"
              >
                Show More Prompts (+15)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= STEP 3 & 4: COMPETITOR MENTIONS & SHARE OF VOICE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualization: Mention Frequency Bar Chart */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" /> 2. AI Share of Voice Chart
          </h3>
          <p className="text-xs text-slate-400 mb-4 animate-pulse">
            Percentage representation of brand reference occurrences across virtual search indices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Chart */}
            <div className="md:col-span-7 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitorMentionChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px" }}
                    itemStyle={{ color: "#f8fafc", fontSize: "11px" }}
                  />
                  <Bar dataKey="SOV" name="Share of Voice (%)" radius={[4, 4, 0, 0]}>
                    {competitorMentionChartData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Side Table statistics */}
            <div className="md:col-span-5 space-y-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Brand Frequency Tracker
              </span>
              <div className="divide-y divide-slate-800">
                {(competitorMentions || []).map((item, idx) => {
                  const isUser = item.brand === websiteDomain;
                  return (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className={`font-mono block truncate max-w-[160px] ${isUser ? "text-blue-400 font-bold" : "text-slate-300"}`}>
                          {item.brand}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {item.mentions} predicted query mentions
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-slate-100 font-bold">{item.shareOfVoice}%</span>
                        <span className="text-[9px] text-slate-500 block">SOV</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4 Competitor Gap Analysis Panel */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-3 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" /> Competitor Gap Map
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Find specific searches where rival domains appear in AI choices, but your brand page is missing.
            </p>

            <div className="space-y-4">
              {(gapAnalysis?.competitorGaps || []).map((item, index) => (
                <div key={index} className="p-3 rounded-lg bg-slate-950 border border-slate-850">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono font-bold text-slate-300 truncate max-w-[120px]" title={item.competitor}>
                      {item.competitor}
                    </span>
                    <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-mono">
                      +{item.additionalMentionsCount} lost slots
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Missing Sample:</span>
                    <span className="italic block text-slate-300 truncate font-mono">
                      "{item.sampleQuestions?.[0] || ""}"
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Overall Optimization Gap Index</span>
            <span className="font-mono text-slate-200 font-extrabold">{(gapAnalysis?.gapScore !== undefined ? gapAnalysis.gapScore : 0)}/100</span>
          </div>
        </div>
      </div>

      {/* ================= STEP 5 & 6: CONTENT & ENTITY GAP ANALYSIS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step 5: Content Gap Matrix Representation */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> 3. Content Gap Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Recommended pages to create to answer unfulfilled AI queries.
              </p>
            </div>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">
              Priority Grid
            </span>
          </div>

          <div className="space-y-4">
            {(contentGaps || []).map((item, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 transition flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                      {item.pageTitle}
                    </h4>
                    <span className="text-[10px] text-blue-400 font-mono block mt-0.5">
                      Target URL: {item.recommendedUrlSlug}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    item.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    item.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {item.priority} Priority ({item.priorityScore})
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="truncate max-w-[280px]">For prompt: "{item.targetedQuestion}"</span>
                  <span className="text-slate-400 flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                    Preview Slug <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 6: Entity Coverage Map */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-500" /> 4. Entity Coverage Graph
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Entities detected in competitor content vs yours. Citing knowledge bases increases AI retrieval weight.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 mb-4">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block font-mono">
              Entity Coverage Index
            </span>
            <div className="flex items-center gap-3.5 mt-2">
              <span className="text-3xl font-black text-slate-100 font-mono">{(entityAnalysis?.entityCoverageScore !== undefined ? entityAnalysis.entityCoverageScore : 0)}%</span>
              <div className="flex-1 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(entityAnalysis?.entityCoverageScore !== undefined ? entityAnalysis.entityCoverageScore : 0)}%` }} />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {(entityAnalysis?.entities || []).map((ent, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-850/80 hover:bg-slate-950 transition flex items-start gap-3">
                {ent.status === 'covered' ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-200">
                      {ent.name}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      {ent.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {ent.relevanceExplanation}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[9px] uppercase px-1.5 rounded font-mono ${
                      ent.importance === 'High' ? 'text-rose-400 font-bold' : ent.importance === 'Medium' ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                      {ent.importance} Importance
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= STEP 7 & 8: RETRIEVAL SOURCES & HEATMAP ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step 7: Retrieval Sources Analysis */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" /> 5. AI Retrieval Sources
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-normal">
            Conversational search algorithms pull from these public domains. Audit your existing footprint.
          </p>

          <div className="space-y-3">
            {(retrievalSources || []).map((src, idx) => (
              <div key={idx} className="p-3 bg-slate-950/80 rounded-lg border border-slate-850 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 font-mono block">
                    {src.sourceName}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono block">
                    Path trace: {src.urlSnippetsPattern}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 block uppercase font-mono">My Presence</span>
                    <span className={`text-xs font-bold font-mono ${
                      src.presenceStatus === 'Strong' ? 'text-emerald-400' :
                      src.presenceStatus === 'Medium' ? 'text-blue-400' :
                      src.presenceStatus === 'Weak' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {src.presenceStatus}
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-850" />
                  <div className="text-right w-16">
                     <span className="text-[9px] text-slate-500 block uppercase font-mono">Weight</span>
                    <span className="text-xs font-bold text-slate-200 font-mono">
                      {src.importanceScore}/100
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 8: Interactive Opportunity Heatmap */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" /> 6. Opportunity Tracker
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Prioritize action channels. Click nodes on the impact vs. difficulty quadrant to view action descriptions.
          </p>

          <div className="h-56 bg-slate-950 border border-slate-850 rounded-xl relative overflow-hidden flex flex-col justify-between p-3">
            {/* Heatmap background grid labels */}
            <div className="absolute top-2 right-2 text-[9px] text-slate-600 font-mono uppercase bg-slate-900 border border-slate-850/80 px-2 py-0.5 rounded">
              Impact vs Difficulty Quadrant
            </div>

            {/* Coordinates frame simulated graphically with beautiful clickable custom nodes */}
            <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2 py-4">
              {/* Row 1 (Hard Difficulty) */}
              <div className="border border-slate-900/50 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Hard/Low</span>
              </div>
              <div className="border border-slate-900/50 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Hard/Med</span>
              </div>
              <div className="border border-slate-900/50 p-1 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative bg-slate-900/10">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Hard/High</span>
                {/* Node for Rick Steves (yVal=1, xVal=3) */}
                <div className="w-7 h-7 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold cursor-pointer transition animate-bounce">
                  OP1
                </div>
              </div>

              {/* Row 2 (Medium Difficulty) */}
              <div className="border border-slate-900/50 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Med/Low</span>
              </div>
              <div className="border border-slate-900/50 p-1 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Med/Med</span>
                {/* Node for Amalfi coast (yVal=2, xVal=2) */}
                <div className="w-7 h-7 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold cursor-pointer transition">
                  OP4
                </div>
              </div>
              <div className="border border-slate-900/50 p-1 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative bg-blue-950/25">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Med/High</span>
                {/* Node for Tripadvisor (yVal=2, xVal=3) */}
                <div className="w-7 h-7 rounded-full bg-blue-500/25 hover:bg-blue-500/45 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold cursor-pointer transition">
                  OP2
                </div>
              </div>

              {/* Row 3 (Easy Difficulty) */}
              <div className="border border-slate-900/50 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Easy/Low</span>
              </div>
              <div className="border border-slate-900/50 p-1 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative bg-emerald-950/15">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Easy/Med</span>
                {/* Node for Reddit (yVal=3, xVal=2) */}
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold cursor-pointer transition">
                  OP3
                </div>
              </div>
              <div className="border border-slate-900/50 flex flex-col justify-center items-center text-[10px] text-slate-600 font-mono relative">
                <span className="absolute left-1 top-1 text-[8px] text-slate-700">Easy/High</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] uppercase font-bold text-slate-500 tracking-wider">
              <span>← Low Impact scale</span>
              <span>High Impact Scale →</span>
            </div>
          </div>

          <div className="space-y-2 mt-3.5">
            {(citationOpportunities || []).map((op, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-950/80 transition text-xs border border-slate-900 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full font-mono font-bold bg-slate-900 text-slate-400 flex items-center justify-center shrink-0 border border-slate-850">
                  {idx + 1}
                </span>
                <div>
                  <span className="font-bold text-slate-200">
                    {op.source}
                  </span>
                  <p className="text-slate-400 text-[11px] mt-0.5 leading-normal">
                    {op.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 font-mono text-[9px]">
                    <span className="text-slate-500">Matching Intent: {op.matchingIntent}</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-blue-400 uppercase font-semibold">Impact: {op.estimatedImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= STEP 10: ROADMAP ACTION PLAN ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" /> Prioritized roadmaps GEO Action Strategy
        </h3>

        {/* Action roadmap categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Phase 1 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-850">
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 mb-2 font-bold">
              30-Day Plan Focus
            </span>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-tight">
              {actionPlan?.phase30Days?.title || "Quick Implementations"}
            </h4>
            <div className="mt-3.5 space-y-3">
              {(actionPlan?.phase30Days?.tasks || []).map((task, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-850 text-xs">
                  <span className="font-semibold text-slate-200 block mb-1">
                    {task.taskName}
                  </span>
                  <p className="text-[10px] text-slate-404 leading-normal text-slate-400">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-emerald-400">
                    <span>Impact: {task.impact}</span>
                    <span className="font-bold underline">+{task.visGain}% Gain</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-850">
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 font-bold">
              Quick Wins Focus
            </span>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-tight">
              Fastest Traffic Gaps
            </h4>
            <div className="mt-3.5 space-y-3">
              {(actionPlan?.quickWins || []).map((task, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-850 text-xs">
                  <span className="font-semibold text-slate-200 block mb-1">
                    {task.taskName}
                  </span>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-emerald-400">
                    <span>Impact: {task.impact}</span>
                    <span className="font-bold underline">+{task.visGain}% Gain</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medium term */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-850">
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2 font-bold">
              Medium-Term Strategy
            </span>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-tight">
              Bespoke Authority Gaps
            </h4>
            <div className="mt-3.5 space-y-3">
              {(actionPlan?.mediumTerm || []).map((task, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-850 text-xs">
                  <span className="font-semibold text-slate-200 block mb-1">
                    {task.taskName}
                  </span>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-emerald-400">
                    <span>Impact: {task.impact}</span>
                    <span className="font-bold underline">+{task.visGain}% Gain</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Long term */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-850">
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2 font-bold">
              Long-Term GEO Strategy
            </span>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-tight">
              Knowledge Graph Schema
            </h4>
            <div className="mt-3.5 space-y-3">
              {(actionPlan?.longTerm || []).map((task, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-850 text-xs">
                  <span className="font-semibold text-slate-200 block mb-1">
                    {task.taskName}
                  </span>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-emerald-400">
                    <span>Impact: {task.impact}</span>
                    <span className="font-bold underline">+{task.visGain}% Gain</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
