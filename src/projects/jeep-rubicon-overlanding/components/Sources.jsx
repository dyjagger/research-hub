import React from 'react';
import { ExternalLink, BookOpen, Store, Users, Wrench, Globe } from 'lucide-react';
import { sources } from '../data/products';
import InsightCallout from './InsightCallout';

const typeIcons = {
  'Expert Review': BookOpen,
  'Manufacturer': Wrench,
  'Retailer': Store,
  'Community': Users,
  'Industry': Globe,
  'Build Guide': Wrench,
};

const typeColors = {
  'Expert Review': 'text-blue-400 bg-blue-400/10',
  'Manufacturer': 'text-emerald-400 bg-emerald-400/10',
  'Retailer': 'text-amber-400 bg-amber-400/10',
  'Community': 'text-purple-400 bg-purple-400/10',
  'Industry': 'text-cyan-400 bg-cyan-400/10',
  'Build Guide': 'text-pink-400 bg-pink-400/10',
};

const Sources = () => {
  const grouped = sources.reduce((acc, s) => {
    acc[s.type] = acc[s.type] || [];
    acc[s.type].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Sources & Methodology</h2>
        <p className="text-gray-400 text-sm">{sources.length} sources consulted across expert reviews, manufacturers, retailers, and community forums</p>
      </div>

      <InsightCallout variant="info" title="Data Collection Methodology">
        Product specifications were gathered from manufacturer websites and cross-referenced with independent review sites (GearJunkie, OutdoorGearLab). Prices reflect street prices as of early 2025 and may vary by retailer. Ratings and community sentiment were aggregated from Reddit r/overlanding, Wrangler Forum, and retailer reviews. Use case ratings are editorial assessments based on spec analysis and expert reviews.
      </InsightCallout>

      <div className="space-y-4">
        {Object.entries(grouped).map(([type, items]) => {
          const Icon = typeIcons[type] || Globe;
          const colorClass = typeColors[type] || 'text-gray-400 bg-gray-400/10';
          return (
            <div key={type}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>{type}</span>
                <span className="text-gray-600 text-xs">{items.length} sources</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-gray-800/40 border border-gray-700/50 rounded-lg p-3 hover:border-gray-600 transition-colors group">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${colorClass.split(' ')[0]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors truncate">{s.name}</p>
                      <p className="text-gray-600 text-xs truncate">{s.url}</p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-gray-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3">Disclaimers & Limitations</h3>
        <div className="space-y-2 text-gray-400 text-sm">
          <p><strong className="text-gray-300">Pricing:</strong> All prices are approximate street prices as of early 2025. Prices may vary by retailer, region, and availability. Check current pricing before purchasing.</p>
          <p><strong className="text-gray-300">Specifications:</strong> Specs are sourced from manufacturers and may differ slightly from independent measurements. Weight includes tent, mattress, and hardware but may not include ladder or cover on all models.</p>
          <p><strong className="text-gray-300">Compatibility:</strong> All RTTs listed are compatible with the Jeep Wrangler Rubicon JL (2018+) with a proper roof rack system. Verify specific rack compatibility with your tent manufacturer before purchasing.</p>
          <p><strong className="text-gray-300">Use Case Ratings:</strong> Ratings are editorial assessments based on spec analysis, expert reviews, and community feedback. Individual experiences may vary based on climate, terrain, and personal preferences.</p>
          <p><strong className="text-gray-300">Build Costs:</strong> Total build costs are estimates based on MSRP pricing. Actual costs may be lower with sales, bundles, or used gear. Installation costs are not included.</p>
          <p><strong className="text-gray-300">Safety:</strong> Always verify your vehicle's payload capacity and roof rack dynamic/static load ratings before mounting a rooftop tent. Exceeding weight limits is dangerous. Consult your vehicle manual and rack manufacturer.</p>
        </div>
      </div>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3">Data Quality</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">12</p>
            <p className="text-gray-500 text-xs">RTTs Compared</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">10</p>
            <p className="text-gray-500 text-xs">Brands Analyzed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400">{sources.length}</p>
            <p className="text-gray-500 text-xs">Sources Cited</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">8</p>
            <p className="text-gray-500 text-xs">Key Specs Tracked</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;
