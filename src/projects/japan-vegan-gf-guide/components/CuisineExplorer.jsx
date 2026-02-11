import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, ChefHat, MapPin } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { cuisineTypes, restaurants } from '../data/researchData';

const CuisineExplorer = () => {
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const getCuisineRestaurants = (cuisineName) => {
    const keywords = cuisineName.toLowerCase().split(/[\s/()]+/).filter(w => w.length > 2);
    return restaurants.filter(r => {
      const rc = r.cuisine.toLowerCase();
      return keywords.some(k => rc.includes(k));
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Cuisine Explorer</h2>
        <p className="text-gray-400 mt-1">Japanese cuisine types and their compatibility with vegan and gluten-free diets</p>
      </div>

      <InsightCallout color="amber">
        <strong>Shojin Ryori</strong> (Buddhist temple cuisine) is Japan's centuries-old vegan tradition — completely plant-based by religious principle. 
        It's the world's oldest continuously practiced vegan cuisine, and Kyoto is its heartland. Book 1-2 days ahead for the best temple restaurants.
      </InsightCallout>

      {/* Cuisine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cuisineTypes.map((cuisine, i) => {
          const relatedRestaurants = getCuisineRestaurants(cuisine.name);
          const isSelected = selectedCuisine === i;

          return (
            <div key={i}
              className={`bg-gray-800/40 rounded-xl border transition-all cursor-pointer ${isSelected ? 'border-green-500/40 bg-gray-800/60' : 'border-gray-700/30 hover:border-gray-600/50'}`}
              onClick={() => setSelectedCuisine(isSelected ? null : i)}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-100 flex items-center gap-2">
                      <ChefHat size={16} className="text-amber-400" />
                      {cuisine.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{cuisine.description}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{cuisine.priceRange}</span>
                </div>

                {/* Safety Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${cuisine.veganSafe
                    ? 'bg-green-500/15 text-green-300 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/15'}`}>
                    {cuisine.veganSafe ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {cuisine.veganSafe ? 'Vegan Safe' : 'Not Vegan (by default)'}
                  </div>
                  <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${cuisine.gfSafe
                    ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/15'}`}>
                    {cuisine.gfSafe ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {cuisine.gfSafe ? 'GF Safe' : 'Contains Gluten'}
                  </div>
                </div>

                {/* GF Notes */}
                {cuisine.gfNotes && (
                  <div className="mt-3 flex items-start gap-2 text-xs text-amber-400/80 bg-amber-500/5 rounded-lg px-3 py-2 border border-amber-500/10">
                    <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />
                    <span>{cuisine.gfNotes}</span>
                  </div>
                )}

                {/* Cities */}
                <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
                  <MapPin size={10} />
                  <span>{Array.isArray(cuisine.cities) ? cuisine.cities.join(', ') : cuisine.cities}</span>
                </div>

                {/* Expanded: Related Restaurants */}
                {isSelected && relatedRestaurants.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-700/30">
                    <p className="text-xs font-semibold text-gray-400 mb-2">Related Restaurants ({relatedRestaurants.length})</p>
                    <div className="space-y-2">
                      {relatedRestaurants.slice(0, 6).map(r => (
                        <div key={r.id} className="flex items-center justify-between text-xs bg-gray-900/40 rounded-lg px-3 py-2">
                          <div>
                            <span className="text-gray-200 font-medium">{r.name}</span>
                            <span className="text-gray-500 ml-2">{r.city}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {r.isVegan && <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-300">V</span>}
                            {r.isGF && <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">GF</span>}
                            <span className="text-amber-400">★ {r.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compatibility Matrix */}
      <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Compatibility Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-700/50">
                <th className="text-left py-2 pr-4">Cuisine</th>
                <th className="text-center py-2 px-3">Vegan Safe?</th>
                <th className="text-center py-2 px-3">GF Safe?</th>
                <th className="text-left py-2 px-3">Price</th>
                <th className="text-left py-2">Available In</th>
              </tr>
            </thead>
            <tbody>
              {cuisineTypes.map((c, i) => (
                <tr key={i} className="border-b border-gray-800/30">
                  <td className="py-2 pr-4 text-gray-200 font-medium">{c.name}</td>
                  <td className="py-2 px-3 text-center">
                    {c.veganSafe
                      ? <CheckCircle size={14} className="text-green-400 mx-auto" />
                      : <XCircle size={14} className="text-red-400/60 mx-auto" />}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {c.gfSafe
                      ? <CheckCircle size={14} className="text-blue-400 mx-auto" />
                      : <XCircle size={14} className="text-red-400/60 mx-auto" />}
                  </td>
                  <td className="py-2 px-3 text-gray-400">{c.priceRange}</td>
                  <td className="py-2 text-gray-500">{Array.isArray(c.cities) ? c.cities.join(', ') : c.cities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CuisineExplorer;
