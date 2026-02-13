// ============================================================
// Coffee Beans Deep Dive — Research Data
// Sources: ICO, USDA, SCA, Wikipedia, specialty coffee publications
// ============================================================

// --- 4 Main Species ---
export const speciesData = [
  {
    species: 'Arabica',
    scientificName: 'Coffea arabica',
    globalShare: 60,
    caffeinePercent: 1.2,
    caffeinePerGram: 12,
    flavorRating: 8.5,
    priceRange: '$3–$25/lb',
    avgPrice: 14,
    altitude: '800–2,200m',
    altitudeMin: 800,
    altitudeMax: 2200,
    temperatureRange: '15–24°C',
    flavorNotes: 'Sweet, fruity, floral, acidic, complex',
    bodyRating: 6,
    acidityRating: 8,
    bitternessRating: 3,
    sweetnessRating: 8,
    aromaRating: 9,
    diseaseResistance: 3,
    availability: 'Very Common',
    topProducers: ['Brazil', 'Colombia', 'Ethiopia'],
    chromosomes: 44,
    description: 'The most popular and widely consumed coffee species. Known for complex, nuanced flavors with bright acidity. Accounts for ~60% of global production.',
  },
  {
    species: 'Robusta',
    scientificName: 'Coffea canephora',
    globalShare: 35,
    caffeinePercent: 2.2,
    caffeinePerGram: 22,
    flavorRating: 5.5,
    priceRange: '$1–$8/lb',
    avgPrice: 4.5,
    altitude: '0–800m',
    altitudeMin: 0,
    altitudeMax: 800,
    temperatureRange: '24–30°C',
    flavorNotes: 'Earthy, nutty, chocolatey, bitter, heavy body',
    bodyRating: 9,
    acidityRating: 3,
    bitternessRating: 8,
    sweetnessRating: 3,
    aromaRating: 5,
    diseaseResistance: 9,
    availability: 'Very Common',
    topProducers: ['Vietnam', 'Brazil', 'Indonesia'],
    chromosomes: 22,
    description: 'Hardy, high-caffeine species with bold, bitter flavor. Used in espresso blends and instant coffee. Nearly double the caffeine of Arabica.',
  },
  {
    species: 'Liberica',
    scientificName: 'Coffea liberica',
    globalShare: 3,
    caffeinePercent: 1.23,
    caffeinePerGram: 12.3,
    flavorRating: 6,
    priceRange: '$8–$30/lb',
    avgPrice: 18,
    altitude: '200–800m',
    altitudeMin: 200,
    altitudeMax: 800,
    temperatureRange: '24–30°C',
    flavorNotes: 'Smoky, woody, floral, fruity, full body',
    bodyRating: 8,
    acidityRating: 4,
    bitternessRating: 5,
    sweetnessRating: 5,
    aromaRating: 7,
    diseaseResistance: 7,
    availability: 'Rare',
    topProducers: ['Philippines', 'Malaysia', 'Liberia'],
    chromosomes: 22,
    description: 'Large, asymmetrical beans with a unique smoky, woody flavor. Historically important — saved the coffee industry after the 1890 Arabica rust epidemic.',
  },
  {
    species: 'Excelsa',
    scientificName: 'Coffea liberica var. dewevrei',
    globalShare: 2,
    caffeinePercent: 1.0,
    caffeinePerGram: 10,
    flavorRating: 7,
    priceRange: '$10–$35/lb',
    avgPrice: 22,
    altitude: '300–1,000m',
    altitudeMin: 300,
    altitudeMax: 1000,
    temperatureRange: '22–28°C',
    flavorNotes: 'Tart, fruity, dark roasty, complex, mysterious',
    bodyRating: 7,
    acidityRating: 6,
    bitternessRating: 5,
    sweetnessRating: 6,
    aromaRating: 8,
    diseaseResistance: 6,
    availability: 'Very Rare',
    topProducers: ['Vietnam', 'Philippines', 'Laos'],
    chromosomes: 22,
    description: 'Reclassified as a Liberica variety but distinctly different in flavor. Tart and fruity with dark roasty notes. Used in blends for complexity.',
  },
];

// --- Caffeine Comparison (mg per 8oz brewed cup, by species) ---
export const caffeineComparison = [
  { species: 'Robusta', caffeinePerGram: 22, caffeinePerBean: 10, caffeinePerCup: 265, caffeinePercent: 2.2, keepAwakeRating: 10 },
  { species: 'Arabica', caffeinePerGram: 12, caffeinePerBean: 6, caffeinePerCup: 150, caffeinePercent: 1.2, keepAwakeRating: 6 },
  { species: 'Liberica', caffeinePerGram: 12.3, caffeinePerBean: 7, caffeinePerCup: 155, caffeinePercent: 1.23, keepAwakeRating: 6 },
  { species: 'Excelsa', caffeinePerGram: 10, caffeinePerBean: 5, caffeinePerCup: 125, caffeinePercent: 1.0, keepAwakeRating: 5 },
];

// --- Arabica Varieties (cultivars) ---
export const arabicaVarieties = [
  { name: 'Typica', origin: 'Ethiopia/Yemen', flavorRating: 8.0, caffeinePercent: 1.2, flavorNotes: 'Clean, sweet, complex', cuppingScore: '82–86', availability: 'Common', priceRange: '$5–$15/lb', yieldLevel: 'Low', diseaseResistance: 'Low' },
  { name: 'Bourbon', origin: 'Yemen/Réunion', flavorRating: 8.5, caffeinePercent: 1.2, flavorNotes: 'Sweet, caramel, fruity', cuppingScore: '83–88', availability: 'Common', priceRange: '$6–$18/lb', yieldLevel: 'Medium', diseaseResistance: 'Low' },
  { name: 'Geisha/Gesha', origin: 'Ethiopia', flavorRating: 9.5, caffeinePercent: 1.0, flavorNotes: 'Jasmine, bergamot, tropical fruit', cuppingScore: '88–97', availability: 'Very Rare', priceRange: '$50–$1,000+/lb', yieldLevel: 'Very Low', diseaseResistance: 'Low' },
  { name: 'SL28', origin: 'Kenya', flavorRating: 9.0, caffeinePercent: 1.3, flavorNotes: 'Blackcurrant, citrus, complex acidity', cuppingScore: '85–92', availability: 'Rare', priceRange: '$12–$40/lb', yieldLevel: 'Low', diseaseResistance: 'Low' },
  { name: 'SL34', origin: 'Kenya', flavorRating: 8.5, caffeinePercent: 1.2, flavorNotes: 'Heavy body, citrus, stone fruit', cuppingScore: '84–90', availability: 'Rare', priceRange: '$10–$35/lb', yieldLevel: 'Medium', diseaseResistance: 'Low' },
  { name: 'Caturra', origin: 'Brazil', flavorRating: 7.5, caffeinePercent: 1.3, flavorNotes: 'Bright acidity, citrus, light body', cuppingScore: '80–86', availability: 'Common', priceRange: '$4–$12/lb', yieldLevel: 'High', diseaseResistance: 'Low' },
  { name: 'Catuai', origin: 'Brazil', flavorRating: 7.0, caffeinePercent: 1.2, flavorNotes: 'Nutty, chocolate, mild', cuppingScore: '79–84', availability: 'Common', priceRange: '$3–$10/lb', yieldLevel: 'Very High', diseaseResistance: 'Medium' },
  { name: 'Pacamara', origin: 'El Salvador', flavorRating: 8.5, caffeinePercent: 1.1, flavorNotes: 'Floral, chocolate, creamy body', cuppingScore: '85–91', availability: 'Rare', priceRange: '$15–$50/lb', yieldLevel: 'Low', diseaseResistance: 'Low' },
  { name: 'Maragogipe', origin: 'Brazil', flavorRating: 7.5, caffeinePercent: 1.1, flavorNotes: 'Mild, smooth, low acidity', cuppingScore: '80–85', availability: 'Rare', priceRange: '$10–$30/lb', yieldLevel: 'Low', diseaseResistance: 'Low' },
  { name: 'Ethiopian Heirloom', origin: 'Ethiopia', flavorRating: 9.0, caffeinePercent: 1.2, flavorNotes: 'Blueberry, wine, floral, complex', cuppingScore: '85–94', availability: 'Moderate', priceRange: '$8–$30/lb', yieldLevel: 'Low', diseaseResistance: 'Medium' },
  { name: 'Mundo Novo', origin: 'Brazil', flavorRating: 7.0, caffeinePercent: 1.2, flavorNotes: 'Chocolate, nutty, low acidity', cuppingScore: '79–84', availability: 'Common', priceRange: '$3–$10/lb', yieldLevel: 'Very High', diseaseResistance: 'Medium' },
  { name: 'Castillo', origin: 'Colombia', flavorRating: 7.0, caffeinePercent: 1.3, flavorNotes: 'Balanced, caramel, mild fruit', cuppingScore: '80–85', availability: 'Common', priceRange: '$4–$12/lb', yieldLevel: 'High', diseaseResistance: 'High' },
  { name: 'Catimor', origin: 'Portugal', flavorRating: 6.0, caffeinePercent: 1.4, flavorNotes: 'Earthy, herbal, astringent', cuppingScore: '76–82', availability: 'Common', priceRange: '$2–$8/lb', yieldLevel: 'Very High', diseaseResistance: 'Very High' },
  { name: 'Wush Wush', origin: 'Ethiopia', flavorRating: 8.5, caffeinePercent: 1.1, flavorNotes: 'Tropical, tea-like, floral', cuppingScore: '86–92', availability: 'Very Rare', priceRange: '$20–$60/lb', yieldLevel: 'Very Low', diseaseResistance: 'Low' },
  { name: 'Pink Bourbon', origin: 'Colombia', flavorRating: 9.0, caffeinePercent: 1.1, flavorNotes: 'Strawberry, rose, sparkling acidity', cuppingScore: '87–93', availability: 'Very Rare', priceRange: '$25–$80/lb', yieldLevel: 'Low', diseaseResistance: 'Low' },
];

// --- Rare & Expensive Coffees ---
export const rareCoffees = [
  { name: 'Black Ivory', origin: 'Thailand', pricePerLb: 1500, process: 'Elephant-digested', flavorNotes: 'Chocolate, malt, cherry, no bitterness', flavorRating: 8.0, annualProduction: '150 kg', availability: 'Ultra Rare' },
  { name: 'Kopi Luwak (Wild)', origin: 'Indonesia', pricePerLb: 600, process: 'Civet-digested', flavorNotes: 'Smooth, earthy, less acidic', flavorRating: 7.0, annualProduction: '500 kg', availability: 'Ultra Rare' },
  { name: 'Geisha (Auction)', origin: 'Panama', pricePerLb: 4588, process: 'Washed/Honey', flavorNotes: 'Jasmine, bergamot, tropical', flavorRating: 9.5, annualProduction: '~2,000 kg', availability: 'Ultra Rare' },
  { name: 'Ospina Dynasty', origin: 'Colombia', pricePerLb: 1500, process: 'Shade-grown, hand-picked', flavorNotes: 'Smooth, nutty, caramel', flavorRating: 8.5, annualProduction: '~500 kg', availability: 'Ultra Rare' },
  { name: 'Jamaica Blue Mountain', origin: 'Jamaica', pricePerLb: 145, process: 'Washed', flavorNotes: 'Smooth, mild, balanced, no bitterness', flavorRating: 8.0, annualProduction: '1.8M kg', availability: 'Rare' },
  { name: 'Hawaiian Kona', origin: 'Hawaii, USA', pricePerLb: 90, process: 'Washed', flavorNotes: 'Bright, nutty, caramel, medium body', flavorRating: 8.0, annualProduction: '~1M kg', availability: 'Rare' },
  { name: 'Yemeni Mocha', origin: 'Yemen', pricePerLb: 320, process: 'Natural/Dry', flavorNotes: 'Wine, chocolate, dried fruit, spice', flavorRating: 9.0, annualProduction: '~20,000 bags', availability: 'Very Rare' },
  { name: 'St. Helena Coffee', origin: 'St. Helena Island', pricePerLb: 200, process: 'Washed', flavorNotes: 'Citrus, floral, caramel', flavorRating: 8.5, annualProduction: '~12 tonnes', availability: 'Ultra Rare' },
  { name: 'Jacu Bird Coffee', origin: 'Brazil', pricePerLb: 725, process: 'Bird-digested', flavorNotes: 'Nutty, sweet, full body', flavorRating: 7.5, annualProduction: '~200 kg', availability: 'Ultra Rare' },
  { name: 'Misha Coffee', origin: 'Peru', pricePerLb: 657, process: 'Coati-digested', flavorNotes: 'Sweet, smooth, nutty', flavorRating: 7.5, annualProduction: '~100 kg', availability: 'Ultra Rare' },
];

// --- Top Producing Countries ---
export const productionByCountry = [
  { country: 'Brazil', production: 69.9, unit: 'M bags', share: 36.5, species: 'Arabica & Robusta', region: 'South America' },
  { country: 'Vietnam', production: 27.5, unit: 'M bags', share: 14.4, species: 'Robusta', region: 'Asia' },
  { country: 'Colombia', production: 12.4, unit: 'M bags', share: 6.5, species: 'Arabica', region: 'South America' },
  { country: 'Indonesia', production: 11.5, unit: 'M bags', share: 6.0, species: 'Robusta & Arabica', region: 'Asia' },
  { country: 'Ethiopia', production: 8.7, unit: 'M bags', share: 4.5, species: 'Arabica', region: 'Africa' },
  { country: 'Honduras', production: 6.1, unit: 'M bags', share: 3.2, species: 'Arabica', region: 'Central America' },
  { country: 'India', production: 5.8, unit: 'M bags', share: 3.0, species: 'Robusta & Arabica', region: 'Asia' },
  { country: 'Uganda', production: 5.5, unit: 'M bags', share: 2.9, species: 'Robusta', region: 'Africa' },
  { country: 'Mexico', production: 4.0, unit: 'M bags', share: 2.1, species: 'Arabica', region: 'Central America' },
  { country: 'Peru', production: 3.8, unit: 'M bags', share: 2.0, species: 'Arabica', region: 'South America' },
];

// --- Flavor Profile Radar Data (for radar chart) ---
export const flavorRadarData = [
  { attribute: 'Sweetness', Arabica: 8, Robusta: 3, Liberica: 5, Excelsa: 6 },
  { attribute: 'Acidity', Arabica: 8, Robusta: 3, Liberica: 4, Excelsa: 6 },
  { attribute: 'Bitterness', Arabica: 3, Robusta: 8, Liberica: 5, Excelsa: 5 },
  { attribute: 'Body', Arabica: 6, Robusta: 9, Liberica: 8, Excelsa: 7 },
  { attribute: 'Aroma', Arabica: 9, Robusta: 5, Liberica: 7, Excelsa: 8 },
  { attribute: 'Complexity', Arabica: 8, Robusta: 4, Liberica: 6, Excelsa: 7 },
];

// --- Keep-Awake Index (caffeine × absorption factors) ---
export const keepAwakeData = [
  { name: 'Double Robusta Espresso', caffeineContent: 400, keepAwakeHours: 8, intensity: 'Extreme', species: 'Robusta' },
  { name: 'Robusta Drip Coffee', caffeineContent: 265, keepAwakeHours: 6, intensity: 'Very High', species: 'Robusta' },
  { name: 'Arabica Drip Coffee', caffeineContent: 150, keepAwakeHours: 4, intensity: 'Moderate', species: 'Arabica' },
  { name: 'Liberica Brew', caffeineContent: 155, keepAwakeHours: 4, intensity: 'Moderate', species: 'Liberica' },
  { name: 'Excelsa Brew', caffeineContent: 125, keepAwakeHours: 3.5, intensity: 'Mild-Moderate', species: 'Excelsa' },
  { name: 'Geisha Pour-Over', caffeineContent: 120, keepAwakeHours: 3, intensity: 'Mild', species: 'Arabica' },
  { name: 'Decaf Arabica', caffeineContent: 7, keepAwakeHours: 0.5, intensity: 'Negligible', species: 'Arabica' },
];

// --- Processing Methods ---
export const processingMethods = [
  { method: 'Washed (Wet)', description: 'Fruit removed before drying. Clean, bright, acidic flavors.', flavorImpact: 'Clean acidity, clarity', regions: 'Latin America, East Africa, Asia', qualityPotential: 9 },
  { method: 'Natural (Dry)', description: 'Dried with fruit intact. Fruity, sweet, heavy body.', flavorImpact: 'Fruity sweetness, body', regions: 'Ethiopia, Brazil, Yemen', qualityPotential: 8 },
  { method: 'Honey (Pulped Natural)', description: 'Partial fruit left during drying. Balance of clean and sweet.', flavorImpact: 'Sweetness, balanced body', regions: 'Costa Rica, El Salvador, Brazil', qualityPotential: 9 },
  { method: 'Anaerobic Fermentation', description: 'Sealed fermentation in oxygen-free environment. Intense, unique flavors.', flavorImpact: 'Intense, wine-like, exotic', regions: 'Colombia, Ethiopia, experimental', qualityPotential: 10 },
  { method: 'Animal-Digested', description: 'Beans pass through animal digestive system. Reduced bitterness.', flavorImpact: 'Smooth, low acid, unique', regions: 'Indonesia, Thailand, Brazil', qualityPotential: 7 },
];

// --- Cupping Score Tiers (SCA Standard) ---
export const cuppingTiers = [
  { tier: 'Outstanding', scoreRange: '90–100', description: 'World-class, competition-winning coffees', examples: 'Geisha, top Ethiopian lots, auction winners', color: '#10b981' },
  { tier: 'Excellent', scoreRange: '85–89.99', description: 'Specialty grade, distinctive character', examples: 'SL28, Pink Bourbon, Wush Wush, top Bourbon lots', color: '#3b82f6' },
  { tier: 'Very Good', scoreRange: '80–84.99', description: 'Specialty grade, solid quality', examples: 'Good Typica, Caturra, Castillo, Mundo Novo', color: '#8b5cf6' },
  { tier: 'Good', scoreRange: '75–79.99', description: 'Above commercial, some specialty traits', examples: 'Catimor, commercial Arabica blends', color: '#f59e0b' },
  { tier: 'Commercial', scoreRange: 'Below 75', description: 'Standard commercial grade', examples: 'Bulk Robusta, instant coffee blends', color: '#6b7280' },
];

// --- Sources ---
export const sources = [
  { id: 1, title: 'International Coffee Organization (ICO)', url: 'https://www.ico.org/', type: 'Organization', tier: 'T1' },
  { id: 2, title: 'USDA Foreign Agricultural Service — Coffee Production Data 2024/2025', url: 'https://www.fas.usda.gov/', type: 'Government', tier: 'T1' },
  { id: 3, title: 'Specialty Coffee Association (SCA) — Cupping Protocols', url: 'https://sca.coffee/', type: 'Organization', tier: 'T1' },
  { id: 4, title: 'Atlas Coffee Club — Guide to 4 Main Types of Coffee Beans', url: 'https://club.atlascoffeeclub.com/4-main-types-of-coffee-beans/', type: 'Publication', tier: 'T2' },
  { id: 5, title: 'Colipse Coffee — 30 Coffee Varieties, Varietals, Cultivars and Hybrids', url: 'https://colipsecoffee.com/blogs/coffee/varieties', type: 'Publication', tier: 'T2' },
  { id: 6, title: 'Colipse Coffee — Top 10 Most Expensive Coffee in the World', url: 'https://colipsecoffee.com/blogs/coffee/expensive', type: 'Publication', tier: 'T2' },
  { id: 7, title: 'Wikipedia — Coffea liberica (caffeine content data)', url: 'https://en.wikipedia.org/wiki/Coffea_liberica', type: 'Encyclopedia', tier: 'T2' },
  { id: 8, title: 'CAFELY — High-Caffeinated Brews: What Coffee Has the Most Caffeine', url: 'https://cafely.com/blogs/info/what-coffee-has-the-most-caffeine', type: 'Publication', tier: 'T2' },
  { id: 9, title: 'Caffeine Informer — Caffeine in Coffee Beans', url: 'https://www.caffeineinformer.com/caffeine-content/coffee-beans', type: 'Database', tier: 'T2' },
  { id: 10, title: 'Visual Capitalist — Global Coffee Production 2024', url: 'https://www.visualcapitalist.com/visualizing-global-coffee-production-in-2024/', type: 'Publication', tier: 'T2' },
  { id: 11, title: 'Günter Coffee — Arabica Coffee Varieties: Bourbon, Typica, Geisha and More', url: 'https://guentercoffee.com/en/blogs/coffee-knowledge/coffea-arabica-varieties-lexicon', type: 'Publication', tier: 'T2' },
  { id: 12, title: 'Medical News Today — Caffeine content of different types of coffee', url: 'https://www.medicalnewstoday.com/articles/324986', type: 'Health Publication', tier: 'T2' },
];
