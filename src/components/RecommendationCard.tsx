import React from 'react';
import { Monitor, Cloud, Cpu, Info } from 'lucide-react';
import type { Recommendation } from '../data/types';

export const RecommendationCard: React.FC<{ rec: Recommendation }> = ({ rec }) => (
  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border-2 border-emerald-200 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.2)]">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
        <Monitor className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-bold text-emerald-900">{rec.scenario}</h3>
        {rec.price && <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full mt-1 inline-block">{rec.price}</span>}
      </div>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex items-start gap-2">
        <Cloud className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium text-emerald-800">推荐服务商：</span>
          <span className="text-emerald-700">{rec.provider}</span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Cpu className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium text-emerald-800">推荐配置：</span>
          <span className="text-emerald-700">{rec.config}</span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
        <p className="text-emerald-700 leading-relaxed">{rec.reason}</p>
      </div>
    </div>
  </div>
);
