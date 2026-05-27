import React, { useState, useEffect } from 'react';
import { Globe, Plus, Trash2, Settings } from 'lucide-react';

export default function TimeZoneClock() {
  const [timeZones, setTimeZones] = useState([
    { id: 1, name: 'Taipei', tz: 'Asia/Taipei', offset: 8 },
    { id: 2, name: 'New York', tz: 'America/New_York', offset: -5 },
    { id: 3, name: 'London', tz: 'Europe/London', offset: 0 },
    { id: 4, name: 'Tokyo', tz: 'Asia/Tokyo', offset: 9 },
    { id: 5, name: 'Sydney', tz: 'Australia/Sydney', offset: 11 },
  ]);

  const [currentTimes, setCurrentTimes] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [newTz, setNewTz] = useState('');

  const commonTimeZones = [
    { name: 'Los Angeles', tz: 'America/Los_Angeles', offset: -8 },
    { name: 'Chicago', tz: 'America/Chicago', offset: -6 },
    { name: 'Denver', tz: 'America/Denver', offset: -7 },
    { name: 'Toronto', tz: 'America/Toronto', offset: -5 },
    { name: 'São Paulo', tz: 'America/Sao_Paulo', offset: -3 },
    { name: 'Dubai', tz: 'Asia/Dubai', offset: 4 },
    { name: 'Bangkok', tz: 'Asia/Bangkok', offset: 7 },
    { name: 'Singapore', tz: 'Asia/Singapore', offset: 8 },
    { name: 'Hong Kong', tz: 'Asia/Hong_Kong', offset: 8 },
    { name: 'Paris', tz: 'Europe/Paris', offset: 1 },
    { name: 'Berlin', tz: 'Europe/Berlin', offset: 1 },
    { name: 'Moscow', tz: 'Europe/Moscow', offset: 3 },
    { name: 'Mumbai', tz: 'Asia/Kolkata', offset: 5.5 },
    { name: 'Istanbul', tz: 'Europe/Istanbul', offset: 3 },
    { name: 'Bangkok', tz: 'Asia/Bangkok', offset: 7 },
  ];

  useEffect(() => {
    const updateTimes = () => {
      const times = {};
      timeZones.forEach((tz) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.tz,
          weekday: 'short',
          month: 'short',
          day: '2-digit',
        });
        times[tz.id] = {
          time: formatter.format(now),
          date: dateFormatter.format(now),
        };
      });
      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [timeZones]);

  const handleAddTimeZone = (tzData) => {
    const newId = Math.max(...timeZones.map(t => t.id), 0) + 1;
    setTimeZones([...timeZones, { id: newId, ...tzData }]);
    setShowAddForm(false);
    setNewCity('');
    setNewTz('');
  };

  const handleRemoveTimeZone = (id) => {
    setTimeZones(timeZones.filter(tz => tz.id !== id));
  };

  return (
    <div className="min-h-screen bg-night-bg text-night-text page-transition">
      {/* Header */}
      <div className="px-md pt-2xl pb-lg border-b border-night-border sticky top-0 bg-night-bg/95 backdrop-blur">
        <div className="flex items-center gap-md mb-lg">
          <Globe size={28} className="text-night-accent" />
          <h1 className="text-3xl font-light">World Time</h1>
        </div>
        <p className="text-sm text-night-muted">
          Track time across the globe
        </p>
      </div>

      {/* Time Zones Grid */}
      <div className="px-md py-2xl space-y-md">
        {timeZones.map((tz) => (
          <div
            key={tz.id}
            className="bg-night-card rounded-lg p-lg border border-night-border hover:border-night-accent transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-md">
              <div className="flex-1">
                <h2 className="text-lg font-medium text-night-text">{tz.name}</h2>
                <p className="text-xs text-night-muted mt-xs">{tz.tz}</p>
              </div>
              <button
                onClick={() => handleRemoveTimeZone(tz.id)}
                className="p-sm hover:bg-night-bg rounded-lg transition-all text-night-muted hover:text-night-accent"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Time Display */}
            <div className="space-y-sm">
              <div className="text-4xl font-light text-night-accent tracking-wide">
                {currentTimes[tz.id]?.time || '--:--:--'}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-night-muted">
                  {currentTimes[tz.id]?.date || ''}
                </p>
                <p className="text-xs text-night-muted bg-night-bg px-md py-xs rounded-full">
                  UTC {tz.offset >= 0 ? '+' : ''}{tz.offset}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Time Zone Button */}
      <div className="px-md py-lg">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full py-lg px-md bg-night-accent text-night-bg rounded-lg font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-md"
        >
          <Plus size={20} />
          <span>Add Time Zone</span>
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="w-full bg-night-bg border-t border-night-border rounded-t-2xl p-lg space-y-md animate-slide-up">
            <div className="flex justify-between items-center mb-md">
              <h2 className="text-xl font-light">Add Time Zone</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-night-muted hover:text-night-text transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Quick Select */}
            <div className="grid grid-cols-2 gap-sm max-h-64 overflow-y-auto">
              {commonTimeZones.map((tz, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleAddTimeZone(tz);
                  }}
                  className="p-md bg-night-card rounded-lg border border-night-border hover:bg-night-border hover:border-night-accent transition-all duration-300 text-left"
                >
                  <p className="text-sm font-medium text-night-text">{tz.name}</p>
                  <p className="text-xs text-night-muted mt-xs">UTC {tz.offset >= 0 ? '+' : ''}{tz.offset}</p>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="space-y-md border-t border-night-border pt-md">
              <p className="text-xs text-night-muted uppercase tracking-wide">Custom timezone</p>
              <input
                type="text"
                placeholder="City name"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="w-full p-md bg-night-card border border-night-border rounded-lg text-night-text placeholder-night-muted focus:border-night-accent transition-all"
              />
              <input
                type="text"
                placeholder="e.g., Asia/Bangkok"
                value={newTz}
                onChange={(e) => setNewTz(e.target.value)}
                className="w-full p-md bg-night-card border border-night-border rounded-lg text-night-text placeholder-night-muted focus:border-night-accent transition-all"
              />
              <button
                onClick={() => {
                  if (newCity.trim() && newTz.trim()) {
                    handleAddTimeZone({ name: newCity, tz: newTz, offset: 0 });
                  }
                }}
                className="w-full py-md px-md bg-night-accent text-night-bg rounded-lg font-medium hover:opacity-90 transition-all"
              >
                Add Custom
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Spacing */}
      <div className="h-24"></div>
    </div>
  );
}
