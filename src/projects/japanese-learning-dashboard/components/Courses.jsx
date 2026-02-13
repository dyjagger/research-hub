import React, { useState } from 'react';
import { CheckCircle, Clock, ExternalLink, BookOpen, Target, TrendingUp } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { learningRoadmap } from '../data/courses';

const STAGE_COLORS = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', line: 'bg-emerald-500' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', line: 'bg-cyan-500' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', line: 'bg-amber-500' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30', line: 'bg-violet-500' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', line: 'bg-rose-500' },
};

export default function Courses() {
  const [expandedStage, setExpandedStage] = useState(0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Learning Roadmap</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          A structured path from absolute beginner to advanced fluency, organized into 6 stages
          aligned with JLPT levels. Each stage includes milestones, study tips, and recommended resources.
        </p>
      </div>

      <InsightCallout color="emerald">
        Consistency beats intensity. 30 minutes daily is more effective than 4 hours on weekends.
        The journey to fluency takes 2-3 years of dedicated study, but you'll be having basic
        conversations within 3-4 months if you follow this roadmap.
      </InsightCallout>

      <div className="grid grid-cols-6 gap-2 mb-6">
        {learningRoadmap.map((stage, i) => {
          const c = STAGE_COLORS[stage.color];
          return (
            <button
              key={i}
              onClick={() => setExpandedStage(i)}
              className={`p-3 rounded-lg text-center transition-all ${
                expandedStage === i
                  ? `${c.bg} border ${c.border}`
                  : 'bg-gray-900/30 border border-gray-800/50 hover:border-gray-700'
              }`}
            >
              <p className={`text-lg font-bold ${expandedStage === i ? c.text : 'text-gray-400'}`}>{stage.stage}</p>
              <p className={`text-[10px] ${expandedStage === i ? c.text : 'text-gray-500'}`}>{stage.jlpt}</p>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800" />

        <div className="space-y-8">
          {learningRoadmap.map((stage, i) => {
            const c = STAGE_COLORS[stage.color];
            const isExpanded = expandedStage === i;

            return (
              <div key={i} className="relative pl-14">
                <div className={`absolute left-4 w-5 h-5 rounded-full border-2 ${
                  isExpanded ? `${c.line} border-transparent` : 'bg-gray-900 border-gray-700'
                } flex items-center justify-center`}>
                  {isExpanded && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <button
                  onClick={() => setExpandedStage(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isExpanded
                      ? `${c.bg} ${c.border}`
                      : 'bg-gray-900/30 border-gray-800/50 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-bold ${c.text}`}>Stage {stage.stage}</span>
                    <span className="text-xs text-gray-500">·</span>
                    <span className={`text-xs ${isExpanded ? c.text : 'text-gray-400'}`}>{stage.jlpt}</span>
                    <span className="text-xs text-gray-500">·</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {stage.duration}
                    </span>
                  </div>
                  <h3 className={`text-lg font-semibold ${isExpanded ? 'text-white' : 'text-gray-300'}`}>
                    {stage.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{stage.level}</p>
                </button>

                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Target className={`w-4 h-4 ${c.text}`} />
                          Milestones
                        </h4>
                        <ul className="space-y-2">
                          {stage.milestones.map((m, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                              <CheckCircle className={`w-3.5 h-3.5 ${c.text} flex-shrink-0 mt-0.5`} />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <TrendingUp className={`w-4 h-4 ${c.text}`} />
                          Study Tips
                        </h4>
                        <ul className="space-y-2">
                          {stage.studyTips.map((tip, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                              <span className={`${c.text} flex-shrink-0`}>-</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <BookOpen className={`w-4 h-4 ${c.text}`} />
                        Recommended Resources
                      </h4>
                      <div className="space-y-2">
                        {stage.resources.map((r, j) => (
                          <a
                            key={j}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-200 group-hover:text-white transition-colors">{r.name}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                r.type === 'Free' ? 'bg-emerald-500/10 text-emerald-400' :
                                r.type === 'Freemium' ? 'bg-amber-500/10 text-amber-400' :
                                'bg-violet-500/10 text-violet-400'
                              }`}>
                                {r.type}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
