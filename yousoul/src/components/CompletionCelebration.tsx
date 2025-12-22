import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Task } from '../api/client';
import { CompletedMood } from '../types/task';
import MoodPicker from './MoodPicker';

// Confetti animation component
function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#FFB347', '#98D8AA', '#FF6B6B', '#A78BFA', '#F472B6'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ 
            x: `${p.x}vw`, 
            y: -20, 
            rotate: 0,
            opacity: 1 
          }}
          animate={{ 
            y: '110vh', 
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: 0
          }}
          transition={{ 
            duration: 2 + Math.random(), 
            delay: p.delay,
            ease: 'linear'
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

interface CompletionCelebrationProps {
  task: Task;
  onComplete: (mood: CompletedMood, note?: string) => void;
  onClose: () => void;
}

export default function CompletionCelebration({ task, onComplete, onClose }: CompletionCelebrationProps) {
  const [selectedMood, setSelectedMood] = useState<CompletedMood | null>(null);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (selectedMood) {
      onComplete(selectedMood, note.trim() || undefined);
    }
  };

  return (
    <>
      <Confetti />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="bg-[#1a1a2e]/70 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl max-w-md w-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-xl font-medium text-white">You did it! 🎉</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60"
            >
              <X size={18} />
            </motion.button>
          </div>

          <div className="p-5 space-y-5">
            <p className="text-white/70">
              You finished: <span className="text-white font-medium">{task.title}</span>
            </p>

            {/* Completion Mood */}
            <div>
              <p className="text-white/50 text-sm mb-3">How did that actually feel?</p>
              <MoodPicker
                type="completed"
                value={selectedMood}
                onChange={setSelectedMood}
              />
            </div>

            {/* Reflection Note */}
            <div>
              <p className="text-white/50 text-sm mb-2">Quick reflection (optional)</p>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="One line about this moment..."
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!selectedMood}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                selectedMood
                  ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              Save & Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
