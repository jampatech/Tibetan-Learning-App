import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Languages, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function Translator() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'en-to-bo' | 'bo-to-en'>('en-to-bo');

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const prompt = mode === 'en-to-bo' 
        ? `Translate the following English text to Tibetan: "${text}". Provide only the Tibetan text.`
        : `Translate the following Tibetan text to English: "${text}". Provide only the English text.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setResult(response.text || 'Translation failed');
    } catch (error) {
      console.error(error);
      setResult('Error occurred during translation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-[10px] font-black text-maroon/60 uppercase tracking-[0.3em] mb-1">AI Powered Linguistics</p>
          <h2 className="text-4xl font-black text-ink">Translation Tool</h2>
        </div>
        <button 
          onClick={() => setMode(m => m === 'en-to-bo' ? 'bo-to-en' : 'en-to-bo')}
          className="px-6 py-3 bg-saffron text-maroon rounded-full text-xs font-black hover:bg-saffron/80 transition-all uppercase tracking-widest shadow-lg flex items-center gap-2"
        >
          <Languages className="w-4 h-4" />
          {mode === 'en-to-bo' ? 'EN → BO' : 'BO → EN'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={mode === 'en-to-bo' ? "Enter English text..." : "Enter Tibetan text..."}
            className="w-full h-48 p-8 rounded-[32px] border-2 border-border bg-white focus:ring-4 focus:ring-maroon/5 focus:border-maroon outline-none transition-all resize-none text-xl font-medium shadow-xl"
          />
          <button
            onClick={handleTranslate}
            disabled={loading || !text.trim()}
            className="absolute bottom-6 right-6 p-5 bg-maroon text-white rounded-2xl hover:bg-maroon/90 disabled:opacity-30 transition-all shadow-2xl flex items-center justify-center group-hover:scale-105 active:scale-95"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 bg-white rounded-[32px] border-b-8 border-maroon shadow-2xl relative overflow-hidden"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-maroon/40 font-black mb-4">Translation Output</p>
            <p className={cn(
              "text-3xl leading-relaxed text-ink",
              mode === 'en-to-bo' ? "font-tibetan" : "font-sans font-bold"
            )}>
              {result}
            </p>
            {/* Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Languages className="w-32 h-32" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
