import React from 'react';
import { Layers, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { defenseLayout } from '../data/researchData';

const layerDepthData = defenseLayout.layers.map((l) => ({
  name: l.name,
  depth: l.depth,
  color: l.color,
}));

export default function DefenseLayout() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Defense Layout</h1>
        <p className="text-gray-400 mt-1 text-sm">Optimal wall/turret placement with layered kill zones</p>
      </div>

      <InsightCallout color="red">
        <strong>Golden Rule:</strong> Never build a solid wall. Raptors will break through at a random weak point. Instead, build walls with deliberate gaps every 8-10 Dragon's Teeth. Stack turrets behind each gap for concentrated fire on funneled raptors.
      </InsightCallout>

      {/* Defense Layers Visual */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-red-400" />
          5-Layer Defense Architecture
        </h2>
        <p className="text-xs text-gray-500 mb-6">Build from front (Layer 1) to back (Layer 5). Each layer serves a distinct purpose.</p>

        <div className="space-y-3">
          {defenseLayout.layers.map((layer, i) => (
            <div key={i} className="relative">
              <div
                className="rounded-xl p-4 border"
                style={{
                  borderColor: `${layer.color}40`,
                  backgroundColor: `${layer.color}08`,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Layer Number */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg font-bold"
                    style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
                  >
                    {layer.depth}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">{layer.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{layer.purpose}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {layer.structures.map((s, j) => (
                        <span
                          key={j}
                          className="text-[10px] px-2 py-1 rounded-md font-medium"
                          style={{ backgroundColor: `${layer.color}15`, color: layer.color }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Arrow between layers */}
              {i < defenseLayout.layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wall Design Guide */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Wall Design Pattern</h2>
        <div className="space-y-4">
          <div className="bg-gray-800/40 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-400 mb-1">Gap Spacing</h3>
            <p className="text-sm text-gray-300">{defenseLayout.wallDesign.gapSpacing}</p>
          </div>
          <div className="bg-gray-800/40 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-400 mb-1">Behind Each Gap</h3>
            <p className="text-sm text-gray-300">{defenseLayout.wallDesign.behindGaps}</p>
          </div>
          <div className="bg-gray-800/40 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-400 mb-1">Design Philosophy</h3>
            <p className="text-sm text-gray-300">{defenseLayout.wallDesign.description}</p>
          </div>
        </div>
      </div>

      {/* Kill Zone Diagram (ASCII-style) */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Kill Zone Layout (Top-Down View)</h2>
        <div className="bg-gray-950 rounded-lg p-6 font-mono text-xs leading-relaxed overflow-x-auto">
          <pre className="text-gray-400">
{`  RAPTORS APPROACH FROM HERE
  ════════════════════════════════════════
  ▼           ▼           ▼           ▼

  ┌─DT─DT─DT─┐  GAP  ┌─DT─DT─DT─┐  GAP  ┌─DT─DT─DT─┐    ← Layer 1: Outer Wall
  │  mines    │       │  mines    │       │  mines    │       (Dragon's Teeth + Mines)
  └───────────┘       └───────────┘       └───────────┘

                 ▼▼▼           ▼▼▼                           ← Raptors funnel through gaps

            `}<span className="text-red-400">{`[SENTRY] [BEAMER]   [SENTRY] [BEAMER]`}</span>{`          ← Layer 2: Kill Zone
            `}<span className="text-red-400">{`[OVERWATCH]         [OVERWATCH]`}</span>{`                  (Concentrated fire)

         `}<span className="text-amber-400">{`[PULSAR]    [RATTLESNAKE]    [PULSAR]`}</span>{`          ← Layer 3: Heavy Line
         `}<span className="text-amber-400">{`[BULWARK]   [PIT BULL]      [BULWARK]`}</span>{`            (High-damage backup)

      `}<span className="text-blue-400">{`[KEEPER]  [CON TURRET x4]  [KEEPER]  [FLAK]`}</span>{`     ← Layer 4: Shield Layer
      `}<span className="text-blue-400">{`[OVERSEER]  (auto-repair)  [OVERSEER]`}</span>{`              (Shields + Repair)

   `}<span className="text-purple-400">{`[LRPC]        [MERCURY]        [LRPC]`}</span>{`            ← Layer 5: Deep Defense
   `}<span className="text-purple-400">{`[SCREAMER]    [KEEPER]         [SCREAMER]`}</span>{`           (Long-range fire support)

  ════════════════════════════════════════
           YOUR BASE / ECONOMY HERE`}
          </pre>
        </div>
        <p className="text-xs text-gray-500 mt-3">This pattern repeats along your entire defensive perimeter. Adjust spacing based on map terrain and chokepoints.</p>
      </div>

      <InsightCallout color="blue">
        <strong>Shield Placement:</strong> Keeper/Overseer shields only deflect plasma (cannon) projectiles — not lasers, missiles, or bombs. Place them to protect your turret clusters from raptor artillery units that appear in mid-to-late waves.
      </InsightCallout>

      {/* Construction Priority */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Construction Priority Order</h2>
        <div className="space-y-2">
          {[
            { step: 1, item: 'Dragon\'s Teeth walls with gaps', timing: 'Grace period', urgency: 'Must have before first wave' },
            { step: 2, item: 'T1 Laser Turrets at each gap', timing: 'Grace period', urgency: 'First line of DPS' },
            { step: 3, item: 'Beamers behind T1 turrets', timing: 'Minutes 7-9', urgency: 'Doubles your kill zone DPS' },
            { step: 4, item: 'Con Turrets behind defense line', timing: 'Minutes 8-10', urgency: 'Auto-repair keeps turrets alive' },
            { step: 5, item: 'Popup turrets in wall line', timing: 'Minutes 9-12', urgency: 'Surprise DPS, hard to kill' },
            { step: 6, item: 'Fortification Walls (T2)', timing: 'Minutes 12-15', urgency: 'Stops T2 raptors from breaking through' },
            { step: 7, item: 'Pulsars / Bulwarks', timing: 'Minutes 15-18', urgency: 'Essential for T2+ raptor waves' },
            { step: 8, item: 'Shield generators', timing: 'Minutes 18-20', urgency: 'Blocks raptor artillery' },
            { step: 9, item: 'LRPCs + deep defense', timing: 'Minutes 20+', urgency: 'Long-range fire support' },
          ].map((p) => (
            <div key={p.step} className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3">
              <div className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {p.step}
              </div>
              <div className="flex-1">
                <span className="text-sm text-white font-medium">{p.item}</span>
                <span className="text-xs text-gray-500 ml-2">({p.timing})</span>
              </div>
              <span className="text-[10px] text-gray-500 hidden md:block">{p.urgency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
