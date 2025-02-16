import { TopicId, WordEntry } from './topics';

export interface Species {
  scientificName: string;
  wikipediaUrl: string;
  genus: string;
  species: string;
}

export type GameStatus = 'selecting' | 'playing' | 'won' | 'lost';

export type GuessResult = Array<'correct' | 'present' | 'absent'>;

export interface GameState {
  currentGuess: string;
  guesses: string[];
  results: GuessResult[];
  gameStatus: GameStatus;
  selectedTopic?: TopicId;
  targetWord?: WordEntry;
  targetSpecies: Species | null;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
}
