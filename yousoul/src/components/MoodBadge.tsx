import { motion } from 'framer-motion';

export type MoodType = 'energized' | 'calm' | 'tense' | 'drained' | 'curious';

interface MoodBadgeProps {
  mood: MoodType;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
}

const moodConfig: Record<MoodType, { emoji: string; label: string; color: string; bgColor: string }> = {
  energized: {
    emoji: '⚡',
    label: 'Energized',
    color: 'text-amber-300',
    bgColor: 'bg-amber-500/20 hover:bg-amber-500/30'
  },
  calm: {
    emoji: '🌿',
    label: 'Calm',
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-500/20 hover:bg-emerald-500/30'
  },
  tense: {
    emoji: '😤',
    label: 'Tense',
    color: 'text-rose-300',
    bgColor: 'bg-rose-500/20 hover:bg-rose-500/30'
  },
  drained: {
    emoji: '😴',
    label: 'Drained',
    color: 'text-slate-300',
    bgColor: 'bg-slate-500/20 hover:bg-slate-500/30'
  },
  curious: {
    emoji: '🔮',
    label: 'Curious',
    color: 'text-violet-300',
    bgColor: 'bg-violet-500/20 hover:bg-violet-500/30'
  }
};

const sizeClasses = {
  sm: 'text-lg px-3 py-1.5',
  md: 'text-xl px-4 py-2',
  lg: 'text-2xl px-5 py-3'
};

export default function MoodBadge({ mood, size = 'md', selected = false, onClick }: MoodBadgeProps) {
  const config = moodConfig[mood];
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 rounded-full
        ${config.bgColor} ${config.color}
        ${sizeClasses[size]}
        transition-all duration-200
        border ${selected ? 'border-white/30' : 'border-transparent'}
        ${selected ? 'ring-2 ring-white/20' : ''}
        cursor-pointer
      `}
    >
      <span>{config.emoji}</span>
      <span className="font-medium">{config.label}</span>
    </motion.button>
  );
}
