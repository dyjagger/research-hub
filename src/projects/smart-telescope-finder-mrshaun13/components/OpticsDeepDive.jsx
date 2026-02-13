import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter } from 'recharts';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';
import { products, BRAND_COLORS } from '../data/products';

const OpticsDeepDive = () => {
  const apertureData = [...products]
    .sort((a, b) => b.aperture_mm - a.aperture_mm)
    .map(p => ({ name: p.name, aperture: p.aperture_mm, brand: p.brand }));

  const resolutionData = [...products]
    .sort((a, b) => b.resolution_mp - a.resolution_mp)
    .map(p => ({ name: p.name, mp: p.resolution_mp, brand: p.brand }));

  const valueData = [...products]
    .sort((a, b) => a.pricePerAperture - b.pricePerAperture)
    .map(p => ({ name: p.name, value: p.pricePerAperture, brand: p.brand, terrestrial: p.terrestrial_viewing }));

  const mpValueData = [...products]
    .sort((a, b) => b.mpPerThousand - a.mpPerThousand)
    .map(p => ({ name: p.name, value: p.mpPerThousand, brand: p.brand }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Optics & Imaging Deep Dive</h2>
        <p className="text-gray-400 mt-1">Aperture, resolution, and value analysis across all models</p>
      </div>

      <InsightCallout variant="info" title="What Aperture Means For You">
        Aperture (mm) is the single most important spec for a telescope. It determines how much light the scope collects — bigger = brighter images, fainter objects visible, and better detail.
        For terrestrial viewing of the Nashville skyline (1-20 miles), aperture matters less than focal length and sensor resolution.
        For stargazing, aperture is king.
      </InsightCallout>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Aperture Comparison (mm) — More = Better for Stargazing</h3>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={apertureData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#9ca3af" fontSize={11} domain={[0, 170]} unit="mm" />
            <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={10} width={110} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}mm`} />} />
            <Bar dataKey="aperture" name="Aperture (mm)" radius={[0, 4, 4, 0]}>
              {apertureData.map((entry, i) => (
                <Cell key={i} fill={BRAND_COLORS[entry.brand]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Sensor Resolution (MP) — More = Sharper Images</h3>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={resolutionData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#9ca3af" fontSize={11} domain={[0, 14]} unit=" MP" />
            <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={10} width={110} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v} MP`} />} />
            <Bar dataKey="mp" name="Resolution (MP)" radius={[0, 4, 4, 0]}>
              {resolutionData.map((entry, i) => (
                <Cell key={i} fill={BRAND_COLORS[entry.brand]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="highlight" title="The Resolution Paradox">
        The most expensive telescopes don't have the highest resolution sensors! The $4,999 eVscope 2 has 7.7MP while the $549 DWARF 3 has 8MP.
        That's because premium scopes invest in aperture and optics quality, not megapixels. For terrestrial viewing though, resolution matters more — you want sharp detail on those Nashville buildings.
      </InsightCallout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Price per mm of Aperture</h3>
          <p className="text-gray-500 text-xs mb-3">Lower = better value for light-gathering power</p>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={valueData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={11} tickFormatter={v => `$${v}`} />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={9} width={100} />
              <Tooltip content={<CustomTooltip formatter={(v) => `$${v.toFixed(1)}/mm`} />} />
              <Bar dataKey="value" name="$/mm Aperture" radius={[0, 4, 4, 0]}>
                {valueData.map((entry, i) => (
                  <Cell key={i} fill={entry.terrestrial ? '#10b981' : '#6b7280'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-3 h-3 rounded-full bg-emerald-500" /> Terrestrial capable
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-3 h-3 rounded-full bg-gray-500" /> Astronomy only
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Resolution per $1,000</h3>
          <p className="text-gray-500 text-xs mb-3">Higher = more megapixels per dollar spent</p>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={mpValueData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={11} unit=" MP" />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={9} width={100} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v.toFixed(1)} MP/$1K`} />} />
              <Bar dataKey="value" name="MP per $1K" radius={[0, 4, 4, 0]}>
                {mpValueData.map((entry, i) => (
                  <Cell key={i} fill={BRAND_COLORS[entry.brand]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <InsightCallout variant="recommendation" title="Best Value for Your Dual-Use Case">
        The <strong>Seestar S50</strong> ($549) gives you the most aperture per dollar at just $10.98/mm — AND it has Scenery Mode for terrestrial viewing.
        The <strong>DWARF 3</strong> ($549) gives you the most megapixels per dollar at 14.57 MP/$1K — AND has a dedicated VIS filter for daytime photography.
        Both are exceptional values for your porch setup.
      </InsightCallout>
    </div>
  );
};

export default OpticsDeepDive;
