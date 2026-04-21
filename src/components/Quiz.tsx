import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '@/constants';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface QuizProps {
  onScoreUpdate: (score: number) => void;
}

export function Quiz({ onScoreUpdate }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const next = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      onScoreUpdate(Math.round((score / QUIZ_QUESTIONS.length) * 100));
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto p-12 bg-white rounded-[32px] shadow-2xl text-center border-t-8 border-saffron">
        <div className="w-24 h-24 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <Sparkles className="w-12 h-12 text-maroon" />
        </div>
        <h2 className="text-4xl font-black text-ink mb-4">Quiz Complete!</h2>
        <p className="text-gray-500 mb-10 font-medium">Your wisdom level has increased.</p>
        <div className="text-7xl font-black text-maroon mb-12">
          {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
        </div>
        <button 
          onClick={() => {
            setCurrentIdx(0);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setScore(0);
            setShowResult(false);
          }}
          className="px-10 py-5 bg-saffron text-maroon font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-saffron/20 uppercase tracking-widest text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-maroon/40 uppercase tracking-[0.3em]">Knowledge Set {currentIdx + 1}/{QUIZ_QUESTIONS.length}</span>
        <div className="flex gap-2">
          {QUIZ_QUESTIONS.map((_, i) => (
            <div key={i} className={cn("h-1.5 w-8 rounded-full transition-all duration-500", i <= currentIdx ? "bg-maroon" : "bg-gray-200")} />
          ))}
        </div>
      </div>

      <div className="p-10 bg-white rounded-[32px] shadow-xl border border-border">
        <h3 className="text-3xl font-black text-ink mb-10 leading-tight">
          {question.question}
        </h3>

        <div className="grid gap-4">
          {question.options.map((option, i) => {
            const isCorrect = i === question.correctAnswer;
            const isSelected = i === selectedAnswer;
            
            let appearance = "border-border hover:border-maroon/30 bg-white text-gray-700";
            if (isAnswered) {
              if (isCorrect) appearance = "border-green-500 bg-green-50 text-green-900";
              else if (isSelected) appearance = "border-red-400 bg-red-50 text-red-900";
              else appearance = "opacity-40 grayscale border-border";
            } else if (isSelected) {
              appearance = "border-maroon bg-maroon text-white scale-[1.02] shadow-lg shadow-maroon/20";
            }

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleSelect(i)}
                className={cn(
                  "p-6 text-left rounded-2xl border-2 font-bold transition-all duration-300 flex items-center justify-between group",
                  appearance
                )}
              >
                <span className={cn(isAnswered && isCorrect ? "font-tibetan" : "font-sans", "text-xl")}>{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-400" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-8 p-6 bg-cream rounded-2xl border border-border text-sm text-gray-600 font-medium italic leading-relaxed"
            >
              <div className="flex gap-2">
                <HelpCircle className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                <span>{question.explanation}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isAnswered && (
        <button
          onClick={next}
          className="w-full py-5 bg-maroon text-white font-black rounded-[20px] hover:bg-maroon/90 transition-all flex items-center justify-center gap-2 group shadow-2xl shadow-maroon/20 uppercase tracking-widest text-sm"
        >
          {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Finish Challenge' : 'Next Insight'}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      )}
    </div>
  );
}
