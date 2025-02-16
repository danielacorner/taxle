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

  const renderCell = (letter: string, result?: 'correct' | 'present' | 'absent') => {
    if (letter === ' ') {
      return (
        <div className="h-8 w-3 sm:w-5 sm:h-14 flex items-center justify-center text-sm sm:text-xl font-bold border-2 border-primary/5 dark:border-primary-dark/5 rounded bg-secondary/5 dark:bg-secondary-dark/5">
        </div>
      );
    }

    return (
      <div className={`h-8 w-6 sm:w-10 sm:h-14 flex items-center justify-center text-sm sm:text-xl font-bold border-2 rounded text-primary dark:text-white ${
        result ? getBackgroundColor(result) : 'border-primary/30 dark:border-white/35 bg-secondary/5 dark:bg-secondary-light/5'
      }`}>
        {letter.toUpperCase()}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 mx-auto w-full" style={{maxWidth: "min(100%, 40rem)"}}>
      {guesses.map((guess, i) => (
        <div key={i} className="flex gap-1 justify-center">
          {targetWord.split('').map((targetLetter, j) => {
            // Always render spaces from target word
            if (targetLetter === ' ') {
              return (
                <div key={`${i}-${j}`}>
                  {renderCell(' ')}
                </div>
              );
            }

            return (
              <div key={`${i}-${j}`}>
                {renderCell(guess[j] || '', results[i]?.[j])}
              </div>
            );
          })}
        </div>
      ))}
      
      {currentGuess && (
        <div className="flex gap-1 justify-center">
          {targetWord.split('').map((targetLetter, i) => {
            if (targetLetter === ' ') {
              return (
                <div key={i}>
                  {renderCell(' ')}
                </div>
              );
            }

            return (
              <motion.div
                key={i}
                initial={{ scale: currentGuess[i] ? 0 : 1 }}
                animate={{ scale: 1 }}
                className="origin-center"
              >
                {renderCell(currentGuess[i] || '')}
              </motion.div>
            );
          })}
        </div>
      )}
      
      {Array(emptyRows).fill(null).map((_, i) => (
        <div key={`empty-row-${i}`} className="dark:text-white flex gap-1 justify-center">
          {targetWord.split('').map((targetLetter, j) => (
            <div key={`empty-${i}-${j}`}>
              {renderCell(targetLetter === ' ' ? ' ' : '')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
