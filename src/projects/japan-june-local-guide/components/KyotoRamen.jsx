import React, { useState } from 'react';
import { MapPin, Clock, Users, Ban, Train } from 'lucide-react';
import InsightCallout from '../../../components/InsightCallout';
import { kyotoRamen } from '../data/researchData';

const ACCENT = 'amber';

const densityLabel = {
  'very-low': { text: 'Almost No Tourists', color: 'emerald' },
  'low': { text: 'Few Tourists', color: 'yellow' },
  'medium': { text: 'Some Tourists', color: 'orange' },
};

export default function KyotoRamen() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? kyotoRamen : kyotoRamen.filter(r => r.touristDensity === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Kyoto Ramen — Ichijoji & Hidden Gems</h1>
        <p className="text-gray-400 text-lg">Kyoto's fierce ramen battleground where students and locals eat</p>
      </div>

      <InsightCallout color={ACCENT}>
        <strong>Ichijoji</strong> is Kyoto's ramen mecca — 15+ shops within walking distance of one small station. It started in the 1970s 
        when Tenkaippin opened here, and the intense competition has kept quality extraordinarily high. It's a <strong>student neighborhood</strong> for 
        Kyoto University — affordable, authentic, and largely ignored by the tourist buses heading to Kinkaku-ji and Arashiyama.
      </InsightCallout>

      {/* Ichijoji Access Info */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Train className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-violet-300">Getting to Ichijoji</h3>
        </div>
        <div className="space-y-2 text-sm text-gray-300">
          <div><strong className="text-white">From Kyoto Station:</strong> Take the Karasuma Line to Kokusaikaikan, transfer to Eizan Railway → Ichijoji Station (~30 min total)</div>
          <div><strong className="text-white">From Gion/downtown:</strong> Bus #5 or #17 to Ichijoji-sagarimatsu-cho (~25 min)</div>
          <div><strong className="text-white">Pro tip:</strong> The Eizan Railway sells a "one-day pass with ramen" ticket — includes unlimited rides + one bowl at a participating shop</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-400">Filter:</span>
        {[
          { key: 'all', label: 'All Shops' },
          { key: 'very-low', label: 'Almost No Tourists' },
          { key: 'low', label: 'Few Tourists' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === f.key
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Ramen Cards */}
      <div className="space-y-4">
        {filtered.map(shop => {
          const density = densityLabel[shop.touristDensity];
          return (
            <div key={shop.id} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{shop.name}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" /> {shop.neighborhood}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" /> {shop.hours}
                    </span>
                    {shop.closed !== 'None' && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Ban className="w-3 h-3" /> Closed: {shop.closed}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-md bg-${density.color}-500/20 text-${density.color}-400 text-xs font-medium`}>
                    {density.text}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold">
                    {shop.price}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block px-2 py-0.5 rounded bg-gray-700/50 text-xs text-gray-300 font-medium mb-2">
                  {shop.style}
                </span>
                <p className="text-sm text-gray-300">{shop.description}</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">Why it's local</span>
                </div>
                <p className="text-xs text-gray-400">{shop.whyLocal}</p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-500">Access:</span>
                <span className="text-xs text-gray-400">{shop.station}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kyoto Ramen Tips */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-amber-300 mb-3">Kyoto Ramen Tips</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Kyoto-style ramen tends to be richer and thicker than Tokyo's refined clear soups — prepare for heavy bowls.</div>
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Ichijoji shops are competitive — if one has a long queue, walk 2 minutes to another. They're all close.</div>
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Late-night ramen is a Kyoto student tradition. Many Ichijoji shops open until midnight or later.</div>
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Pair with nearby Enkou-ji Temple or Kurama for a half-day of culture + ramen.</div>
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Don't skip the gyoza or fried rice sides — Ichijoji shops are known for generous, cheap set meals.</div>
        </div>
      </div>
    </div>
  );
}
