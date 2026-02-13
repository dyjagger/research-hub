import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Check, X, ExternalLink, Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { programs } from '../data/programs';
import InsightCallout from './InsightCallout';

const gradeLabel = (range) => {
  if (range[0] === 0 && range[1] === 12) return 'K–12';
  if (range[0] === 0) return `K–${range[1]}`;
  return `${range[0]}–${range[1]}`;
};

export default function CoopPrograms() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = programs.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'you-choose') return p.youChooseCurriculum;
    if (filter === 'elementary') return p.gradeRange[0] <= 5;
    if (filter === 'nearby') return p.driveTime?.includes('5') || p.driveTime?.includes('10');
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Co-op & Enrichment Programs</h1>
        <p className="text-gray-400">{programs.length} programs near Hendersonville/Gallatin, TN (37075)</p>
      </div>

      <InsightCallout variant="warning" title="Critical: You Choose Curriculum vs. They Provide It">
        Since Jameson is advanced and you want to control pacing, focus on programs where <strong className="text-white">YOU choose the curriculum</strong>.
        Programs marked with ⚠️ provide their own curriculum — same limitation as Three Oaks Academy.
      </InsightCallout>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Programs' },
          { key: 'you-choose', label: '✓ You Choose Curriculum' },
          { key: 'elementary', label: 'Has Elementary' },
          { key: 'nearby', label: '< 15 min drive' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === f.key ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Program Cards */}
      <div className="space-y-4">
        {filtered.map(p => (
          <div key={p.id} className={`bg-gray-900 border rounded-xl overflow-hidden transition-all ${
            !p.youChooseCurriculum ? 'border-red-500/30' : 'border-gray-800'
          }`}>
            {/* Header */}
            <div
              className="p-4 cursor-pointer hover:bg-gray-800/30 transition-colors"
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-white">{p.shortName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.type === 'Enrichment Program' ? 'bg-emerald-500/20 text-emerald-400' :
                      p.type === 'Tutorial Program' ? 'bg-blue-500/20 text-blue-400' :
                      p.type === 'Hybrid Tutorial' ? 'bg-amber-500/20 text-amber-400' :
                      p.type === 'Enrichment & Tutorial' ? 'bg-violet-500/20 text-violet-400' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {p.type}
                    </span>
                    {!p.youChooseCurriculum && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                        ⚠️ They Provide Curriculum
                      </span>
                    )}
                    {p.youChooseCurriculum && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                        ✓ You Choose Curriculum
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{p.model}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span className={p.distanceFromZip?.includes('zip') ? 'text-emerald-400 font-medium' : ''}>{p.driveTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      {p.days.join(' & ')}
                    </div>
                  </div>
                  {expanded === p.id ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <Users className="w-3 h-3" />
                  Grades {gradeLabel(p.gradeRange)}
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <DollarSign className="w-3 h-3" />
                  ${p.estimatedAnnualCost.low}–${p.estimatedAnnualCost.high}/yr
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-3 h-3" />
                  {p.hours}
                </div>
                {p.dropOff && <span className="text-emerald-400">Drop-off ✓</span>}
                {p.coreAcademics && <span className="text-blue-400">Core Academics</span>}
              </div>
            </div>

            {/* Expanded Details */}
            {expanded === p.id && (
              <div className="border-t border-gray-800 p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Location</h4>
                      <p className="text-sm text-gray-400">{p.address}</p>
                      <p className="text-xs text-gray-500">{p.distanceFromZip}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Schedule</h4>
                      <p className="text-sm text-gray-400">{p.days.join(' & ')} • {p.hours}</p>
                      <p className="text-xs text-gray-500">{p.weeksPerYear} weeks/year</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Curriculum Policy</h4>
                      <p className="text-sm text-gray-400">{p.curriculumNotes}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Cost</h4>
                      <p className="text-sm text-gray-400">${p.estimatedAnnualCost.low}–${p.estimatedAnnualCost.high}/year</p>
                      <p className="text-xs text-gray-500">{p.costNotes}</p>
                    </div>
                    {p.website && (
                      <a href={p.website} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">
                        <ExternalLink className="w-3 h-3" /> Visit Website
                      </a>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-emerald-400 mb-1">Strengths</h4>
                      <ul className="space-y-1">
                        {p.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <Check className="w-3 h-3 text-emerald-500 mt-1 flex-shrink-0" />{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-red-400 mb-1">Weaknesses</h4>
                      <ul className="space-y-1">
                        {p.weaknesses.map((w, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <X className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />{w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Class Examples */}
                {p.classExamples.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Sample Classes Offered</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {p.classExamples.map((cls, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-800 rounded-full text-xs text-gray-400">{cls}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-800">
                  <p className="text-sm text-gray-500"><strong className="text-gray-300">Best For:</strong> {p.bestFor}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-600 text-center">{filtered.length} of {programs.length} programs shown • Click any card to expand</p>
    </div>
  );
}
