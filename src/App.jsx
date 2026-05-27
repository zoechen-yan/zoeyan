import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskDetail from './pages/TaskDetail';
import TaskComplete from './pages/TaskComplete';
import NightModes from './pages/NightModes';
import MemoryJournal from './pages/MemoryJournal';
import After2AMRadio from './pages/After2AMRadio';
import WeeklyRhythm from './pages/WeeklyRhythm';
import Settings from './pages/Settings';
import EmptyNight from './pages/EmptyNight';
import Onboarding from './pages/Onboarding';
import './index.css';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userMode, setUserMode] = useState('Quiet Ambition');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read a chapter quietly', emotion: 'A moment to absorb knowledge', time: 30, completed: false },
    { id: 2, title: 'Journal your thoughts', emotion: 'Let your mind settle', time: 20, completed: false },
    { id: 3, title: 'Listen to ambient sounds', emotion: 'Find peace in silence', time: 45, completed: false },
  ]);
  const [completedTaskId, setCompletedTaskId] = useState(null);

  useEffect(() => {
    const onboarded = localStorage.getItem('after2am_onboarded');
    const mode = localStorage.getItem('after2am_mode');
    if (onboarded) setIsOnboarded(true);
    if (mode) setUserMode(mode);
  }, []);

  const handleOnboardingComplete = (mode) => {
    setUserMode(mode);
    setIsOnboarded(true);
    localStorage.setItem('after2am_onboarded', 'true');
    localStorage.setItem('after2am_mode', mode);
  };

  const handleTaskComplete = (taskId) => {
    setCompletedTaskId(taskId);
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home tasks={tasks} userMode={userMode} />} />
        <Route path="/task/:id" element={<TaskDetail tasks={tasks} onComplete={handleTaskComplete} />} />
        <Route path="/task-complete" element={<TaskComplete />} />
        <Route path="/night-modes" element={<NightModes currentMode={userMode} setMode={setUserMode} />} />
        <Route path="/journal" element={<MemoryJournal />} />
        <Route path="/radio" element={<After2AMRadio />} />
        <Route path="/weekly" element={<WeeklyRhythm tasks={tasks} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/empty-night" element={<EmptyNight />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
