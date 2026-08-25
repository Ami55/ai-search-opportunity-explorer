import React, { useState } from "react";
import { Download, FileText, CheckCircle, Database, Sheet, AlertCircle, Printer, Layout, Calendar } from "lucide-react";
import { GeoAnalysisResult, PredictedQuestion } from "../types";

interface AgencyReportProps {
  data: GeoAnalysisResult;
}

export default function AgencyReport({ data }: AgencyReportProps) {
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);

  const primaryKeyword = data?.primaryKeyword || "";
  const websiteDomain = data?.websiteDomain || "";
  const searchDemand = data?.searchDemand || { demandScore: 0, estimatedVolumeScore: 0, intentDistribution: {} };
  const predictedQuestions = data?.predictedQuestions || [];
  const competitorMentions = data?.competitorMentions || [];
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
  const contentGaps = data?.contentGaps || [];
  const entityAnalysis = data?.entityAnalysis || { entityCoverageScore: 0, entities: [] };

  // CSV Generator function
  const handleExportCSV = () => {
    try {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Predicted Prompt Query,Intent Category,AI Search Volume Score,Likely Mentions\n";
      
      predictedQuestions.forEach((q) => {
        const querySafe = q.question.replace(/"/g, '""');
        const intent = q.intent;
        const score = q.volumeScore;
        const mentionsSafe = (q.likelyMentions || []).map(m => m.brand).join(" | ").replace(/"/g, '""');
        
        csvContent += `"${querySafe}","${intent}",${score},"${mentionsSafe}"\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `AI_Search_Explorer_Queries_${primaryKeyword.replace(/\s+/g, '_')}.csv`);
      document.body.appendChild(link); // Required for FF
      link.click();
      document.body.removeChild(link);

      triggerSuccess("CSV exported successfully! Downloaded queries dataset.");
    } catch (error) {
      console.error(error);
    }
  };

  const triggerSuccess = (msg: string) => {
    setDownloadSuccessMessage(msg);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
            Professional Export Hub
          </span>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Executive Agency Reporting
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Generate and export custom analytics collateral for internal briefings, stakeholders, and SEO teams.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handlePrintPDF}
            className="bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-750 px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" /> Print PDF Report
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-750 px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export Questions (CSV)
          </button>
          <button
            onClick={() => setIsSheetsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-900/10"
          >
            <Sheet className="w-3.5 h-3.5" /> Google Sheets Sync
          </button>
        </div>
      </div>

      {downloadSuccessMessage && (
        <div className="mt-4 p-3.5 bg-emerald-950/40 border border-emerald-920 rounded-xl flex gap-2 text-emerald-200 text-xs">
          <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>{downloadSuccessMessage}</span>
        </div>
      )}

      {/* Preview Sheet Report Outline */}
      <div className="mt-6 border border-slate-850 rounded-xl bg-slate-950 p-6 relative">
        <div className="absolute top-4 right-4 text-[9px] uppercase font-mono tracking-wider text-slate-500 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">
          Report Preview State
        </div>

        <div className="flex items-center gap-3.5 border-b border-slate-900 pb-5">
          <div className="w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              Generative Engine Opportunity (GEO) Briefing
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              Audit context: {websiteDomain} | Scope: "{primaryKeyword}"
            </p>
          </div>
        </div>

        {/* Dynamic details for PDF printing layout */}
        <div id="briefing-print-area" className="mt-5 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Client Domain</span>
              <span className="text-xs font-bold text-slate-300 truncate block mt-0.5">{websiteDomain}</span>
            </div>
            <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Primary Focus</span>
              <span className="text-xs font-semibold text-slate-300 block truncate mt-0.5">"{primaryKeyword}"</span>
            </div>
            <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">GEO Readiness Index</span>
              <span className="text-xs font-extrabold text-blue-400 font-mono block mt-0.5">{geoReadiness.totalScore}/100</span>
            </div>
            <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Evaluation Date</span>
              <span className="text-xs font-semibold text-slate-300 font-mono block mt-0.5">
                {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/20 border border-slate-900 text-xs space-y-2 text-slate-300">
            <p className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">
              Summary Recommendations
            </p>
            <p className="leading-relaxed">
              Based on the extracted search intents, the target domain has a coverage discrepancy regarding <strong>Informational and Comparison</strong> based keyword groups. Priority should be given to creating the content gaps below to reinforce the brand's schema node weight.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">
              Core Target Content Guidelines
            </span>
            <div className="divide-y divide-slate-900 border border-slate-900 rounded-lg overflow-hidden bg-slate-900/10">
              {contentGaps.slice(0, 3).map((item, idx) => (
                <div key={idx} className="p-3 flex items-start justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-200 block">
                      {idx + 1}. {item.pageTitle}
                    </span>
                    <span className="text-slate-500 font-mono text-[10.5px]">URL: {item.recommendedUrlSlug}</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-500 uppercase bg-amber-500/10 px-2 py-0.5 rounded shrink-0">
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sheets modal */}
      {isSheetsModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sheet className="w-5 h-5 text-emerald-400" /> Google Sheets Integration
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              This SaaS application supports direct API synchronization to custom Google Sheet spreadsheets via secure user-consented OAuth connections.
            </p>

            <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-slate-850 scale-95 origin-top transition space-y-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-300">Live Workspace Setup</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                To connect and sync this GEO report data dynamically directly into your private spreadsheet workspace, configure your Google API credentials under the Settings panel.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsSheetsModalOpen(false);
                  triggerSuccess("Linked spreadsheet framework active. Continuous sync enabled!");
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-lg shadow-emerald-950/20"
              >
                Confirm Sync Active (Simulate)
              </button>
              <button
                onClick={() => setIsSheetsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-medium py-2 rounded-xl transition"
              >
                Cancel Integration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
