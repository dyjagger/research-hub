import React, { useState } from 'react';
import { MapPin, ExternalLink, Phone, Clock, DollarSign } from 'lucide-react';
import { activities, categories } from '../data/researchData';

export default function LocationGuide() {
  const [cityFilter, setCityFilter] = useState('all');

  const allLocations = activities.flatMap(a => {
    const cat = categories.find(c => c.id === a.category);
    return a.locations.map(loc => ({ ...loc, activityName: a.name, activityId: a.id, catColor: cat?.color, catLabel: cat?.label }));
  });

  const cities = [...new Set(allLocations.map(l => l.city))].sort();

  const filtered = cityFilter === 'all' ? allLocations : allLocations.filter(l => l.city === cityFilter);

  const grouped = {};
  filtered.forEach(loc => {
    if (!grouped[loc.city]) grouped[loc.city] = [];
    grouped[loc.city].push(loc);
  });

  const cityOrder = Object.keys(grouped).sort();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Location Guide</h2>
        <p className="text-gray-400">Every facility mapped — addresses, hours, pricing, and direct links</p>
      </div>

      {/* City Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCityFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${cityFilter === 'all' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'}`}
        >
          All Cities ({allLocations.length})
        </button>
        {cities.map(city => {
          const count = allLocations.filter(l => l.city === city).length;
          return (
            <button
              key={city}
              onClick={() => setCityFilter(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${cityFilter === city ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'}`}
            >
              {city} ({count})
            </button>
          );
        })}
      </div>

      {/* Location Cards by City */}
      {cityOrder.map(city => (
        <div key={city}>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-400" />
            {city}
            <span className="text-xs text-gray-500 font-normal">({grouped[city].length} locations)</span>
          </h3>
          <div className="space-y-3">
            {grouped[city].map((loc, i) => (
              <div key={`${loc.activityId}-${i}`} className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{loc.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: loc.catColor }} />
                      <span className="text-xs text-gray-400">{loc.activityName}</span>
                    </div>
                  </div>
                  {loc.website && (
                    <a href={loc.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 flex-shrink-0">
                      <ExternalLink className="w-3 h-3" /> Visit
                    </a>
                  )}
                </div>

                <div className="space-y-1.5 mt-3">
                  {loc.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{loc.address}</span>
                    </div>
                  )}
                  {loc.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{loc.phone}</span>
                    </div>
                  )}
                  {loc.hours && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{loc.hours}</span>
                    </div>
                  )}
                  {loc.pricing && (
                    <div className="flex items-start gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{loc.pricing}</span>
                    </div>
                  )}
                  {loc.notes && (
                    <p className="text-xs text-gray-500 italic mt-1 pl-5">{loc.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Location Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cities.map(city => (
            <div key={city} className="text-center">
              <div className="text-xl font-bold text-white">{allLocations.filter(l => l.city === city).length}</div>
              <div className="text-xs text-gray-400">{city}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
