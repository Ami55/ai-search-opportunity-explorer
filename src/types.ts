export type IntentType = "commercial" | "informational" | "comparison" | "trust" | "transactional";

export interface LikelyMention {
  brand: string;
  rank: number;
  reason: string;
}

export interface PredictedQuestion {
  question: string;
  intent: IntentType;
  volumeScore: number;
  likelyMentions?: LikelyMention[];
}

export interface SearchDemand {
  demandScore: number;
  estimatedVolumeScore: number;
  intentDistribution: {
    commercial: number;
    informational: number;
    comparison: number;
    trust: number;
    transactional: number;
  };
}

export interface CompetitorMention {
  brand: string;
  mentions: number;
  shareOfVoice: number;
}

export interface CompetitorGap {
  competitor: string;
  additionalMentionsCount: number;
  sampleQuestions: string[];
}

export interface GapAnalysis {
  gapScore: number;
  competitorGaps: CompetitorGap[];
}

export interface ContentGap {
  pageTitle: string;
  recommendedUrlSlug: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  priorityScore: number;
  targetedQuestion: string;
}

export interface EntityRecord {
  name: string;
  category: string;
  status: "covered" | "missing";
  importance: "High" | "Medium" | "Low";
  relevanceExplanation: string;
}

export interface EntityAnalysis {
  entityCoverageScore: number;
  entities: EntityRecord[];
}

export interface RetrievalSource {
  sourceName: string;
  category: string;
  presenceStatus: "Strong" | "Medium" | "Weak" | "Missing";
  urlSnippetsPattern: string;
  importanceScore: number;
}

export interface CitationOpportunity {
  source: string;
  description: string;
  matchingIntent: string;
  estimatedImpact: "High" | "Medium" | "Low";
  difficulty: "Easy" | "Medium" | "Hard";
  actionSlug: string;
}

export interface GeoReadiness {
  totalScore: number;
  queryCoverageScore: number;
  entityCoverageScore: number;
  contentCoverageScore: number;
  authorityScore: number;
  competitorVisibilityScore: number;
  tier: "Excellent" | "Strong" | "Moderate" | "Weak";
  overallVerdict: string;
}

export interface TaskRecord {
  taskName: string;
  priority: "High" | "Medium" | "Low";
  impact: "High" | "Medium" | "Low";
  difficulty: "Easy" | "Medium" | "Hard";
  visGain: number;
  description: string;
}

export interface ActionPlan {
  phase30Days: {
    title: string;
    tasks: TaskRecord[];
  };
  quickWins: TaskRecord[];
  mediumTerm: TaskRecord[];
  longTerm: TaskRecord[];
}

export interface GeoAnalysisResult {
  primaryKeyword: string;
  websiteDomain: string;
  searchDemand: SearchDemand;
  predictedQuestions: PredictedQuestion[];
  competitorMentions: CompetitorMention[];
  gapAnalysis: GapAnalysis;
  contentGaps: ContentGap[];
  entityAnalysis: EntityAnalysis;
  retrievalSources: RetrievalSource[];
  citationOpportunities: CitationOpportunity[];
  geoReadiness: GeoReadiness;
  actionPlan: ActionPlan;
}

export interface SimulationResult {
  prompt: string;
  simulatedAnswer: string;
  probabilities: { brand: string; score: number }[];
  isFallback: boolean;
}
