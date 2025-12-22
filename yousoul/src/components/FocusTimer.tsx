import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface FocusTimerProps {
  initialMinutes?: number;
  onComplete?: () => void;
}

export default function FocusTimer({ initialMinutes = 25, onComplete }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(initialMinutes);

  const totalSeconds = selectedDuration * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onComplete]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
  };

  const handleDurationChange = (minutes: number) => {
    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const durations = [5, 15, 25, 45];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Duration selector */}
      <div className="flex gap-2">
        {durations.map((min) => (
          <motion.button
            key={min}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDurationChange(min)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200
              ${selectedDuration === min 
                ? 'bg-white/20 text-white' 
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'}
            `}
          >
            {min}m
          </motion.button>
        ))}
      </div>

      {/* Timer display */}
      <div className="relative w-48 h-48">
        {/* Progress ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-white/10"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 88}
            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - progress / 100) }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={timeLeft}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-4xl font-light text-white tracking-wider"
            >
              {formatTime(timeLeft)}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/40 text-sm mt-1">
            {isRunning ? 'focusing' : 'ready'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
          className="p-3 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <RotateCcw size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsRunning(!isRunning)}
          className="p-4 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
        </motion.button>

        <div className="w-11" /> {/* Spacer for symmetry */}
      </div>
    </div>
  );
}
