import { useState, useEffect } from "react";
import { GameState, GuessResult } from "@/types/game";
import { useToast } from "@/hooks/use-toast";
import { gameEvents } from "@/utils/analytics";
import { TopicId } from "@/types/topics";
import { topics } from "@/data/topics";
import { getRandomWord } from "@/utils/word-utils";

export const useGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    currentGuess: "",
    guesses: [],
    results: [],
    gameStatus: "selecting",
  });

  const [letterStates, setLetterStates] = useState<Record<string, 'correct' | 'present' | 'absent'>>({});

  const selectTopic = (topicId: TopicId) => {
    const word = getRandomWord(topicId);
    setGameState(prev => ({
      ...prev,
      gameStatus: "playing",
      selectedTopic: topicId,
      targetWord: word,
    }));
    gameEvents.startGame();
  };

  const playAgain = () => {
    if (!gameState.selectedTopic) return;
    
    const word = getRandomWord(gameState.selectedTopic);
    setGameState({
      currentGuess: "",
      guesses: [],
      results: [],
      gameStatus: "playing",
      selectedTopic: gameState.selectedTopic,
      targetWord: word,
    });
    setLetterStates({});
    gameEvents.startGame();
  };

  const checkGuess = (guess: string): GuessResult => {
    if (!gameState.targetWord) return [];
    
    const target = gameState.targetWord.word;
    const result: GuessResult = new Array(target.length).fill("absent");
    const targetChars = target.split("");
    const guessChars = guess.split("");

    // First pass: mark correct letters
    guessChars.forEach((char, i) => {
      if (char === targetChars[i]) {
        result[i] = "correct";
        targetChars[i] = "#"; // mark as used
      }
    });

    // Second pass: mark present letters
    guessChars.forEach((char, i) => {
      if (result[i] === "correct") return;
      
      const targetIndex = targetChars.findIndex(c => c === char);
      if (targetIndex !== -1) {
        result[i] = "present";
        targetChars[targetIndex] = "#"; // mark as used
      }
    });

    return result;
  };

  const submitGuess = () => {
    if (!gameState.targetWord || gameState.currentGuess.length !== gameState.targetWord.word.length) {
      toast({
        title: "Invalid guess",
        description: `Guess must be ${gameState.targetWord?.word.length} letters long.`,
      });
      return;
    }

    const result = checkGuess(gameState.currentGuess);
    const newGuesses = [...gameState.guesses, gameState.currentGuess];
    const newResults = [...gameState.results, result];

    // Update letter states
    const newLetterStates = { ...letterStates };
    gameState.currentGuess.split("").forEach((letter, i) => {
      const currentState = newLetterStates[letter];
      const newState = result[i];
      if (!currentState || (currentState === "absent" && newState !== "absent")) {
        newLetterStates[letter] = newState;
      }
    });
      console.log("🚀 ~ file: use-game.ts:92 ~ newLetterStates:", newLetterStates)

    setLetterStates(newLetterStates);

    // Check if won
    const hasWon = result.every(r => r === "correct");
    if (hasWon) {
      setGameState(prev => ({
        ...prev,
        currentGuess: "",
        guesses: newGuesses,
        results: newResults,
        gameStatus: "won",
      }));
      gameEvents.gameWon(gameState.targetWord.word);
      return;
    }

    // Check if lost
    if (newGuesses.length >= 6) {
      setGameState(prev => ({
        ...prev,
        currentGuess: "",
        guesses: newGuesses,
        results: newResults,
        gameStatus: "lost",
      }));
      gameEvents.gameLost(gameState.targetWord.word);
      return;
    }

    // Continue game
    setGameState(prev => ({
      ...prev,
      currentGuess: "",
      guesses: newGuesses,
      results: newResults,
    }));
  };

  const handleKeyPress = (key: string) => {
    if (!gameState.targetWord) return;
    
    setGameState(prev => ({
      ...prev,
      currentGuess:
        prev.currentGuess.length < prev.targetWord!.word.length
          ? prev.currentGuess + key
          : prev.currentGuess,
    }));
  };

  const handleDelete = () => {
    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }));
  };

  return {
    gameState,
    letterStates,
    selectTopic,
    playAgain,
    submitGuess,
    handleKeyPress,
    handleDelete,
  };
};
