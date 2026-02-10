// Beyond All Reason — Optimized 4-Player Team vs Raptors (Hardest Difficulty)
// Research data compiled from community guides, official BAR docs, and player strategies

// ─── Difficulty Settings ───
export const difficultySettings = [
  { difficulty: 'Easy', gracePeriod: '12 min', waveInterval: '~90s', queenHP: '~150K', aggroMultiplier: '0.5x', specialRatio: '10%', airRatio: '10%' },
  { difficulty: 'Normal', gracePeriod: '11 min', waveInterval: '~75s', queenHP: '~300K', aggroMultiplier: '1.0x', specialRatio: '15%', airRatio: '15%' },
  { difficulty: 'Hard', gracePeriod: '10 min', waveInterval: '~60s', queenHP: '~500K', aggroMultiplier: '1.5x', specialRatio: '20%', airRatio: '20%' },
  { difficulty: 'Epic', gracePeriod: '9 min', waveInterval: '~45s', queenHP: '~800K', aggroMultiplier: '2.0x', specialRatio: '25%', airRatio: '25%' },
  { difficulty: 'Survival', gracePeriod: '8 min', waveInterval: '~30s', queenHP: '~1.2M', aggroMultiplier: '3.0x', specialRatio: '25%', airRatio: '25%' },
];

// ─── Aggro Mechanics ───
export const aggroMechanics = {
  description: 'Raptors target players based on energy production. Higher energy = more waves directed at you.',
  rules: [
    { rule: 'T1 Energy Buildings', weight: '1x aggro per energy unit', note: 'Solar, T1 Wind — low profile' },
    { rule: 'T2 Energy Buildings', weight: '4x aggro per energy unit', note: 'T2 Wind counts as 4x despite being efficient' },
    { rule: 'Fusion Reactors', weight: '4x aggro per energy unit', note: 'Draws massive aggro — AVOID in Raptors' },
    { rule: 'AFUS (T3 Fusion)', weight: '4x aggro per energy unit', note: 'Only build after 50K+ energy/sec established' },
    { rule: 'Energy Converters', weight: 'No direct aggro', note: 'Convert energy to metal without drawing extra waves' },
  ],
  keyInsight: 'Fusions draw 4x raptor aggro for the energy they produce. T2 Wind is the meta energy source because it produces massive energy with lower aggro weight per structure spread across many buildings.',
};

// ─── 4 Player Team Roles ───
export const teamRoles = [
  {
    id: 'economy',
    name: 'Economy Lead',
    color: '#f59e0b',
    icon: 'Coins',
    faction: 'Either (Armada slightly preferred)',
    priority: 'Critical — feeds the entire team',
    summary: 'Builds the massive energy and metal infrastructure that powers all 4 players. Focuses on T2 Wind farms, energy converters, and metal reclaim. Distributes resources via overflow.',
    responsibilities: [
      'Build 25+ T1 Wind → transition to T2 Wind farms (target 50K energy/sec)',
      'Spam T1 Energy Converters (50+ minimum) for metal generation',
      'Build T2 and T3 Energy Converters as economy scales',
      'Place Con Turrets (T1 → T2 → T3) to automate construction',
      'Reclaim raptor corpses for metal via frontline Con Turrets',
      'Build T3 AFUS only after 50K+ energy/sec milestone',
      'Avoid Fusion Reactors — they draw 4x raptor aggro',
    ],
    buildOrder: [
      { time: '0:00', action: 'Commander builds Vehicle Lab', priority: 'critical' },
      { time: '0:30', action: '4x Construction Vehicles from lab', priority: 'critical' },
      { time: '1:00', action: '5x5 T1 Wind grid (use commander drone)', priority: 'high' },
      { time: '2:00', action: '2x2 T1 Con Turrets + 2 E Storage + 1 M Storage', priority: 'high' },
      { time: '3:00', action: '5x10 T1 Energy Converters (2 con vehicles)', priority: 'high' },
      { time: '4:00', action: 'T2 Vehicle Lab → 4x T2 Con Vehicles', priority: 'critical' },
      { time: '5:00', action: '6x T1 Con Turrets → spam T2 Wind (2x T2 cons)', priority: 'high' },
      { time: '6:00', action: '4x T1 Con Turrets → spam T2 Energy Converters', priority: 'high' },
      { time: '7:00', action: 'Reclaim vehicle lab. Continue T2 Wind + T2 E Converters', priority: 'medium' },
      { time: '10:00', action: 'Milestone: 20K energy/sec → start T2 Con Turrets', priority: 'high' },
      { time: '15:00', action: 'Milestone: 50K energy/sec → build T3 Air Lab for T3 Con', priority: 'high' },
      { time: '20:00', action: 'Build T3 AFUS (90K metal version) with 10+ T2 Con Turrets', priority: 'medium' },
      { time: '25:00+', action: 'T3 Con Turrets, scale infinitely', priority: 'medium' },
    ],
    keyMetrics: { targetEnergy: '50K+/sec', targetMetal: '5K+/sec', conTurrets: '30-50+', windFarms: '200+ T2 Wind' },
  },
  {
    id: 'frontline',
    name: 'Frontline Defense',
    color: '#ef4444',
    icon: 'Shield',
    faction: 'Cortex preferred (Bulwarks, Dragon\'s Maw)',
    priority: 'Critical — the wall that holds',
    summary: 'Builds and maintains the primary defensive line. Creates layered kill zones with walls, turrets, popup defenses, and shield generators. Keeps Con Turrets behind the line for auto-repair.',
    responsibilities: [
      'Build Dragon\'s Teeth / Fortification Walls to funnel raptors',
      'Create kill zones with gaps in walls for turret fire',
      'Layer defenses: T1 lasers → Beamers → Pulsars/Bulwarks → Epic turrets',
      'Place popup turrets (Dragon\'s Claw / Dragon\'s Maw) in walls',
      'Build Con Turrets behind defense line (4-8 for auto-repair)',
      'Deploy Keeper/Overseer shields to block raptor artillery',
      'Expand defensive perimeter as economy grows',
    ],
    buildOrder: [
      { time: '0:00', action: 'Commander assists Economy Lead initially', priority: 'high' },
      { time: '2:00', action: 'Build Vehicle Lab → 4x Con Vehicles', priority: 'critical' },
      { time: '3:00', action: 'Scout map edges — identify raptor approach paths', priority: 'high' },
      { time: '5:00', action: 'Begin Dragon\'s Teeth walls with gaps for turrets', priority: 'critical' },
      { time: '6:00', action: 'T1 Laser Towers (Sentry/Guard) at wall gaps', priority: 'high' },
      { time: '7:00', action: 'Beamers behind T1 turrets (higher DPS, more range)', priority: 'high' },
      { time: '8:00', action: 'T2 Vehicle Lab → T2 Con Vehicles', priority: 'high' },
      { time: '9:00', action: 'Popup turrets in wall line (Dragon\'s Claw / Pit Bull)', priority: 'high' },
      { time: '10:00', action: '4-8 Con Turrets behind defense line for auto-repair', priority: 'critical' },
      { time: '12:00', action: 'Fortification Walls (T2) — 4x HP of Dragon\'s Teeth', priority: 'high' },
      { time: '15:00', action: 'Pulsars (Armada) or Bulwarks (Cortex) behind front line', priority: 'critical' },
      { time: '18:00', action: 'Keeper/Overseer shield generators over turret clusters', priority: 'high' },
      { time: '20:00+', action: 'Rattlesnakes (cloaked popup artillery) for depth', priority: 'medium' },
    ],
    keyMetrics: { wallLength: '2000+ DT/Walls', turrets: '40-60+', shields: '6-10 Keepers/Overseers', conTurrets: '8-12 repair' },
  },
  {
    id: 'antiair',
    name: 'Anti-Air Specialist',
    color: '#3b82f6',
    icon: 'Plane',
    faction: 'Either (Armada has Mercury, Cortex has Screamer)',
    priority: 'High — air waves are lethal if unchecked',
    summary: 'Dedicated to countering raptor air waves, especially the devastating Elemental Bombers. Builds layered AA from light missiles to heavy flak to long-range interceptors. Also assists with general defense.',
    responsibilities: [
      'Build T1 AA (Nettle/Thistle) early for scout/light air coverage',
      'Transition to SAMs / Eradicators for medium-range AA',
      'Build Flak turrets (Arbalest/Birdshot) for area denial',
      'Deploy Mercury/Screamer long-range AA missiles',
      'Cover ALL approach angles — air raptors attack from any direction',
      'Assist frontline with secondary ground turrets',
      'Build AA in depth — not just at the front line',
    ],
    buildOrder: [
      { time: '0:00', action: 'Commander assists Economy Lead initially', priority: 'high' },
      { time: '3:00', action: 'Build Vehicle Lab → 4x Con Vehicles', priority: 'high' },
      { time: '5:00', action: '3-4 Nettle/Thistle T1 AA towers at defense perimeter', priority: 'high' },
      { time: '7:00', action: 'Ferret/SAM popup AA batteries at key positions', priority: 'high' },
      { time: '9:00', action: 'T2 Vehicle Lab → T2 Con Vehicles', priority: 'high' },
      { time: '10:00', action: 'Chainsaw/Eradicator medium-range AA behind front', priority: 'high' },
      { time: '12:00', action: 'Flak turrets (Arbalest/Birdshot) — 4-6 spread across base', priority: 'critical' },
      { time: '15:00', action: 'Mercury/Screamer long-range AA (2-3 units)', priority: 'critical' },
      { time: '18:00', action: 'Second layer of Flak deeper in base', priority: 'high' },
      { time: '20:00', action: 'Additional Mercury/Screamer for full map AA coverage', priority: 'high' },
      { time: '25:00+', action: 'Saturate all gaps — AA should cover every angle', priority: 'medium' },
    ],
    keyMetrics: { t1AA: '6-8 Nettles', flak: '8-12 Arbalest/Birdshot', longRange: '4-6 Mercury/Screamer', coverage: '360 degrees' },
  },
  {
    id: 'heavy',
    name: 'Heavy Weapons / Queen Killer',
    color: '#a855f7',
    icon: 'Crosshair',
    faction: 'Cortex preferred (Juggernaut is king)',
    priority: 'Critical for endgame — kills the Queen',
    summary: 'Builds the heavy firepower needed to survive late waves and ultimately kill the Raptor Queen. Focuses on LRPCs, Pulsars/Bulwarks, and T3 Experimentals. The endgame win condition.',
    responsibilities: [
      'Build Pulsars (10K+ damage bursts) and Bulwarks (multi-weapon towers)',
      'Construct LRPCs (Basilica/Basilisk) for long-range bombardment',
      'Build T3 Experimental Gantry → Juggernauts or Titans',
      'Coordinate queen kill timing with team',
      'Build Rattlesnakes for cloaked artillery support',
      'Assist frontline defense with heavy turrets during mid-game',
      'Stockpile T3 units — need multiple Juggernauts/Titans for queen',
    ],
    buildOrder: [
      { time: '0:00', action: 'Commander assists Economy Lead initially', priority: 'high' },
      { time: '5:00', action: 'Build Vehicle Lab → Con Vehicles (assist defense)', priority: 'high' },
      { time: '8:00', action: 'T2 Vehicle Lab → T2 Con Vehicles', priority: 'high' },
      { time: '10:00', action: 'First Pulsars/Bulwarks behind frontline', priority: 'critical' },
      { time: '15:00', action: 'Rattlesnakes (cloaked popup artillery)', priority: 'high' },
      { time: '18:00', action: 'First LRPC (Basilica/Basilisk)', priority: 'high' },
      { time: '20:00', action: 'T3 Air Lab → T3 Constructor', priority: 'critical' },
      { time: '22:00', action: 'Experimental Gantry construction begins', priority: 'critical' },
      { time: '25:00', action: 'First Juggernaut/Titan rolls out', priority: 'critical' },
      { time: '28:00', action: 'Second Juggernaut/Titan + more LRPCs', priority: 'high' },
      { time: '30:00+', action: 'Stockpile 3-4 T3 units for queen fight', priority: 'critical' },
    ],
    keyMetrics: { pulsars: '4-6', lrpcs: '2-4', t3Units: '3-4 Juggernauts/Titans', bulwarks: '4-6' },
  },
];

// ─── Defense Layout Data ───
export const defenseLayout = {
  layers: [
    {
      name: 'Outer Wall',
      depth: 1,
      structures: ['Dragon\'s Teeth (dense)', 'Light Mines', 'Dragon\'s Claw popups'],
      purpose: 'Slow and funnel raptors into kill zones. Mines soften first wave.',
      color: '#6b7280',
    },
    {
      name: 'Kill Zone',
      depth: 2,
      structures: ['Sentry/Guard lasers', 'Beamers', 'Overwatch/Warden towers'],
      purpose: 'Primary DPS layer. Concentrated fire on funneled raptors.',
      color: '#ef4444',
    },
    {
      name: 'Heavy Line',
      depth: 3,
      structures: ['Pulsars/Bulwarks', 'Rattlesnakes', 'Pit Bull/Scorpion popups'],
      purpose: 'High-damage backup. Pulsars one-shot most T2 raptors.',
      color: '#f59e0b',
    },
    {
      name: 'Shield Layer',
      depth: 4,
      structures: ['Keeper/Overseer shields', 'Con Turrets (repair)', 'Flak AA'],
      purpose: 'Deflects raptor artillery. Con Turrets auto-repair damaged structures.',
      color: '#3b82f6',
    },
    {
      name: 'Deep Defense',
      depth: 5,
      structures: ['LRPCs', 'Mercury/Screamer AA', 'Additional shields'],
      purpose: 'Long-range fire support. Hits raptors before they reach walls.',
      color: '#a855f7',
    },
  ],
  wallDesign: {
    description: 'Build walls with deliberate gaps. Raptors funnel through gaps into concentrated turret fire. Never build a solid wall — raptors will break through the weakest point randomly.',
    gapSpacing: 'Every 8-10 Dragon\'s Teeth, leave a 2-unit gap',
    behindGaps: 'Stack 2-3 turret types at each gap for overlapping fire',
  },
};

// ─── Unit Tier List for Raptors ───
export const unitTierList = [
  // S Tier - Essential
  { name: 'Pulsar', faction: 'Armada', tier: 'T2', type: 'Defense', rating: 'S', hp: 6100, dps: 1091, range: 1400, cost: '3200M 32000E', role: 'Anti-heavy. 10K+ damage bursts destroy T2/T3 raptors.', raptorRating: 10 },
  { name: 'Bulwark', faction: 'Cortex', tier: 'T2', type: 'Defense', rating: 'S', hp: 9400, dps: 1513, range: 900, cost: '4200M 42000E', role: 'Multi-weapon tower. 4500 damage main gun + 2 secondary lasers.', raptorRating: 10 },
  { name: 'Juggernaut', faction: 'Cortex', tier: 'T3', type: 'Bot', rating: 'S', hp: 149000, dps: 4187, range: 800, cost: '22000M 220000E', role: 'Queen killer. Most powerful land unit. Immune to EMP.', raptorRating: 10 },
  { name: 'T2 Wind Generator', faction: 'Both', tier: 'T2', type: 'Economy', rating: 'S', hp: 400, dps: 0, range: 0, cost: '200M 1500E', role: 'Meta energy source. Low aggro per energy. Spam hundreds.', raptorRating: 10 },
  { name: 'Con Turret (T1/T2)', faction: 'Both', tier: 'T1-T2', type: 'Economy', rating: 'S', hp: 1500, dps: 0, range: 0, cost: '500-1500M', role: 'Auto-builds and auto-repairs. Essential for scaling.', raptorRating: 10 },

  // A Tier - Very Strong
  { name: 'Titan', faction: 'Armada', tier: 'T3', type: 'Bot', rating: 'A', hp: 69000, dps: 1452, range: 700, cost: '16000M 160000E', role: 'Versatile assault mech. Good queen damage but less than Jugg.', raptorRating: 9 },
  { name: 'Beamer', faction: 'Armada', tier: 'T1', type: 'Defense', rating: 'A', hp: 1200, dps: 280, range: 500, cost: '350M 3500E', role: 'Beam laser turret. Excellent early-mid game DPS.', raptorRating: 9 },
  { name: 'Keeper', faction: 'Armada', tier: 'T2', type: 'Defense', rating: 'A', hp: 3550, dps: 0, range: 0, cost: '2000M 20000E', role: 'Plasma deflector shield. Blocks raptor artillery.', raptorRating: 9 },
  { name: 'Overseer', faction: 'Cortex', tier: 'T2', type: 'Defense', rating: 'A', hp: 3800, dps: 0, range: 0, cost: '2200M 22000E', role: 'Shield generator. Deflects plasma. Energy-hungry.', raptorRating: 9 },
  { name: 'Arbalest/Birdshot', faction: 'Both', tier: 'T2', type: 'AA', rating: 'A', hp: 2200, dps: 450, range: 800, cost: '1200M 12000E', role: 'Flak AA. Area damage destroys raptor air swarms.', raptorRating: 9 },
  { name: 'Dragon\'s Teeth', faction: 'Both', tier: 'T1', type: 'Wall', rating: 'A', hp: 2000, dps: 0, range: 0, cost: '10M', role: 'Cheap walls. Funnel raptors into kill zones.', raptorRating: 9 },
  { name: 'Energy Converter (T1)', faction: 'Both', tier: 'T1', type: 'Economy', rating: 'A', hp: 400, dps: 0, range: 0, cost: '20M 200E', role: 'Converts energy to metal. Build 50+ minimum.', raptorRating: 9 },

  // B Tier - Strong
  { name: 'Mercury/Screamer', faction: 'Both', tier: 'T2', type: 'AA', rating: 'B', hp: 3000, dps: 350, range: 2400, cost: '2500M 25000E', role: 'Long-range AA missiles. Kills air before it arrives.', raptorRating: 8 },
  { name: 'Rattlesnake', faction: 'Armada', tier: 'T2', type: 'Defense', rating: 'B', hp: 1800, dps: 200, range: 900, cost: '1500M 15000E', role: 'Cloaked popup artillery. Surprise damage.', raptorRating: 8 },
  { name: 'Basilica/Basilisk', faction: 'Both', tier: 'T2', type: 'Defense', rating: 'B', hp: 5000, dps: 300, range: 6000, cost: '5000M 50000E', role: 'LRPC. Hits raptors across the map. Good vs queen.', raptorRating: 8 },
  { name: 'Fortification Wall', faction: 'Both', tier: 'T2', type: 'Wall', rating: 'B', hp: 7500, dps: 0, range: 0, cost: '100M 500E', role: 'T2 walls. 4x HP of Dragon\'s Teeth. Stops T2 raptors.', raptorRating: 8 },
  { name: 'Dragon\'s Maw', faction: 'Cortex', tier: 'T1', type: 'Defense', rating: 'B', hp: 1400, dps: 320, range: 350, cost: '400M 4000E', role: 'Popup flamethrower. AoE decimates raptor swarms.', raptorRating: 8 },
  { name: 'Behemoth', faction: 'Cortex', tier: 'T3', type: 'Bot', rating: 'B', hp: 80000, dps: 2800, range: 600, cost: '18000M 180000E', role: 'Mobile heavy cannon. Slower but devastating DPS.', raptorRating: 7 },

  // C Tier - Situational
  { name: 'Sentry/Guard', faction: 'Both', tier: 'T1', type: 'Defense', rating: 'C', hp: 800, dps: 120, range: 400, cost: '150M 1500E', role: 'Basic laser tower. Good early, outscaled by mid-game.', raptorRating: 6 },
  { name: 'Nettle/Thistle', faction: 'Both', tier: 'T1', type: 'AA', rating: 'C', hp: 500, dps: 80, range: 600, cost: '100M 1000E', role: 'Basic AA. Needed early but replaced by Flak/Mercury.', raptorRating: 6 },
  { name: 'Gauntlet/Agitator', faction: 'Both', tier: 'T1', type: 'Defense', rating: 'C', hp: 1500, dps: 150, range: 600, cost: '600M 6000E', role: 'Plasma artillery tower. Decent area damage.', raptorRating: 5 },
];

// ─── Raptor Wave Composition ───
export const raptorWaves = {
  groundTypes: [
    { name: 'Basic Raptors', tier: 'T1', threat: 'Low', description: 'Fast, swarming ground units. Countered by laser turrets and walls.', appearsAt: 'Wave 1+', counter: 'Sentry/Guard + Dragon\'s Teeth' },
    { name: 'Armored Raptors', tier: 'T2', threat: 'Medium', description: 'Tougher ground units that can break through T1 walls.', appearsAt: 'Wave 5+', counter: 'Beamers + Fortification Walls' },
    { name: 'Special Raptors', tier: 'T2+', threat: 'High', description: 'Includes artillery raptors that bombard from range.', appearsAt: 'Wave 8+', counter: 'Shields + Pulsars/Bulwarks' },
    { name: 'Matriarchs', tier: 'T3', threat: 'Very High', description: 'Mini-boss units. Extremely tanky. Can spawn in special waves.', appearsAt: 'Wave 12+', counter: 'Pulsars + focused fire from multiple turrets' },
    { name: 'Raptor Queen', tier: 'Boss', threat: 'Extreme', description: 'Final boss. Massive HP pool. Walks through defenses. Must be killed to win.', appearsAt: '100% Rage', counter: 'Juggernauts + LRPCs + everything' },
  ],
  airTypes: [
    { name: 'Scout Flyers', tier: 'T1', threat: 'Low', description: 'Fast air scouts. Can slip past defenses if AA is sparse.', appearsAt: 'Wave 3+', counter: 'Nettle/Thistle' },
    { name: 'Raptor Bombers', tier: 'T2', threat: 'High', description: 'Bombing runs on structures. Can devastate unshielded turrets.', appearsAt: 'Wave 6+', counter: 'Flak + SAMs' },
    { name: 'Elemental Bombers', tier: 'T2+', threat: 'Very High', description: 'Special bombers with devastating AoE. The most dangerous air threat.', appearsAt: 'Wave 10+', counter: 'Mercury/Screamer + dense Flak' },
    { name: 'Paralyzing Bombers', tier: 'T2+', threat: 'High', description: 'EMP-style bombers that disable structures temporarily.', appearsAt: 'Wave 8+', counter: 'Layered AA — need to kill before they reach base' },
  ],
  waveScaling: [
    { wave: '1-3', groundStrength: 15, airStrength: 0, specialChance: 0, description: 'Early waves — basic ground only' },
    { wave: '4-6', groundStrength: 35, airStrength: 15, specialChance: 10, description: 'Air begins. Light pressure.' },
    { wave: '7-10', groundStrength: 55, airStrength: 30, specialChance: 20, description: 'Mid-game ramp. Artillery raptors appear.' },
    { wave: '11-15', groundStrength: 75, airStrength: 50, specialChance: 25, description: 'Heavy waves. Matriarchs possible.' },
    { wave: '16-20', groundStrength: 90, airStrength: 70, specialChance: 25, description: 'Late game. Full composition waves.' },
    { wave: '20+', groundStrength: 100, airStrength: 85, specialChance: 25, description: 'Max intensity until queen spawns.' },
  ],
};

// ─── Queen Kill Strategy ───
export const queenStrategy = {
  queenStats: {
    hp: '~800K-1.2M (Epic/Survival)',
    speed: 'Slow but unstoppable — walks through walls and turrets',
    damage: 'Devastating melee + ranged attacks. One-shots most structures.',
    armor: 'Extremely high. Resists most T1/T2 damage.',
    weakness: 'Focused fire from T3 units + LRPCs + Pulsars',
  },
  killComposition: [
    { unit: 'Juggernauts', count: '3-4', dpsContribution: 45, role: 'Primary damage dealers. Tank queen hits. 4187 DPS each.' },
    { unit: 'LRPCs', count: '2-4', dpsContribution: 20, role: 'Constant bombardment from safety. 300 DPS each at 6000 range.' },
    { unit: 'Pulsars', count: '4-6', dpsContribution: 25, role: '10K+ damage bursts at 1400 range. Fire over other structures.' },
    { unit: 'Bulwarks', count: '4-6', dpsContribution: 10, role: 'Multi-weapon support fire. 4500 damage main gun.' },
  ],
  tactics: [
    'Do NOT destroy all raptor burrows — this triggers early queen spawn before you\'re ready',
    'Let the rage bar fill naturally to 100% while you build up T3 forces',
    'Position Juggernauts/Titans in a semicircle at the expected queen approach path',
    'LRPCs should start firing as soon as queen is visible on radar',
    'Pulsars behind the T3 units provide devastating burst damage',
    'Keep Con Turrets nearby to repair T3 units during the fight',
    'All 4 players should contribute firepower during the queen fight',
    'Have backup Juggernauts queued — the fight can be long on Epic difficulty',
  ],
};

// ─── Economy Milestones ───
export const economyMilestones = [
  { time: '5 min', energy: 2000, metal: 50, phase: 'T1 Setup', description: 'T1 Wind + Solar running. First Con Turrets placed.' },
  { time: '8 min', energy: 5000, metal: 150, phase: 'T1 Peak', description: 'T1 economy maxed. T2 lab building. First defenses up.' },
  { time: '12 min', energy: 15000, metal: 500, phase: 'T2 Transition', description: 'T2 Wind farms expanding. T2 Con Turrets automating.' },
  { time: '16 min', energy: 30000, metal: 1500, phase: 'T2 Peak', description: 'Massive T2 Wind. Energy converters producing metal.' },
  { time: '20 min', energy: 50000, metal: 3000, phase: 'T3 Transition', description: 'T3 Air Lab built. AFUS construction begins.' },
  { time: '25 min', energy: 80000, metal: 5000, phase: 'T3 Active', description: 'Experimental Gantry online. First T3 units building.' },
  { time: '30 min', energy: 120000, metal: 8000, phase: 'Late Game', description: 'Full T3 economy. Multiple Juggernauts/Titans.' },
  { time: '35+ min', energy: 200000, metal: 15000, phase: 'Endgame', description: 'Queen fight preparation. Maximum firepower.' },
];

// ─── Map Recommendations ───
export const mapRecommendations = [
  { name: 'Requiem', players: '3-4', type: 'Asymmetric Fortress', rating: 5, description: 'Pre-built fortress walls. Excellent for learning Raptors. Natural chokepoints.', pros: ['Natural walls reduce early pressure', 'Clear defense zones', 'Good metal spots'], cons: ['Limited expansion room', 'Can feel cramped with 4 players'] },
  { name: 'Raptor Crater', players: '4-8', type: 'Circular Defense', rating: 4, description: 'Large crater map designed for Raptors. 360-degree defense needed.', pros: ['Designed for PvE', 'Lots of metal', 'Room for all 4 players'], cons: ['Must defend all directions', 'Requires more AA coverage'] },
  { name: 'Supreme Isthmus', players: '2-4', type: 'Narrow Chokepoint', rating: 5, description: 'Narrow land bridge creates natural chokepoint. Ideal for concentrated defense.', pros: ['One main chokepoint to defend', 'Easy to wall off', 'Efficient turret placement'], cons: ['Limited flanking options', 'Can be overwhelmed at the choke'] },
  { name: 'Comet Catcher Redux', players: '4-6', type: 'Open Field', rating: 3, description: 'Open map requiring full perimeter defense. Harder but more rewarding.', pros: ['Lots of space and metal', 'Room for massive bases'], cons: ['Must defend entire perimeter', 'Requires excellent coordination'] },
];

// ─── Faction Comparison for Raptors ───
export const factionComparison = [
  { category: 'Best Heavy Turret', armada: 'Pulsar (1091 DPS, 1400 range)', cortex: 'Bulwark (1513 DPS, 900 range)', winner: 'Tie', note: 'Pulsar has range, Bulwark has multi-target + HP' },
  { category: 'Best T3 Unit', armada: 'Titan (69K HP, 1452 DPS)', cortex: 'Juggernaut (149K HP, 4187 DPS)', winner: 'Cortex', note: 'Juggernaut is the undisputed queen killer' },
  { category: 'Best Popup Turret', armada: 'Dragon\'s Claw (lightning)', cortex: 'Dragon\'s Maw (AoE flame)', winner: 'Cortex', note: 'Dragon\'s Maw AoE shreds raptor swarms' },
  { category: 'Best Shield', armada: 'Keeper', cortex: 'Overseer', winner: 'Tie', note: 'Both deflect plasma. Overseer slightly more HP.' },
  { category: 'Best Long-Range AA', armada: 'Mercury', cortex: 'Screamer', winner: 'Cortex', note: 'Screamer has 750 damage AoE missiles, kills groups' },
  { category: 'Best LRPC', armada: 'Basilica', cortex: 'Basilisk', winner: 'Cortex', note: 'Basilisk does more damage per shot, slightly slower' },
  { category: 'Best Wall Unit', armada: 'Dragon\'s Teeth', cortex: 'Dragon\'s Teeth', winner: 'Tie', note: 'Identical. Fortification Walls also identical.' },
  { category: 'Overall PvE Rating', armada: '8/10', cortex: '9/10', winner: 'Cortex', note: 'Cortex Juggernaut + Bulwark + Dragon\'s Maw edge it' },
];

// ─── Sources ───
export const sources = [
  { title: 'NuttyB Raptors Quickstart Guide', url: 'https://www.reddit.com/r/beyondallreason/comments/1nvxt1j/quickstart_guide_for_nuttyb_raptors/', type: 'Community Guide', tier: 'T1' },
  { title: 'BAR Official Guides', url: 'https://www.beyondallreason.info/guides', type: 'Official', tier: 'T1' },
  { title: 'Raptors & Scavengers PvE Balance Changes', url: 'https://www.beyondallreason.info/microblogs/40', type: 'Official Dev Blog', tier: 'T1' },
  { title: 'PvE Development Microblog', url: 'https://www.beyondallreason.info/microblogs/21', type: 'Official Dev Blog', tier: 'T1' },
  { title: 'Armada Defense Buildings', url: 'https://www.beyondallreason.info/units/armada-defense-buildings', type: 'Official Unit Data', tier: 'T1' },
  { title: 'Cortex Defense Buildings', url: 'https://www.beyondallreason.info/units/cortex-defense-buildings', type: 'Official Unit Data', tier: 'T1' },
  { title: 'Juggernaut Unit Page', url: 'https://www.beyondallreason.info/unit/corkorg', type: 'Official Unit Data', tier: 'T1' },
  { title: 'Titan Unit Page', url: 'https://www.beyondallreason.info/unit/armbanth', type: 'Official Unit Data', tier: 'T1' },
  { title: 'Pulsar Unit Page', url: 'https://www.beyondallreason.info/unit/armanni', type: 'Official Unit Data', tier: 'T1' },
  { title: 'Bulwark Unit Page', url: 'https://www.beyondallreason.info/unit/cordoom', type: 'Official Unit Data', tier: 'T1' },
  { title: 'Armada vs Cortex FAQ', url: 'https://www.beyondallreason.info/faq/what-are-the-main-differences-between-armada-and-cortex', type: 'Official FAQ', tier: 'T1' },
  { title: 'Reddit: Help with Raptor Mode', url: 'https://www.reddit.com/r/beyondallreason/comments/v1nqau/help_needed_with_raptor_mode/', type: 'Community Discussion', tier: 'T2' },
  { title: 'Reddit: Raptor Defense Tips for Noobs', url: 'https://www.reddit.com/r/beyondallreason/comments/1ignbv5/any_tips_for_raptor_defense_hard_for_a_noob/', type: 'Community Discussion', tier: 'T2' },
  { title: 'Reddit: RaptorsDefenceAI How to Win', url: 'https://www.reddit.com/r/beyondallreason/comments/1arncmu/raptorsdefenceai_how_to_win/', type: 'Community Discussion', tier: 'T2' },
  { title: 'BAR Economy Guide', url: 'https://www.beyondallreason.info/guide/in-depth-look-at-economy', type: 'Official Guide', tier: 'T1' },
  { title: 'PvE Modoptions Changes', url: 'https://www.beyondallreason.info/microblogs/106', type: 'Official Dev Blog', tier: 'T1' },
];
