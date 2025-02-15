import { useState, useEffect } from "react";
import { Species, GuessResult, GameState } from "@/types/game";
import { speciesDatabase } from "@/data/species";
import { useToast } from "@/hooks/use-toast";

export const useGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    currentGuess: "",
    guesses: [],
    results: [],
    gameStatus: "playing",
    targetSpecies: null,
  });

  const [letterStates, setLetterStates] = useState<Record<string, 'correct' | 'present' | 'absent'>>({});

  useEffect(() => {
    // For MVP, just select a random species
    const randomSpecies = speciesDatabase[Math.floor(Math.random() * speciesDatabase.length)];
    setGameState(prev => ({ ...prev, targetSpecies: randomSpecies }));
  }, []);

  const checkGuess = (guess: string): GuessResult => {
    if (!gameState.targetSpecies) return [];
    
    const target = gameState.targetSpecies.scientificName.toLowerCase();
    guess = guess.toLowerCase();
    
    const result: GuessResult = Array(guess.length).fill('absent');
    const targetChars = [...target];  // Create a copy to avoid modifying original
    const remainingTargetChars = [...target];  // Second copy for second pass
    const guessChars = [...guess];
    
    // First pass: mark correct letters
    guessChars.forEach((char, i) => {
      if (char === targetChars[i]) {
        result[i] = 'correct';
        remainingTargetChars[i] = '#';  // Mark as used for second pass
      }
    });
    
    // Second pass: mark present letters
    guessChars.forEach((char, i) => {
      if (result[i] !== 'correct' && char !== ' ') {  // Only check if not already marked correct
        const targetIndex = remainingTargetChars.findIndex(c => c === char);
        if (targetIndex !== -1) {
          result[i] = 'present';
          remainingTargetChars[targetIndex] = '#';  // Mark as used
        }
      }
    });
    
    return result;
  };

  const updateLetterStates = (guess: string, result: GuessResult) => {
    const newStates = { ...letterStates };
    guess.toUpperCase().split('').forEach((letter, i) => {
      if (letter === ' ') return;
      
      const currentState = newStates[letter];
      const newState = result[i];
      
      if (newState === 'correct') {
        newStates[letter] = 'correct';
      } else if (newState === 'present' && currentState !== 'correct') {
        newStates[letter] = 'present';
      } else if (!currentState && newState === 'absent') {
        newStates[letter] = 'absent';
      }
    });
    setLetterStates(newStates);
  };

  const handleGuess = () => {
    if (!gameState.targetSpecies) return;
    
    const targetWord = gameState.targetSpecies.scientificName;
    let guess = gameState.currentGuess;
    
    // Add spaces to match target word
    targetWord.split('').forEach((char, i) => {
      if (char === ' ') {
        guess = guess.slice(0, i) + ' ' + guess.slice(i);
      }
    });
    
    const nonSpaceTarget = targetWord.replace(/\s/g, '');
    const nonSpaceGuess = guess.replace(/\s/g, '');
    
    if (nonSpaceGuess.length !== nonSpaceTarget.length) {
      toast({
        title: "Invalid guess",
        description: "Your guess must contain the same number of letters as the target species name",
        variant: "destructive",
      });
      return;
    }

    const result = checkGuess(guess);
    updateLetterStates(guess, result);

    setGameState(prev => {
      const newState = {
        ...prev,
        guesses: [...prev.guesses, guess],
        results: [...prev.results, result],
        currentGuess: "",
      };

      if (result.every(r => r === 'correct')) {
        return {
          ...newState,
          gameStatus: 'won',
        };
      } else if (newState.guesses.length >= 6) {
        return {
          ...newState,
          gameStatus: 'lost',
        };
      }

      return newState;
    });
  };

  const handleKeyPress = (key: string) => {
    if (gameState.gameStatus !== 'playing' || !gameState.targetSpecies) return;
    
    const targetWord = gameState.targetSpecies.scientificName;
    let newGuess = gameState.currentGuess;
    
    // Find the next non-space position in the target word
    let nextPos = newGuess.length;
    while (nextPos < targetWord.length && targetWord[nextPos] === ' ') {
      nextPos++;
    }
    
    // If we haven't reached the end and the next position is valid
    if (nextPos < targetWord.length) {
      // Add any spaces before the new letter
      while (newGuess.length < nextPos) {
        newGuess += ' ';
      }
      // Add the new letter
      newGuess += key.toLowerCase();
      
      setGameState(prev => ({
        ...prev,
        currentGuess: newGuess,
      }));
    }
  };

  const handleDelete = () => {
    if (!gameState.currentGuess.length) return;
    
    let newGuess = gameState.currentGuess;
    // Remove trailing spaces and last character
    while (newGuess.length > 0 && newGuess[newGuess.length - 1] === ' ') {
      newGuess = newGuess.slice(0, -1);
    }
    if (newGuess.length > 0) {
      newGuess = newGuess.slice(0, -1);
    }
    
    setGameState(prev => ({
      ...prev,
      currentGuess: newGuess,
    }));
  };

  const handleGiveUp = () => {
    if (gameState.guesses.length < 6) {
      toast({
        title: "Keep trying!",
        description: "You need to make at least 6 guesses before giving up",
        variant: "destructive",
      });
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      gameStatus: 'gave_up'
    }));
  };

  return {
    gameState,
    letterStates,
    handleGuess,
    handleKeyPress,
    handleDelete,
    handleGiveUp,
  };
};
