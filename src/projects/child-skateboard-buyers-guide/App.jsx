import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Filter,
  Heart,
  LayoutDashboard,
  ListChecks,
  MapPin,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Table2,
} from 'lucide-react';
import {
  buyingRules,
  getProduct,
  products,
  recommendations,
  shoeSizeRows,
  sources,
  useCases,
  widthGuidance,
} from './data/products';
import InsightCallout from './components/InsightCallout';

const sections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'fit', label: 'Size & Ride Fit', icon: SlidersHorizontal },
  { id: 'shoe', label: 'Shoe Size Info', icon: Ruler },
  { id: 'compare', label: 'Compare Boards', icon: Table2 },
  { id: 'usecases', label: 'Use Cases', icon: ListChecks },
  { id: 'recommend', label: 'Recommendations', icon: Award },
  { id: 'local', label: 'Vancouver Buying', icon: MapPin },
  { id: 'safety', label: 'Safety Setup', icon: ShieldCheck },
  { id: 'sources', label: 'Sources', icon: BookOpen },
];

const tierStyles = {
  'Best fit': 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
  Budget: 'bg-sky-500/15 text-sky-200 border-sky-500/30',
  Premium: 'bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/30',
  Cruiser: 'bg-amber-500/15 text-amber-200 border-amber-500/30',
};

function scoreProduct(product) {
  return Math.round((product.control * 1.5 + product.safetyFit * 1.5 + product.stability + product.progression + product.cruiseComfort * 0.5) / 5.5 * 10);
}

function SkateboardVisual({ product }) {
  const hue = {
    Magneto: 'from-rose-400 via-amber-300 to-sky-400',
    Element: 'from-red-500 via-orange-400 to-yellow-300',
    Retrospec: 'from-cyan-400 via-blue-500 to-indigo-500',
    Beleev: 'from-pink-400 via-purple-400 to-indigo-500',
    'Santa Cruz': 'from-yellow-300 via-red-500 to-fuchsia-500',
    Globe: 'from-zinc-300 via-zinc-500 to-zinc-700',
    Penny: 'from-teal-300 via-cyan-300 to-lime-300',
    Landyachtz: 'from-emerald-300 via-teal-400 to-blue-500',
  }[product.brand] || 'from-sky-400 to-emerald-400';

  const visualWidth = Math.max(48, Math.min(78, product.width * 8));

  return (
    <div className="flex h-24 items-center justify-center">
      <div className="relative" style={{ width: `${visualWidth}px` }}>
        <div className={`h-20 rounded-full bg-gradient-to-b ${hue} shadow-lg shadow-black/30 ring-1 ring-white/20`} />
        <div className="absolute left-1/2 top-2 h-16 w-2 -translate-x-1/2 rounded-full bg-black/25" />
        <div className="absolute -left-2 top-3 h-4 w-4 rounded-full bg-gray-950 ring-2 ring-gray-500" />
        <div className="absolute -right-2 top-3 h-4 w-4 rounded-full bg-gray-950 ring-2 ring-gray-500" />
        <div className="absolute -left-2 bottom-3 h-4 w-4 rounded-full bg-gray-950 ring-2 ring-gray-500" />
        <div className="absolute -right-2 bottom-3 h-4 w-4 rounded-full bg-gray-950 ring-2 ring-gray-500" />
      </div>
    </div>
  );
}

function StatCard({ label, value, note }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {note && <p className="mt-1 text-xs leading-5 text-gray-400">{note}</p>}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{product.name}</p>
          <p className="text-xs text-gray-500">{product.brand} - {product.category}</p>
        </div>
        <span className={`rounded-full border px-2 py-1 text-[11px] ${tierStyles[product.tier]}`}>
          {product.tier}
        </span>
      </div>
      <SkateboardVisual product={product} />
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-md bg-gray-950/60 p-2">
          <p className="text-gray-500">Width</p>
          <p className="font-semibold text-gray-100">{product.width}"</p>
        </div>
        <div className="rounded-md bg-gray-950/60 p-2">
          <p className="text-gray-500">Wheels</p>
          <p className="font-semibold text-gray-100">{product.wheelSize} mm</p>
        </div>
        <div className="rounded-md bg-gray-950/60 p-2">
          <p className="text-gray-500">Est.</p>
          <p className="font-semibold text-gray-100">${product.priceCad}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-300">{product.bestFor}</p>
      <a
        href={product.buyUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200"
      >
        Check availability <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

function RatingBar({ label, value }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="font-medium text-gray-200">{value}/10</span>
      </div>
      <div className="h-2 rounded-full bg-gray-800">
        <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  );
}

function Overview() {
  const prices = products.map((product) => product.priceCad);
  const best = getProduct(recommendations[0].productId);

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Personal buying guide - Vancouver, Canada
            </div>
            <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Skateboard buyer guide for a shoe-size-2 child
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-300">
              The practical answer is a 7.5-7.75 in wide complete skateboard with a normal double-kick shape.
              It will be easier for smaller feet to steer than an 8.25 in adult deck, and less twitchy than a tiny
              plastic cruiser.
            </p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-950/70 p-4">
            <SkateboardVisual product={best} />
            <p className="text-center text-sm font-semibold text-white">{best.name}</p>
            <p className="mt-1 text-center text-xs text-gray-400">Top default recommendation</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Shortlist" value={`${products.length} boards`} note="Across budget, premium, and cruiser choices." />
        <StatCard label="Sweet spot" value={'7.5-7.75"'} note="Best control range for shoe size 2." />
        <StatCard label="Budget" value={`$${Math.min(...prices)}-$${Math.max(...prices)}`} note="Estimated CAD street-price range." />
        <StatCard label="Decision" value="Complete" note="Ready-to-ride beats custom for a first board." />
      </div>

      <InsightCallout variant="recommendation" title="Bottom line">
        Buy the Magneto Kids Complete if she is new and small-footed. Buy an Element or Santa Cruz 7.75-8.0 in
        complete if she is likely to take lessons, grow quickly, or care about having a core skate brand.
      </InsightCallout>

      <div className="grid gap-4 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

function FitGuide() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Size & Ride Fit</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          The board should match her feet, strength, and first riding environment. Shoe size 2 points to control,
          not maximum speed.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {buyingRules.map((rule) => (
          <div key={rule.title} className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
            <h3 className="font-semibold text-white">{rule.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">{rule.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
        <h3 className="mb-4 font-semibold text-white">Width tradeoff</h3>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="grid items-center gap-3 sm:grid-cols-[180px_1fr_80px]">
              <div className="text-sm text-gray-300">{product.name}</div>
              <div className="h-3 rounded-full bg-gray-800">
                <div
                  className={`h-3 rounded-full ${product.width <= 7.75 ? 'bg-emerald-400' : product.width <= 8.1 ? 'bg-cyan-400' : 'bg-amber-400'}`}
                  style={{ width: `${Math.min(product.width * 10, 100)}%` }}
                />
              </div>
              <div className="text-right text-sm font-medium text-gray-200">{product.width}"</div>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="warning" title="Avoid the tempting mistake">
        A small plastic cruiser looks kid-sized, but the deck can be very narrow and twitchy. For a first board,
        a slightly longer wooden complete is usually calmer and easier to learn on.
      </InsightCallout>
    </section>
  );
}

function ShoeSizeInfo() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Shoe Length vs Skateboard Width</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          This tab is informational only. Kids shoe sizing varies by brand, and the skateboard recommendation should
          come from measured foot length, comfort standing on the board, and how easily she can steer.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Given shoe size" value="2Y" note="Assumed US big-kid/youth size unless measured otherwise." />
        <StatCard label="Approx. foot length" value={'~8.0"'} note="About 203 mm, depending on brand and fit allowance." />
        <StatCard label="Deck target" value={'7.5-7.75"'} note="Control-first width for a smaller beginner." />
      </div>

      <InsightCallout variant="info" title="How to read this">
        Shoe length is the foot measurement front to back. Skateboard width is the deck measurement left to right.
        They are related only indirectly: shoe size tells you how much leverage the rider has over the board.
      </InsightCallout>

      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800 bg-gray-900/70 text-sm">
          <thead className="bg-gray-950/80 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">US kids/youth size</th>
              <th className="px-4 py-3">Approx. foot length</th>
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3">Practical deck-width range</th>
              <th className="px-4 py-3">Sizing note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {shoeSizeRows.map((row) => (
              <tr key={row.size} className={row.size === '2Y' ? 'bg-cyan-500/5' : undefined}>
                <td className="px-4 py-4 font-medium text-white">{row.size}</td>
                <td className="px-4 py-4 text-gray-200">{row.footLength.toFixed(2)} in</td>
                <td className="px-4 py-4 text-gray-200">{row.mm} mm</td>
                <td className="px-4 py-4 text-cyan-200">{row.skateboardWidth}</td>
                <td className="px-4 py-4 text-gray-400">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {widthGuidance.map((item) => (
          <div key={item.label} className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
            <h3 className="font-semibold text-white">{item.label}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">{item.body}</p>
          </div>
        ))}
      </div>

      <InsightCallout variant="recommendation" title="Recommended sizing approach for this child">
        Start by trying a 7.5 or 7.75 in complete. If she feels cramped or is tall for her age, compare it against an
        8.0 in complete. Avoid jumping straight to 8.25 in unless she strongly prefers the wider platform after standing
        on both sizes.
      </InsightCallout>
    </section>
  );
}

function Compare() {
  const [tier, setTier] = useState('All');
  const [sortKey, setSortKey] = useState('score');
  const tiers = ['All', ...Array.from(new Set(products.map((product) => product.tier)))];
  const rows = useMemo(() => {
    return products
      .filter((product) => tier === 'All' || product.tier === tier)
      .sort((a, b) => {
        if (sortKey === 'priceCad') return a.priceCad - b.priceCad;
        if (sortKey === 'width') return a.width - b.width;
        if (sortKey === 'cruiseComfort') return b.cruiseComfort - a.cruiseComfort;
        return scoreProduct(b) - scoreProduct(a);
      });
  }, [tier, sortKey]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-2xl font-semibold text-white">Compare Boards</h2>
          <p className="mt-2 text-sm text-gray-400">Filter by buying tier and sort by the constraint that matters most.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300">
            <Filter className="h-4 w-4 text-gray-500" />
            <select className="bg-transparent outline-none" value={tier} onChange={(event) => setTier(event.target.value)}>
              {tiers.map((item) => <option key={item} className="bg-gray-900">{item}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300">
            <ChevronDown className="h-4 w-4 text-gray-500" />
            <select className="bg-transparent outline-none" value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
              <option className="bg-gray-900" value="score">Best overall fit</option>
              <option className="bg-gray-900" value="priceCad">Lowest price</option>
              <option className="bg-gray-900" value="width">Narrowest width</option>
              <option className="bg-gray-900" value="cruiseComfort">Smoothest cruise</option>
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800 bg-gray-900/70 text-sm">
          <thead className="bg-gray-950/80 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Board</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Width</th>
              <th className="px-4 py-3">Wheels</th>
              <th className="px-4 py-3">Est. CAD</th>
              <th className="px-4 py-3">Fit score</th>
              <th className="px-4 py-3">Buy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {rows.map((product) => (
              <tr key={product.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">{product.verdict}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`rounded-full border px-2 py-1 text-[11px] ${tierStyles[product.tier]}`}>{product.tier}</span>
                </td>
                <td className="px-4 py-4 text-gray-200">{product.width}"</td>
                <td className="px-4 py-4 text-gray-200">{product.wheelSize} mm / {product.wheelHardness}a</td>
                <td className="px-4 py-4 text-gray-200">${product.priceCad}</td>
                <td className="px-4 py-4 text-gray-200">{scoreProduct(product)}</td>
                <td className="px-4 py-4">
                  <a href={product.buyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200">
                    Link <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Use Case Fit</h2>
        <p className="mt-2 text-sm text-gray-400">The best board depends on whether the first month is about balance, cruising, or lessons.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {useCases.map((item) => (
          <div key={item.key} className="rounded-lg border border-gray-800 bg-gray-900/70 p-4">
            <p className="font-semibold text-white">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg border border-gray-800 bg-gray-900/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{product.name}</p>
                <p className="text-xs text-gray-500">{product.bestFor}</p>
              </div>
              <span className="text-lg font-semibold text-cyan-200">{scoreProduct(product)}</span>
            </div>
            <div className="space-y-3">
              <RatingBar label="Stability" value={product.stability} />
              <RatingBar label="Small-foot control" value={product.control} />
              <RatingBar label="Rough-pavement comfort" value={product.cruiseComfort} />
              <RatingBar label="Progression" value={product.progression} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Recommendations() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Recommendations</h2>
        <p className="mt-2 text-sm text-gray-400">A short decision path for the actual purchase.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {recommendations.map((rec) => {
          const product = getProduct(rec.productId);
          return (
            <div key={rec.award} className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cyan-200">{rec.award}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">{rec.reason}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-950 px-2 py-1 text-xs text-gray-300">{product.width}" deck</span>
                    <span className="rounded-full bg-gray-950 px-2 py-1 text-xs text-gray-300">${product.priceCad} est.</span>
                    <span className="rounded-full bg-gray-950 px-2 py-1 text-xs text-gray-300">{product.wheelSize} mm wheels</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <InsightCallout variant="highlight" title="Let her choose the graphic among the right sizes">
        Once you narrow the options to 7.5-7.75 in completes, the graphic matters. A board she loves looking at is
        more likely to get used, and the specs will already be inside the safe range.
      </InsightCallout>
    </section>
  );
}

function LocalBuying() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Vancouver Buying Plan</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          Buy online if the exact kid-size complete is available. Visit a local shop if you want help standing on a
          deck, checking helmet fit, or swapping softer wheels for Vancouver pavement.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
          <h3 className="font-semibold text-white">Best default route</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">Order a 7.75 in kids complete online, then buy safety gear in person if fit is uncertain.</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
          <h3 className="font-semibold text-white">Best local route</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">Call Flatspot or another Vancouver skate shop and ask for a 7.5-7.75 in complete for a child in shoe size 2.</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
          <h3 className="font-semibold text-white">Upgrade route</h3>
          <p className="mt-2 text-sm leading-6 text-gray-300">If sidewalks are rough, ask the shop to fit softer 54-56 mm wheels while keeping the board slow and low.</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
        <h3 className="mb-3 font-semibold text-white">Questions to ask before paying</h3>
        <ul className="space-y-2 text-sm leading-6 text-gray-300">
          <li>Is the deck between 7.5 and 7.75 in wide?</li>
          <li>Are the trucks matched to the deck width, without axles sticking far past the edge?</li>
          <li>Can the shop loosen or tighten trucks for a lighter child?</li>
          <li>Can she stand on it comfortably with both feet without feeling stretched?</li>
          <li>Does the helmet fit level and snug before she rides?</li>
        </ul>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Safety Setup</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          For a child, the protective setup is part of the skateboard purchase, not an optional add-on.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
          <h3 className="font-semibold text-white">Minimum kit</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
            <li>Skate helmet that covers the back of the head</li>
            <li>Wrist guards</li>
            <li>Knee pads</li>
            <li>Elbow pads</li>
            <li>Closed-toe flat shoes with grip</li>
          </ul>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
          <h3 className="font-semibold text-white">First-session rules</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
            <li>Practice on flat, dry, empty pavement.</li>
            <li>Learn stepping off and foot braking before hills.</li>
            <li>Keep trucks slightly tighter for early stability.</li>
            <li>Skip wet pavement, driveways, and street crossings.</li>
            <li>Adult supervises until pushing, turning, and stopping are boring.</li>
          </ul>
        </div>
      </div>

      <InsightCallout variant="warning" title="Helmet note for British Columbia">
        British Columbia requires bicycle helmets, and skateboarding falls into the same practical risk category for
        a child even where local rules differ by setting. Use a properly fitted skate-style helmet every ride.
      </InsightCallout>
    </section>
  );
}

function Sources() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Sources & Methodology</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          Prices are CAD estimates gathered for decision support and should be checked at purchase time. Retail inventory
          changes quickly, especially for specific graphics.
        </p>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-5">
        <h3 className="font-semibold text-white">How boards were scored</h3>
        <p className="mt-2 text-sm leading-6 text-gray-300">
          The fit score weights small-foot control and safety fit most heavily, then stability, progression, and
          rough-pavement comfort. This deliberately favors a calm first board over the fastest cruiser.
        </p>
      </div>

      <div className="space-y-3">
        {sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-gray-800 bg-gray-900/70 p-4 hover:border-cyan-500/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{source.name}</p>
                <p className="mt-1 text-sm leading-6 text-gray-400">{source.note}</p>
              </div>
              <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-500" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [active, setActive] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = {
    overview: <Overview />,
    fit: <FitGuide />,
    shoe: <ShoeSizeInfo />,
    compare: <Compare />,
    usecases: <UseCases />,
    recommend: <Recommendations />,
    local: <LocalBuying />,
    safety: <Safety />,
    sources: <Sources />,
  }[active];

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      <button
        className="fixed left-4 top-4 z-50 rounded-lg border border-gray-700 bg-gray-900 p-2 text-gray-200 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Filter className="h-5 w-5" />
      </button>

      <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-gray-800 bg-gray-900 transition-transform lg:static lg:translate-x-0`}>
        <div className="border-b border-gray-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Child Skateboard Guide</h1>
              <p className="text-xs text-gray-500">Shoe size 2 - Vancouver</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const selected = active === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActive(section.id);
                  setMobileOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  selected ? 'bg-cyan-500/10 text-cyan-200' : 'text-gray-400 hover:bg-gray-800/70 hover:text-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-gray-800 p-5 text-xs leading-5 text-gray-500">
          <p>{products.length} boards compared</p>
          <p>Recommended width: 7.5-7.75 in</p>
          <p>Data checked: July 2026</p>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {content}
        </div>
      </main>
    </div>
  );
}
