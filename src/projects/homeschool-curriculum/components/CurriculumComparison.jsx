import React, { useState } from 'react';
import { ArrowUpDown, Check, X, ExternalLink, Filter } from 'lucide-react';
import { curricula, curriculumTypes } from '../data/curricula';
import InsightCallout from './InsightCallout';

const sortOptions = [
  { key: 'name', label: 'Name' },
  { key: 'annualCostLow', label: 'Cost (Low→High)' },
  { key: 'advancedFriendly', label: 'Advanced-Friendly' },
  { key: 'rating', label: 'Rating' },
  { key: 'parentInvolvementScore', label: 'Parent Involvement' },
];

const advancedLabels = { 1: 'Low', 2: 'Below Avg', 3: 'Average', 4: 'Good', 5: 'Excellent' };
const advancedColors = { 1: 'text-red-400', 2: 'text-orange-400', 3: 'text-yellow-400', 4: 'text-emerald-400', 5: 'text-green-400' };
const parentLabels = { 1: 'Very Low', 2: 'Low-Med', 3: 'Medium', 4: 'Med-High', 5: 'Very High' };

export default function CurriculumComparison() {
  const [sortBy, setSortBy] = useState('advancedFriendly');
  const [sortDir, setSortDir] = useState('desc');
  const [typeFilter, setTypeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered = curricula
    .filter(c => typeFilter === 'all' || c.type === typeFilter)
    .filter(c => subjectFilter === 'all' || (subjectFilter === 'allSubjects' ? c.allSubjects : c.subjects.includes(subjectFilter)));

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (typeof aVal === 'string') return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const toggleSort = (key) => {
    if (sortBy === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir(key === 'name' ? 'asc' : 'desc'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Curriculum Comparison</h1>
        <p className="text-gray-400">Compare {curricula.length} homeschool curricula on the metrics that matter for an advanced learner</p>
      </div>

      <InsightCallout variant="info" title="Advanced-Friendly Rating">
        The "Advanced-Friendly" score (1-5) rates how well each curriculum supports grade acceleration, self-pacing, and challenging gifted learners.
        A score of 5 means the curriculum is specifically designed for or excels with advanced students.
      </InsightCallout>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">Filter:</span>
        </div>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-violet-500"
        >
          <option value="all">All Types</option>
          {curriculumTypes.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
        <select
          value={subjectFilter}
          onChange={e => setSubjectFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-violet-500"
        >
          <option value="all">All Subjects</option>
          <option value="allSubjects">All-in-One Only</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Language Arts">Language Arts</option>
        </select>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-gray-500">Sort:</span>
          {sortOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => toggleSort(opt.key)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                sortBy === opt.key ? 'bg-violet-500/20 text-violet-400' : 'bg-gray-800 text-gray-500 hover:text-gray-300'
              }`}
            >
              {opt.label}
              {sortBy === opt.key && <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Curriculum</th>
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Type</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Grades</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Annual Cost</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Advanced-Friendly</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Self-Paced</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Parent Load</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Rating</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Faith</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(c => (
              <React.Fragment key={c.id}>
                <tr
                  className={`border-b border-gray-800/50 cursor-pointer transition-colors ${
                    expanded === c.id ? 'bg-gray-800/50' : 'hover:bg-gray-900/50'
                  }`}
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{c.name}</span>
                      <a href={c.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                        <ExternalLink className="w-3 h-3 text-gray-600 hover:text-violet-400" />
                      </a>
                    </div>
                    <p className="text-xs text-gray-500">{c.allSubjects ? 'All Subjects' : c.subjects.join(', ')}</p>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs text-gray-400">
                      {curriculumTypes.find(t => t.id === c.type)?.label}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-gray-300">{c.grades}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={c.annualCostLow === 0 ? 'text-emerald-400 font-medium' : 'text-gray-300'}>
                      {c.annualCostLow === 0 ? 'FREE' : `$${c.annualCostLow}`}–${c.annualCostHigh}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`font-bold ${advancedColors[c.advancedFriendly]}`}>
                      {c.advancedFriendly}/5
                    </span>
                    <span className="text-xs text-gray-500 ml-1">{advancedLabels[c.advancedFriendly]}</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {c.selfPaced ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-400 text-xs">{parentLabels[c.parentInvolvementScore]}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-amber-400 font-medium">{c.rating}</span>
                    <span className="text-xs text-gray-600 ml-1">({(c.reviewCount / 1000).toFixed(1)}k)</span>
                  </td>
                  <td className="py-3 px-3 text-center text-xs text-gray-500">{c.faith}</td>
                </tr>
                {expanded === c.id && (
                  <tr className="bg-gray-800/30">
                    <td colSpan={9} className="p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-emerald-400 mb-2">Strengths</h4>
                          <ul className="space-y-1">
                            {c.strengths.map((s, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                <Check className="w-3 h-3 text-emerald-500 mt-1 flex-shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-400 mb-2">Weaknesses</h4>
                          <ul className="space-y-1">
                            {c.weaknesses.map((w, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                <X className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-medium text-violet-400 mb-1">Advanced Learner Notes</h4>
                          <p className="text-sm text-gray-300">{c.advancedNotes}</p>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-medium text-amber-400 mb-1">Acceleration Details</h4>
                          <p className="text-sm text-gray-300">{c.accelerationNotes}</p>
                        </div>
                        <div className="md:col-span-2 text-xs text-gray-500">
                          <strong>Cost Notes:</strong> {c.annualCostNotes}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-600 text-center">Click any row to expand details • {sorted.length} of {curricula.length} curricula shown</p>
    </div>
  );
}
