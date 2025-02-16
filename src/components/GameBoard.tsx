import { GuessResult } from "@/types/game";
import { motion } from "framer-motion";

interface GameBoardProps {
  guesses: string[];
  results: GuessResult[];
  currentGuess: string;
  targetLength: number;
  targetWord: string;
}

export const GameBoard = ({ guesses, results, currentGuess, targetLength, targetWord }: GameBoardProps) => {
  const emptyRows = 6 - guesses.length - (currentGuess ? 1 : 0);
  
  const getBackgroundColor = (result: 'correct' | 'present' | 'absent') => {
    switch (result) {
      case 'correct': return 'bg-correct text-white dark:bg-correct-dark';
      case 'present': return 'bg-present text-white dark:bg-present-dark';
      case 'absent': return 'bg-absent text-white dark:bg-absent-dark';
      default: return 'bg-secondary/10 dark:bg-secondary-dark/10';
    }
  };

  // Calculate size classes based on word length
  const getSizeClasses = (isSpace: boolean) => {
    const letterCount = targetWord.length;
    if (letterCount <= 16) {
      return isSpace ? "h-8 w-3 sm:w-5 sm:h-14 text-sm sm:text-xl" : "h-8 w-6 sm:w-10 sm:h-14 text-sm sm:text-xl";
    } else if (letterCount <= 20) {
      return isSpace ? "h-7 w-2 sm:w-4 sm:h-12 text-xs sm:text-lg" : "h-7 w-5 sm:w-8 sm:h-12 text-xs sm:text-lg";
    } else {
      return isSpace ? "h-6 w-1.5 sm:w-3 sm:h-10 text-xs sm:text-base" : "h-6 w-4 sm:w-6 sm:h-10 text-xs sm:text-base";
    }
  };

  const renderCell = (letter: string, result?: 'correct' | 'present' | 'absent') => {
    const isSpace = letter === ' ';
    const sizeClasses = getSizeClasses(isSpace);

    if (isSpace) {
      return (
        <div className={`${sizeClasses} flex items-center justify-center font-bold border-2 border-primary/5 dark:border-primary-dark/5 rounded bg-secondary/5 dark:bg-secondary-dark/5`}>
        </div>
      );
    }

    return (
      <div className={`${sizeClasses} flex items-center justify-center font-bold border-2 rounded text-primary dark:text-white ${
        result ? getBackgroundColor(result) : 'border-primary/30 dark:border-white/35 bg-secondary/5 dark:bg-secondary-light/5'
      }`}>
        {letter.toUpperCase()}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-3 mx-auto w-full px-1" style={{maxWidth: "min(100%, 40rem)"}}>
      {guesses.map((guess, i) => (
        <div key={i} className="flex flex-wrap gap-0.5 sm:gap-1 justify-center">
          {targetWord.split('').map((targetLetter, j) => (
            <div key={`${i}-${j}`} className="flex-shrink-0">
              {renderCell(targetLetter === ' ' ? ' ' : (guess[j] || ''), results[i]?.[j])}
            </div>
          ))}
        </div>
      ))}
      
      {currentGuess && (
        <div className="flex flex-wrap gap-0.5 sm:gap-1 justify-center">
          {targetWord.split('').map((targetLetter, i) => (
            <motion.div
              key={i}
              initial={{ scale: currentGuess[i] ? 0 : 1 }}
              animate={{ scale: 1 }}
              className="origin-center flex-shrink-0"
            >
              {renderCell(targetLetter === ' ' ? ' ' : (currentGuess[i] || ''))}
            </motion.div>
          ))}
        </div>
      )}
      
      {Array(emptyRows).fill(null).map((_, i) => (
        <div key={`empty-row-${i}`} className="dark:text-white flex flex-wrap gap-0.5 sm:gap-1 justify-center">
          {targetWord.split('').map((targetLetter, j) => (
            <div key={`empty-${i}-${j}`} className="flex-shrink-0">
              {renderCell(targetLetter === ' ' ? ' ' : '')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
