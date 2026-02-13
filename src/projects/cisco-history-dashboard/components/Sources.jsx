import React from 'react';
import { ExternalLink, BookOpen, Database, Globe, Building2 } from 'lucide-react';

const sources = [
  {
    category: 'Cisco Official Sources',
    icon: Building2,
    items: [
      { name: 'Cisco Innovation Timeline', url: 'https://newsroom.cisco.com/c/r/newsroom/en/us/interactive/cisco-innovation-timeline.html', description: 'Official product and innovation history from Cisco Newsroom' },
      { name: 'Cisco Acquisitions by Year', url: 'https://www.cisco.com/site/us/en/about/corporate-development/acquisitions/acquisitions-list-years/index.html', description: 'Complete official list of all Cisco acquisitions with descriptions' },
      { name: 'Cisco Annual Reports', url: 'https://www.cisco.com/c/en/us/about/annual-reports.html', description: 'Financial statements, revenue, and strategic direction (FY2016-2025)' },
      { name: 'Cisco FY2025 Earnings Release', url: 'https://investor.cisco.com/news/news-details/2025/CISCO-REPORTS-FOURTH-QUARTER-AND-FISCAL-YEAR-2025-EARNINGS/', description: 'Q4 and full year FY2025 financial results' },
    ],
  },
  {
    category: 'Financial Data',
    icon: Database,
    items: [
      { name: 'MacroTrends — Cisco Revenue', url: 'https://www.macrotrends.net/stocks/charts/CSCO/cisco/revenue', description: 'Annual/quarterly revenue history 2011-2025' },
      { name: 'MacroTrends — Cisco Net Income', url: 'https://www.macrotrends.net/stocks/charts/CSCO/cisco/net-income', description: 'Annual/quarterly net income history 2011-2025' },
      { name: 'StockAnalysis.com — Revenue', url: 'https://stockanalysis.com/stocks/csco/revenue/', description: 'Revenue history 2005-2025 from SEC filings' },
      { name: 'StockAnalysis.com — Employees', url: 'https://stockanalysis.com/stocks/csco/employees/', description: 'Employee count history 1995-2025 from SEC filings' },
      { name: 'CompaniesMarketCap — Cisco', url: 'https://companiesmarketcap.com/cisco/marketcap/', description: 'Market capitalization history 1996-2026' },
    ],
  },
  {
    category: 'Reference & Context',
    icon: BookOpen,
    items: [
      { name: 'Wikipedia — Cisco', url: 'https://en.wikipedia.org/wiki/Cisco', description: 'Comprehensive company history, products, and leadership' },
      { name: 'Wikipedia — List of acquisitions by Cisco', url: 'https://en.wikipedia.org/wiki/List_of_acquisitions_by_Cisco', description: 'Complete acquisition list with dates, values, and categories' },
      { name: 'Britannica Money — Cisco Systems', url: 'https://www.britannica.com/money/Cisco-Systems-Inc', description: 'Company history and facts' },
      { name: 'CNBC — Cisco stock record', url: 'https://www.cnbc.com/2025/12/10/ciscos-stock-closes-at-record-for-first-time-since-dot-com-peak-2000.html', description: 'Stock finally surpasses dot-com era record (Dec 2025)' },
      { name: 'Business Insider — 25-year recovery', url: 'https://www.businessinsider.com/cisco-stock-price-crash-25-year-recovery-ai-dotcom-bubble-2025-11', description: 'Analysis of Cisco\'s 25-year stock recovery' },
    ],
  },
];

export default function Sources() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">Sources & Methodology</h2>
      <p className="text-slate-400 mb-6">
        Data sourced from Cisco's official publications and cross-referenced with third-party financial databases
      </p>

      <div className="space-y-8">
        {sources.map((group, i) => (
          <div key={i}>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              {group.category}
            </h3>
            <div className="space-y-2">
              {group.items.map((item, j) => (
                <a
                  key={j}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-800/40 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-400 font-medium text-sm group-hover:text-cyan-300">{item.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                  <p className="text-slate-400 text-xs">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Methodology Notes</h3>
        <ul className="text-slate-400 text-sm space-y-2">
          <li>• <strong className="text-slate-300">Revenue & Net Income:</strong> Fiscal year data (ending late July). FY2025 = July 2025. Sourced from Cisco Annual Reports and SEC filings via MacroTrends and StockAnalysis.com.</li>
          <li>• <strong className="text-slate-300">Market Cap:</strong> End-of-calendar-year values from CompaniesMarketCap.com. The ~$555B dot-com peak was an intraday high in March 2000.</li>
          <li>• <strong className="text-slate-300">Employee Count:</strong> From SEC filings (10-K annual reports). Includes all full-time employees worldwide.</li>
          <li>• <strong className="text-slate-300">Acquisitions:</strong> Compiled from Cisco.com's official acquisitions page and cross-referenced with Wikipedia. Deal values are as publicly reported; many smaller acquisitions have undisclosed values.</li>
          <li>• <strong className="text-slate-300">Acquisition Categories:</strong> Manually categorized based on the acquired company's primary business as described by Cisco.com. Some companies span multiple categories.</li>
          <li>• <strong className="text-slate-300">Early Revenue (1990-1995):</strong> Estimated from historical sources and Cisco's IPO filings. Exact figures may vary slightly by source.</li>
        </ul>
      </div>

      <div className="mt-4 text-center text-slate-600 text-xs">
        Dashboard built February 2026. Data current as of February 9, 2026.
      </div>
    </div>
  );
}
