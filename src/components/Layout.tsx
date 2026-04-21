import React, { useState, useEffect } from 'react';
import { Progress, AppSection } from '@/types';
import { 
  LayoutDashboard, 
  Keyboard, 
  HelpCircle, 
  BookOpen, 
  Languages, 
  Trophy,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  progress: Progress;
}

export function Layout({ children, activeSection, setActiveSection, progress }: LayoutProps) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'typing', icon: Keyboard, label: 'Typing' },
    { id: 'quiz', icon: HelpCircle, label: 'Quiz' },
    { id: 'grammar', icon: BookOpen, label: 'Grammar' },
    { id: 'translate', icon: Languages, label: 'Translate' },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Nav */}
      <nav className="w-full md:w-64 bg-maroon text-white flex flex-col p-6 border-r-4 border-saffron shadow-2xl relative z-20">
        <div className="mb-12">
          <h1 className="text-2xl font-black tracking-tighter leading-tight font-serif">
            བོད་སྐད་སློབ་གཉེར།
            <span className="block text-[10px] uppercase tracking-[0.2em] font-sans mt-1 text-saffron opacity-80">Tibetan Learning</span>
          </h1>
        </div>

        <div className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as AppSection)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left font-medium text-sm",
                activeSection === item.id 
                  ? "bg-saffron text-maroon shadow-lg" 
                  : "hover:bg-white/10 text-white/80"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeSection === item.id ? "text-maroon" : "opacity-60")} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Goal Card */}
        <div className="mt-auto">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-saffron uppercase tracking-widest">Mastery</span>
              <Trophy className="w-4 h-4 text-saffron" />
            </div>
            <p className="text-xl font-black">{progress.xp} XP</p>
            <div className="w-full bg-white/20 h-1 rounded-full mt-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(progress.xp % 100)}%` }}
                className="h-full bg-saffron"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto max-h-screen p-8 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
