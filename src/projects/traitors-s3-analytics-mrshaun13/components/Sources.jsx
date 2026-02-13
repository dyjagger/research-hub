import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

const SOURCES = [
  {
    title: 'The Traitors (American TV series) — Wikipedia',
    url: 'https://en.wikipedia.org/wiki/The_Traitors_(American_TV_series)',
    description: 'Season 3 episode guide, cast list, elimination order, and production details.',
    type: 'Encyclopedia',
  },
  {
    title: 'Peacock Official Episode Recaps (Ep 1–11)',
    url: 'https://www.peacocktv.com/stream-tv/the-traitors',
    description: 'Official episode summaries, mission results, roundtable outcomes, and murder reveals.',
    type: 'Primary Source',
  },
  {
    title: 'NBC Insider — The Traitors Coverage',
    url: 'https://www.nbcinsider.com/the-traitors/',
    description: 'Cast interviews, behind-the-scenes features, and episode breakdowns.',
    type: 'News',
  },
  {
    title: 'The Traitors Wiki — Fandom',
    url: 'https://the-traitors.fandom.com/wiki/The_Traitors_US_Season_3',
    description: 'Community-maintained player stats, alliance tracking, and detailed episode recaps.',
    type: 'Community Wiki',
  },
  {
    title: 'Reality TV World — The Traitors',
    url: 'https://www.realitytvworld.com/realitytvdb/the-traitors/',
    description: 'Episode ratings, viewer statistics, and season comparisons.',
    type: 'Database',
  },
];

export default function Sources() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen size={16} className="text-amber-400" />
        <h2 className="text-sm font-bold text-stone-300 uppercase tracking-wider">Sources & References</h2>
      </div>
      <p className="text-xs text-stone-500">
        Data compiled from the following sources. Player statistics, social game scores, and deception logs
        were derived from episode-by-episode analysis of official recaps and community documentation.
      </p>
      <div className="space-y-2">
        {SOURCES.map((source, i) => (
          <a
            key={i}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-stone-900/50 border border-stone-700/30 rounded-lg p-3 hover:border-red-700/40 hover:bg-stone-900/70 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 px-1.5 py-0.5 rounded bg-stone-800/60">
                    {source.type}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-stone-200 group-hover:text-red-300 transition-colors truncate">
                  {source.title}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{source.description}</p>
              </div>
              <ExternalLink size={14} className="text-stone-600 group-hover:text-red-400 flex-shrink-0 mt-1 transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
