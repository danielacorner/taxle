import ReactGA from "react-ga4";

// Initialize GA4 with your measurement ID
export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

// Track page views
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track game events
export const trackGameEvent = (action: string, label?: string, value?: number) => {
  ReactGA.event({
    category: "Game",
    action,
    label,
    value,
  });
};

// Track specific game events
export const gameEvents = {
  startGame: () => trackGameEvent("start_game"),
  gameWon: (attempts: number) => trackGameEvent("game_won", undefined, attempts),
  gameLost: (species: string) => trackGameEvent("game_lost", species),
  makeGuess: (attempt: number) => trackGameEvent("make_guess", undefined, attempt),
};
