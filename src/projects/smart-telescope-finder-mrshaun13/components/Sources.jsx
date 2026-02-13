import React from 'react';
import { ExternalLink, BookOpen, Store, Factory } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { sources } from '../data/products';

const typeIcons = {
  'Expert Review': BookOpen,
  'Retailer/Expert': Store,
  'Manufacturer': Factory,
};

const Sources = () => {
  const grouped = sources.reduce((acc, s) => {
    if (!acc[s.type]) acc[s.type] = [];
    acc[s.type].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Sources & Methodology</h2>
        <p className="text-gray-400 mt-1">How this research was conducted and where the data comes from</p>
      </div>

      <InsightCallout variant="info" title="Research Methodology">
        This dashboard was built by cross-referencing manufacturer specifications, expert reviews from major astronomy publications,
        retailer listings with current pricing, and community feedback from Reddit and astronomy forums.
        All prices are in USD and were verified as of February 2026. Ratings are aggregated from multiple sources where available.
        Use case ratings (1-5) are editorial assessments based on specs, reviews, and hands-on testing reports.
      </InsightCallout>

      {Object.entries(grouped).map(([type, items]) => {
        const Icon = typeIcons[type] || BookOpen;
        return (
          <div key={type} className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">{type}s</h3>
              <span className="text-xs text-gray-500">({items.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {items.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800/60 rounded-lg px-3 py-2 hover:bg-gray-700/60 transition-colors group"
                >
                  <span className="text-sm text-gray-300 group-hover:text-cyan-300 flex-1">{s.name}</span>
                  <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-cyan-400 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        );
      })}

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Important Disclaimers</h3>
        <ul className="space-y-2 text-xs text-gray-400">
          <li>• <strong className="text-gray-300">Prices fluctuate.</strong> Check retailer links for current pricing. Some models may be on sale or have price changes since this research was compiled.</li>
          <li>• <strong className="text-gray-300">Terrestrial viewing quality varies.</strong> Smart telescopes are optimized for astronomy. Terrestrial/scenery modes are secondary features — image quality won't match a dedicated spotting scope or camera with a telephoto lens.</li>
          <li>• <strong className="text-gray-300">TV casting is indirect.</strong> All models stream to your phone via WiFi. To get the image on your TV, you cast/mirror your phone screen using Chromecast, AirPlay, or your TV's built-in screen mirroring. The Celestron Origin Mark II is the only model with built-in TV casting support.</li>
          <li>• <strong className="text-gray-300">WiFi range matters.</strong> Most smart telescopes have a WiFi range of ~10 meters. If your porch is far from where you'll be sitting, consider a WiFi extender or choose a model with stronger signal.</li>
          <li>• <strong className="text-gray-300">Weather protection.</strong> None of these telescopes are fully weatherproof. You'll need to bring them inside or cover them when not in use. Consider a weather-resistant cover for permanent porch mounting.</li>
          <li>• <strong className="text-gray-300">Use case ratings are editorial.</strong> The 1-5 ratings in the Use Case Fit section are based on our analysis of specs, reviews, and expert opinions — not standardized testing.</li>
        </ul>
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">How to Cast to Your TV</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gray-800/60 rounded-lg px-3 py-2">
            <p className="text-xs font-semibold text-cyan-400">iPhone + Apple TV / AirPlay TV</p>
            <p className="text-xs text-gray-400 mt-1">Open telescope app → Screen Mirror from Control Center → Select your TV</p>
          </div>
          <div className="bg-gray-800/60 rounded-lg px-3 py-2">
            <p className="text-xs font-semibold text-cyan-400">Android + Chromecast / Smart TV</p>
            <p className="text-xs text-gray-400 mt-1">Open telescope app → Cast/Screen Mirror from Quick Settings → Select your TV</p>
          </div>
          <div className="bg-gray-800/60 rounded-lg px-3 py-2">
            <p className="text-xs font-semibold text-cyan-400">Celestron Origin (Built-in)</p>
            <p className="text-xs text-gray-400 mt-1">Origin app has native TV casting — multiple devices can view simultaneously</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;
