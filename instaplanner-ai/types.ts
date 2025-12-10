export interface PostPlan {
  day: number;
  title: string;
  type: 'Reels' | 'Carousel' | 'Image' | 'Story';
  caption: string;
  hashtags: string[];
  visualPrompt: string;
  status: 'planned' | 'scheduled' | 'uploaded';
}

export interface ContentStrategy {
  targetAudience: string;
  toneAndManner: string;
  contentPillars: string[];
  growthKeywords: string[];
  improvementSuggestions: string;
  benchmarkAnalysis: string;
}

export interface AnalysisResult {
  strategy: ContentStrategy;
  monthlyPlan: PostPlan[];
}

export interface UserInput {
  accountName: string;
  niche: string;
  currentFollowers: string;
  goal: string;
  recentTopics: string;
  benchmarkAccount: string;
}