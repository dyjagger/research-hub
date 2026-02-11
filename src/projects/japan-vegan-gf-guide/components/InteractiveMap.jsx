import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Filter, MapPin, Star, ExternalLink, Clock, Globe } from 'lucide-react';
import { restaurants, COLORS, DIETARY_TAGS } from '../data/researchData';

// Fix default marker icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;

const createIcon = (color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="42">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#1f2937" stroke-width="1"/>
    <circle cx="12" cy="12" r="5" fill="white" opacity="0.9"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [28, 42],
    iconAnchor: [14, 42],
    popupAnchor: [0, -42],
  });
};

const veganIcon = createIcon(COLORS.vegan);
const gfIcon = createIcon(COLORS.glutenFree);
const bothIcon = createIcon(COLORS.both);
const veganOptionsIcon = createIcon(COLORS.veganOptions);
const gfOptionsIcon = createIcon(COLORS.gfOptions);

const getIcon = (r) => {
  if (r.isVegan && r.isGF) return bothIcon;
  if (r.isVegan) return veganIcon;
  if (r.isGF) return gfIcon;
  if (r.hasGFOptions && r.tags.some(t => t.includes('Vegan'))) return veganOptionsIcon;
  if (r.hasGFOptions) return gfOptionsIcon;
  return veganOptionsIcon;
};

const getTagColor = (tag) => {
  if (tag.includes('Vegan + GF')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  if (tag.includes('100% Vegan')) return 'bg-green-500/20 text-green-300 border-green-500/30';
  if (tag.includes('Vegan')) return 'bg-green-500/10 text-green-400 border-green-500/20';
  if (tag.includes('Dedicated GF')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  if (tag.includes('GF')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  if (tag.includes('Temple')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

const FlyToCity = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);
  return null;
};

const cities = ['All', 'Tokyo', 'Kyoto', 'Osaka', 'Nara', 'Hiroshima', 'Hakone'];
const dietFilters = ['All', 'Vegan', 'Gluten-Free', 'Both (V+GF)'];
const priceFilters = ['All', '¥', '¥¥', '¥¥¥', '¥¥¥¥'];

const InteractiveMap = () => {
  const [cityFilter, setCityFilter] = useState('All');
  const [dietFilter, setDietFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [flyCenter, setFlyCenter] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const cityCoords = {
    Tokyo: [35.6762, 139.6503],
    Kyoto: [35.0116, 135.7681],
    Osaka: [34.6937, 135.5023],
    Nara: [34.6851, 135.8048],
    Hiroshima: [34.3853, 132.4553],
    Hakone: [35.2326, 139.1070],
  };

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      if (cityFilter !== 'All' && r.city !== cityFilter) return false;
      if (dietFilter === 'Vegan' && !r.isVegan && !r.tags.some(t => t.includes('Vegan'))) return false;
      if (dietFilter === 'Gluten-Free' && !r.isGF && !r.hasGFOptions) return false;
      if (dietFilter === 'Both (V+GF)' && !(r.isVegan && r.isGF)) return false;
      if (priceFilter !== 'All' && r.priceRange !== priceFilter) return false;
      return true;
    });
  }, [cityFilter, dietFilter, priceFilter]);

  const handleCityClick = (city) => {
    setCityFilter(city);
    if (city !== 'All' && cityCoords[city]) {
      setFlyCenter(cityCoords[city]);
    } else {
      setFlyCenter([36.5, 137.0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={16} className="text-green-400" />
          <span className="text-sm font-semibold text-gray-300">Filters</span>
          <span className="text-xs text-gray-500 ml-auto">{filtered.length} restaurants shown</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* City */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">City</label>
            <div className="flex flex-wrap gap-1">
              {cities.map(c => (
                <button key={c} onClick={() => handleCityClick(c)}
                  className={`px-2 py-1 text-xs rounded-md transition-all ${cityFilter === c
                    ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/30 hover:bg-gray-700'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          {/* Diet */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Dietary Type</label>
            <div className="flex flex-wrap gap-1">
              {dietFilters.map(d => (
                <button key={d} onClick={() => setDietFilter(d)}
                  className={`px-2 py-1 text-xs rounded-md transition-all ${dietFilter === d
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/30 hover:bg-gray-700'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          {/* Price */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Price Range</label>
            <div className="flex flex-wrap gap-1">
              {priceFilters.map(p => (
                <button key={p} onClick={() => setPriceFilter(p)}
                  className={`px-2 py-1 text-xs rounded-md transition-all ${priceFilter === p
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/30 hover:bg-gray-700'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.vegan }} /> 100% Vegan</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.glutenFree }} /> Dedicated GF</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.both }} /> Vegan + GF</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.veganOptions }} /> Vegan Options</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.gfOptions }} /> GF Options</span>
      </div>

      {/* Map + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl overflow-hidden border border-gray-700/50" style={{ height: '520px' }}>
          <MapContainer center={[36.5, 137.0]} zoom={6} style={{ height: '100%', width: '100%' }}
            className="z-0">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <FlyToCity center={flyCenter} />
            {filtered.map(r => (
              <Marker key={r.id} position={[r.lat, r.lng]} icon={getIcon(r)}
                eventHandlers={{ click: () => setSelectedRestaurant(r) }}>
                <Popup className="custom-popup" maxWidth={280}>
                  <div className="text-gray-900">
                    <h3 className="font-bold text-sm">{r.name}</h3>
                    <p className="text-xs text-gray-600">{r.area}, {r.city}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-medium">{r.rating}</span>
                      <span className="text-xs text-gray-500">({r.reviewCount} reviews)</span>
                    </div>
                    <p className="text-xs mt-1">{r.priceYen} · {r.cuisine}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Detail Panel */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4 overflow-y-auto" style={{ maxHeight: '520px' }}>
          {selectedRestaurant ? (
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-100">{selectedRestaurant.name}</h3>
                <p className="text-sm text-gray-400">{selectedRestaurant.area}, {selectedRestaurant.city}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-amber-400">{selectedRestaurant.rating}</span>
                </div>
                <span className="text-xs text-gray-500">({selectedRestaurant.reviewCount} reviews)</span>
                <span className="text-xs text-gray-500">·</span>
                <span className="text-sm text-gray-300">{selectedRestaurant.priceYen}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedRestaurant.tags.map((tag, i) => (
                  <span key={i} className={`text-xs px-2 py-0.5 rounded-full border ${getTagColor(tag)}`}>{tag}</span>
                ))}
                {selectedRestaurant.hasGFOptions && !selectedRestaurant.tags.some(t => t.includes('GF')) && (
                  <span className="text-xs px-2 py-0.5 rounded-full border bg-blue-500/10 text-blue-400 border-blue-500/20">GF Options</span>
                )}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{selectedRestaurant.description}</p>
              <div>
                <p className="text-xs font-semibold text-green-400 mb-1">Must Try</p>
                <p className="text-sm text-gray-300">{selectedRestaurant.mustTry}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400">Reviews</p>
                {selectedRestaurant.reviews.map((rev, i) => (
                  <p key={i} className="text-xs text-gray-400 italic">{rev}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                {selectedRestaurant.bookAhead && (
                  <span className="flex items-center gap-1 bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">
                    <Clock size={10} /> Book Ahead
                  </span>
                )}
                {selectedRestaurant.englishMenu && (
                  <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full">
                    <Globe size={10} /> English Menu
                  </span>
                )}
                {selectedRestaurant.englishStaff && (
                  <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full">
                    <Globe size={10} /> English Staff
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600">Source: {selectedRestaurant.source}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MapPin size={32} className="mb-2 opacity-50" />
              <p className="text-sm">Click a marker to see details</p>
              <p className="text-xs mt-1">Use filters to narrow results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
