import React, { useState, useEffect, useRef } from 'react';
import { TIBETAN_KEYBOARD_LAYOUT } from '@/constants';
import { Keyboard, RefreshCw, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TypingTutorProps {
  onProgressUpdate: (wpm: number) => void;
}

export function TypingTutor({ onProgressUpdate }: TypingTutorProps) {
  const [targetText, setTargetText] = useState('བཀྲ་ཤིས་བདེ་ལེགས།'); // Tashi Delek
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  const words = [
    'བཀྲ་ཤིས་བདེ་ལེགས།', 'བོད་སྐད།', 'ཁ་ལག་ཞིམ་པོ།', 'གངས་རི།', 'ཆོས་ཚལ།', 'བརྙན་འཕྲིན།'
  ];

  const reset = () => {
    const nextText = words[Math.floor(Math.random() * words.length)];
    setTargetText(nextText);
    setInputText('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());
    
    setInputText(val);

    // Calculate accuracy
    let correct = 0;
    for(let i=0; i < val.length; i++) {
      if(val[i] === targetText[i]) correct++;
    }
    setAccuracy(val.length > 0 ? Math.round((correct / val.length) * 100) : 100);

    // Check completion
    if (val === targetText) {
      const endTime = Date.now();
      const durationInMinutes = (endTime - (startTime || endTime)) / 60000;
      const calculatedWpm = Math.round((targetText.length / 5) / (durationInMinutes || 0.01));
      setWpm(calculatedWpm);
      onProgressUpdate(calculatedWpm);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 h-full flex flex-col justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-black text-ink mb-2">Tibetan Typing</h2>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Master the Sambhota layout</p>
      </div>

      <div className="p-12 bg-white rounded-[32px] shadow-xl border-b-8 border-typing-blue flex flex-col items-center relative overflow-hidden">
        <div className="text-6xl font-tibetan mb-12 select-none tracking-[0.2em] text-ink/90 leading-relaxed min-h-[1.5em]">
          {targetText.split('').map((char, i) => {
            let color = 'text-gray-200';
            if (i < inputText.length) {
              color = inputText[i] === char ? 'text-typing-blue font-bold' : 'text-red-500 underline';
            }
            return <span key={i} className={color}>{char}</span>;
          })}
        </div>

        <input
          ref={inputRef}
          type="text"
          autoFocus
          value={inputText}
          onChange={handleInput}
          className="w-full max-w-lg text-center text-3xl p-6 bg-cream/50 rounded-2xl border-2 border-border focus:border-typing-blue outline-none transition-all font-tibetan shadow-inner"
          placeholder="Type here..."
        />

        <div className="flex gap-16 mt-12 bg-gray-50 px-10 py-6 rounded-2xl border border-border">
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">WPM</p>
            <p className="text-4xl font-black text-typing-blue">{wpm || '--'}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Accuracy</p>
            <p className="text-4xl font-black text-saffron">{accuracy}%</p>
          </div>
          <div className="flex items-center">
            <button 
              onClick={reset}
              className="p-4 bg-typing-blue/10 text-typing-blue rounded-full hover:bg-typing-blue hover:text-white transition-all shadow-md active:scale-95"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Map */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {Object.entries(TIBETAN_KEYBOARD_LAYOUT).slice(0, 20).map(([key, value]) => (
          <div key={key} className="p-3 bg-white rounded-xl border border-border text-center shadow-sm hover:border-typing-blue/30 transition-colors">
            <span className="block text-[9px] font-black text-gray-300 uppercase mb-1">{key}</span>
            <span className="text-xl font-tibetan text-ink">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
