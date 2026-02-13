import React from 'react';
import { Star, ExternalLink, Check, X, ShoppingCart, Shield, MapPin, Calendar } from 'lucide-react';
import { BRAND_COLORS, TIER_COLORS, USE_CASES } from '../data/products';

const ProductDetail = ({ product, details, getAggregateRating, onBack }) => {
  if (!product || !details) return <p className="text-gray-500">Product not found.</p>;

  const agg = getAggregateRating(product.id);
  const brandColor = BRAND_COLORS[product.brand];
  const tierColor = TIER_COLORS[product.tier];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: brandColor }}>
                {product.brand[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100">{product.name}</h2>
                <p className="text-sm text-gray-500">{details.manufacturer}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: tierColor + '20', color: tierColor }}>{product.tier}</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400">{product.displacement_cc}cc</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400">{product.crankcase} crankcase</span>
              {details.madeIn && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {details.madeIn}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-400">${product.price}</p>
            <p className="text-xs text-gray-500 mt-1">MSRP</p>
            {agg.avgStars && (
              <div className="flex items-center gap-1 justify-end mt-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-amber-400">{agg.avgStars}</span>
                <span className="text-xs text-gray-500">({agg.totalReviews.toLocaleString()} reviews, {agg.sources} sources)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Power', value: `${product.power_hp} HP`, sub: `${product.displacement_cc}cc` },
          { label: 'Weight', value: `${product.weight_lbs} lbs`, sub: 'Powerhead only' },
          { label: 'Power/Weight', value: `${product.powerToWeight} HP/lb`, sub: product.powerToWeight >= 0.35 ? 'Excellent' : product.powerToWeight >= 0.3 ? 'Good' : 'Below avg' },
          { label: 'Warranty', value: `${product.warranty_years} year${product.warranty_years > 1 ? 's' : ''}`, sub: details.warranty },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
            <p className="text-xl font-bold text-gray-100 mt-1">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Specs Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Full Specifications</h3>
          <div className="space-y-0">
            {Object.entries(details.specs).map(([key, val], i) => (
              <div key={i} className={`flex justify-between py-2 ${i > 0 ? 'border-t border-gray-800' : ''}`}>
                <span className="text-sm text-gray-400">{key}</span>
                <span className="text-sm text-gray-200 font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Links + Ratings */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-400" /> Where to Buy
            </h3>
            <div className="space-y-3">
              {details.purchaseLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-800 hover:bg-gray-750 rounded-lg p-3 transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-emerald-400 transition-colors">{link.retailer}</p>
                    <p className="text-xs text-gray-500">{link.inStock ? 'In Stock' : 'Check availability'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-emerald-400">${link.price}</span>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {details.ratings && details.ratings.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" /> Ratings
              </h3>
              <div className="space-y-3">
                {details.ratings.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors group">
                    <span className="text-sm text-gray-300">{r.source}</span>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-amber-400">{r.stars}</span>
                      <span className="text-xs text-gray-500">({r.reviewCount?.toLocaleString()})</span>
                      <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pros / Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Pros (from reviews)</h3>
          <ul className="space-y-2">
            {details.prosFromReviews.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-4">Cons (from reviews)</h3>
          <ul className="space-y-2">
            {details.consFromReviews.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Use Case Fit */}
      {product.useCaseRatings && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Use Case Fit</h3>
          <div className="space-y-3">
            {USE_CASES.map(uc => {
              const rating = product.useCaseRatings[uc.key] || 0;
              return (
                <div key={uc.key} className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-40 flex-shrink-0">{uc.label}</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(rating / 5) * 100}%`,
                        backgroundColor: rating >= 4 ? '#22c55e' : rating >= 3 ? '#f59e0b' : '#ef4444',
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-300 w-8 text-right">{rating}/5</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verdict */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Verdict</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{product.verdict}</p>
        {product.highlights && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.highlights.map((h, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20">{h}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
