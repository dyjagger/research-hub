import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { rareCoffees } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const AVAILABILITY_BADGES = {
  'Ultra Rare': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Very Rare': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Rare': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

export default function RareCoffees() {
  const priceChart = [...rareCoffees].sort((a, b) => b.pricePerLb - a.pricePerLb);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Rare & Expensive Coffees</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          From elephant-digested beans to auction-record Geisha lots — the world's most exclusive and expensive
          coffees, what makes them rare, and whether they're worth the price.
        </p>
      </div>

      <InsightCallout color="violet">
        The most expensive coffee ever sold was a Geisha lot from Panama's Elida Aguacatillo estate — $13,518/kg ($6,135/lb)
        at the 2024 Best of Panama auction. That's over $180 per brewed cup. By contrast, Black Ivory (elephant-digested)
        costs ~$1,500/lb but only ~150kg is produced annually worldwide.
      </InsightCallout>

      {/* Price comparison chart */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-1">Price per Pound (USD)</h3>
        <p className="text-[10px] text-gray-500 mb-4">Retail/auction prices for the world's most expensive coffees</p>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={priceChart} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#d1d5db', fontSize: 11 }} width={140} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pricePerLb" name="Price/lb (USD)" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rare coffee cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rareCoffees.map((c) => (
          <div key={c.name} className="p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-white">{c.name}</h3>
                <p className="text-[10px] text-gray-500">{c.origin}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${AVAILABILITY_BADGES[c.availability] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                {c.availability}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-gray-500">Price/lb</p>
                <p className="text-sm font-bold text-violet-400">${c.pricePerLb.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-gray-500">Flavor</p>
                <p className="text-sm font-bold text-amber-400">{c.flavorRating}/10</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-gray-500">Annual Prod.</p>
                <p className="text-xs font-semibold text-cyan-400">{c.annualProduction}</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500"><span className="text-gray-400">Process:</span> {c.process}</p>
            <p className="text-[10px] text-gray-500 mt-1"><span className="text-gray-400">Flavor:</span> {c.flavorNotes}</p>
          </div>
        ))}
      </div>

      <InsightCallout color="amber">
        Animal-digested coffees (Kopi Luwak, Black Ivory, Jacu Bird) are controversial. While the digestion process does
        reduce bitterness, blind taste tests often show they don't score higher than well-processed specialty Arabica.
        Their price is driven by rarity and novelty, not necessarily superior flavor. Ethical concerns about animal welfare
        in civet farming have also led many specialty coffee professionals to discourage their purchase.
      </InsightCallout>
    </div>
  );
}
