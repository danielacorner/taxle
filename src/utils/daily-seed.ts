/**
 * Get a consistent seed for the day that changes at midnight
 * This ensures all users get the same species on a given day in production
 */
export const getDailySeed = (date: Date = new Date()): number => {
  // In development, return a random seed unless explicitly testing production mode
  if (import.meta.env.NODE_ENV !== 'production' && !import.meta.env.FORCE_PRODUCTION_MODE) {
    return Math.random();
  }

  // In production, create a seed based on the current date (ignoring time)
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // Create a unique number for each day by combining year, month, and day
  // This ensures the same seed is used throughout the day
  return ((year * 100 + month) * 100 + day) / 1000000;
};

/**
 * Get a random integer between 0 and max-1 using a seed
 */
export const getSeededRandom = (seed: number, max: number): number => {
  // Simple seeded random number generator
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * max);
};
