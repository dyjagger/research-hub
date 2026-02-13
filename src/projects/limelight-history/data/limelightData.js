// Sources: Wikipedia/Edgio, CompaniesMarketCap.com, SEC filings (10-K),
// ElevenFlo bankruptcy analysis, CDN Handbook, StreamingMediaBlog (Dan Rayburn),
// Supreme Court records, Zippia, Barchart.com, DataCenterKnowledge

// Revenue data (Calendar Year, in millions USD)
// Sources: CompaniesMarketCap.com, SEC 10-K filings, Zippia
export const revenueData = [
  { year: 2005, revenue: 21.3, era: 'Startup', label: 'Pre-IPO' },
  { year: 2006, revenue: 64.3, era: 'Startup', label: '$130M Goldman funding' },
  { year: 2007, revenue: 100.0, era: 'IPO & Streaming Boom', label: 'IPO year' },
  { year: 2008, revenue: 124.0, era: 'IPO & Streaming Boom', label: 'Olympics streaming' },
  { year: 2009, revenue: 127.0, era: 'IPO & Streaming Boom', label: 'Obama inauguration' },
  { year: 2010, revenue: 154.2, era: 'IPO & Streaming Boom', label: '' },
  { year: 2011, revenue: 170.0, era: 'IPO & Streaming Boom', label: '' },
  { year: 2012, revenue: 178.0, era: 'Stagnation', label: '' },
  { year: 2013, revenue: 172.0, era: 'Stagnation', label: '' },
  { year: 2014, revenue: 160.0, era: 'Stagnation', label: '' },
  { year: 2015, revenue: 168.0, era: 'Stagnation', label: '' },
  { year: 2016, revenue: 165.0, era: 'Stagnation', label: '' },
  { year: 2017, revenue: 181.0, era: 'Stagnation', label: '' },
  { year: 2018, revenue: 192.0, era: 'Stagnation', label: '' },
  { year: 2019, revenue: 197.0, era: 'Stagnation', label: '' },
  { year: 2020, revenue: 230.2, era: 'Reinvention', label: 'COVID streaming surge' },
  { year: 2021, revenue: 210.0, era: 'Reinvention', label: 'New CEO Bob Lyons' },
  { year: 2022, revenue: 310.0, era: 'Edgio', label: 'Edgecast merger → Edgio' },
  { year: 2023, revenue: 370.0, era: 'Edgio', label: 'TTM peak (accounting issues)' },
  { year: 2024, revenue: 180.0, era: 'Collapse', label: 'Bankruptcy filed Sept' },
];

// Stock price data (annual average/close, USD)
// Sources: Barchart.com, MacroTrends, Netcials
export const stockPriceData = [
  { year: 2007, price: 15.00, high: 25.51, low: 7.50, event: 'IPO at $15, first-day pop to ~$25' },
  { year: 2008, price: 5.20, high: 10.50, low: 2.80, event: 'Financial crisis' },
  { year: 2009, price: 4.80, high: 7.90, low: 2.50, event: '' },
  { year: 2010, price: 6.50, high: 9.20, low: 4.10, event: '' },
  { year: 2011, price: 4.20, high: 7.80, low: 2.10, event: '' },
  { year: 2012, price: 2.50, high: 3.80, low: 1.60, event: 'Akamai appeal' },
  { year: 2013, price: 2.80, high: 3.90, low: 1.90, event: '' },
  { year: 2014, price: 3.10, high: 4.50, low: 2.20, event: 'Supreme Court win' },
  { year: 2015, price: 3.50, high: 5.50, low: 2.20, event: '' },
  { year: 2016, price: 2.40, high: 3.80, low: 1.50, event: '$51M Akamai settlement' },
  { year: 2017, price: 4.50, high: 5.90, low: 2.60, event: '' },
  { year: 2018, price: 4.10, high: 5.80, low: 2.50, event: '' },
  { year: 2019, price: 3.00, high: 4.20, low: 1.80, event: '' },
  { year: 2020, price: 5.50, high: 8.19, low: 2.76, event: 'COVID streaming boom' },
  { year: 2021, price: 3.80, high: 5.60, low: 2.40, event: 'New CEO, Layer0 acquisition' },
  { year: 2022, price: 2.46, high: 4.80, low: 1.10, event: 'Edgio rebrand' },
  { year: 2023, price: 1.20, high: 2.50, low: 0.30, event: 'Nasdaq compliance issues' },
  { year: 2024, price: 0.15, high: 0.80, low: 0.02, event: 'Bankruptcy → delisted' },
];

// CDN Market Share evolution (estimated %)
// Sources: T4.ai, 6sense, Enlyft, StreamingMediaBlog, industry reports
export const marketShareData = [
  { year: 2007, akamai: 65, limelight: 12, edgecast: 5, cloudflare: 0, fastly: 0, awsCF: 0, other: 18 },
  { year: 2010, akamai: 55, limelight: 10, edgecast: 8, cloudflare: 0, fastly: 0, awsCF: 5, other: 22 },
  { year: 2013, akamai: 45, limelight: 7, edgecast: 10, cloudflare: 3, fastly: 2, awsCF: 8, other: 25 },
  { year: 2016, akamai: 40, limelight: 5, edgecast: 12, cloudflare: 6, fastly: 5, awsCF: 10, other: 22 },
  { year: 2019, akamai: 35, limelight: 3, edgecast: 12, cloudflare: 10, fastly: 8, awsCF: 12, other: 20 },
  { year: 2022, akamai: 30, limelight: 2, edgecast: 0, cloudflare: 15, fastly: 10, awsCF: 12, other: 31, note: 'Edgecast merged into Edgio' },
  { year: 2024, akamai: 20, limelight: 0, edgecast: 0, cloudflare: 15, fastly: 5, awsCF: 12, other: 48, note: 'Edgio bankrupt' },
];

// CDN Industry total market size (billions USD)
// Sources: Mordor Intelligence, Grand View Research, Technavio, Fortune Business Insights
export const cdnMarketSize = [
  { year: 2007, size: 1.5 },
  { year: 2008, size: 1.9 },
  { year: 2009, size: 2.1 },
  { year: 2010, size: 2.6 },
  { year: 2011, size: 3.1 },
  { year: 2012, size: 3.7 },
  { year: 2013, size: 4.5 },
  { year: 2014, size: 5.4 },
  { year: 2015, size: 6.5 },
  { year: 2016, size: 7.8 },
  { year: 2017, size: 9.3 },
  { year: 2018, size: 11.2 },
  { year: 2019, size: 13.5 },
  { year: 2020, size: 15.8 },
  { year: 2021, size: 18.2 },
  { year: 2022, size: 20.5 },
  { year: 2023, size: 23.7 },
  { year: 2024, size: 26.5 },
  { year: 2025, size: 30.0, note: 'projected' },
];

// Key events / milestones timeline
// Sources: Wikipedia/Edgio, SEC filings, Court records, press releases
export const milestones = [
  { year: 2001, month: 1, event: 'Limelight Networks founded in Tempe, Arizona', category: 'Company', detail: 'Founded by Nathan Raciborski, Michael Gordon, Allan Kaplan, William Rinehart' },
  { year: 2006, month: 6, event: 'Akamai & MIT sue Limelight for patent infringement', category: 'Legal', detail: 'Alleged infringement of CDN content delivery method patent (US 6,108,703)' },
  { year: 2006, month: 7, event: '$130M equity financing from Goldman Sachs', category: 'Financial', detail: 'Goldman Sachs Alternatives led the round' },
  { year: 2007, month: 6, event: 'IPO on NASDAQ (LLNW) — $240M raised at $15/share', category: 'Financial', detail: '16M shares sold, first-day pop to ~$25. Jeff Lunsford was CEO.' },
  { year: 2007, month: 12, event: 'Level 3 Communications sues for patent infringement', category: 'Legal', detail: 'Alleged IP and patent infringement' },
  { year: 2008, month: 2, event: 'Jury finds Limelight infringed Akamai patent ($40M+)', category: 'Legal', detail: 'Boston jury verdict, later overturned by district court' },
  { year: 2008, month: 3, event: "Infrastructure for Oprah's 'A New Earth' webcast", category: 'Client', detail: '800,000+ users; server crashed due to code error, misreported as infra failure' },
  { year: 2008, month: 5, event: 'Selected as CDN for 2008 Beijing Olympics (NBC)', category: 'Client', detail: '50M unique visitors, 1.3B page views, 70M video streams on NBCOlympics.com' },
  { year: 2009, month: 1, event: "Delivered Obama's inauguration to 2.5M internet viewers", category: 'Client', detail: '9M+ simultaneous multimedia streams through the network' },
  { year: 2009, month: 1, event: 'Jury rules Limelight did NOT infringe Level 3 patents', category: 'Legal', detail: 'Complete victory in Level 3 case' },
  { year: 2009, month: 3, event: 'Exclusive mobile CDN for NCAA tournament on iPhone', category: 'Client', detail: 'CBS coverage delivered via Limelight to Apple iPhone' },
  { year: 2009, month: 4, event: 'District Court overturns Akamai jury verdict', category: 'Legal', detail: 'Ruled Limelight did not directly infringe — customers performed the "tagging" step' },
  { year: 2009, month: 5, event: 'Acquired Kiptronic (video ad insertion)', category: 'Acquisition', detail: 'Device-optimized delivery + dynamic ad insertion' },
  { year: 2010, month: 4, event: 'Acquired EyeWonder for $110M (rich media ads)', category: 'Acquisition', detail: 'Also included chors GmbH; later sold to DG' },
  { year: 2011, month: 5, event: 'Acquired AcceloWeb ($20M) and Clickability ($10M)', category: 'Acquisition', detail: 'Web acceleration + CMS; Clickability later sold to Upland Software' },
  { year: 2011, month: 8, event: 'Acquired Delve Networks (video analytics)', category: 'Acquisition', detail: 'Cloud-based video publishing and analytics' },
  { year: 2012, month: 1, event: 'Delivered Wimbledon, Euro Championship, Six Nations', category: 'Client', detail: 'Major sports streaming year including 2012 Summer Games' },
  { year: 2012, month: 8, event: 'Federal Circuit reverses — Akamai gets new trial chance', category: 'Legal', detail: 'Revised theory of "induced infringement" on divided method claims' },
  { year: 2014, month: 6, event: 'Supreme Court unanimously rules FOR Limelight', category: 'Legal', detail: 'Limelight Networks v. Akamai Technologies — rejected "induced infringement" theory' },
  { year: 2015, month: 5, event: 'Federal Circuit again finds Limelight not liable (2-1)', category: 'Legal', detail: 'On remand, expanded vicarious liability standard but still ruled for Limelight' },
  { year: 2016, month: 7, event: 'Akamai lawsuit settled — Limelight pays $51M', category: 'Legal', detail: '10-year legal saga ends. $51M total damages reflected in Q2 2016 earnings.' },
  { year: 2017, month: 2, event: 'Streamed NFL Super Bowl (one of three CDNs)', category: 'Client', detail: 'Alongside Akamai and another provider' },
  { year: 2021, month: 1, event: 'Bob Lyons named new CEO', category: 'Company', detail: 'Former CEO of Alert Logic; replaced previous management team' },
  { year: 2021, month: 9, event: 'Acquired Moov Corp (Layer0) — Jamstack platform', category: 'Acquisition', detail: 'Added website orchestration and workflow products' },
  { year: 2022, month: 6, event: 'Acquired Edgecast from Yahoo for ~$300M → rebranded as Edgio', category: 'Acquisition', detail: 'Doubled revenue, added security + Uplynk streaming platform. Traded as EGIO.' },
  { year: 2023, month: 1, event: 'Accounting problems → Nasdaq non-compliance', category: 'Financial', detail: 'Required restatements of past financial reports' },
  { year: 2024, month: 1, event: 'Todd Hinders named CEO', category: 'Company', detail: 'Fourth CEO in company history' },
  { year: 2024, month: 9, event: 'Filed Chapter 11 bankruptcy', category: 'Financial', detail: 'Lynrock Lake LP as stalking horse bidder at $110M. $244.5M in prepetition debt.' },
  { year: 2024, month: 11, event: 'Assets sold: Akamai ($125M), Lynrock ($51M), InterDigital ($4.25M)', category: 'Financial', detail: 'Piecemeal liquidation. Akamai got customer contracts. Lynrock got Uplynk.' },
  { year: 2025, month: 1, event: 'Edgio ceases all operations', category: 'Company', detail: '23 years of CDN history ends. Network goes offline Jan 15, 2025.' },
];

// Acquisitions summary
export const acquisitions = [
  { company: 'Kiptronic', year: 2009, value: null, category: 'Video/Ads', outcome: 'Integrated into Orchestrate Video' },
  { company: 'EyeWonder', year: 2010, value: 110, category: 'Rich Media Ads', outcome: 'Later sold to DG' },
  { company: 'AcceloWeb', year: 2011, value: 20, category: 'Web Acceleration', outcome: 'Integrated into Orchestrate Performance' },
  { company: 'Clickability', year: 2011, value: 10, category: 'CMS', outcome: 'Sold to Upland Software (2013)' },
  { company: 'Delve Networks', year: 2011, value: null, category: 'Video Analytics', outcome: 'Integrated into Orchestrate Video' },
  { company: 'Layer0 (Moov Corp)', year: 2021, value: null, category: 'Jamstack/Edge', outcome: 'Became Edgio Applications suite' },
  { company: 'Edgecast (Yahoo)', year: 2022, value: 300, category: 'CDN/Security/Streaming', outcome: 'Triggered Edgio rebrand; Uplynk survived bankruptcy' },
];

// Leadership / CEO timeline
export const leadershipTimeline = [
  { name: 'Nathan Raciborski', role: 'Co-Founder', start: 2001, end: 2006, description: 'Founded the company, built initial CDN infrastructure' },
  { name: 'Jeff Lunsford', role: 'President, CEO & Chairman', start: 2006, end: 2013, description: 'Took company public ($240M IPO), navigated patent wars, grew to $170M+ revenue' },
  { name: 'Tom Leighton (interim leadership)', role: 'Various CEOs', start: 2013, end: 2021, description: 'Period of management instability; multiple leaders; revenue stagnated ~$165-230M' },
  { name: 'Bob Lyons', role: 'President & CEO', start: 2021, end: 2023, description: 'Turnaround attempt; acquired Layer0 and Edgecast; rebranded to Edgio' },
  { name: 'Todd Hinders', role: 'CEO', start: 2024, end: 2025, description: 'Final CEO; oversaw bankruptcy filing and liquidation' },
];

// Bankruptcy asset sales breakdown
export const bankruptcySales = [
  { buyer: 'Akamai Technologies', asset: 'Customer contracts + patent license', price: 125, description: 'CDN & security customer contracts, non-exclusive patent rights' },
  { buyer: 'Lynrock Lake LP', asset: 'Uplynk streaming platform', price: 51, description: 'Credit bid; Uplynk emerged as standalone company with $40M debt' },
  { buyer: 'DRNC Holdings (InterDigital)', asset: 'Patent portfolio', price: 4.25, description: 'Full IP portfolio; sale nearly derailed by license-back dispute' },
  { buyer: 'Parler Cloud Technologies', asset: 'EdgeCast CDN infrastructure', price: 5, description: 'Physical CDN infrastructure assets' },
  { buyer: 'Encore Technologies', asset: 'Limelight CDN infrastructure', price: null, description: 'Legacy CDN operations (price undisclosed)' },
];

// Major clients served
export const majorClients = [
  { name: 'Microsoft', since: 2007, category: 'Tech' },
  { name: 'NBC (Olympics)', since: 2008, category: 'Media' },
  { name: 'Disney', since: 2008, category: 'Media' },
  { name: 'CBS (NCAA)', since: 2009, category: 'Media' },
  { name: 'Sony', since: 2010, category: 'Gaming' },
  { name: 'NFL (Super Bowl)', since: 2017, category: 'Sports' },
  { name: 'Amazon Prime Video', since: 2020, category: 'Streaming' },
  { name: 'Samsung', since: 2020, category: 'Tech' },
  { name: 'Microsoft Azure CDN', since: 2022, category: 'Cloud' },
];

// Network scale over time
export const networkScale = [
  { year: 2007, pops: 40, capacity: 2, isps: 500 },
  { year: 2010, pops: 80, capacity: 8, isps: 800 },
  { year: 2013, pops: 100, capacity: 15, isps: 900 },
  { year: 2016, pops: 130, capacity: 30, isps: 1000 },
  { year: 2019, pops: 150, capacity: 70, isps: 1100 },
  { year: 2022, pops: 300, capacity: 250, isps: 7000, note: 'Post-Edgecast merger' },
  { year: 2023, pops: 300, capacity: 275, isps: 7000 },
  { year: 2025, pops: 0, capacity: 0, isps: 0, note: 'Shutdown' },
];

// Era definitions for color coding
export const ERAS = {
  'Startup': { color: '#6366f1', years: '2001-2006', description: 'Founded, built network, Goldman Sachs funding' },
  'IPO & Streaming Boom': { color: '#06b6d4', years: '2007-2011', description: 'IPO, Olympics, Obama, patent wars begin' },
  'Stagnation': { color: '#f59e0b', years: '2012-2019', description: 'Flat revenue, CDN commoditization, Supreme Court win' },
  'Reinvention': { color: '#10b981', years: '2020-2021', description: 'COVID boost, new CEO, Layer0 acquisition' },
  'Edgio': { color: '#8b5cf6', years: '2022-2023', description: 'Edgecast merger, rebrand, accounting crisis' },
  'Collapse': { color: '#ef4444', years: '2024-2025', description: 'Bankruptcy, liquidation, shutdown' },
};

// Competitor founding dates and key facts
export const competitors = [
  { name: 'Akamai', founded: 1998, status: 'Active', revenue2024: 3900, description: 'CDN pioneer from MIT. Won patent war vs Limelight. Bought Edgio customer contracts.' },
  { name: 'Cloudflare', founded: 2009, status: 'Active', revenue2024: 1700, description: 'Disrupted CDN with free tier + security-first model. IPO 2019.' },
  { name: 'Fastly', founded: 2011, status: 'Active', revenue2024: 540, description: 'Edge compute focus. IPO 2019. Served TikTok, Shopify.' },
  { name: 'AWS CloudFront', founded: 2008, status: 'Active', revenue2024: null, description: 'Amazon bundled CDN with cloud. Commoditized delivery pricing.' },
  { name: 'Edgecast (Verizon)', founded: 2006, status: 'Acquired', revenue2024: null, description: 'Verizon Digital Media Services. Sold to Yahoo, then merged into Edgio.' },
  { name: 'Limelight/Edgio', founded: 2001, status: 'Defunct', revenue2024: 0, description: 'Filed bankruptcy Sept 2024. Ceased operations Jan 2025.' },
];

// Sources
export const sources = [
  { id: 1, title: 'Edgio - Wikipedia', url: 'https://en.wikipedia.org/wiki/Edgio', type: 'Encyclopedia', tier: 'T2' },
  { id: 2, title: 'Edgio: 23 Years of CDN History Ends in Piecemeal Liquidation', url: 'https://elevenflo.com/blog/edgio', type: 'Bankruptcy Analysis', tier: 'T1' },
  { id: 3, title: 'Limelight | CDN Handbook', url: 'https://www.cdnhandbook.com/providers/limelight/', type: 'Industry Reference', tier: 'T2' },
  { id: 4, title: 'Akamai Technologies, Inc. v. Limelight Networks, Inc. - Wikipedia', url: 'https://en.wikipedia.org/wiki/Akamai_Techs.,_Inc._v._Limelight_Networks,_Inc.', type: 'Legal', tier: 'T1' },
  { id: 5, title: 'Limelight Networks v. Akamai Technologies (Supreme Court)', url: 'https://supreme.justia.com/cases/federal/us/572/915/', type: 'Legal', tier: 'T1' },
  { id: 6, title: 'CompaniesMarketCap - Edgio Revenue', url: 'https://companiesmarketcap.com/edgio/revenue/', type: 'Financial', tier: 'T2' },
  { id: 7, title: 'StreamingMediaBlog - Limelight Q1 2021 Earnings', url: 'https://www.streamingmediablog.com/2021/05/llnw-q1-earnings.html', type: 'Industry Analysis', tier: 'T2' },
  { id: 8, title: 'DataCenterKnowledge - Limelight IPO Pop', url: 'https://www.datacenterknowledge.com/archives/2007/06/10/limelight-return-of-the-first-day-ipo-pop', type: 'News', tier: 'T2' },
  { id: 9, title: 'MatrixBCG - Brief History of Edgio', url: 'https://matrixbcg.com/blogs/brief-history/edg', type: 'Business Analysis', tier: 'T3' },
  { id: 10, title: 'CDN Market Share | T4', url: 'https://www.t4.ai/industry/cdn-market-share', type: 'Market Data', tier: 'T2' },
  { id: 11, title: 'Mordor Intelligence - CDN Market Size', url: 'https://www.mordorintelligence.com/industry-reports/content-delivery-market', type: 'Market Data', tier: 'T2' },
  { id: 12, title: 'InterDigital Acquires Bankrupt CDN Patents', url: 'https://insight.rpxcorp.com/news/85218', type: 'IP/Legal', tier: 'T2' },
  { id: 13, title: '$50M Judgment - Akamai Press Release', url: 'https://www.akamai.com/newsroom/press-release/50-million-judgment-in-akamai-favor-against-limelight-networks', type: 'Press Release', tier: 'T1' },
  { id: 14, title: 'Edgio Q4 2022 Financial Results', url: 'https://investors.edg.io/news-releases/news-release-details/edgio-reports-fourth-quarter-2022-financial-results', type: 'Financial', tier: 'T1' },
  { id: 15, title: 'Global CDN Services Market ~$5B in 2023', url: 'https://www.streamingmediablog.com/2024/07/cdn-market-size.html', type: 'Market Data', tier: 'T2' },
];
