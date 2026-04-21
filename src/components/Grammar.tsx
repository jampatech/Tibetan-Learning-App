import React from 'react';
import { GRAMMAR_LESSONS } from '@/constants';
import { BookOpen, ChevronRight, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface GrammarProps {
  onLesssonComplete: () => void;
}

export function Grammar({ onLesssonComplete }: GrammarProps) {
  return (
    <div className="space-y-10 pb-20">
      <header>
        <p className="text-[10px] font-black text-maroon/60 uppercase tracking-[0.3em] mb-1">Path to Knowledge</p>
        <h2 className="text-4xl font-black text-ink flex items-center gap-3">
          Grammar Rules
        </h2>
      </header>

      <div className="grid gap-8">
        {GRAMMAR_LESSONS.map((lesson, idx) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-white rounded-[32px] shadow-xl border-b-8 border-grammar-green relative overflow-hidden group"
          >
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-12 bg-grammar-green text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg">0{idx + 1}</span>
                  <div>
                    <h3 className="text-2xl font-black text-ink">{lesson.title}</h3>
                    <p className="text-3xl font-tibetan text-maroon mt-1">{lesson.tibetanTitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-8 text-lg font-medium opacity-80 italic">
                  {lesson.content}
                </p>

                <div className="space-y-4 bg-cream/50 p-8 rounded-2xl border border-border">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Core Implementation</h4>
                  {lesson.examples.map((ex, i) => (
                    <div key={i} className="flex flex-col border-l-4 border-saffron pl-6 py-2 bg-white rounded-r-xl shadow-sm">
                      <span className="text-2xl font-tibetan text-maroon font-bold leading-relaxed">{ex.tibetan}</span>
                      <span className="text-sm text-ink opacity-60 font-semibold">{ex.english}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-40 flex items-center justify-center">
                <button 
                  onClick={onLesssonComplete}
                  className="w-24 h-24 bg-grammar-green/10 text-grammar-green rounded-full flex items-center justify-center hover:bg-grammar-green hover:text-white transition-all transform hover:rotate-12 shadow-inner group-hover:scale-105"
                >
                  <PlayCircle className="w-10 h-10" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-12 bg-white/50 border-4 border-dashed border-border rounded-[32px] text-center">
        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">Deep library catalog expands weekly</p>
      </div>
    </div>
  );
}
