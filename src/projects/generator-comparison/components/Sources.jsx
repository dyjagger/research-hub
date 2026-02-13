import React from 'react';
import { ExternalLink } from 'lucide-react';
import InsightCallout from './InsightCallout';

const sources = [
  { name: 'GeneratorBible.com', url: 'https://generatorbible.com', type: 'Independent Reviews', desc: 'Independent generator comparison site with standardized specs, pricing history, and cross-model comparisons. Not affiliated with manufacturers.' },
  { name: 'DuroMax Official', url: 'https://www.duromaxpower.com', type: 'Manufacturer', desc: 'Official specs, manuals, and warranty information for DuroMax generators.' },
  { name: 'Westinghouse Outdoor Power', url: 'https://westinghouse.com', type: 'Manufacturer', desc: 'Official specs and ST Switch compatibility information.' },
  { name: 'Champion Power Equipment', url: 'https://www.championpowerequipment.com', type: 'Manufacturer', desc: 'Official specs, Intelligauge details, and CO Shield information.' },
  { name: 'Firman Power Equipment', url: 'https://firmanpowerequipment.com', type: 'Manufacturer', desc: 'Official specs and tri-fuel product line details.' },
  { name: 'GENMAX Power', url: 'https://www.genmax.com', type: 'Manufacturer', desc: 'Official specs for inverter generator line.' },
  { name: 'Amazon.com', url: 'https://www.amazon.com', type: 'Retailer', desc: 'Pricing, customer reviews, and availability. Largest review dataset for most models.' },
  { name: 'Home Depot', url: 'https://www.homedepot.com', type: 'Retailer', desc: 'Pricing, reviews, and frequent sales/promotions on generators.' },
  { name: 'Lowes', url: 'https://www.lowes.com', type: 'Retailer', desc: 'Pricing and reviews, primary retailer for Firman and Westinghouse.' },
  { name: 'Reddit r/Generator', url: 'https://www.reddit.com/r/Generator/', type: 'Community', desc: 'Real-world user experiences, troubleshooting, and recommendations from generator owners.' },
  { name: 'Power Equipment Forum', url: 'https://www.powerequipmentforum.com', type: 'Community', desc: 'Expert discussions on generator selection, maintenance, and modifications.' },
  { name: 'Popular Mechanics', url: 'https://www.popularmechanics.com', type: 'Expert Review', desc: 'Hands-on testing and editorial reviews of portable generators.' },
  { name: 'Bob Vila', url: 'https://www.bobvila.com', type: 'Expert Review', desc: 'Tested dual-fuel generator reviews and buyer guides.' },
  { name: 'Wirecutter (NYT)', url: 'https://www.nytimes.com/wirecutter/', type: 'Expert Review', desc: 'In-depth portable generator testing and recommendations.' },
];

const methodology = [
  'All specs sourced from manufacturer websites and cross-referenced with GeneratorBible.com independent data.',
  'Prices reflect lowest available price from major retailers as of February 2026. Prices fluctuate — check current pricing before purchasing.',
  'Natural gas wattage ratings are from manufacturer specs. Actual output may vary based on NG pressure (typically 3.5-7" WC for residential).',
  'THD (Total Harmonic Distortion) values are manufacturer-stated maximums. Actual THD varies with load.',
  'Runtime estimates are at 50% load on gasoline unless otherwise noted.',
  'Review ratings are aggregated across retailers using review-count-weighted averages.',
  'Load calculations for your home are estimates. Actual wattage varies by specific appliance models.',
  'AC starting wattage varies significantly by unit age, condition, and ambient temperature. Soft start reduction estimates are typical ranges.',
  '5-Year TCO assumes 4 outages/year averaging 24 hours each (96 hours/year total runtime). Your actual usage may differ.',
  'Natural gas cost estimated at $1.10/therm (Tennessee average). Check your local utility rate.',
];

const disclaimers = [
  'This dashboard is for informational purposes only. Always verify specs with the manufacturer before purchasing.',
  'Generator installation and transfer switch wiring should be performed by a licensed electrician.',
  'Never operate a generator indoors or in an enclosed space. CO poisoning is lethal.',
  'Natural gas connections must comply with local building codes. Check with your gas utility before connecting.',
  'Prices, availability, and specifications may change without notice.',
  'Warranty terms vary — read the full warranty document before purchasing.',
];

export default function Sources() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Sources & Methodology</h2>
      <p className="text-gray-400 mb-6">Data sourcing, assumptions, and important disclaimers</p>

      {/* Sources */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Sources ({sources.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sources.map(s => (
            <div key={s.name} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-700 text-gray-400">{s.type}</span>
                </div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Methodology & Assumptions</h3>
        <ul className="space-y-2">
          {methodology.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-gray-600 mt-0.5">•</span>
              {m}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimers */}
      <InsightCallout variant="warning" title="Important Safety & Legal Disclaimers">
        <ul className="space-y-1.5 mt-1">
          {disclaimers.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">⚠</span>
              {d}
            </li>
          ))}
        </ul>
      </InsightCallout>

      <div className="text-center text-xs text-gray-600 mt-8 pb-4">
        Research conducted February 2026 · Dashboard built with React, Recharts, and Tailwind CSS
      </div>
    </div>
  );
}
