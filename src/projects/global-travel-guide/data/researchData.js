// Global Travel Guide — Research Data
// Sources: UN Tourism Barometer 2025, Euromonitor, TripAdvisor, Forbes Travel Guide,
// Condé Nast Traveler, National Geographic, Hotels.com Price Index, FreeTour.com, Topologica

// ─── GLOBAL OVERVIEW ───────────────────────────────────────────────
export const globalOverview = {
  totalArrivals2024: 1.47,       // billion
  totalArrivals2025: 1.52,       // billion
  tourismReceipts2024: 1.734,    // trillion USD
  tourismGDP: 10.9,              // trillion USD
  gdpShare: 10,                  // percent
  jobsSupported: 357,            // million
  jobsRatio: '1 in 10',
  fastestRecoveryRegion: 'Middle East',
  recoveryPct: 132,              // % of 2019 levels
  yoyGrowth2024: 12.2,          // %
  yoyGrowth2025: 4,             // %
};

// ─── TOP DESTINATIONS BY COUNTRY ───────────────────────────────────
export const topCountries = [
  { rank: 1, country: 'France', arrivals: 102, receipts: 77.1, growth: 12, region: 'Europe', flag: '🇫🇷' },
  { rank: 2, country: 'Spain', arrivals: 93.8, receipts: 106.5, growth: 12, region: 'Europe', flag: '🇪🇸' },
  { rank: 3, country: 'USA', arrivals: 72.4, receipts: 215, growth: null, region: 'Americas', flag: '🇺🇸' },
  { rank: 4, country: 'Turkey', arrivals: 60.6, receipts: null, growth: 18, region: 'Europe', flag: '🇹🇷' },
  { rank: 5, country: 'Italy', arrivals: 57.8, receipts: 58.7, growth: -10, region: 'Europe', flag: '🇮🇹' },
  { rank: 6, country: 'Mexico', arrivals: 45, receipts: null, growth: 0, region: 'Americas', flag: '🇲🇽' },
  { rank: 7, country: 'UK', arrivals: 38.7, receipts: 84.5, growth: null, region: 'Europe', flag: '🇬🇧' },
  { rank: 8, country: 'Japan', arrivals: 36.9, receipts: null, growth: 16, region: 'Asia-Pacific', flag: '🇯🇵' },
  { rank: 9, country: 'Greece', arrivals: 36, receipts: null, growth: 15, region: 'Europe', flag: '🇬🇷' },
  { rank: 10, country: 'Thailand', arrivals: 35.5, receipts: null, growth: -9, region: 'Asia-Pacific', flag: '🇹🇭' },
  { rank: 11, country: 'UAE', arrivals: 22, receipts: null, growth: 10, region: 'Middle East', flag: '🇦🇪' },
  { rank: 12, country: 'Malaysia', arrivals: 19, receipts: null, growth: -27, region: 'Asia-Pacific', flag: '🇲🇾' },
  { rank: 13, country: 'Saudi Arabia', arrivals: 18.3, receipts: null, growth: 18, region: 'Middle East', flag: '🇸🇦' },
  { rank: 14, country: 'Portugal', arrivals: 17.8, receipts: null, growth: 10, region: 'Europe', flag: '🇵🇹' },
  { rank: 15, country: 'Morocco', arrivals: 17.4, receipts: null, growth: 35, region: 'Africa', flag: '🇲🇦' },
];

// ─── TOP CITIES ────────────────────────────────────────────────────
export const topCities = [
  { rank: 1, city: 'Bangkok', country: 'Thailand', arrivals: 32.4, growth: 37, region: 'Asia-Pacific' },
  { rank: 2, city: 'Istanbul', country: 'Turkey', arrivals: 23, growth: 14, region: 'Europe' },
  { rank: 3, city: 'London', country: 'UK', arrivals: 21.7, growth: 7, region: 'Europe' },
  { rank: 4, city: 'Hong Kong', country: 'China', arrivals: 20.5, growth: 19, region: 'Asia-Pacific' },
  { rank: 5, city: 'Mecca', country: 'Saudi Arabia', arrivals: 19.3, growth: 20, region: 'Middle East' },
  { rank: 6, city: 'Antalya', country: 'Turkey', arrivals: 19.3, growth: 17, region: 'Europe' },
  { rank: 7, city: 'Dubai', country: 'UAE', arrivals: 18.2, growth: 8, region: 'Middle East' },
  { rank: 8, city: 'Macau', country: 'China', arrivals: 18, growth: 26, region: 'Asia-Pacific' },
  { rank: 9, city: 'Paris', country: 'France', arrivals: 17.4, growth: 2, region: 'Europe' },
  { rank: 10, city: 'Kuala Lumpur', country: 'Malaysia', arrivals: 16.5, growth: 73, region: 'Asia-Pacific' },
];

// ─── REGIONAL RECOVERY DATA ───────────────────────────────────────
export const regionalRecovery = [
  { region: 'Middle East', recoveryPct: 132, avgDailyBudget: 90, avgDailyMid: 150, avgDailyLux: 350 },
  { region: 'Europe', recoveryPct: 101, avgDailyBudget: 130, avgDailyMid: 200, avgDailyLux: 450 },
  { region: 'Africa', recoveryPct: 96, avgDailyBudget: 35, avgDailyMid: 90, avgDailyLux: 300 },
  { region: 'Americas', recoveryPct: 97, avgDailyBudget: 60, avgDailyMid: 150, avgDailyLux: 400 },
  { region: 'Asia-Pacific', recoveryPct: 87, avgDailyBudget: 22, avgDailyMid: 80, avgDailyLux: 250 },
  { region: 'Oceania', recoveryPct: 85, avgDailyBudget: 80, avgDailyMid: 160, avgDailyLux: 400 },
];

// ─── HOTEL PRICES BY COUNTRY ──────────────────────────────────────
export const hotelPrices = [
  { country: 'France', avg: 339, budget: 202, luxury: 566, valueIndex: 0.34, rating: 8.7 },
  { country: 'USA', avg: 272, budget: 99, luxury: 535, valueIndex: 0.43, rating: 8.5 },
  { country: 'England', avg: 235, budget: 131, luxury: 432, valueIndex: 0.42, rating: 8.6 },
  { country: 'Japan', avg: 185, budget: 105, luxury: 341, valueIndex: 0.53, rating: 8.8 },
  { country: 'Spain', avg: 162, budget: 94, luxury: 296, valueIndex: 0.66, rating: 8.5 },
  { country: 'Brazil', avg: 140, budget: 52, luxury: 796, valueIndex: 0.58, rating: 8.3 },
  { country: 'Australia', avg: 135, budget: 77, luxury: 243, valueIndex: 0.63, rating: 8.4 },
  { country: 'South Africa', avg: 123, budget: 26, luxury: 323, valueIndex: 0.75, rating: 8.2 },
  { country: 'Kenya', avg: 104, budget: 28, luxury: 302, valueIndex: 0.65, rating: 8.1 },
  { country: 'India', avg: 101, budget: 25, luxury: 210, valueIndex: 0.58, rating: 8.0 },
  { country: 'UAE', avg: 93, budget: 43, luxury: 184, valueIndex: 0.75, rating: 8.6 },
  { country: 'Indonesia', avg: 70, budget: 14, luxury: 284, valueIndex: 0.57, rating: 8.3 },
  { country: 'Malaysia', avg: 64, budget: 20, luxury: 275, valueIndex: 0.84, rating: 8.4 },
];

// ─── HOTEL VALUE INDEX BY REGION ──────────────────────────────────
export const hotelValueByRegion = [
  { region: 'Middle East', valueIndex: 0.75 },
  { region: 'Southeast Asia', valueIndex: 0.71 },
  { region: 'Sub-Saharan Africa', valueIndex: 0.70 },
  { region: 'Oceania', valueIndex: 0.63 },
  { region: 'South America', valueIndex: 0.58 },
  { region: 'South Asia', valueIndex: 0.58 },
  { region: 'East Asia', valueIndex: 0.53 },
  { region: 'Western Europe', valueIndex: 0.47 },
  { region: 'North America', valueIndex: 0.43 },
];

// ─── DAILY TRAVEL COSTS BY REGION ─────────────────────────────────
export const dailyCostsByRegion = [
  { region: 'Southeast Asia', ultraBudget: 22, budget: 52, mid: 100, luxury: 250, bestFor: 'Backpackers, street food lovers' },
  { region: 'Central America', ultraBudget: 45, budget: 60, mid: 110, luxury: 250, bestFor: 'Nature, culture, affordability' },
  { region: 'Africa', ultraBudget: 35, budget: 90, mid: 150, luxury: 400, bestFor: 'Safari, adventure, diverse landscapes' },
  { region: 'Eastern Europe', ultraBudget: 50, budget: 105, mid: 160, luxury: 350, bestFor: 'History, architecture, nightlife' },
  { region: 'South America', ultraBudget: 40, budget: 80, mid: 140, luxury: 350, bestFor: 'Adventure, culture, nature' },
  { region: 'East Asia', ultraBudget: 130, budget: 160, mid: 230, luxury: 500, bestFor: 'Tech, food, ancient culture' },
  { region: 'Western Europe', ultraBudget: 130, budget: 180, mid: 235, luxury: 550, bestFor: 'Art, history, fine dining' },
  { region: 'North America', ultraBudget: 100, budget: 150, mid: 220, luxury: 500, bestFor: 'Road trips, national parks, cities' },
  { region: 'Oceania', ultraBudget: 80, budget: 140, mid: 200, luxury: 450, bestFor: 'Nature, beaches, adventure sports' },
  { region: 'Middle East', ultraBudget: 60, budget: 100, mid: 180, luxury: 500, bestFor: 'Luxury, history, desert adventures' },
];

// ─── FOOD DESTINATIONS ────────────────────────────────────────────
export const foodDestinations = [
  { rank: 1, country: 'Italy', cuisine: 'Italian', highlights: 'Pasta, pizza, gelato, regional wines', streetFood: 4, fineDining: 5, variety: 5, michelinStars: 395, flag: '🇮🇹' },
  { rank: 2, country: 'Japan', cuisine: 'Japanese', highlights: 'Sushi, ramen, kaiseki, izakaya culture', streetFood: 5, fineDining: 5, variety: 5, michelinStars: 413, flag: '🇯🇵' },
  { rank: 3, country: 'Thailand', cuisine: 'Thai', highlights: 'Pad thai, curries, street food markets', streetFood: 5, fineDining: 4, variety: 5, michelinStars: 38, flag: '🇹🇭' },
  { rank: 4, country: 'France', cuisine: 'French', highlights: 'Pastries, cheese, wine, haute cuisine', streetFood: 3, fineDining: 5, variety: 4, michelinStars: 632, flag: '🇫🇷' },
  { rank: 5, country: 'Mexico', cuisine: 'Mexican', highlights: 'Tacos, mole, mezcal, street markets', streetFood: 5, fineDining: 4, variety: 5, michelinStars: 32, flag: '🇲🇽' },
  { rank: 6, country: 'India', cuisine: 'Indian', highlights: 'Curries, biryani, street chaat, regional diversity', streetFood: 5, fineDining: 3, variety: 5, michelinStars: 10, flag: '🇮🇳' },
  { rank: 7, country: 'Spain', cuisine: 'Spanish', highlights: 'Tapas, paella, jamón, pintxos', streetFood: 4, fineDining: 5, variety: 4, michelinStars: 258, flag: '🇪🇸' },
  { rank: 8, country: 'Peru', cuisine: 'Peruvian', highlights: 'Ceviche, lomo saltado, fusion cuisine', streetFood: 4, fineDining: 5, variety: 4, michelinStars: 5, flag: '🇵🇪' },
  { rank: 9, country: 'Turkey', cuisine: 'Turkish', highlights: 'Kebabs, baklava, meze, tea culture', streetFood: 5, fineDining: 3, variety: 4, michelinStars: 15, flag: '🇹🇷' },
  { rank: 10, country: 'South Korea', cuisine: 'Korean', highlights: 'BBQ, kimchi, bibimbap, street food', streetFood: 5, fineDining: 4, variety: 4, michelinStars: 36, flag: '🇰🇷' },
  { rank: 11, country: 'Vietnam', cuisine: 'Vietnamese', highlights: 'Pho, banh mi, fresh rolls, coffee', streetFood: 5, fineDining: 3, variety: 4, michelinStars: 7, flag: '🇻🇳' },
  { rank: 12, country: 'Greece', cuisine: 'Greek', highlights: 'Souvlaki, moussaka, fresh seafood, olive oil', streetFood: 4, fineDining: 3, variety: 3, michelinStars: 12, flag: '🇬🇷' },
];

// ─── TOP ATTRACTIONS ──────────────────────────────────────────────
export const topAttractions = [
  { name: 'Eiffel Tower', city: 'Paris', country: 'France', type: 'Landmark', annualVisitors: 6, rating: 4.6, region: 'Europe' },
  { name: 'Colosseum', city: 'Rome', country: 'Italy', type: 'Historical', annualVisitors: 7.6, rating: 4.7, region: 'Europe' },
  { name: 'Machu Picchu', city: 'Cusco', country: 'Peru', type: 'Archaeological', annualVisitors: 1.5, rating: 4.8, region: 'Americas' },
  { name: 'Great Wall', city: 'Beijing', country: 'China', type: 'Historical', annualVisitors: 10, rating: 4.6, region: 'Asia-Pacific' },
  { name: 'Taj Mahal', city: 'Agra', country: 'India', type: 'Monument', annualVisitors: 7, rating: 4.7, region: 'Asia-Pacific' },
  { name: 'Grand Canyon', city: 'Arizona', country: 'USA', type: 'Nature', annualVisitors: 6.4, rating: 4.8, region: 'Americas' },
  { name: 'Petra', city: 'Wadi Musa', country: 'Jordan', type: 'Archaeological', annualVisitors: 1.1, rating: 4.8, region: 'Middle East' },
  { name: 'Angkor Wat', city: 'Siem Reap', country: 'Cambodia', type: 'Temple', annualVisitors: 2.5, rating: 4.8, region: 'Asia-Pacific' },
  { name: 'Sagrada Familia', city: 'Barcelona', country: 'Spain', type: 'Architecture', annualVisitors: 4.7, rating: 4.7, region: 'Europe' },
  { name: 'Santorini', city: 'Cyclades', country: 'Greece', type: 'Island', annualVisitors: 3.4, rating: 4.7, region: 'Europe' },
  { name: 'Banff National Park', city: 'Alberta', country: 'Canada', type: 'Nature', annualVisitors: 4.1, rating: 4.8, region: 'Americas' },
  { name: 'Great Barrier Reef', city: 'Queensland', country: 'Australia', type: 'Nature', annualVisitors: 2, rating: 4.9, region: 'Oceania' },
  { name: 'Serengeti', city: 'Mara', country: 'Tanzania', type: 'Safari', annualVisitors: 0.35, rating: 4.9, region: 'Africa' },
  { name: 'Rijksmuseum', city: 'Amsterdam', country: 'Netherlands', type: 'Museum', annualVisitors: 2.7, rating: 4.8, region: 'Europe' },
  { name: 'Christ the Redeemer', city: 'Rio de Janeiro', country: 'Brazil', type: 'Landmark', annualVisitors: 2, rating: 4.6, region: 'Americas' },
];

// ─── ADVENTURE ACTIVITIES ─────────────────────────────────────────
export const adventureActivities = [
  { activity: 'Hiking / Trekking', topDest: 'Nepal (Everest BC), Peru (Inca Trail), NZ (Milford Track)', difficulty: 'Moderate–Hard', avgCost: '$50–$200/day', season: 'Mar–Nov' },
  { activity: 'Scuba Diving', topDest: 'Australia (GBR), Maldives, Indonesia (Raja Ampat)', difficulty: 'Easy–Moderate', avgCost: '$80–$150/dive', season: 'Year-round' },
  { activity: 'Safari', topDest: 'Tanzania (Serengeti), Kenya (Masai Mara), Botswana (Okavango)', difficulty: 'Easy', avgCost: '$200–$800/day', season: 'Jun–Oct' },
  { activity: 'Surfing', topDest: 'Indonesia (Bali), Portugal (Nazaré), Costa Rica', difficulty: 'Easy–Hard', avgCost: '$30–$100/day', season: 'Varies' },
  { activity: 'Skiing / Snowboarding', topDest: 'Switzerland (Zermatt), Japan (Niseko), Canada (Whistler)', difficulty: 'Easy–Hard', avgCost: '$150–$400/day', season: 'Dec–Apr' },
  { activity: 'Skydiving', topDest: 'Dubai, Queenstown NZ, Interlaken Switzerland', difficulty: 'Moderate', avgCost: '$200–$400/jump', season: 'Year-round' },
  { activity: 'White Water Rafting', topDest: 'Costa Rica, Nepal, Uganda (Nile)', difficulty: 'Moderate–Hard', avgCost: '$50–$150/trip', season: 'May–Oct' },
  { activity: 'Hot Air Ballooning', topDest: 'Cappadocia Turkey, Serengeti, Bagan Myanmar', difficulty: 'Easy', avgCost: '$150–$350/flight', season: 'Year-round' },
];

// ─── TOP BEACHES ──────────────────────────────────────────────────
export const topBeaches = [
  { rank: 1, beach: 'Whitehaven Beach', country: 'Australia', region: 'Oceania', waterTemp: 25, crowdLevel: 'Low', vibe: 'Pristine, remote' },
  { rank: 2, beach: 'Navagio Beach', country: 'Greece', region: 'Europe', waterTemp: 24, crowdLevel: 'Medium', vibe: 'Dramatic cliffs, shipwreck' },
  { rank: 3, beach: 'Anse Source d\'Argent', country: 'Seychelles', region: 'Africa', waterTemp: 28, crowdLevel: 'Low', vibe: 'Granite boulders, turquoise' },
  { rank: 4, beach: 'Maya Bay', country: 'Thailand', region: 'Asia-Pacific', waterTemp: 29, crowdLevel: 'Medium', vibe: 'Iconic, jungle-backed' },
  { rank: 5, beach: 'Bávaro Beach', country: 'Dominican Republic', region: 'Americas', waterTemp: 27, crowdLevel: 'Medium', vibe: 'Palm-lined, resort' },
  { rank: 6, beach: 'Canto de la Playa', country: 'Dominican Republic', region: 'Americas', waterTemp: 27, crowdLevel: 'Low', vibe: 'Secluded, wild beauty' },
  { rank: 7, beach: 'Playa del Carmen', country: 'Mexico', region: 'Americas', waterTemp: 27, crowdLevel: 'High', vibe: 'Vibrant, nightlife nearby' },
  { rank: 8, beach: 'Tulum Beach', country: 'Mexico', region: 'Americas', waterTemp: 27, crowdLevel: 'Medium', vibe: 'Ruins backdrop, bohemian' },
  { rank: 9, beach: 'Camps Bay', country: 'South Africa', region: 'Africa', waterTemp: 18, crowdLevel: 'Medium', vibe: 'Mountain views, trendy' },
  { rank: 10, beach: 'Grace Bay', country: 'Turks & Caicos', region: 'Americas', waterTemp: 27, crowdLevel: 'Low', vibe: 'Powder sand, crystal water' },
];

// ─── NIGHTLIFE CITIES ─────────────────────────────────────────────
export const nightlifeCities = [
  { rank: 1, city: 'Las Vegas', country: 'USA', highlights: 'Casinos, mega-clubs, residency shows', avgDrinkPrice: 15, safetyRating: 3.5, vibe: 'Over-the-top entertainment' },
  { rank: 2, city: 'Madrid', country: 'Spain', highlights: 'Tapas bars, flamenco, late-night plazas', avgDrinkPrice: 8, safetyRating: 4.2, vibe: 'Late-night culture, 2am dinners' },
  { rank: 3, city: 'Paris', country: 'France', highlights: 'Chic bars, jazz clubs, cabaret', avgDrinkPrice: 12, safetyRating: 3.8, vibe: 'Sophisticated, romantic' },
  { rank: 4, city: 'Berlin', country: 'Germany', highlights: 'Techno clubs, underground scene, 48hr parties', avgDrinkPrice: 6, safetyRating: 3.9, vibe: 'Raw, alternative, legendary' },
  { rank: 5, city: 'Tokyo', country: 'Japan', highlights: 'Izakayas, karaoke, Golden Gai, robot shows', avgDrinkPrice: 8, safetyRating: 4.8, vibe: 'Eclectic, safe, neon-lit' },
  { rank: 6, city: 'Rio de Janeiro', country: 'Brazil', highlights: 'Samba clubs, beach bars, Carnival', avgDrinkPrice: 5, safetyRating: 2.8, vibe: 'Energetic, rhythmic, tropical' },
  { rank: 7, city: 'Bangkok', country: 'Thailand', highlights: 'Rooftop bars, night markets, Khao San Rd', avgDrinkPrice: 4, safetyRating: 3.5, vibe: 'Chaotic, cheap, vibrant' },
  { rank: 8, city: 'Dubai', country: 'UAE', highlights: 'Rooftop lounges, beach clubs, luxury venues', avgDrinkPrice: 18, safetyRating: 4.7, vibe: 'Glamorous, upscale' },
  { rank: 9, city: 'Barcelona', country: 'Spain', highlights: 'Beach clubs, Gothic Quarter bars, La Rambla', avgDrinkPrice: 8, safetyRating: 3.6, vibe: 'Mediterranean party capital' },
  { rank: 10, city: 'New York', country: 'USA', highlights: 'Speakeasies, Broadway, rooftop bars, jazz', avgDrinkPrice: 16, safetyRating: 3.5, vibe: 'City that never sleeps' },
];

// ─── SAFETY INDEX ─────────────────────────────────────────────────
export const safetyRankings = [
  { rank: 1, country: 'Iceland', score: 9.5, region: 'Europe', notes: 'Lowest crime globally, near-zero violent crime' },
  { rank: 2, country: 'Denmark', score: 9.3, region: 'Europe', notes: 'Excellent LGBTQ+ & women safety' },
  { rank: 3, country: 'Switzerland', score: 9.2, region: 'Europe', notes: 'Political stability, low crime' },
  { rank: 4, country: 'New Zealand', score: 9.1, region: 'Oceania', notes: 'Friendly locals, low crime' },
  { rank: 5, country: 'Japan', score: 9.0, region: 'Asia-Pacific', notes: 'Ultra-safe cities, respectful culture' },
  { rank: 6, country: 'Norway', score: 8.9, region: 'Europe', notes: 'High trust society, low crime' },
  { rank: 7, country: 'Singapore', score: 8.8, region: 'Asia-Pacific', notes: 'Strict laws, very clean & safe' },
  { rank: 8, country: 'Portugal', score: 8.7, region: 'Europe', notes: 'Peaceful, welcoming to tourists' },
  { rank: 9, country: 'Austria', score: 8.6, region: 'Europe', notes: 'Stable, efficient, safe transit' },
  { rank: 10, country: 'Canada', score: 8.5, region: 'Americas', notes: 'Friendly, multicultural, safe cities' },
  { rank: 11, country: 'Australia', score: 8.4, region: 'Oceania', notes: 'Safe cities, wildlife caution' },
  { rank: 12, country: 'Ireland', score: 8.3, region: 'Europe', notes: 'Low crime, friendly culture' },
  { rank: 13, country: 'Slovenia', score: 8.2, region: 'Europe', notes: 'Hidden gem, very peaceful' },
  { rank: 14, country: 'Finland', score: 8.1, region: 'Europe', notes: 'High trust, clean, organized' },
  { rank: 15, country: 'Czech Republic', score: 8.0, region: 'Europe', notes: 'Safe for tourists, watch pickpockets in Prague' },
];

// ─── FASTEST GROWING DESTINATIONS ─────────────────────────────────
export const fastestGrowing = [
  { country: 'Turks & Caicos', growth: 127, arrivals2024: 1.1, region: 'Americas' },
  { country: 'Qatar', growth: 80, arrivals2024: 4.6, region: 'Middle East' },
  { country: 'Dominican Republic', growth: 40, arrivals2024: 9, region: 'Americas' },
  { country: 'Morocco', growth: 35, arrivals2024: 17.4, region: 'Africa' },
  { country: 'El Salvador', growth: 35, arrivals2024: 2.4, region: 'Americas' },
  { country: 'Ethiopia', growth: 25, arrivals2024: 1.1, region: 'Africa' },
  { country: 'Maldives', growth: 20, arrivals2024: 1.9, region: 'Asia-Pacific' },
  { country: 'Tanzania', growth: 20, arrivals2024: 1.8, region: 'Africa' },
  { country: 'Saudi Arabia', growth: 18, arrivals2024: 18.3, region: 'Middle East' },
  { country: 'Turkey', growth: 18, arrivals2024: 60.6, region: 'Europe' },
];

// ─── TOURISM ARRIVALS TIMELINE ────────────────────────────────────
export const arrivalsTimeline = [
  { year: 2019, arrivals: 1.47 },
  { year: 2020, arrivals: 0.408 },
  { year: 2021, arrivals: 0.461 },
  { year: 2022, arrivals: 0.976 },
  { year: 2023, arrivals: 1.31 },
  { year: 2024, arrivals: 1.47 },
  { year: 2025, arrivals: 1.52 },
];

// ─── SOURCES ──────────────────────────────────────────────────────
export const sources = [
  { id: 1, name: 'UN Tourism World Tourism Barometer 2025', url: 'https://www.untourism.int/un-tourism-world-tourism-barometer-data', type: 'T1 — Official Data' },
  { id: 2, name: 'Road Genius — Global Tourism Statistics 2024-2026', url: 'https://roadgenius.com/statistics/tourism/', type: 'T2 — Aggregated Data' },
  { id: 3, name: 'Euromonitor — Top 10 City Destinations 2026', url: 'https://www.forbes.com/sites/laurabegleybloom/2025/12/22/the-10-best-cities-in-the-world-to-visit-in-2026-according-to-euromonitor/', type: 'T2 — Industry Report' },
  { id: 4, name: 'FreeTour.com — Average Hotel Room Prices 2025', url: 'https://www.freetour.com/blog/average-hotel-room-prices-around-the-world', type: 'T2 — Aggregated Data' },
  { id: 5, name: 'Topologica — Budget Travel Calculator 2025', url: 'https://topologica.co/articles/budget-travel-calculator-country-costs/', type: 'T2 — Aggregated Data' },
  { id: 6, name: 'Hotels.com 2025 Hotel Price Index', url: 'https://www.expedia.com/newsroom/hotels-com-2025-hotel-price-index/', type: 'T2 — Industry Report' },
  { id: 7, name: 'TripAdvisor Travelers\' Choice 2025', url: 'https://tripadvisor.mediaroom.com/2025-01-09-Tripadvisor-Reveals-2025s-Must-Visit-Destinations-Top-Picks-From-Travelers-Around-the-World', type: 'T2 — Review Aggregation' },
  { id: 8, name: 'Forbes Travel Guide — Top Destinations 2026', url: 'https://www.forbes.com/sites/forbestravelguide/2025/12/28/forbes-travel-guides-top-destinations-for-2026/', type: 'T2 — Editorial' },
  { id: 9, name: 'National Geographic — Best of the World 2026', url: 'https://www.nationalgeographic.com/travel/article/best-of-the-world-2026', type: 'T2 — Editorial' },
  { id: 10, name: 'Condé Nast Traveler — Best Places 2025', url: 'https://www.cntraveler.com/story/best-places-to-go-in-2025', type: 'T2 — Editorial' },
  { id: 11, name: 'World\'s 50 Best Hotels 2025', url: 'https://www.theworlds50best.com/stories/News/the-worlds-50-best-hotels-2025-the-list.html', type: 'T2 — Industry Award' },
  { id: 12, name: 'Time Out — World\'s Best Nightlife Cities 2025', url: 'https://www.timeout.com/about/latest-news/time-out-reveals-the-worlds-best-cities-for-nightlife-right-now-with-las-vegas-madrid-and-paris-topping-the-list-072225', type: 'T2 — Survey' },
  { id: 13, name: 'Forbes — Safest Places to Travel 2025', url: 'https://www.forbes.com/sites/laurabegleybloom/2024/12/28/the-safest-places-to-travel-in-2025-according-to-a-new-report/', type: 'T2 — Report' },
  { id: 14, name: 'World Population Review — Safest Countries 2026', url: 'https://worldpopulationreview.com/country-rankings/safest-countries-in-the-world', type: 'T2 — Aggregated Data' },
  { id: 15, name: 'Michelin Guide — Best Places to Eat 2025', url: 'https://guide.michelin.com/en/article/travel/best-places-to-eat-in-2025', type: 'T2 — Industry Guide' },
  { id: 16, name: 'Condé Nast Traveller — Best Countries for Food 2025', url: 'https://www.cntraveller.com/gallery/best-countries-for-food', type: 'T2 — Reader Survey' },
  { id: 17, name: 'World\'s 50 Best Beaches 2025', url: 'https://worlds50beaches.com/', type: 'T2 — Expert Panel' },
];
