
import { motion } from "framer-motion";
import { Species } from "@/types/game";

interface GameResultProps {
  gameStatus: 'playing' | 'won' | 'lost';
  targetSpecies: Species;
}

export const GameResult = ({ gameStatus, targetSpecies }: GameResultProps) => {
  if (gameStatus === 'playing') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-primary/10"
    >
      <h2 className="font-playfair text-xl font-bold mb-2">
        {gameStatus === 'won' ? 'Congratulations!' : 'Game Over'}
      </h2>
      <p className="mb-4">
        The species was{' '}
        <span className="font-bold italic">
          {targetSpecies.scientificName}
        </span>
      </p>
      <a
        href={targetSpecies.wikipediaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline"
      >
        Learn more about this species
      </a>
    </motion.div>
  );
};
