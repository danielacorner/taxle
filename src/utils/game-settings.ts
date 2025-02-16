import { atom } from 'jotai';

// Determine if we're in development mode
const isDev = import.meta.env.DEV;

// Create an atom to store the selection mode
export const speciesSelectionModeAtom = atom<'random' | 'daily'>('daily');
// export const speciesSelectionModeAtom = atom<'random' | 'daily'>(isDev ? 'random' : 'daily');

// Function to get today's species index
export const getTodaysSpeciesIndex = (speciesCount: number, mode: 'random' | 'daily' = 'daily') => {
  if (mode === 'random' || isDev) {
    return Math.floor(Math.random() * speciesCount);
  }

  // In production with daily mode, use the day of the year (0-364)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now as any) - (start as any);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay) - 1;
  
  // Ensure we stay within the species count
  return dayOfYear % speciesCount;
};
