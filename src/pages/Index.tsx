import { GameBoard } from "@/components/GameBoard";
import { Keyboard } from "@/components/Keyboard";
import { GameHeader } from "@/components/GameHeader";
import { GameResult } from "@/components/GameResult";
import { HowToPlayDialog } from "@/components/HowToPlayDialog";
import { useGame } from "@/hooks/use-game";
import { useEffect } from "react";

const Index = () => {
  const {
    gameState,
    letterStates,
    handleGuess,
    handleKeyPress,
    handleDelete,
  } = useGame();

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
        handleGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStatus, handleKeyPress, handleDelete, handleGuess]);

  if (!gameState.targetSpecies) return null;

  return (
    <div className="min-h-screen bg-secondary/5 dark:bg-secondary-dark/5 flex flex-col items-center py-8 px-4 text-primary dark:text-white">
      <GameHeader />
      <HowToPlayDialog />

      <main className="w-full max-w-lg mx-auto flex-1 flex flex-col gap-8">
        <GameBoard
          guesses={gameState.guesses}
          results={gameState.results}
          currentGuess={gameState.currentGuess}
          targetLength={gameState.targetSpecies.scientificName.length}
          targetWord={gameState.targetSpecies.scientificName}
        />
        
        <Keyboard
          onKeyPress={handleKeyPress}
          onDelete={handleDelete}
          onEnter={handleGuess}
          letterStates={letterStates}
        />

        <GameResult 
          gameStatus={gameState.gameStatus}
          targetSpecies={gameState.targetSpecies}
        />
      </main>
    </div>
  );
};

export default Index;
