import { lazy } from 'react';

export const projectRegistry = [
  {
    slug: 'satisfactory-optimized-builds',
    title: 'Satisfactory Optimized Builds',
    subtitle: 'Deep Dive into Factory Optimization, Ratios & Alternate Recipes',
    query: 'deep dive research into the most optimized satisfactory builds',
    lens: 'standard',
    icon: 'Factory',
    accentColor: 'orange',
    createdAt: '2026-02-10T21:26:00Z',
  },
  {
    slug: 'japan-dmc-luxury-travel',
    title: 'Japan DMC & Luxury Travel Intelligence',
    subtitle: 'Destination Management Companies for Japan Luxury Tourism',
    query: 'deep dive research into Destination Management Companies (DMC) for Japan, Japan tourism, japan luxe tourism for a travel specialist agent',
    lens: 'standard',
    icon: 'Plane',
    accentColor: 'rose',
    createdAt: '2026-02-10T22:23:00Z',
  },
  {
    slug: 'bar-raptors-4p-guide',
    title: 'BAR Raptors 4P Guide',
    subtitle: 'Optimized 4-Player Team Build vs Raptors — Hardest Difficulty',
    query: 'research beyond all reason, specifically for a 4 person player team going up against the AI raptors on the hardest difficulty setting, what is the optimized build for these four players to do',
    lens: 'standard',
    icon: 'Shield',
    accentColor: 'red',
    createdAt: '2026-02-10T22:23:00Z',
  },
];

export const projectComponents = {
  'satisfactory-optimized-builds': lazy(() => import('./satisfactory-optimized-builds/App')),
  'japan-dmc-luxury-travel': lazy(() => import('./japan-dmc-luxury-travel/App')),
  'bar-raptors-4p-guide': lazy(() => import('./bar-raptors-4p-guide/App')),
};
