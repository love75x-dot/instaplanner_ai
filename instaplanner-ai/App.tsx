import React, { useState } from 'react';
import InputForm from './components/InputForm';
import StrategyDashboard from './components/StrategyDashboard';
import PlanList from './components/PlanList';
import MetaScheduler from './components/MetaScheduler';
import { generateInstagramStrategy } from './services/geminiService';
import { UserInput, AnalysisResult, PostPlan } from './types';
import { Instagram, LayoutGrid, BarChart3, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: UserInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const analysis = await generateInstagramStrategy(
        data.accountName,
        data.niche,
        data.currentFollowers,
        data.goal,
        data.recentTopics,
        data.benchmarkAccount
      );
      // Ensure all posts start with 'planned' status
      const formattedPlan = analysis.monthlyPlan.map(post => ({ ...post, status: 'planned' as const }));
      setResult({ ...analysis, monthlyPlan: formattedPlan });
    } catch (err) {
      console.error(err);
      setError("AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePostStatus = (index: number) => {
    if (!result) return;
    const newPlan = [...result.monthlyPlan];
    const currentStatus = newPlan[index].status;
    newPlan[index].status = currentStatus === 'planned' ? 'scheduled' : 'planned';
    setResult({ ...result, monthlyPlan: newPlan });
  };

  const handleBatchComplete = () => {
    if (!result) return;
    const newPlan = result.monthlyPlan.map(post => ({
      ...post,
      status: 'scheduled' as const
    }));
    setResult({ ...result, monthlyPlan: newPlan });
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-32">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleReset}>
            <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-2 rounded-lg">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">InstaPlanner AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>분석</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
              <LayoutGrid className="w-4 h-4" />
              <span>캘린더</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
              <span>설정</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {!result ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl opacity-50">
              <div className="p-4">
                <div className="bg-slate-800 w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-slate-300">정밀 분석</h3>
                <p className="text-sm text-slate-500 mt-1">계정 현황을 분석하여 최적의 성장 방향성을 제시합니다.</p>
              </div>
              <div className="p-4">
                 <div className="bg-slate-800 w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="font-semibold text-slate-300">자동 기획</h3>
                <p className="text-sm text-slate-500 mt-1">한 달 분량의 콘텐츠 주제, 캡션, 해시태그를 자동 생성합니다.</p>
              </div>
              <div className="p-4">
                 <div className="bg-slate-800 w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-slate-300">예약 업로드</h3>
                <p className="text-sm text-slate-500 mt-1">Meta 비즈니스 시스템 연동을 시뮬레이션하여 예약을 돕습니다.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">분석 완료 및 플랜 생성</h2>
                <p className="text-slate-400">AI가 제안하는 이번 달 인스타그램 성장 전략입니다.</p>
              </div>
              <button 
                onClick={handleReset}
                className="text-sm text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-4"
              >
                새로운 분석 하기
              </button>
            </div>

            <StrategyDashboard strategy={result.strategy} />
            
            <div className="my-10 border-t border-slate-800"></div>

            <PlanList 
              posts={result.monthlyPlan} 
              onToggleStatus={handleTogglePostStatus} 
            />
          </div>
        )}
      </main>

      {/* Scheduler Bar (Only visible when results exist) */}
      {result && (
        <MetaScheduler 
          posts={result.monthlyPlan} 
          onScheduleComplete={handleBatchComplete} 
        />
      )}
    </div>
  );
};

export default App;