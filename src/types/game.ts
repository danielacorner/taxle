export interface Species {
  scientificName: string;
  wikipediaUrl: string;
  genus: string;
  species: string;
}

export type GuessResult = ('correct' | 'present' | 'absent')[];

export interface GameState {
  currentGuess: string;
  guesses: string[];
  results: GuessResult[];
  gameStatus: 'playing' | 'won' | 'lost' | 'gave_up';
  targetSpecies: Species | null;
}
