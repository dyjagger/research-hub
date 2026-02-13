import React from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import InsightCallout from './InsightCallout';

const sources = [
  { category: 'Manufacturer Sites', items: [
    { name: 'STIHL USA', url: 'https://www.stihlusa.com', note: 'Official specs, MSRP pricing, feature descriptions' },
    { name: 'Husqvarna US', url: 'https://www.husqvarna.com/us/', note: 'Official specs, MSRP pricing, feature descriptions' },
    { name: 'Echo USA', url: 'https://www.echo-usa.com', note: 'Official specs, MSRP pricing, warranty info' },
  ]},
  { category: 'Expert Testing & Reviews', items: [
    { name: 'TechGearLab', url: 'https://www.techgearlab.com/topics/tools/best-chainsaw', note: 'Lab-tested 19 chainsaws side-by-side with standardized cutting tests' },
    { name: 'Consumer Reports', url: 'https://www.consumerreports.org/home-garden/chainsaws/', note: '50+ gas and electric models rated' },
    { name: 'Popular Mechanics', url: 'https://www.popularmechanics.com/home/lawn-garden/g61679016/best-chainsaws/', note: 'Tested and reviewed top chainsaws' },
    { name: 'ToolboxBuzz', url: 'https://www.toolboxbuzz.com/lawn-garden/stihl-ms362-c-chainsaw-review/', note: 'Detailed Stihl MS 362 review' },
  ]},
  { category: 'Retailers', items: [
    { name: 'Amazon', url: 'https://www.amazon.com', note: 'Street pricing, user ratings, review counts' },
    { name: 'Ace Hardware', url: 'https://www.acehardware.com', note: 'Stihl authorized dealer, pricing, ratings' },
    { name: 'Tractor Supply', url: 'https://www.tractorsupply.com', note: 'Husqvarna authorized dealer, pricing, ratings' },
    { name: "Lowe's", url: 'https://www.lowes.com', note: 'Husqvarna pricing, ratings, availability' },
    { name: 'Home Depot', url: 'https://www.homedepot.com', note: 'Echo pricing, ratings, availability' },
  ]},
  { category: 'Community & Forums', items: [
    { name: 'r/Chainsaw (Reddit)', url: 'https://www.reddit.com/r/Chainsaw/', note: 'Real-world owner experiences, recommendations, troubleshooting' },
    { name: 'r/Tools (Reddit)', url: 'https://www.reddit.com/r/Tools/', note: 'General tool recommendations and comparisons' },
    { name: 'ArboristSite', url: 'https://arboristsite.com', note: 'Professional arborist community — deep technical discussions' },
    { name: 'GreenTractorTalk', url: 'https://www.greentractortalk.com', note: 'Farm and ranch equipment community' },
    { name: 'Fire and Saw', url: 'https://fireandsaw.com', note: 'Chainsaw reviews with aggregated user opinions' },
  ]},
];

const Sources = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Sources & Methodology</h2>
      <p className="text-gray-500 text-sm mb-6">How this comparison was built and where the data comes from</p>

      <InsightCallout variant="info" title="Methodology">
        This dashboard compares 12 gas chainsaws across 3 major brands (Stihl, Husqvarna, Echo) spanning Homeowner, Farm & Ranch, and Professional tiers. Specs come from manufacturer websites. Pricing reflects MSRP as of February 2026 — dealer prices may vary. User ratings are aggregated from major retailers. Community sentiment is synthesized from Reddit, ArboristSite, and other forums. TCO estimates assume ~20 hours/year of use with current fuel and consumable prices.
      </InsightCallout>

      <div className="space-y-6 mb-6">
        {sources.map((group, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">{group.category}</h3>
            <div className="space-y-3">
              {group.items.map((item, j) => (
                <a key={j} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 group hover:bg-gray-800/50 rounded-lg p-2 -mx-2 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-orange-400 transition-colors">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.note}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-orange-400 flex-shrink-0 mt-0.5 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <InsightCallout variant="warning" title="Important Disclaimers">
        <ul className="space-y-1 list-disc list-inside">
          <li>Prices are MSRP and may vary by dealer and region.</li>
          <li>TCO estimates are approximations based on typical residential use (~20 hrs/year).</li>
          <li>Power-to-weight ratios use powerhead-only weight (without bar and chain).</li>
          <li>Use case ratings are editorial assessments based on specs, expert reviews, and community feedback.</li>
          <li>Always wear proper PPE: chainsaw chaps, helmet with face shield, hearing protection, and gloves.</li>
          <li>If you're new to chainsaws, consider taking a safety course before operating any saw.</li>
        </ul>
      </InsightCallout>

      <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-6 mt-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-400 mb-1">Safety First</p>
            <p className="text-sm text-gray-300">
              Chainsaws are among the most dangerous power tools. Before using any chainsaw, read the operator's manual completely. Always wear: <strong>chainsaw chaps or pants</strong> (ASTM F1897), <strong>forestry helmet</strong> with face shield and hearing protection, <strong>cut-resistant gloves</strong>, and <strong>steel-toe boots</strong>. Never operate a chainsaw alone. Keep a first aid kit nearby. If you're new to chainsaws, consider hiring a professional for tree felling and focus on bucking (cutting downed wood) until you gain experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;
