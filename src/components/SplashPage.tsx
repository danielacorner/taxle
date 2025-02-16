import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/use-game";
import { GameBoard } from "./GameBoard";
import { HowToPlayDialog } from "./HowToPlayDialog";
import { topics } from "@/data/topics";
import { Card } from "@/components/ui/card";
import { TopicId } from "@/types/topics";

export const SplashPage = () => {
  const {
    gameState,
    letterStates,
    selectTopic,
    playAgain,
    submitGuess,
    handleKeyPress,
    handleDelete,
  } = useGame();

  // Handle keyboard input when playing
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

  const renderTopicSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto p-4">
      {topics.map((topic) => (
        <Card 
          key={topic.id}
          className="p-4 cursor-pointer hover:bg-accent transition-colors"
          onClick={() => selectTopic(topic.id)}
        >
          <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
          <p className="text-muted-foreground">{topic.description}</p>
        </Card>
      ))}
    </div>
  );

  const renderGame = () => (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-2xl font-bold">
        {topics.find(t => t.id === gameState.selectedTopic)?.title}
      </h2>
      
      <GameBoard
        guesses={gameState.guesses}
        results={gameState.results}
        currentGuess={gameState.currentGuess}
        targetLength={gameState.targetWord?.word.length || 0}
        targetWord={gameState.targetWord?.word || ""}
      />

      {(gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            {gameState.gameStatus === 'won' ? (
              <h3 className="text-xl font-bold text-green-600">Congratulations!</h3>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-red-600">Game Over</h3>
                <p className="mt-2">The word was: {gameState.targetWord?.word}</p>
              </div>
            )}
            <p className="mt-2">{gameState.targetWord?.definition}</p>
            {gameState.targetWord?.wikipediaUrl && (
              <a 
                href={gameState.targetWord.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 block"
              >
                Learn more
              </a>
            )}
          </div>
          <Button onClick={playAgain}>Play Again</Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Wordle of Knowledge</h1>
          <p className="text-xl text-muted-foreground">
            Test your vocabulary across different fields of study
          </p>
        </header>

        {gameState.gameStatus === 'selecting' ? renderTopicSelection() : renderGame()}
      </div>
    </div>
  );
};
