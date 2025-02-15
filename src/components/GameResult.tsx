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
      className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-primary/10 dark:border-primary-dark/10"
    >
      <h2 className="font-playfair text-xl font-bold mb-2 text-primary dark:text-white/90-dark">
        {gameStatus === 'won' ? 'Congratulations!' : 'Game Over'}
      </h2>
      <p className="mb-4 text-primary/90 dark:text-white/90-dark/90">
        The species was{' '}
        <span className="font-bold italic">
          {targetSpecies.scientificName}
        </span>
      </p>
      <a
        href={targetSpecies.wikipediaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 dark:text-white/90-dark dark:hover:text-primary-dark/80 underline"
      >
        Learn more about this species
      </a>
    </motion.div>
  );
};
