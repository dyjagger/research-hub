import React, { useState } from 'react';
import { Smartphone, CreditCard, Store, CalendarCheck, Home, Package, MessageCircle } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { practicalTips, japanesePhrases } from '../data/researchData';

const iconMap = {
  'Apps & Tools': Smartphone,
  'Translation Cards': CreditCard,
  'Convenience Stores (Conbini)': Store,
  'Booking & Planning': CalendarCheck,
  'Ryokans (Traditional Inns)': Home,
  'BYO Essentials': Package,
};

const PracticalTips = () => {
  const [activeCategory, setActiveCategory] = useState('Apps & Tools');
  const [showPhrases, setShowPhrases] = useState(false);

  const activeTips = practicalTips.find(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Practical Tips</h2>
        <p className="text-gray-400 mt-1">Essential tools, apps, phrases, and survival strategies for vegan/GF travel in Japan</p>
      </div>

      <InsightCallout color="cyan">
        <strong>Top 3 essentials:</strong> (1) Download HappyCow before your trip — it's the #1 vegan restaurant finder. 
        (2) Buy a professional GF translation card in Japanese (~$10-15, worth every penny). 
        (3) Always carry emergency snacks — some areas have zero safe options.
      </InsightCallout>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {practicalTips.map(cat => {
          const Icon = iconMap[cat.category] || Package;
          return (
            <button key={cat.category} onClick={() => { setActiveCategory(cat.category); setShowPhrases(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat.category && !showPhrases
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-gray-800/40 text-gray-500 border border-gray-700/30 hover:text-gray-300'}`}>
              <Icon size={14} />
              {cat.category}
            </button>
          );
        })}
        <button onClick={() => setShowPhrases(true)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${showPhrases
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            : 'bg-gray-800/40 text-gray-500 border border-gray-700/30 hover:text-gray-300'}`}>
          <MessageCircle size={14} />
          Japanese Phrases
        </button>
      </div>

      {/* Tips Content */}
      {!showPhrases && activeTips && (
        <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            {React.createElement(iconMap[activeCategory] || Package, { size: 20, className: 'text-cyan-400' })}
            {activeCategory}
          </h3>
          <div className="space-y-3">
            {activeTips.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900/30 rounded-lg px-4 py-3 border border-gray-700/20">
                <span className="text-cyan-400 font-bold text-sm mt-0.5 flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-gray-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Japanese Phrases */}
      {showPhrases && (
        <div className="space-y-4">
          <InsightCallout color="amber">
            These phrases can be a lifesaver. Screenshot them or write them down before your trip. 
            Even showing the Japanese text on your phone to restaurant staff will help enormously.
          </InsightCallout>
          <div className="space-y-2">
            {japanesePhrases.map((phrase, i) => (
              <div key={i} className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-100 mb-1">{phrase.japanese}</p>
                    <p className="text-sm text-amber-400/80 italic">{phrase.romaji}</p>
                    <p className="text-sm text-gray-300 mt-1">{phrase.english}</p>
                  </div>
                  <span className="text-xs text-gray-600 bg-gray-700/30 px-2 py-1 rounded flex-shrink-0">{phrase.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Reference Card */}
      <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-5 border border-green-500/20">
        <h3 className="text-sm font-bold text-gray-200 mb-3">Quick Reference: Emergency Survival Kit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="space-y-2">
            <p className="text-green-400 font-semibold text-xs uppercase tracking-wider">For Vegans</p>
            <p className="text-gray-300">• HappyCow app (offline maps available)</p>
            <p className="text-gray-300">• Know "dashi" = fish stock (in everything)</p>
            <p className="text-gray-300">• Conbini: edamame, fruit, plain onigiri</p>
            <p className="text-gray-300">• Shojin ryori = always vegan (temple food)</p>
          </div>
          <div className="space-y-2">
            <p className="text-blue-400 font-semibold text-xs uppercase tracking-wider">For Celiacs / GF</p>
            <p className="text-gray-300">• BYO tamari / GF soy sauce (essential)</p>
            <p className="text-gray-300">• GF translation card (professional, laminated)</p>
            <p className="text-gray-300">• Yakiniku = safest backup (you control the grill)</p>
            <p className="text-gray-300">• Coco Ichibanya = allergen-free curry (nationwide)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalTips;
