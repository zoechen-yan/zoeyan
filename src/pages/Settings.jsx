import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Volume2, Bell } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [focusMode, setFocusMode] = useState(true);
  const [notificationTone, setNotificationTone] = useState('gentle');
  const [ambience, setAmbience] = useState('subtle');

  return (
    <div className="min-h-screen bg-night-bg text-night-text page-transition">
      {/* Header */}
      <div className="px-md pt-lg pb-md border-b border-night-border flex items-center gap-md">
        <button
          onClick={() => navigate('/')}
          className="p-sm hover:bg-night-card rounded-lg transition-all"
        >
          <ArrowLeft size={24} className="text-night-accent" />
        </button>
        <h1 className="text-2xl font-light">Settings</h1>
      </div>

      {/* Content */}
      <div className="px-md py-2xl space-y-2xl">
        {/* Focus Mode */}
        <div className="bg-night-card rounded-lg p-lg border border-night-border">
          <div className="flex items-start justify-between mb-md">
            <div className="flex items-start gap-md">
              <Moon size={20} className="text-night-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-night-text mb-xs">Focus Mode</h3>
                <p className="text-sm text-night-muted">Minimal distractions</p>
              </div>
            </div>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`w-10 h-6 rounded-full transition-all duration-300 flex items-center ${
                focusMode ? 'bg-night-accent' : 'bg-night-border'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-night-bg transition-all duration-300 ${
                  focusMode ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Notification Tone */}
        <div className="bg-night-card rounded-lg p-lg border border-night-border">
          <div className="flex items-center gap-md mb-md">
            <Bell size={20} className="text-night-accent flex-shrink-0" />
            <div>
              <h3 className="font-medium text-night-text">Notification Tone</h3>
            </div>
          </div>
          <div className="space-y-sm">
            {['gentle', 'soft', 'subtle'].map((tone) => (
              <button
                key={tone}
                onClick={() => setNotificationTone(tone)}
                className={`w-full text-left p-md rounded-lg transition-all duration-300 border ${
                  notificationTone === tone
                    ? 'bg-night-accent/10 border-night-accent'
                    : 'bg-night-bg border-night-border hover:bg-night-border'
                }`}
              >
                <p className={`text-sm capitalize ${
                  notificationTone === tone ? 'text-night-accent font-medium' : 'text-night-muted'
                }`}>
                  {tone}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Ambience */}
        <div className="bg-night-card rounded-lg p-lg border border-night-border">
          <div className="flex items-center gap-md mb-md">
            <Volume2 size={20} className="text-night-accent flex-shrink-0" />
            <div>
              <h3 className="font-medium text-night-text">Night Ambience</h3>
            </div>
          </div>
          <div className="space-y-sm">
            {['subtle', 'moderate', 'immersive'].map((level) => (
              <button
                key={level}
                onClick={() => setAmbience(level)}
                className={`w-full text-left p-md rounded-lg transition-all duration-300 border ${
                  ambience === level
                    ? 'bg-night-accent/10 border-night-accent'
                    : 'bg-night-bg border-night-border hover:bg-night-border'
                }`}
              >
                <p className={`text-sm capitalize ${
                  ambience === level ? 'text-night-accent font-medium' : 'text-night-muted'
                }`}>
                  {level}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-md bg-night-border rounded-lg text-center">
          <p className="text-xs text-night-muted">
            After 2AM • A late-night life companion<br />
            <span className="text-night-accent">v0.1.0</span>
          </p>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  );
}
