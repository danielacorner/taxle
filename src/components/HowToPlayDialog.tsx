import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ExampleGuess = ({ name, statuses }: { name: string; statuses: Array<'correct' | 'present' | 'absent'> }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {name.split(' ').map((part, partIndex) => (
          <div key={partIndex} className="flex gap-1">
            {part.split('').map((letter, index) => {
              const status = statuses[index];
              const bgColor = {
                correct: 'bg-correct-dark dark:bg-correct-dark',
                present: 'bg-present-dark dark:bg-present-dark',
                absent: 'bg-absent-dark dark:bg-absent-dark'
              }[status];

              return (
                <div
                  key={index}
                  className={`w-8 h-8 ${bgColor} flex items-center justify-center text-white font-bold rounded`}
                >
                  {letter.toUpperCase()}
                </div>
              );
            })}
            {partIndex !== name.split(' ').length - 1 && <div className="text-primary mx-2 dark:text-white/90">{" "}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export const HowToPlayDialog = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-primary dark:text-white/90">How To Play</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-primary/90 dark:text-white/90">
          <p>Guess the scientific name in 6 tries.</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-bold">Example 1:</p>
              <ExampleGuess
                name="Homo sapiens"
                statuses={[
                  'correct', 'correct', 'correct', 'correct', // Homo
                  'present', 'absent', 'present', 'absent', 'present', 'absent' // sapiens
                ]}
              />
              <p>The genus <strong>Homo</strong> is completely correct, while <strong>sapiens</strong> has some letters in the wrong positions.</p>
            </div>

            <div className="space-y-2">
              <p className="font-bold">Example 2:</p>
              <ExampleGuess
                name="Canis lupus"
                statuses={[
                  'absent', 'absent', 'absent', 'absent', // Canis
                  'absent', 'absent', 'absent', 'absent', 'absent' // lupus
                ]}
              />
              <p>None of the letters in this guess appear in the target species name.</p>
            </div>
          </div>

          <p>A new taxonomic puzzle is released daily at midnight!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
