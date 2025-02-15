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
    
    const target = gameState.targetSpecies.scientificName;
    const result: GuessResult = Array(target.length).fill('absent');
    const targetChars = [...target];
    const guessChars = [...guess];
    
    // First pass: mark correct letters (exact case match)
    guessChars.forEach((char, i) => {
      if (char === targetChars[i]) {
        result[i] = 'correct';
        targetChars[i] = '#';  // Mark as used
      }
    });
    
    // Second pass: mark present letters (case-insensitive)
    guessChars.forEach((char, i) => {
      if (result[i] !== 'correct' && char !== ' ') {
        const targetIndex = targetChars.findIndex(c => 
          c !== '#' && c.toLowerCase() === char.toLowerCase()
        );
        if (targetIndex !== -1) {
          result[i] = 'present';
          targetChars[targetIndex] = '#';  // Mark as used
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
    const guess = gameState.currentGuess;
    
    // Compare lengths ignoring spaces
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

      // Check if won - needs exact match including case and spaces
      if (guess === targetWord) {
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
      newGuess += ' ';  // Add spaces directly
      nextPos++;
    }
    
    // If we haven't reached the end and the next position is valid
    if (nextPos < targetWord.length) {
      // Add the new letter, preserving case based on target word
      const targetChar = targetWord[nextPos];
      if (targetChar.toLowerCase() === key.toLowerCase()) {
        newGuess += targetChar;  // Use target's case
      } else {
        newGuess += key.toUpperCase();  // Always uppercase for non-matching letters
      }
      
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

  return {
    gameState,
    letterStates,
    handleGuess,
    handleKeyPress,
    handleDelete,
  };
};
