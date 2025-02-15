import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export const GameHeader = () => {
  return (
    <header className="mb-8 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 mb-2"
      >
        <Leaf className="w-8 h-8 text-primary dark:text-white/90" />
        <h1 className="font-playfair text-3xl font-bold text-primary dark:text-white/90">
          Taxle
        </h1>
      </motion.div>
      <p className="text-primary/60 dark:text-white/90 font-sans">
        Guess the scientific name in 6 tries
      </p>
    </header>
  );
};
