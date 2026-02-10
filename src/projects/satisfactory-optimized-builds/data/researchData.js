// ============================================================
// Satisfactory Optimized Builds — Research Data
// Sources: satisfactory-calculator.com, satisfactory.wiki.gg,
//          r/SatisfactoryGame (wrigh516 LP analysis), community guides
// ============================================================

// --- Resource Node Distribution ---
export const resourceNodes = [
  { resource: 'Iron Ore', impure: 39, normal: 42, pure: 46, total: 127, maxExtraction: 92100, color: '#94a3b8' },
  { resource: 'Copper Ore', impure: 13, normal: 29, pure: 13, total: 55, maxExtraction: 36900, color: '#f97316' },
  { resource: 'Limestone', impure: 15, normal: 50, pure: 29, total: 94, maxExtraction: 69900, color: '#fbbf24' },
  { resource: 'Coal', impure: 15, normal: 31, pure: 16, total: 62, maxExtraction: 42300, color: '#374151' },
  { resource: 'Crude Oil', impure: 10, normal: 12, pure: 8, total: 30, maxExtraction: 12600, color: '#1e1b4b' },
  { resource: 'Caterium Ore', impure: 9, normal: 8, pure: 0, total: 17, maxExtraction: 15600, color: '#eab308' },
  { resource: 'Sulfur', impure: 6, normal: 5, pure: 5, total: 16, maxExtraction: 10800, color: '#84cc16' },
  { resource: 'Bauxite', impure: 5, normal: 6, pure: 6, total: 17, maxExtraction: 12300, color: '#dc2626' },
  { resource: 'Raw Quartz', impure: 3, normal: 7, pure: 7, total: 17, maxExtraction: 13500, color: '#e879f9' },
  { resource: 'Uranium', impure: 3, normal: 2, pure: 0, total: 5, maxExtraction: 2100, color: '#22c55e' },
  { resource: 'SAM', impure: 10, normal: 6, pure: 3, total: 19, maxExtraction: 10800, color: '#06b6d4' },
];

// --- Conveyor Belt Throughput ---
export const conveyorBelts = [
  { mark: 'Mk.1', speed: 60, tier: 'Tier 0', color: '#94a3b8' },
  { mark: 'Mk.2', speed: 120, tier: 'Tier 2', color: '#60a5fa' },
  { mark: 'Mk.3', speed: 270, tier: 'Tier 4', color: '#fbbf24' },
  { mark: 'Mk.4', speed: 480, tier: 'Tier 6', color: '#a78bfa' },
  { mark: 'Mk.5', speed: 780, tier: 'Tier 8', color: '#f97316' },
  { mark: 'Mk.6', speed: 900, tier: 'Tier 9', color: '#ef4444' },
];

// --- Miner Output by Purity & Mark ---
export const minerOutput = [
  { miner: 'Mk.1', impure: 30, normal: 60, pure: 120 },
  { miner: 'Mk.2', impure: 60, normal: 120, pure: 240 },
  { miner: 'Mk.3', impure: 120, normal: 240, pure: 480 },
  { miner: 'Mk.3 @250%', impure: 300, normal: 600, pure: 900 },
];

// --- Power Generation Comparison ---
export const powerGeneration = [
  {
    source: 'Biomass Burner',
    mwPerUnit: 30,
    fuelType: 'Solid Biofuel',
    fuelRate: '2.4/min',
    tier: 'Tier 0',
    automated: false,
    mwPerBuilding: 30,
    notes: 'Manual refueling required',
  },
  {
    source: 'Coal Generator',
    mwPerUnit: 75,
    fuelType: 'Coal + Water',
    fuelRate: '15 coal/min + 45 water/min',
    tier: 'Tier 3',
    automated: true,
    mwPerBuilding: 75,
    notes: '8:3 generator-to-water-extractor ratio',
  },
  {
    source: 'Fuel Generator (Fuel)',
    mwPerUnit: 250,
    fuelType: 'Fuel',
    fuelRate: '20 m³/min',
    tier: 'Tier 5',
    automated: true,
    mwPerBuilding: 250,
    notes: 'Standard oil processing',
  },
  {
    source: 'Fuel Generator (Turbofuel)',
    mwPerUnit: 250,
    fuelType: 'Turbofuel',
    fuelRate: '7.5 m³/min',
    tier: 'Tier 5',
    automated: true,
    mwPerBuilding: 250,
    notes: '2.67x more efficient than standard fuel per m³',
  },
  {
    source: 'Fuel Generator (Rocket Fuel)',
    mwPerUnit: 250,
    fuelType: 'Rocket Fuel',
    fuelRate: '4.17 m³/min',
    tier: 'Tier 7',
    automated: true,
    mwPerBuilding: 250,
    notes: 'Requires sulfur processing',
  },
  {
    source: 'Fuel Generator (Ionized Fuel)',
    mwPerUnit: 250,
    fuelType: 'Ionized Fuel',
    fuelRate: '3 m³/min',
    tier: 'Tier 9',
    automated: true,
    mwPerBuilding: 250,
    notes: 'Most fuel-efficient liquid option',
  },
  {
    source: 'Nuclear Power Plant (Uranium)',
    mwPerUnit: 2500,
    fuelType: 'Uranium Fuel Rod',
    fuelRate: '0.2 rods/min',
    tier: 'Tier 8',
    automated: true,
    mwPerBuilding: 2500,
    notes: 'Produces Uranium Waste',
  },
  {
    source: 'Nuclear Power Plant (Plutonium)',
    mwPerUnit: 2500,
    fuelType: 'Plutonium Fuel Rod',
    fuelRate: '0.1 rods/min',
    tier: 'Tier 8',
    automated: true,
    mwPerBuilding: 2500,
    notes: 'From reprocessed uranium waste',
  },
  {
    source: 'Nuclear Power Plant (Ficsonium)',
    mwPerUnit: 2500,
    fuelType: 'Ficsonium Fuel Rod',
    fuelRate: '0.1 rods/min',
    tier: 'Tier 9',
    automated: true,
    mwPerBuilding: 2500,
    notes: 'Zero waste, requires SAM + Ficsonium',
  },
];

// --- Power Efficiency per Oil (MW per crude oil m³/min) ---
export const oilPowerEfficiency = [
  { method: 'Standard Fuel', mwPerOil: 83.3, complexity: 'Low', recipe: 'Default' },
  { method: 'Diluted Fuel', mwPerOil: 166.7, complexity: 'Medium', recipe: 'Alternate' },
  { method: 'Standard Turbofuel', mwPerOil: 222.2, complexity: 'Medium', recipe: 'Alternate' },
  { method: 'Turbo Heavy Fuel', mwPerOil: 333.3, complexity: 'High', recipe: 'Alternate' },
  { method: 'Turbo Blend Fuel', mwPerOil: 400.0, complexity: 'Very High', recipe: 'Alternate' },
];

// --- Overclocking Power Curve ---
export const overclockingData = (() => {
  const data = [];
  for (let clock = 25; clock <= 250; clock += 25) {
    const ratio = clock / 100;
    const powerMultiplier = Math.pow(ratio, 1.321928);
    const efficiency = ratio / powerMultiplier;
    data.push({
      clockSpeed: clock,
      productionMultiplier: parseFloat(ratio.toFixed(2)),
      powerMultiplier: parseFloat(powerMultiplier.toFixed(3)),
      efficiency: parseFloat((efficiency * 100).toFixed(1)),
    });
  }
  return data;
})();

// --- Alternate Recipe Rankings (wrigh516 LP-optimized, 1.0) ---
export const alternateRecipes = {
  S: [
    { name: 'Heavy Oil Residue', score: 100, impact: 'Unlocks 3:1 oil-to-product ratio', category: 'Oil' },
    { name: 'Recycled Plastic', score: 96, impact: '-37% resources for plastic', category: 'Oil' },
    { name: 'Recycled Rubber', score: 92, impact: '-35% resources for rubber', category: 'Oil' },
    { name: 'Compacted Coal', score: 88, impact: 'Enables Turbofuel chain', category: 'Power' },
    { name: 'Diluted Fuel', score: 85, impact: '2x fuel per oil', category: 'Power' },
    { name: 'Electrode Aluminum Scrap', score: 82, impact: '-50% power for aluminum', category: 'Aluminum' },
    { name: 'Sloppy Alumina', score: 80, impact: 'Simpler aluminum pipeline', category: 'Aluminum' },
  ],
  A: [
    { name: 'Turbo Heavy Fuel', score: 76, impact: '4x MW per oil vs default', category: 'Power' },
    { name: 'Steeled Frame', score: 73, impact: 'No screws needed', category: 'Frames' },
    { name: 'Stitched Iron Plate', score: 71, impact: 'No screws needed', category: 'Plates' },
    { name: 'Steel Rotor', score: 69, impact: 'Simpler motor chain', category: 'Motors' },
    { name: 'Fused Quickwire', score: 67, impact: '-40% resources', category: 'Electronics' },
    { name: 'Fused Wire', score: 65, impact: 'Pairs with Fused Quickwire', category: 'Electronics' },
    { name: 'Iron Alloy Ingot', score: 63, impact: 'Saves iron nodes', category: 'Ingots' },
    { name: 'Copper Alloy Ingot', score: 61, impact: 'Pairs with Iron Alloy', category: 'Ingots' },
  ],
  B: [
    { name: 'Solid Steel Ingot', score: 57, impact: 'No coal needed for steel', category: 'Ingots' },
    { name: 'Coke Steel Ingot', score: 55, impact: 'Uses petroleum coke', category: 'Ingots' },
    { name: 'Heavy Encased Frame', score: 53, impact: '-30% buildings for HMF', category: 'Frames' },
    { name: 'Encased Industrial Pipe', score: 51, impact: 'Simpler EIB chain', category: 'Frames' },
    { name: 'Crystal Computer', score: 49, impact: '-25% buildings', category: 'Electronics' },
    { name: 'Caterium Computer', score: 47, impact: 'Alternative computer path', category: 'Electronics' },
    { name: 'Insulated Cable', score: 45, impact: 'Saves copper', category: 'Electronics' },
  ],
  C: [
    { name: 'Steel Screw', score: 40, impact: 'More screws per rod', category: 'Fasteners' },
    { name: 'Cast Screw', score: 38, impact: 'Skip rod step', category: 'Fasteners' },
    { name: 'Steel Rod', score: 36, impact: 'Uses steel ingots', category: 'Fasteners' },
    { name: 'Turbo Blend Fuel', score: 34, impact: 'Best standalone power', category: 'Power' },
    { name: 'Pure Iron Ingot', score: 32, impact: 'Uses water, saves ore', category: 'Ingots' },
    { name: 'Pure Copper Ingot', score: 30, impact: 'Uses water, saves ore', category: 'Ingots' },
  ],
  D: [
    { name: 'Iron Wire', score: 22, impact: 'Uses iron instead of copper', category: 'Electronics' },
    { name: 'Iron Pipe', score: 20, impact: 'Uses iron instead of copper', category: 'Pipes' },
    { name: 'Charcoal', score: 18, impact: 'Wood to coal substitute', category: 'Power' },
    { name: 'Biocoal', score: 16, impact: 'Biomass to coal substitute', category: 'Power' },
  ],
  F: [
    { name: 'Rubber Concrete', score: 8, impact: 'Wastes rubber', category: 'Building' },
    { name: 'Wet Concrete', score: 6, impact: 'Marginal improvement', category: 'Building' },
    { name: 'Fine Concrete', score: 4, impact: 'Negligible benefit', category: 'Building' },
  ],
};

// --- Alternate Recipe Impact Summary ---
export const altRecipeImpact = {
  withoutAlts: {
    power: 85907,
    itemsPerMin: 131675,
    buildings: 2783,
    rawResources: 56286,
  },
  withAlts: {
    power: 70908,
    itemsPerMin: 82383,
    buildings: 1020,
    rawResources: 32458,
  },
};

// --- Common Recipe Pairings ---
export const recipePairings = [
  {
    name: 'Screw Elimination',
    recipes: ['Stitched Iron Plate', 'Steel Rotor', 'Steeled Frame', 'Heavy Encased Frame'],
    benefit: 'Removes screws from production chain entirely',
    savings: '~40% fewer buildings in frame production',
  },
  {
    name: 'Alloy Ingot Combo',
    recipes: ['Copper Alloy Ingot', 'Iron Alloy Ingot'],
    benefit: 'Same ingredients, simple setup, saves on every metric',
    savings: '~20% fewer mining nodes needed',
  },
  {
    name: 'Fused Wire Combo',
    recipes: ['Fused Quickwire', 'Fused Wire'],
    benefit: 'Same ingredients, simple setup',
    savings: '~40% fewer resources for wire/quickwire',
  },
  {
    name: 'Oil Maximizer',
    recipes: ['Heavy Oil Residue', 'Recycled Plastic', 'Recycled Rubber'],
    benefit: '3:1 oil-to-product ratio',
    savings: '~66% less crude oil needed for plastic/rubber',
  },
  {
    name: 'Motor Simplifier',
    recipes: ['Steel Rotor', 'Standard Stator'],
    benefit: 'Same ingredients, simple setup',
    savings: '~30% fewer buildings for motor production',
  },
  {
    name: 'Power Maximizer',
    recipes: ['Compacted Coal', 'Diluted Fuel', 'Turbo Heavy Fuel'],
    benefit: 'Maximum MW per crude oil',
    savings: '4x power output per oil node vs default',
  },
];

// --- Production Building Power Consumption ---
export const buildingPower = [
  { building: 'Smelter', power: 4, tier: 'Tier 0' },
  { building: 'Constructor', power: 4, tier: 'Tier 0' },
  { building: 'Assembler', power: 15, tier: 'Tier 2' },
  { building: 'Foundry', power: 16, tier: 'Tier 3' },
  { building: 'Manufacturer', power: 55, tier: 'Tier 5' },
  { building: 'Refinery', power: 30, tier: 'Tier 5' },
  { building: 'Blender', power: 75, tier: 'Tier 7' },
  { building: 'Particle Accelerator', power: 1500, tier: 'Tier 8' },
  { building: 'Quantum Encoder', power: 2000, tier: 'Tier 9' },
  { building: 'Converter', power: 100, tier: 'Tier 9' },
];

// --- Key Production Ratios (Normal Node, Mk.1 Miner) ---
export const productionRatios = [
  { product: 'Iron Plates', smelters: 2, constructors: 3, inputPerMin: 60, outputPerMin: 40, beltMark: 'Mk.1' },
  { product: 'Iron Rods', smelters: 2, constructors: 4, inputPerMin: 60, outputPerMin: 40, beltMark: 'Mk.1' },
  { product: 'Screws', smelters: 2, constructors: 6, inputPerMin: 60, outputPerMin: 160, beltMark: 'Mk.3' },
  { product: 'Wire', smelters: 2, constructors: 3, inputPerMin: 60, outputPerMin: 90, beltMark: 'Mk.2' },
  { product: 'Cable', smelters: 2, constructors: 1.5, inputPerMin: 60, outputPerMin: 22.5, beltMark: 'Mk.1' },
  { product: 'Concrete', smelters: 0, constructors: 4, inputPerMin: 60, outputPerMin: 60, beltMark: 'Mk.1' },
  { product: 'Steel Ingots', foundries: 2, constructors: 0, inputPerMin: '45 iron + 45 coal', outputPerMin: 45, beltMark: 'Mk.1' },
  { product: 'Steel Beams', foundries: 2, constructors: 3, inputPerMin: 60, outputPerMin: 30, beltMark: 'Mk.1' },
  { product: 'Steel Pipes', foundries: 2, constructors: 3, inputPerMin: 60, outputPerMin: 40, beltMark: 'Mk.1' },
];

// --- Game Progression Tiers ---
export const gameTiers = [
  { tier: 'Tier 0', name: 'Onboarding', power: 'Biomass Burner (30 MW)', keyUnlocks: 'HUB, Portable Miner, Smelter, Constructor', phase: 'Early' },
  { tier: 'Tier 1', name: 'Base Building', power: 'Biomass Burner', keyUnlocks: 'Foundations, Walls, Power Poles', phase: 'Early' },
  { tier: 'Tier 2', name: 'Logistics', power: 'Biomass Burner', keyUnlocks: 'Assembler, Mk.2 Belts, Mk.2 Miner', phase: 'Early' },
  { tier: 'Tier 3', name: 'Coal Power', power: 'Coal Generator (75 MW)', keyUnlocks: 'Coal Generator, Steel, Mk.1 Miner', phase: 'Mid' },
  { tier: 'Tier 4', name: 'Logistics Mk.2', power: 'Coal Generator', keyUnlocks: 'Mk.3 Belts, Hyper Tubes, Vehicles', phase: 'Mid' },
  { tier: 'Tier 5', name: 'Oil Processing', power: 'Fuel Generator (250 MW)', keyUnlocks: 'Fuel Generator, Refinery, Manufacturer', phase: 'Mid' },
  { tier: 'Tier 6', name: 'Industrial', power: 'Fuel Generator', keyUnlocks: 'Mk.4 Belts, Trains, Gas Mask', phase: 'Late' },
  { tier: 'Tier 7', name: 'Bauxite & Sulfur', power: 'Fuel Generator', keyUnlocks: 'Aluminum, Blender, Hover Pack', phase: 'Late' },
  { tier: 'Tier 8', name: 'Nuclear', power: 'Nuclear (2500 MW)', keyUnlocks: 'Nuclear Power Plant, Mk.5 Belts, Mk.3 Miner', phase: 'Late' },
  { tier: 'Tier 9', name: 'Quantum Tech', power: 'Nuclear / Ficsonium', keyUnlocks: 'Quantum Encoder, Mk.6 Belts, SAM processing', phase: 'Endgame' },
];

// --- Coal Power Optimal Setup ---
export const coalSetup = {
  ratio: '8 Generators : 3 Water Extractors',
  coalPerGenerator: 15,
  waterPerGenerator: 45,
  totalCoalFor8: 120,
  totalWaterFor8: 360,
  waterExtractorOutput: 120,
  pipelineMk1Limit: 300,
  totalMW: 600,
  notes: 'Mk.1 pipe can supply 300 m³/min. 3 extractors produce 360 m³/min. Slight oversupply ensures no brownouts.',
};

// --- Nuclear Power Zero-Waste Setup ---
export const nuclearSetup = {
  uraniumPath: {
    steps: [
      'Mine Uranium Ore',
      'Encased Uranium Cell (Manufacturer)',
      'Uranium Fuel Rod (Manufacturer)',
      'Burn in Nuclear Power Plant → 2500 MW',
      'Uranium Waste → Reprocess to Plutonium Pellet',
      'Plutonium Fuel Rod (Manufacturer)',
      'Burn for additional 2500 MW OR Sink',
    ],
    wastePerReactor: '10 Uranium Waste/min at 100%',
    plutoniumWaste: '1 Plutonium Waste/min (must be sunk or stored)',
  },
  ficsoniumPath: {
    steps: [
      'Process SAM in Converter → Ficsonium',
      'Ficsonium Fuel Rod (Manufacturer)',
      'Burn in Nuclear Power Plant → 2500 MW',
      'Zero waste produced',
    ],
    notes: 'Requires Tier 9 unlock, uses SAM resource',
  },
};

// --- Sources ---
export const sources = [
  { id: 1, name: 'Satisfactory Calculator (SCIM)', url: 'https://satisfactory-calculator.com/', type: 'Tool/Database', tier: 'T1' },
  { id: 2, name: 'Official Satisfactory Wiki', url: 'https://satisfactory.wiki.gg/', type: 'Wiki', tier: 'T1' },
  { id: 3, name: 'wrigh516 Alternate Recipe Ranking 1.0 (Reddit)', url: 'https://www.reddit.com/r/SatisfactoryGame/comments/1fekus9/', type: 'Community Analysis', tier: 'T2' },
  { id: 4, name: 'Satisfactory Cheat Sheet', url: 'https://deniszholob.github.io/satisfactory-cheat-sheet/', type: 'Reference', tier: 'T2' },
  { id: 5, name: 'Satisfactory Fandom Wiki', url: 'https://satisfactory.fandom.com/', type: 'Wiki', tier: 'T1' },
  { id: 6, name: 'ONE Esports Alternate Recipe Tier List', url: 'https://www.oneesports.gg/gaming/satisfactory-alternate-recipes-tier-list/', type: 'Guide', tier: 'T2' },
  { id: 7, name: 'Steam Community Guides', url: 'https://steamcommunity.com/app/526870/', type: 'Community', tier: 'T3' },
  { id: 8, name: 'r/SatisfactoryGame Megabase Guide', url: 'https://www.reddit.com/r/SatisfactoryGame/comments/meg8if/', type: 'Community Guide', tier: 'T2' },
  { id: 9, name: '4netplayers Nuclear Power Guide', url: 'https://www.4netplayers.com/en-us/blog/satisfactory/satisfactory-nuclear-power-guide-without-waste/', type: 'Guide', tier: 'T2' },
  { id: 10, name: 'Destructoid Alternate Recipe Tier List', url: 'https://www.destructoid.com/satisfactory-1-0-alternate-recipe-tier-list/', type: 'Guide', tier: 'T2' },
  { id: 11, name: 'Coffee Stain Studios (Game Data)', url: 'https://www.satisfactorygame.com/', type: 'Official', tier: 'T1' },
  { id: 12, name: 'Satisfactory Tools', url: 'https://u4.satisfactorytools.com/', type: 'Tool', tier: 'T2' },
];
