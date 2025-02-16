import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GameBoard } from "@/components/GameBoard";
import { Keyboard } from "@/components/Keyboard";
import { GameHeader } from "@/components/GameHeader";
import { GameResult } from "@/components/GameResult";
import { HowToPlayDialog } from "@/components/HowToPlayDialog";
import { useGame } from "@/hooks/use-game";
import { useEffect } from "react";

export const SplashPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    gameState,
    letterStates,
    submitGuess,
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
        submitGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStatus, handleKeyPress, handleDelete, submitGuess]);

  if (!gameState.targetSpecies && isPlaying) return null;

  if (isPlaying) {
    return (
      <div className="min-h-screen bg-secondary/5 dark:bg-secondary-dark/5 flex flex-col items-center py-8 px-4 text-primary dark:text-white/90">
        <GameHeader />
        <HowToPlayDialog />

        <main className="w-full mx-auto flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            <GameBoard
              guesses={gameState.guesses}
              results={gameState.results}
              currentGuess={gameState.currentGuess}
              targetLength={gameState.targetSpecies?.scientificName.length || 0}
              targetWord={gameState.targetSpecies?.scientificName || ''}
            />
          </div>

          {gameState.gameStatus !== 'playing' && (
            <GameResult
              gameStatus={gameState.gameStatus}
              targetSpecies={gameState.targetSpecies!}
            />
          )}

          {gameState.gameStatus === 'playing' && (
            <Keyboard
              letterStates={letterStates}
              onKeyPress={handleKeyPress}
              onDelete={handleDelete}
              onEnter={submitGuess}
            />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* Logo - Taxonomic Tree */}
      <div className="mb-8 relative">
        <div className="grid grid-cols-3 gap-1">
          {/* Kingdom */}
          <div className="w-8 h-8 border-2 bg-[#538D4E] border-[#538D4E]" />
          {/* Connecting line */}
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-full h-0.5 bg-[#538D4E]" />
          </div>
          {/* Phylum */}
          <div className="w-8 h-8 border-2 bg-[#538D4E] border-[#538D4E]" />
          
          {/* Vertical connectors */}
          <div className="w-8 h-8 flex justify-center">
            <div className="w-0.5 h-full bg-[#B59F3B]" />
          </div>
          <div className="w-8 h-8" />
          <div className="w-8 h-8 flex justify-center">
            <div className="w-0.5 h-full bg-[#B59F3B]" />
          </div>
          
          {/* Class */}
          <div className="w-8 h-8 border-2 bg-[#B59F3B] border-[#B59F3B]" />
          {/* Connecting line */}
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-full h-0.5 bg-[#B59F3B]" />
          </div>
          {/* Order */}
          <div className="w-8 h-8 border-2 bg-[#B59F3B] border-[#B59F3B]" />
        </div>
        
        {/* Labels */}
        <div className="absolute -left-16 top-1 text-xs text-muted-foreground">Kingdom</div>
        <div className="absolute -right-14 top-1 text-xs text-muted-foreground">Phylum</div>
        <div className="absolute -left-12 bottom-1 text-xs text-muted-foreground">Class</div>
        <div className="absolute -right-12 bottom-1 text-xs text-muted-foreground">Order</div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">Taxle</h1>

      {/* Description */}
      <p className="text-xl text-center mb-12">
        Get 6 chances to guess a <em>genus species</em> name.
      </p>

      {/* Play Button */}
      <Button
        onClick={() => setIsPlaying(true)}
        className="px-12 py-6 text-lg"
      >
        Play
      </Button>

      {/* Date */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          })}
        </p>
      </div>
    </div>
  );
};
