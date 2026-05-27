import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export default function MemoryJournal() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState([
    { date: 'Yesterday', time: '2:47 AM', text: 'The night feels different when you\'re alone with your thoughts.' },
    { date: '3 days ago', time: '2:15 AM', text: 'Sometimes the best ideas come in silence.' },
  ]);

  const handleSave = () => {
    if (content.trim()) {
      const now = new Date();
      const newEntry = {
        date: 'Today',
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        text: content,
      };
      setEntries([newEntry, ...entries]);
      setContent('');
    }
  };

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
        <h1 className="text-2xl font-light">Memory Journal</h1>
      </div>

      {/* Content */}
      <div className="px-md py-2xl space-y-2xl">
        {/* Writing Area */}
        <div className="space-y-md">
          <p className="text-xs text-night-muted uppercase tracking-wide">Write your thoughts</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind at this hour? Write freely..."
            className="w-full p-md bg-night-card border border-night-border rounded-lg text-night-text placeholder-night-muted focus:border-night-accent transition-all duration-300 min-h-40"
          />
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="w-full py-md px-md bg-night-accent text-night-bg rounded-lg font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-md"
          >
            <Save size={18} />
            <span>Save entry</span>
          </button>
        </div>

        {/* Previous Entries */}
        <div className="space-y-md">
          <p className="text-xs text-night-muted uppercase tracking-wide">Recent reflections</p>
          <div className="space-y-md">
            {entries.map((entry, idx) => (
              <div key={idx} className="bg-night-card rounded-lg p-lg border border-night-border">
                <div className="flex justify-between items-start mb-md">
                  <div>
                    <p className="text-sm text-night-accent">{entry.date}</p>
                    <p className="text-xs text-night-muted">{entry.time}</p>
                  </div>
                </div>
                <p className="text-night-text leading-relaxed">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  );
}
