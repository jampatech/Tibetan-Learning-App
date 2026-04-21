export interface Progress {
  typingSpeed: number;
  quizScore: number;
  lessonsCompleted: number;
  xp: number;
}

export type AppSection = 'dashboard' | 'typing' | 'quiz' | 'grammar' | 'translate';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  tibetanTitle: string;
  content: string;
  examples: { tibetan: string; english: string }[];
}
