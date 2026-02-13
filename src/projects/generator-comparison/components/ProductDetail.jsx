import React from 'react';
import { Star, ExternalLink, Check, X, ChevronLeft, ShoppingCart, Shield, Wrench, MapPin } from 'lucide-react';
import { BRAND_COLORS, TIER_COLORS } from '../data/products';

const StarRating = ({ stars }) => {
  const full = Math.floor(stars);
  const half = stars % 1 >= 0.3;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < full ? 'text-amber-400 fill-amber-400' : i === full && half ? 'text-amber-400 fill-amber-400/50' : 'text-gray-600'}`} />
      ))}
    </div>
  );
};

export default function ProductDetail({ product, details, rating, onBack }) {
  if (!product || !details) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Product details not available.</p>
        <button onClick={onBack} className="mt-4 text-amber-400 hover:underline">Go back</button>
      </div>
    );
  }

  const p = product;
  const d = details;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white"
          style={{ backgroundColor: BRAND_COLORS[p.brand] || '#6b7280' }}>
          {p.brand.charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{d.fullName || p.name}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-sm text-gray-400">{d.manufacturer}</span>
            {d.madeIn && <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{d.madeIn}</span>}
            {d.warranty && <span className="text-xs text-gray-500 flex items-center gap-1"><Shield className="w-3 h-3" />{d.warranty}</span>}
            {d.releaseYear && <span className="text-xs text-gray-500">{d.releaseYear}</span>}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.fuelType === 'Tri-Fuel' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {p.fuelType}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${TIER_COLORS[p.tier]}20`, color: TIER_COLORS[p.tier] }}>
              {p.tier}
            </span>
            {p.inverter && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">Inverter</span>}
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">${p.price.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Lowest available price</p>
        </div>
      </div>

      {/* Aggregate Rating */}
      {rating?.avgStars && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-400">{rating.avgStars}</p>
            <StarRating stars={rating.avgStars} />
          </div>
          <div>
            <p className="text-sm text-gray-300">{rating.totalReviews.toLocaleString()} reviews across {rating.sources} sources</p>
            <p className="text-xs text-gray-500">Weighted average rating</p>
          </div>
        </div>
      )}

      {/* Verdict */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold text-amber-400 mb-1">Verdict</p>
        <p className="text-sm text-gray-300">{p.verdict}</p>
      </div>

      {/* Best For */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold text-emerald-400 mb-1">Best For</p>
        <p className="text-sm text-gray-300">{p.bestFor}</p>
      </div>

      {/* Full Specs Table */}
      {d.specs && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-gray-400" /> Full Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
            {Object.entries(d.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between py-1.5 border-b border-gray-800/50">
                <span className="text-sm text-gray-400">{key}</span>
                <span className="text-sm text-gray-200 font-medium text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ratings Breakdown */}
      {d.ratings && d.ratings.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Ratings by Source</h3>
          <div className="space-y-3">
            {d.ratings.map((r, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">{r.source}</span>
                  <StarRating stars={r.stars} />
                  <span className="text-sm text-amber-400 font-medium">{r.stars}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{r.reviewCount?.toLocaleString()} reviews</span>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pros & Cons from Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {d.prosFromReviews && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wide">Pros (from reviews)</h3>
            <ul className="space-y-2">
              {d.prosFromReviews.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        )}
        {d.consFromReviews && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">Cons (from reviews)</h3>
            <ul className="space-y-2">
              {d.consFromReviews.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Purchase Links */}
      {d.purchaseLinks && d.purchaseLinks.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-gray-400" /> Where to Buy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {d.purchaseLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:border-amber-500/50 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{link.retailer}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-amber-400" />
                </div>
                <p className="text-lg font-bold text-amber-400 mt-1">${link.price.toLocaleString()}</p>
                <span className={`text-xs ${link.inStock ? 'text-emerald-400' : 'text-red-400'}`}>
                  {link.inStock ? 'In Stock' : 'Check Availability'}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Key Highlights */}
      {p.highlights && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Key Highlights</h3>
          <ul className="space-y-1.5">
            {p.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-amber-400">•</span> {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
