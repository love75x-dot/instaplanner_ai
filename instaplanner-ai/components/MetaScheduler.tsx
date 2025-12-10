import React, { useState, useEffect } from 'react';
import { PostPlan } from '../types';
import { UploadCloud, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface MetaSchedulerProps {
  posts: PostPlan[];
  onScheduleComplete: () => void;
}

const MetaScheduler: React.FC<MetaSchedulerProps> = ({ posts, onScheduleComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const unscheduledCount = posts.filter(p => p.status === 'planned').length;

  const handleBatchSchedule = () => {
    if (unscheduledCount === 0) return;
    
    setIsUploading(true);
    setProgress(0);

    // Simulation of sequential API calls/uploads
    const totalDuration = 3000; // 3 seconds total for UX
    const intervalTime = 100;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsUploading(false);
        setIsDone(true);
        onScheduleComplete();
        setTimeout(() => setIsDone(false), 3000); // Reset done message after 3s
      }
    }, intervalTime);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700 p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-xl shadow-lg">
            <UploadCloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">메타 비즈니스 예약 센터</h4>
            <p className="text-slate-400 text-sm">
              {unscheduledCount > 0 
                ? `${unscheduledCount}개의 게시물이 예약 대기 중입니다.` 
                : '모든 게시물이 예약되었습니다.'}
            </p>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto md:max-w-md px-4">
          {isUploading ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Meta 서버로 전송 중...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : isDone ? (
             <div className="flex items-center space-x-2 text-green-400 bg-green-900/20 px-4 py-2 rounded-lg border border-green-900/50">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">예약 전송 완료!</span>
             </div>
          ) : (
            <div className="flex items-center space-x-2 text-slate-500 text-sm bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
                <AlertCircle className="w-4 h-4" />
                <span>'예약하기'를 누르면 Meta API 시뮬레이터가 실행됩니다.</span>
            </div>
          )}
        </div>

        <button
          onClick={handleBatchSchedule}
          disabled={isUploading || unscheduledCount === 0}
          className={`whitespace-nowrap px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform ${
            unscheduledCount === 0
              ? 'bg-slate-700 cursor-not-allowed text-slate-400'
              : isUploading
                ? 'bg-slate-700 cursor-wait'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:scale-105 active:scale-95'
          }`}
        >
          {isUploading ? (
            <span className="flex items-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              처리 중...
            </span>
          ) : (
            '일괄 예약 업로드'
          )}
        </button>
      </div>
    </div>
  );
};

export default MetaScheduler;
