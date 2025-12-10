import React from 'react';
import { PostPlan } from '../types';
import { Calendar, Image, Video, Layers, CircleDashed } from 'lucide-react';

interface PlanListProps {
  posts: PostPlan[];
  onToggleStatus: (index: number) => void;
}

const PlanList: React.FC<PlanListProps> = ({ posts, onToggleStatus }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Reels': return <Video className="w-4 h-4" />;
      case 'Carousel': return <Layers className="w-4 h-4" />;
      case 'Story': return <CircleDashed className="w-4 h-4" />;
      default: return <Image className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'Reels': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Carousel': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Story': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-purple-400" />
        월간 콘텐츠 캘린더 (총 {posts.length}개)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div 
            key={index} 
            className={`relative group bg-slate-800 rounded-xl border transition-all duration-300 overflow-hidden ${
              post.status === 'scheduled' 
                ? 'border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                : 'border-slate-700 hover:border-slate-500'
            }`}
          >
            {/* Header Badge */}
            <div className="flex justify-between items-center p-4 border-b border-slate-700/50 bg-slate-800/50">
               <div className="flex items-center space-x-2">
                 <span className="text-slate-400 font-mono text-sm">Day {post.day}</span>
                 <span className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium border ${getColor(post.type)}`}>
                   {getIcon(post.type)}
                   <span>{post.type}</span>
                 </span>
               </div>
               <div className={`w-2 h-2 rounded-full ${post.status === 'scheduled' ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <h4 className="font-bold text-lg text-white leading-tight line-clamp-2 min-h-[3.5rem]">
                {post.title}
              </h4>
              
              <div className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 h-24 overflow-y-auto custom-scrollbar">
                <span className="text-slate-500 block text-xs mb-1">캡션 미리보기:</span>
                {post.caption}
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">비주얼 가이드:</span> {post.visualPrompt}
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-xs text-blue-400">#{tag}</span>
                  ))}
                  {post.hashtags.length > 3 && <span className="text-xs text-slate-500">+{post.hashtags.length - 3}</span>}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-slate-900/30 border-t border-slate-700/50">
              <button
                onClick={() => onToggleStatus(index)}
                className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                  post.status === 'scheduled'
                    ? 'bg-slate-700 text-slate-400 cursor-default'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500'
                }`}
              >
                {post.status === 'scheduled' ? '예약 완료됨' : '예약 대기열에 추가'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanList;
