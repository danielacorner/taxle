import { GameBoard } from "@/components/GameBoard";
import { Keyboard } from "@/components/Keyboard";
import { GameHeader } from "@/components/GameHeader";
import { GameResult } from "@/components/GameResult";
import { HowToPlayDialog } from "@/components/HowToPlayDialog";
import { useGame } from "@/hooks/use-game";
import { useEffect } from "react";
import { GameState, GuessResult } from "@/types/game";

export const KeyboardAndHandlers = ({
  gameState,
  letterStates,
  submitGuess,
  handleKeyPress,
  handleDelete,
}: {
  gameState: GameState;
  letterStates: Record<string, GuessResult[0] | undefined>;
  submitGuess: () => void;
  handleKeyPress: (key: string) => void;
  handleDelete: () => void;
}) => {
 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameStatus !== 'playing') return;

      // Handle letter keys
      if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
      // Handle backspace/delete
      else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleDelete();
      }
      // Handle enter
      else if (e.key === 'Enter') {
        submitGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStatus, handleKeyPress, handleDelete, submitGuess]);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Keyboard
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        onEnter={submitGuess}
        letterStates={letterStates}
      />
    </div>
  );
};
