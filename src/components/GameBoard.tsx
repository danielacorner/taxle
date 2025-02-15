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
        <div className="h-14 flex items-center justify-center text-xl font-bold border-2 border-primary/5 dark:border-primary-dark/5 rounded bg-secondary/5 dark:bg-secondary-dark/5">
        </div>
      );
    }

    return (
      <div className={`h-14 flex items-center justify-center text-xl font-bold border-2 rounded text-primary dark:text-white ${
        result ? getBackgroundColor(result) : 'border-primary/30 dark:border-white/35 bg-secondary/5 dark:bg-secondary-light/5'
      }`}>
        {letter.toUpperCase()}
      </div>
    );
  };

  return (
    <div className="grid gap-2 mx-auto w-full max-w-lg">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(2rem,1fr))] gap-1">
          {targetWord.split('').map((targetLetter, j) => {
            // Always render spaces from target word
            if (targetLetter === ' ') {
              return (
                <div key={`${i}-${j}`}>
                  {renderCell(' ')}
                </div>
              );
            }

            // For non-space positions, get the corresponding guess letter
            // by counting only non-space characters up to this position
            const nonSpaceIndexInTarget = targetWord.slice(0, j).replace(/\s/g, '').length;
            const guessLetter = guess.replace(/\s/g, '')[nonSpaceIndexInTarget];
            
            return (
              <motion.div
                key={`${i}-${j}`}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: [0, 90, 0] }}
                transition={{ duration: 0.6, delay: j * 0.1 }}
              >
                {renderCell(guessLetter || '', results[i][j])}
              </motion.div>
            );
          })}
        </div>
      ))}
      
      {currentGuess && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(2rem,1fr))] gap-1">
          {targetWord.split('').map((targetLetter, i) => {
            if (targetLetter === ' ') {
              return (
                <div key={`current-${i}`}>
                  {renderCell(' ')}
                </div>
              );
            }
            return (
              <motion.div
                key={`current-${i}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {renderCell(currentGuess[i] || '')}
              </motion.div>
            );
          })}
        </div>
      )}
      
      {Array(emptyRows).fill(null).map((_, i) => (
        <div key={`empty-row-${i}`} className="dark:text-white grid grid-cols-[repeat(auto-fit,minmax(2rem,1fr))] gap-1">
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
