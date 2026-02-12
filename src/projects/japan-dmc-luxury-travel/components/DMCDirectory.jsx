import React, { useState, useMemo } from 'react';
import { Building2, Star, Globe, Users, MapPin, Award, ExternalLink, ChevronDown, ChevronUp, Filter, DollarSign, Clock, MessageSquare, Bike, Utensils, Calendar, Shield, Search } from 'lucide-react';
import { dmcDirectory, dmcTiers } from '../data/dmcProfiles';
import InsightCallout from './InsightCallout';

const ACCENT = '#f43f5e';

const tierColors = {
  'Ultra-Luxury Boutique': '#f43f5e',
  'Premium Full-Service': '#8b5cf6',
  'Mid-Range': '#06b6d4',
  'Large-Scale / MICE': '#3b82f6',
  'Niche Specialist': '#10b981',
  'International Operator': '#f59e0b',
};

function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} size={12} fill={i < rating ? '#f59e0b' : 'transparent'} stroke={i < rating ? '#f59e0b' : '#4b5563'} />
      ))}
    </div>
  );
}

function Badge({ children, color = '#6b7280' }) {
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: `${color}20`, color }}>
      {children}
    </span>
  );
}

function Section({ label, children, color = '#9ca3af' }) {
  return (
    <div>
      <p className="text-[10px] uppercase mb-1.5 tracking-wide" style={{ color }}>{label}</p>
      {children}
    </div>
  );
}

function DMCCard({ dmc, isExpanded, onToggle }) {
  const tierColor = tierColors[dmc.tier] || '#6b7280';
  const isB2B = dmc.model?.includes('B2B only');
  const hasCycling = dmc.cycling && dmc.cycling.offers;
  const isDietarySpecialist = dmc.dietary?.isSpecialist;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
      <button onClick={onToggle} className="w-full text-left p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${tierColor}20`, color: tierColor }}>
                {dmc.tier}
              </span>
              <Badge color="#6366f1">{dmc.model}</Badge>
              {dmc.groups?.accepts && <Badge color="#22c55e">Groups OK</Badge>}
              {dmc.dayTours?.offers && <Badge color="#06b6d4">Day Tours</Badge>}
              {hasCycling && <Badge color="#f97316">Cycling</Badge>}
              {isDietarySpecialist && <Badge color="#a855f7">Dietary Specialist</Badge>}
            </div>
            <h3 className="text-white font-semibold text-sm">{dmc.name}</h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1"><MapPin size={10} />{dmc.hq}</span>
              <span className="flex items-center gap-1"><Globe size={10} />Est. {dmc.founded}</span>
              <span className="flex items-center gap-1 text-green-400">{dmc.priceRange}</span>
              {dmc.reviews?.google && (
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={10} fill="#facc15" />{dmc.reviews.google} ({dmc.reviews.googleCount})
                </span>
              )}
            </div>
            {dmc.differentiator && (
              <p className="text-[11px] text-gray-400 mt-1.5 italic leading-snug">"{dmc.differentiator}"</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 ml-3 shrink-0">
            <div className="text-[10px] text-gray-500 uppercase">Luxury</div>
            <StarRating rating={dmc.luxuryRating} />
            {isExpanded ? <ChevronUp size={14} className="text-gray-500 mt-1" /> : <ChevronDown size={14} className="text-gray-500 mt-1" />}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-800 pt-3 space-y-3">
          {/* Specializations */}
          <Section label="Specializations">
            <div className="flex flex-wrap gap-1.5">
              {dmc.specializations.map((s) => (
                <span key={s} className="text-[11px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{s}</span>
              ))}
            </div>
          </Section>

          {/* Regions & Languages */}
          <div className="grid md:grid-cols-2 gap-3">
            <Section label="Regional Coverage">
              <p className="text-xs text-gray-400">{dmc.regions.join(' · ')}</p>
            </Section>
            <Section label="Languages">
              <p className="text-xs text-gray-400">{dmc.languages.join(', ')}</p>
            </Section>
          </div>

          {/* Business Model Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* Commission */}
            {dmc.commission && (
              <div className="bg-gray-800/60 rounded p-2">
                <p className="text-[10px] text-gray-500 flex items-center gap-1"><DollarSign size={10} />Commission</p>
                <p className="text-xs text-green-400 font-medium mt-0.5">{dmc.commission.agentMargin}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{dmc.commission.model}</p>
              </div>
            )}
            {/* Response Time */}
            {dmc.responseTime && (
              <div className="bg-gray-800/60 rounded p-2">
                <p className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={10} />Response Time</p>
                <p className="text-xs text-cyan-400 font-medium mt-0.5">{dmc.responseTime.initial}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Proposal: {dmc.responseTime.proposal}</p>
              </div>
            )}
            {/* Groups */}
            {dmc.groups && (
              <div className="bg-gray-800/60 rounded p-2">
                <p className="text-[10px] text-gray-500 flex items-center gap-1"><Users size={10} />Groups</p>
                <p className="text-xs text-white font-medium mt-0.5">Max {dmc.groups.maxSize}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{dmc.groups.specialty}</p>
              </div>
            )}
            {/* Day Tours */}
            <div className="bg-gray-800/60 rounded p-2">
              <p className="text-[10px] text-gray-500 flex items-center gap-1"><Calendar size={10} />Day Tours</p>
              <p className={`text-xs font-medium mt-0.5 ${dmc.dayTours?.offers ? 'text-green-400' : 'text-gray-600'}`}>
                {dmc.dayTours?.offers ? 'Yes' : 'Multi-day only'}
              </p>
              {dmc.dayTours?.priceRange && <p className="text-[10px] text-gray-500 mt-0.5">{dmc.dayTours.priceRange}</p>}
            </div>
          </div>

          {/* Day Tour Types */}
          {dmc.dayTours?.offers && dmc.dayTours.types.length > 0 && (
            <Section label="Day Tour Types">
              <div className="flex flex-wrap gap-1.5">
                {dmc.dayTours.types.map((t) => (
                  <span key={t} className="text-[11px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </Section>
          )}

          {/* Payment & Cancellation */}
          <div className="grid md:grid-cols-2 gap-3">
            {dmc.payment && (
              <Section label="Payment Structure" color="#22c55e">
                <div className="space-y-1 text-xs text-gray-300">
                  <p>Deposit: <span className="text-white">{dmc.payment.deposit}</span></p>
                  <p>Balance: <span className="text-white">{dmc.payment.balance}</span></p>
                  <p>Methods: {dmc.payment.methods.join(', ')}</p>
                  <p>Currency: {dmc.payment.currency}</p>
                </div>
              </Section>
            )}
            {dmc.cancellation && (
              <Section label="Cancellation Policy" color="#f59e0b">
                <div className="space-y-0.5">
                  {dmc.cancellation.tiers.map((t, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-gray-400">{t.period}</span>
                      <span className="text-white font-medium">{t.fee}</span>
                    </div>
                  ))}
                  {dmc.cancellation.notes && <p className="text-[10px] text-gray-500 mt-1 italic">{dmc.cancellation.notes}</p>}
                </div>
              </Section>
            )}
          </div>

          {/* Dietary */}
          {dmc.dietary?.handles && (
            <Section label={dmc.dietary.isSpecialist ? '🍽 Dietary Specialist' : 'Dietary Accommodation'} color={dmc.dietary.isSpecialist ? '#a855f7' : '#9ca3af'}>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {dmc.dietary.specialties.map((s) => (
                  <span key={s} className={`text-[11px] px-2 py-0.5 rounded ${dmc.dietary.isSpecialist ? 'bg-purple-500/10 text-purple-400' : 'bg-gray-800 text-gray-300'}`}>{s}</span>
                ))}
              </div>
              <p className="text-[11px] text-gray-400">{dmc.dietary.approach}</p>
            </Section>
          )}

          {/* Cycling */}
          {hasCycling && (
            <Section label="Cycling Specialist" color="#f97316">
              <p className="text-xs text-orange-400 font-medium mb-1">{dmc.cycling.type}</p>
              {dmc.cycling.bikeTypes && (
                <div className="flex flex-wrap gap-1.5 mb-1">
                  {dmc.cycling.bikeTypes.map((b) => (
                    <span key={b} className="text-[11px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded">{b}</span>
                  ))}
                </div>
              )}
              {dmc.cycling.routes && <p className="text-[11px] text-gray-400">Routes: {dmc.cycling.routes.join(' · ')}</p>}
              {dmc.cycling.support && <p className="text-[11px] text-gray-400 mt-0.5">Support: {dmc.cycling.support}</p>}
            </Section>
          )}

          {/* Reviews */}
          {dmc.reviews && (
            <Section label="Reviews & Reputation" color="#facc15">
              <div className="flex flex-wrap gap-3 mb-1.5">
                {dmc.reviews.google && (
                  <span className="text-xs text-gray-300">Google: <span className="text-yellow-400 font-medium">{dmc.reviews.google}★</span> ({dmc.reviews.googleCount})</span>
                )}
                {dmc.reviews.trustpilot && (
                  <span className="text-xs text-gray-300">Trustpilot: <span className="text-yellow-400 font-medium">{dmc.reviews.trustpilot}★</span> ({dmc.reviews.trustpilotCount})</span>
                )}
                {dmc.reviews.tripadvisor && (
                  <span className="text-xs text-gray-300">TripAdvisor: <span className="text-yellow-400 font-medium">{dmc.reviews.tripadvisor}★</span></span>
                )}
              </div>
              <p className="text-[11px] text-gray-400">{dmc.reviews.sentiment}</p>
              {dmc.reviews.quote && <p className="text-[11px] text-gray-500 italic mt-1">{dmc.reviews.quote}</p>}
            </Section>
          )}

          {/* Commission Notes */}
          {dmc.commission?.notes && (
            <Section label="Agent Notes">
              <p className="text-[11px] text-gray-400">{dmc.commission.notes}</p>
            </Section>
          )}

          {/* Strengths & Considerations */}
          <div className="grid md:grid-cols-2 gap-3">
            <Section label="Strengths" color="#22c55e">
              <ul className="space-y-1">
                {dmc.strengths.map((s) => (
                  <li key={s} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-green-400 mt-0.5">✓</span>{s}
                  </li>
                ))}
              </ul>
            </Section>
            <Section label="Considerations" color="#f59e0b">
              <ul className="space-y-1">
                {dmc.considerations.map((c) => (
                  <li key={c} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-amber-400 mt-0.5">△</span>{c}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Recommended For */}
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-[10px] uppercase text-rose-400 mb-1 tracking-wide">Best For</p>
            <p className="text-xs text-gray-200">{dmc.recommendedFor}</p>
          </div>

          {/* Website Link */}
          <a href={dmc.website} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors">
            <ExternalLink size={12} />Visit Website
          </a>
        </div>
      )}
    </div>
  );
}

export default function DMCDirectory() {
  const [expandedId, setExpandedId] = useState(null);
  const [tierFilter, setTierFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [featureFilter, setFeatureFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = dmcDirectory;
    if (tierFilter !== 'all') result = result.filter(d => d.tier === tierFilter);
    if (featureFilter === 'dayTours') result = result.filter(d => d.dayTours?.offers);
    if (featureFilter === 'cycling') result = result.filter(d => d.cycling && d.cycling.offers);
    if (featureFilter === 'dietary') result = result.filter(d => d.dietary?.isSpecialist);
    if (featureFilter === 'b2b') result = result.filter(d => d.model?.includes('B2B'));
    if (featureFilter === 'groups') result = result.filter(d => d.groups?.maxSize >= 50);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specializations.some(s => s.toLowerCase().includes(q)) ||
        d.regions.some(r => r.toLowerCase().includes(q)) ||
        d.differentiator?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [tierFilter, featureFilter, searchQuery]);

  const tierCounts = dmcTiers.map(t => ({
    ...t,
    count: dmcDirectory.filter(d => d.tier === t.tier).length,
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">DMC Directory</h2>
        <p className="text-gray-400 text-sm mt-1">
          {dmcDirectory.length} destination management companies across {dmcTiers.length} tiers — from ultra-luxury boutique to niche specialists
        </p>
      </div>

      <InsightCallout>
        This expanded directory now includes mid-range DMCs, cycling specialists, dietary restriction experts, and MICE operators.
        Each profile includes commission structures, payment terms, cancellation policies, reviews, response times, and day tour availability.
        Use the filters below to find the right DMC for your client's specific needs.
      </InsightCallout>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search DMCs by name, specialization, region..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
        />
      </div>

      {/* Tier Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {tierCounts.map((t) => (
          <button
            key={t.tier}
            onClick={() => setTierFilter(tierFilter === t.tier ? 'all' : t.tier)}
            className={`text-left p-3 rounded-lg border transition-all ${
              tierFilter === t.tier ? 'border-gray-600 bg-gray-800' : 'border-gray-800 bg-gray-900 hover:border-gray-700'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
              <span className="text-[11px] font-medium text-white leading-tight">{t.tier}</span>
            </div>
            <p className="text-lg font-bold text-white">{t.count}</p>
          </button>
        ))}
      </div>

      {/* Feature Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All DMCs', icon: null },
          { key: 'dayTours', label: 'Day Tours', icon: Calendar },
          { key: 'cycling', label: 'Cycling', icon: Bike },
          { key: 'dietary', label: 'Dietary Specialist', icon: Utensils },
          { key: 'b2b', label: 'B2B Partners', icon: Building2 },
          { key: 'groups', label: 'Large Groups (50+)', icon: Users },
        ].map(f => {
          const Icon = f.icon;
          return (
            <button
              key={f.key}
              onClick={() => setFeatureFilter(featureFilter === f.key ? 'all' : f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                featureFilter === f.key ? 'border-rose-500/50 bg-rose-500/10 text-rose-400' : 'border-gray-800 text-gray-400 hover:border-gray-700'
              }`}
            >
              {Icon && <Icon size={12} />}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Filter indicator */}
      {(tierFilter !== 'all' || featureFilter !== 'all' || searchQuery) && (
        <div className="flex items-center gap-2">
          <Filter size={12} className="text-gray-500" />
          <span className="text-xs text-gray-400">
            Showing <span className="text-white font-medium">{filtered.length}</span> of {dmcDirectory.length} DMCs
          </span>
          <button onClick={() => { setTierFilter('all'); setFeatureFilter('all'); setSearchQuery(''); }} className="text-xs text-rose-400 hover:text-rose-300 ml-2">
            Clear all filters
          </button>
        </div>
      )}

      {/* DMC Cards */}
      <div className="space-y-3">
        {filtered.map((dmc) => (
          <DMCCard
            key={dmc.id}
            dmc={dmc}
            isExpanded={expandedId === dmc.id}
            onToggle={() => setExpandedId(expandedId === dmc.id ? null : dmc.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">No DMCs match your current filters.</p>
            <button onClick={() => { setTierFilter('all'); setFeatureFilter('all'); setSearchQuery(''); }} className="text-xs text-rose-400 mt-2">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
