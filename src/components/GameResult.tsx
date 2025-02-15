import { motion } from "framer-motion";
import { Species } from "@/types/game";

interface GameResultProps {
  gameStatus: 'playing' | 'won' | 'lost' | 'gave_up';
  targetSpecies: Species;
}

export const GameResult = ({ gameStatus, targetSpecies }: GameResultProps) => {
  if (gameStatus === 'playing') return null;

  const getMessage = () => {
    switch (gameStatus) {
      case 'won':
        return 'Congratulations! You got it!';
      case 'lost':
        return 'Better luck next time!';
      case 'gave_up':
        return "Don't worry, you can try again!";
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-primary/10 dark:border-primary-dark/10"
    >
      <h2 className="font-playfair text-xl font-bold mb-2 text-primary dark:text-white/90 ">
        {getMessage()}
      </h2>
      <p className="mb-4 text-primary/90 dark:text-white/90">
        The species was{' '}
        <span className="font-bold italic">
          {targetSpecies.scientificName}
        </span>
      </p>
      <a
        href={targetSpecies.wikipediaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-cornflower/80 dark:text-white/60 dark:hover:text-cornflower/80 underline"
      >
        Learn more about this species
      </a>
    </motion.div>
  );
};
