import { QuizQuestion, GrammarLesson } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the Tibetan word for "Sun"?',
    options: ['ཟླ་བ། (Zla-ba)', 'ཉི་མ། (Nyi-ma)', 'སྐར་མ། (Skar-ma)', 'ཆུ་འཛིན། (Chu-’dzin)'],
    correctAnswer: 1,
    explanation: 'ཉི་མ། (Nyi-ma) means Sun. ཟླ་བ། means Moon, and སྐར་མ། means Star.'
  },
  {
    id: '2',
    question: 'Which of these is a Tibetan vowel sign?',
    options: ['ཀ་ (Ka)', 'གི་ (Gi)', 'ད་ (Da)', 'པ་ (Pa)'],
    correctAnswer: 1,
    explanation: 'གི་ (Gi) uses the vowel sign "i" (Gigu). The others are just consonants.'
  }
];

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: '1',
    title: 'Identity & Being',
    tibetanTitle: 'ཡིན་དང་ཡོད།',
    content: 'In Tibetan, there are two main ways to say "to be": ཡིན་ (yin) and ཡོད་ (yod). ཡིན་ is usually for identity (e.g., "I am a student"), while ཡོད་ is for existence or location (e.g., "I am at home").',
    examples: [
      { tibetan: 'ང་སློབ་ཕྲུག་ཡིན།', english: 'I am a student.' },
      { tibetan: 'ང་ནང་ལ་ཡོད།', english: 'I am at home.' }
    ]
  }
];

export const TIBETAN_KEYBOARD_LAYOUT: Record<string, string> = {
  'q': 'འ', 'w': 'ཝ', 'e': 'ེ', 'r': 'ར', 't': 'ཏ', 'y': 'ཡ', 'u': 'ུ', 'i': 'ི', 'o': 'ོ', 'p': 'པ',
  'a': 'ཨ', 's': 'ས', 'd': 'ད', 'f': 'ཕ', 'g': 'ག', 'h': 'ཧ', 'j': 'ཇ', 'k': 'ཀ', 'l': 'ལ',
  'z': 'ཟ', 'x': 'ཤ', 'c': 'ཅ', 'v': 'བ', 'b': 'བྱ', 'n': 'ན', 'm': 'མ'
};
