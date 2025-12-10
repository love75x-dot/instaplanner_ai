import React, { useState } from 'react';
import { UserInput } from '../types';
import { Sparkles, ArrowRight, Search } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    accountName: '',
    niche: '',
    currentFollowers: '',
    goal: '',
    recentTopics: '',
    benchmarkAccount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700 shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-2">
          인스타그램 전략 분석 & 스케줄링
        </h2>
        <p className="text-slate-400">
          내 계정과 벤치마킹 대상을 분석하여 성공적인 한 달 로드맵을 설계해 드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">계정 이름 / 핸들</label>
            <input
              required
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="@my_awesome_brand"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">현재 팔로워 수</label>
            <input
              required
              name="currentFollowers"
              value={formData.currentFollowers}
              onChange={handleChange}
              placeholder="예: 1,500명"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">주요 카테고리 / 니치 (Niche)</label>
          <input
            required
            name="niche"
            value={formData.niche}
            onChange={handleChange}
            placeholder="예: 30대 직장인 재테크, 비건 베이킹, 데일리룩 패션"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
          <label className="flex items-center text-sm font-medium text-indigo-300 mb-2">
            <Search className="w-4 h-4 mr-2" />
            벤치마킹 하고 싶은 계정 (선택 사항)
          </label>
          <input
            name="benchmarkAccount"
            value={formData.benchmarkAccount}
            onChange={handleChange}
            placeholder="@role_model_account (분석하고 싶은 경쟁사나 롤모델)"
            className="w-full bg-slate-900/80 border border-indigo-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-slate-500"
          />
          <p className="text-xs text-indigo-400/70 mt-2">
            * 입력 시 해당 계정의 성공 요인을 분석하여 전략에 반영해 드립니다.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">이번 달 주요 목표</label>
          <input
            required
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            placeholder="예: 릴스 조회수 1만 달성, 팔로워 200명 증가, 공구 판매 증대"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">최근 업로드한 주제 (3~5개)</label>
          <textarea
            required
            name="recentTopics"
            value={formData.recentTopics}
            onChange={handleChange}
            rows={3}
            placeholder="예: 강남 맛집 리스트, 여름 휴가 코디, 다이어트 식단 레시피"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/30 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>전략 및 벤치마킹 분석 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>AI 분석 및 플랜 생성하기</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;