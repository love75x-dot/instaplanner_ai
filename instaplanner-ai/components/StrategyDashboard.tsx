import React from 'react';
import { ContentStrategy } from '../types';
import { Target, TrendingUp, Users, MessageCircle, Trophy } from 'lucide-react';

interface StrategyDashboardProps {
  strategy: ContentStrategy;
}

const StrategyDashboard: React.FC<StrategyDashboardProps> = ({ strategy }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* Target Audience & Tone */}
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">타겟 오디언스 & 톤앤매너</h3>
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">주요 타겟</span>
            <p className="text-slate-200 mt-1">{strategy.targetAudience}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">톤앤매너 (화법)</span>
            <p className="text-slate-200 mt-1">{strategy.toneAndManner}</p>
          </div>
        </div>
      </div>

      {/* Benchmark Analysis */}
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="flex items-center space-x-3 mb-4 relative z-10">
          <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">벤치마킹 & 경쟁력 분석</h3>
        </div>
        <p className="text-slate-200 leading-relaxed relative z-10">
          {strategy.benchmarkAnalysis}
        </p>
      </div>

      {/* Content Pillars */}
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">핵심 콘텐츠 필라 (Pillars)</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {strategy.contentPillars.map((pillar, idx) => (
            <span key={idx} className="bg-slate-700/50 border border-slate-600 text-slate-200 px-4 py-2 rounded-full text-sm">
              #{pillar}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          위 주제를 중심으로 콘텐츠를 순환 배치하여 알고리즘 점수를 최적화합니다.
        </p>
      </div>

      {/* Growth Keywords */}
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">성장 견인 키워드</h3>
        </div>
        <div className="flex flex-wrap gap-2">
           {strategy.growthKeywords.map((keyword, idx) => (
            <span key={idx} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-md text-sm font-medium">
              {keyword.startsWith('#') ? keyword : `#${keyword}`}
            </span>
          ))}
        </div>
      </div>

      {/* Advice */}
      <div className="col-span-1 lg:col-span-2 bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">AI 전략 제언</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {strategy.improvementSuggestions}
        </p>
      </div>
    </div>
  );
};

export default StrategyDashboard;