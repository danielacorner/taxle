export type TopicId = 
  | 'medical'
  | 'chemical'
  | 'philosophical'
  | 'geological'
  | 'programming'
  | 'archaeological'
  | 'psychological';

export interface TopicInfo {
  id: TopicId;
  title: string;
  description: string;
  icon: string; // Heroicon name
}

export interface WordEntry {
  word: string;
  definition: string;
  wikipediaUrl?: string;
}
