import { GuessResult } from "@/types/game";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  letterStates: Record<string, 'correct' | 'present' | 'absent' | undefined>;
}

export const Keyboard = ({ onKeyPress, onDelete, onEnter, letterStates }: KeyboardProps) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ];

  const getKeyBackground = (key: string) => {
    const state = letterStates[key];
    switch (state) {
      case 'correct': return 'bg-correct dark:bg-correct-dark text-white hover:bg-correct/90 dark:hover:bg-correct-dark/90';
      case 'present': return 'bg-present dark:bg-present-dark text-white hover:bg-present/90 dark:hover:bg-present-dark/90';
      case 'absent': return 'bg-absent dark:bg-absent-dark text-white hover:bg-absent/90 dark:hover:bg-absent-dark/90';
      default: return 'bg-secondary/10 dark:bg-secondary-dark/10 hover:bg-secondary/20 dark:hover:bg-secondary-dark/20';
    }
  };

  const handleClick = (key: string) => {
    if (key === '⌫') {
      onDelete();
    } else if (key === 'ENTER') {
      onEnter();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="grid gap-2 w-full max-w-2xl mx-auto px-4">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={`${getKeyBackground(key)} ${
                key === 'ENTER' || key === '⌫' ? 'px-4' : 'px-2'
              } py-4 rounded font-bold text-sm sm:text-base transition-colors duration-200`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
