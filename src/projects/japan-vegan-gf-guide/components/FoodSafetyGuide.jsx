import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Eye, CheckCircle, XCircle } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { foodSafetyGuide } from '../data/researchData';

const FoodSafetyGuide = () => {
  const [activeTab, setActiveTab] = useState('safe');

  const tabs = [
    { id: 'safe', label: 'Safe Foods', icon: ShieldCheck, color: 'text-green-400' },
    { id: 'danger', label: 'Danger Foods', icon: ShieldAlert, color: 'text-red-400' },
    { id: 'hidden', label: 'Hidden Gluten', icon: Eye, color: 'text-amber-400' },
    { id: 'traps', label: 'Vegan Traps', icon: AlertTriangle, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Food Safety Guide</h2>
        <p className="text-gray-400 mt-1">What's safe, what's not, and hidden ingredients to watch for</p>
      </div>

      <InsightCallout color="red">
        <strong>Critical for celiacs:</strong> Soy sauce in Japan contains wheat. It's in almost everything — dashi, marinades, sauces, even rice vinegar at some sushi restaurants. 
        Always carry a professional GF translation card and BYO gluten-free soy sauce (tamari).
      </InsightCallout>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
              ? 'bg-gray-700/60 text-gray-100 border border-gray-600/50'
              : 'bg-gray-800/40 text-gray-500 border border-gray-700/30 hover:text-gray-300'}`}>
            <tab.icon size={16} className={activeTab === tab.id ? tab.color : ''} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Safe Foods */}
      {activeTab === 'safe' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Foods that are generally safe for vegan and/or GF travelers — but always confirm with staff.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {foodSafetyGuide.safefoods.map((food, i) => (
              <div key={i} className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-gray-100">{food.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                    food.safety === 'Safe' ? 'bg-green-500/20 text-green-300' :
                    food.safety === 'Usually Safe' ? 'bg-green-500/10 text-green-400' :
                    'bg-amber-500/20 text-amber-300'
                  }`}>{food.safety}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{food.notes}</p>
                <div className="flex gap-2 mt-2">
                  {food.veganFriendly && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-300 flex items-center gap-1">
                      <CheckCircle size={10} /> Vegan
                    </span>
                  )}
                  {food.gfFriendly && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 flex items-center gap-1">
                      <CheckCircle size={10} /> GF
                    </span>
                  )}
                  {!food.veganFriendly && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-700/50 text-gray-500 flex items-center gap-1">
                      <XCircle size={10} /> Not Vegan
                    </span>
                  )}
                  {!food.gfFriendly && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-700/50 text-gray-500 flex items-center gap-1">
                      <XCircle size={10} /> Check GF
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Danger Foods */}
      {activeTab === 'danger' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Foods that are NOT safe by default — but GF/vegan alternatives exist at specialty restaurants.</p>
          <div className="space-y-2">
            {foodSafetyGuide.dangerFoods.map((food, i) => (
              <div key={i} className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-gray-100 flex items-center gap-2">
                    <ShieldAlert size={14} className={food.danger === 'High' ? 'text-red-400' : 'text-amber-400'} />
                    {food.name}
                  </h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                    food.danger === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>{food.danger} Risk</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{food.reason}</p>
                <div className="mt-2 bg-green-500/5 rounded-lg px-3 py-2 border border-green-500/10">
                  <p className="text-xs text-green-400">
                    <span className="font-semibold">Safe alternatives: </span>
                    {food.gfAlternative}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden Gluten */}
      {activeTab === 'hidden' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Ingredients that contain gluten but aren't obvious — the biggest traps for celiac travelers in Japan.</p>
          <InsightCallout color="amber">
            Japanese soy sauce (shoyu) is the #1 hidden gluten source. Unlike in some Western countries, ALL standard soy sauce in Japan contains wheat. 
            Always carry tamari or GF soy sauce, and ask specifically: "醤油は使っていますか？" (Does this contain soy sauce?)
          </InsightCallout>
          <div className="space-y-2">
            {foodSafetyGuide.hiddenGluten.map((item, i) => (
              <div key={i} className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vegan Traps */}
      {activeTab === 'traps' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Hidden animal products in Japanese cuisine — even "vegetable" dishes may contain these.</p>
          <InsightCallout color="purple">
            Dashi (fish stock) is the #1 vegan trap in Japan. It's the base of almost every Japanese dish — miso soup, noodle broth, simmered vegetables, even some rice seasonings. 
            Always ask: "出汁に魚は入っていますか？" (Does the broth contain fish?)
          </InsightCallout>
          <div className="space-y-2">
            {foodSafetyGuide.veganTraps.map((item, i) => (
              <div key={i} className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-start gap-3">
                <AlertTriangle size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSafetyGuide;
