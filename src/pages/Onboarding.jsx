import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selectedMode, setSelectedMode] = useState('');

  const steps = [
    {
      title: 'Welcome to After 2AM',
      subtitle: 'A late-night life companion',
      description: 'This is a quiet sanctuary for your nights.',
      emoji: '🌙',
    },
    {
      title: 'When do you feel most like yourself?',
      subtitle: 'This shapes your experience',
      description: 'Choose the time that resonates with you.',
      emoji: '⏰',
      options: [
        'Between 1 and 3 AM',
        'After midnight',
        'Deep in the night',
        'Just after sunset',
      ],
    },
    {
      title: 'What kind of night comforts you?',
      subtitle: 'Set your atmosphere',
      description: 'Pick what feels like home at this hour.',
      emoji: '🏠',
      options: [
        'Quiet apartment life',
        'City lights outside',
        'Complete silence',
        'Ambient company',
      ],
    },
    {
      title: 'Do you prefer city lights or silence?',
      subtitle: 'Your environment',
      description: 'This affects your visual and sonic journey.',
      emoji: '✨',
      options: [
        'City lights & bustle',
        'Suburban calm',
        'Nature & quiet',
        'Minimal & abstract',
      ],
    },
    {
      title: 'Choose your night mode',
      subtitle: 'How do you see yourself tonight?',
      description: 'This guides your experience. You can change it anytime.',
      emoji: '🌟',
      modes: true,
    },
  ];

  const modes = [
    { id: 'Night Reader', emoji: '📚' },
    { id: 'Quiet Ambition', emoji: '🌱' },
    { id: 'City Observer', emoji: '🌃' },
    { id: 'Midnight Researcher', emoji: '🔍' },
    { id: 'Slow Living Experiment', emoji: '🍃' },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(selectedMode || 'Quiet Ambition');
    }
  };

  return (
    <div className="min-h-screen bg-night-bg text-night-text page-transition flex flex-col">
      {/* Progress */}
      <div className="px-md pt-lg">
        <div className="w-full h-1 bg-night-border rounded-full overflow-hidden">
          <div
            className="h-full bg-night-accent transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-md py-2xl">
        {/* Emoji */}
        <div className="text-6xl mb-2xl animate-slide-up">{currentStep.emoji}</div>

        {/* Title & Description */}
        <div className="text-center space-y-md mb-2xl max-w-sm">
          <h1 className="text-3xl font-light text-night-text">{currentStep.title}</h1>
          <p className="text-sm text-night-muted">{currentStep.subtitle}</p>
          <p className="text-xs text-night-muted leading-relaxed">{currentStep.description}</p>
        </div>

        {/* Options or Mode Selection */}
        {currentStep.options && !currentStep.modes && (
          <div className="w-full space-y-md mb-2xl max-w-sm">
            {currentStep.options.map((option, idx) => (
              <button
                key={idx}
                className="w-full p-md bg-night-card rounded-lg border border-night-border hover:bg-night-border hover:border-night-accent transition-all duration-300 text-left group"
              >
                <p className="text-sm text-night-text group-hover:text-night-accent transition-colors">
                  {option}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Mode Selection */}
        {currentStep.modes && (
          <div className="w-full grid grid-cols-2 gap-md mb-2xl max-w-sm">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-md rounded-lg border transition-all duration-300 text-center ${
                  selectedMode === mode.id
                    ? 'bg-night-accent/10 border-night-accent'
                    : 'bg-night-card border-night-border hover:bg-night-border'
                }`}
              >
                <div className="text-2xl mb-sm">{mode.emoji}</div>
                <p className={`text-xs ${
                  selectedMode === mode.id ? 'text-night-accent font-medium' : 'text-night-muted'
                }`}>
                  {mode.id.split(' ')[0]}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Button */}
      <div className="px-md pb-2xl">
        <button
          onClick={handleNext}
          disabled={currentStep.modes && !selectedMode}
          className="w-full py-lg px-md bg-night-accent text-night-bg rounded-lg font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-md"
        >
          <span>{step === steps.length - 1 ? 'Begin' : 'Next'}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
