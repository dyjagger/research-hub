import React from 'react';
import { ArrowLeft, ExternalLink, Star, Check, X, ShoppingCart } from 'lucide-react';
import { products, useCaseRatings, BRAND_COLORS } from '../data/products';
import { productDetails, getAggregateRating } from '../data/productDetails';

const useCaseLabels = {
  deepSky: 'Deep Sky',
  moonSun: 'Moon & Sun',
  terrestrial: 'Terrestrial',
  portability: 'Portability',
  astrophoto: 'Astrophotography',
  easeOfUse: 'Ease of Use',
};

const ProductDetail = ({ productId, onBack }) => {
  const product = products.find(p => p.id === productId);
  const detail = productDetails[productId];
  const ratings = useCaseRatings[productId];
  const aggregate = getAggregateRating(productId);

  if (!product || !detail) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Product not found.</p>
        <button onClick={onBack} className="text-cyan-400 hover:text-cyan-300 mt-2 text-sm">← Back to comparison</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to comparison
      </button>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl text-2xl font-bold text-white"
            style={{ backgroundColor: BRAND_COLORS[product.brand] + '33', borderColor: BRAND_COLORS[product.brand], borderWidth: 2 }}>
            {product.brand.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold text-white">{detail.fullName}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
              <span>{detail.manufacturer}</span>
              {detail.madeIn && <span>· Made in {detail.madeIn}</span>}
              {detail.warranty && <span>· {detail.warranty}</span>}
              {detail.releaseYear && <span>· Released {detail.releaseYear}</span>}
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-3xl font-bold text-emerald-400">${product.price.toLocaleString()}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                product.tier === 'Budget' ? 'bg-gray-700 text-gray-300' :
                product.tier === 'Mid-Range' ? 'bg-amber-900/50 text-amber-300' :
                'bg-red-900/50 text-red-300'
              }`}>{product.tier}</span>
              {product.terrestrial_viewing
                ? <span className="text-xs bg-emerald-900/40 text-emerald-400 px-2 py-0.5 rounded-full">✅ Terrestrial Viewing</span>
                : <span className="text-xs bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full">❌ No Terrestrial Mode</span>}
            </div>
          </div>
        </div>

        {aggregate.avgStars && (
          <div className="flex items-center gap-2 mt-4 bg-gray-800/60 rounded-lg px-3 py-2 w-fit">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-white font-bold">{aggregate.avgStars}</span>
            <span className="text-gray-400 text-xs">/ 5</span>
            {aggregate.totalReviews > 0 && (
              <span className="text-gray-500 text-xs">({aggregate.totalReviews.toLocaleString()} reviews across {aggregate.sources} sources)</span>
            )}
          </div>
        )}
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Full Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {Object.entries(detail.specs).map(([key, val]) => (
            <div key={key} className="flex justify-between py-1.5 border-b border-gray-800">
              <span className="text-xs text-gray-400">{key}</span>
              <span className="text-xs text-gray-200 font-medium text-right">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {detail.ratings?.length > 0 && (
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Ratings Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {detail.ratings.map((r, i) => (
              <div key={i} className="bg-gray-800/60 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300 font-medium">{r.source}</span>
                  {r.stars && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-white font-bold">{r.stars}</span>
                    </div>
                  )}
                </div>
                {r.reviewCount && <p className="text-[10px] text-gray-500 mt-0.5">{r.reviewCount.toLocaleString()} reviews</p>}
                {r.url && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 mt-1">
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {detail.prosFromReviews?.length > 0 && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-400 mb-3">Pros (from reviews)</h3>
            <ul className="space-y-1.5">
              {detail.prosFromReviews.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        )}
        {detail.consFromReviews?.length > 0 && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-400 mb-3">Cons (from reviews)</h3>
            <ul className="space-y-1.5">
              {detail.consFromReviews.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {ratings && (
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Use Case Fit</h3>
          <div className="space-y-2">
            {Object.entries(useCaseLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-28 flex-shrink-0">{label}</span>
                <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      ratings[key] >= 4 ? 'bg-emerald-500' :
                      ratings[key] >= 3 ? 'bg-amber-500' :
                      ratings[key] >= 2 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(ratings[key] / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-8 text-right">{ratings[key]}/5</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {detail.purchaseLinks?.length > 0 && (
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Where to Buy</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {detail.purchaseLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/60 border border-gray-600 hover:border-cyan-600 rounded-lg px-4 py-3 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-medium group-hover:text-cyan-300">{link.retailer}</span>
                  <ShoppingCart className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-lg font-bold text-emerald-400">${link.price.toLocaleString()}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${link.inStock ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'}`}>
                    {link.inStock ? 'In Stock' : 'Pre-order'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {product.verdict && (
        <div className="bg-cyan-950/40 border border-cyan-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-cyan-300 mb-2">Verdict</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{product.verdict}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
