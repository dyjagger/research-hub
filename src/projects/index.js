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
];

export const projectComponents = {
  'satisfactory-optimized-builds': lazy(() => import('./satisfactory-optimized-builds/App')),
};
