import { motion } from 'framer-motion';
import { MOOD_CONFIG, COMPLETED_MOOD_CONFIG, AnticipatedMood, CompletedMood } from '../types/task';

type MoodType = 'anticipated' | 'completed';

interface MoodPickerProps {
  type: MoodType;
  value: AnticipatedMood | CompletedMood | null;
  onChange: (mood: any) => void;
}

export default function MoodPicker({ type, value, onChange }: MoodPickerProps) {
  const config = type === 'anticipated' ? MOOD_CONFIG : COMPLETED_MOOD_CONFIG;
  const moods = Object.keys(config) as (AnticipatedMood | CompletedMood)[];

  return (
    <div className="flex flex-wrap gap-2">
      {moods.map(mood => {
        const moodConfig = config[mood as keyof typeof config];
        const isSelected = value === mood;

        return (
          <motion.button
            key={mood}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(isSelected ? null : mood)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full
              transition-all duration-200
              ${isSelected 
                ? 'bg-white/20 ring-2 ring-white/30' 
                : 'bg-white/5 hover:bg-white/10'}
            `}
          >
            <motion.span 
              className="text-xl"
              animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {moodConfig.emoji}
            </motion.span>
            <span className="text-white/80 text-sm">{moodConfig.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
