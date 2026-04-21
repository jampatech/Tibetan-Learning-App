import React from 'react';
import { Progress, AppSection } from '@/types';
import { 
  Trophy, 
  Keyboard, 
  HelpCircle, 
  BookOpen, 
  Languages,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  progress: Progress;
  setActiveSection: (section: AppSection) => void;
}

export function Dashboard({ progress, setActiveSection }: DashboardProps) {
  const stats = [
    { label: 'Wisdom XP', value: progress.xp.toString(), icon: Trophy, color: 'text-maroon', bg: 'bg-white' },
    { label: 'Typing Speed', value: `${progress.typingSpeed} WPM`, icon: Keyboard, color: 'text-maroon', bg: 'bg-white' },
    { label: 'Mastery', value: `${Math.floor(progress.xp / 100) + 1}`, icon: Award, color: 'text-maroon', bg: 'bg-white' },
  ];

  const modules = [
    { id: 'typing', title: 'Tibetan Typing', desc: 'Master the Sambhota layout with precision drills.', icon: Keyboard, color: 'border-typing-blue', iconColor: 'text-typing-blue', progress: 45 },
    { id: 'quiz', title: 'Knowledge Quiz', desc: 'Challenge your vocabulary with interactive sets.', icon: HelpCircle, color: 'border-saffron', iconColor: 'text-saffron', progress: 80 },
    { id: 'grammar', title: 'Grammar Rules', desc: 'Deep dive into particle usage and honorifics.', icon: BookOpen, color: 'border-grammar-green', iconColor: 'text-grammar-green', progress: 20 },
    { id: 'translate', title: 'Translation Tool', desc: 'Practice translating texts into modern contexts.', icon: Languages, color: 'border-maroon', iconColor: 'text-maroon', progress: 55 },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold text-maroon/60 uppercase tracking-[0.2em] mb-1">Tashi Delek, Learner</p>
          <h2 className="text-4xl font-black text-ink">Keep up the rhythm</h2>
        </div>
        
        <div className="flex gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white px-6 py-4 rounded-[20px] border border-border shadow-sm flex flex-col items-start min-w-[140px]"
            >
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-maroon">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod, i) => (
          <motion.button
            key={mod.id}
            onClick={() => setActiveSection(mod.id as AppSection)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 bg-white rounded-[24px] border-b-6 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between h-[200px] group",
              mod.color
            )}
          >
            <div className="flex justify-between items-start">
              <div className={cn("p-3 rounded-xl bg-gray-50 group-hover:scale-110 transition-transform", mod.iconColor)}>
                <mod.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-gray-200" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-ink">{mod.title}</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px]">{mod.desc}</p>
            </div>

            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-1000", mod.color.replace('border-', 'bg-'))} 
                style={{ width: `${mod.progress}%` }} 
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Word of the Day / Inspiration */}
      <section className="bg-saffron p-8 rounded-[24px] text-ink flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col items-start">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Daily Inspiration</span>
          <div className="flex items-baseline gap-4">
            <h3 className="text-4xl font-tibetan font-black">ཤེས་རབ་</h3>
            <p className="text-lg italic font-medium opacity-80">Sherab — Wisdom</p>
          </div>
        </div>

        <div className="relative z-10 text-right md:pt-4">
          <p className="text-xs font-bold uppercase tracking-wider mb-1">Mastery Tip</p>
          <p className="text-sm font-medium opacity-70 italic max-w-[200px]">Focus on the root letter first! The subscripts follow the breath.</p>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
      </section>
    </div>
  );
}
