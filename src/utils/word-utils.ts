import { TopicId, WordEntry } from "@/types/topics";
import { medicalWords } from "@/data/words/medical";
import { chemicalWords } from "@/data/words/chemical";
import { philosophicalWords } from "@/data/words/philosophical";
import { geologicalWords } from "@/data/words/geological";
import { programmingWords } from "@/data/words/programming";
import { archaeologicalWords } from "@/data/words/archaeological";
import { psychologicalWords } from "@/data/words/psychological";

const wordLists: Record<TopicId, WordEntry[]> = {
  medical: medicalWords,
  chemical: chemicalWords,
  philosophical: philosophicalWords,
  geological: geologicalWords,
  programming: programmingWords,
  archaeological: archaeologicalWords,
  psychological: psychologicalWords,
};

export const getRandomWord = (topicId: TopicId): WordEntry => {
  const list = wordLists[topicId];
  if (!list || list.length === 0) {
    throw new Error(`No words available for topic: ${topicId}`);
  }
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};
