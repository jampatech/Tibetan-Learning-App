import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TypingTutor } from './components/TypingTutor';
import { Quiz } from './components/Quiz';
import { Grammar } from './components/Grammar';
import { Translator } from './components/Translator';
import { Progress, AppSection } from './types';

const INITIAL_PROGRESS: Progress = {
  typingSpeed: 0,
  quizScore: 0,
  lessonsCompleted: 0,
  xp: 0
};

export default function App() {
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('gangchen_progress');
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem('gangchen_progress', JSON.stringify(progress));
  }, [progress]);

  const addXp = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const updateTypingSpeed = (wpm: number) => {
    setProgress(prev => ({
      ...prev,
      typingSpeed: Math.max(prev.typingSpeed, wpm),
      xp: prev.xp + (wpm * 2)
    }));
  };

  const updateQuizScore = (score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScore: score,
      xp: prev.xp + score
    }));
  };

  const completeLesson = () => {
    setProgress(prev => ({
      ...prev,
      lessonsCompleted: prev.lessonsCompleted + 1,
      xp: prev.xp + 50
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard progress={progress} setActiveSection={setActiveSection} />;
      case 'typing':
        return <TypingTutor onProgressUpdate={updateTypingSpeed} />;
      case 'quiz':
        return <Quiz onScoreUpdate={updateQuizScore} />;
      case 'grammar':
        return <Grammar onLesssonComplete={completeLesson} />;
      case 'translate':
        return <Translator />;
      default:
        return <Dashboard progress={progress} setActiveSection={setActiveSection} />;
    }
  };

  return (
    <Layout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      progress={progress}
    >
      {renderContent()}
    </Layout>
  );
}
