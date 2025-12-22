import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { AnticipatedMood, MOOD_CONFIG } from '../types/task';
import { formatTodayDate, getMoodDistribution, getSmartTip, getTodayISO } from '../data/mockData';
import { useTasksStore } from '../store/tasksStore';
import { Task } from '../api/client';
import GlassCard from './GlassCard';

// Energy dot component for mood counts
interface EnergyDotProps {
  mood: AnticipatedMood;
  count: number;
}

function EnergyDot({ mood, count }: EnergyDotProps) {
  const config = MOOD_CONFIG[mood];
  
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2"
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      <span className={`text-sm ${config.textClass}`}>
        {count} {config.label.toLowerCase()}
      </span>
    </motion.div>
  );
}

// Forecast breakdown showing all moods
interface ForecastListProps {
  moodCounts: Record<AnticipatedMood, number>;
}

function ForecastList({ moodCounts }: ForecastListProps) {
  const moods: AnticipatedMood[] = ['energized', 'calm', 'tense', 'drained', 'curious'];
  const activeMoods = moods.filter(mood => moodCounts[mood] > 0);

  if (activeMoods.length === 0) {
    return (
      <p className="text-white/40 text-sm">No tasks with moods scheduled for today</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {activeMoods.map((mood, index) => (
        <motion.div
          key={mood}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <EnergyDot mood={mood} count={moodCounts[mood]} />
        </motion.div>
      ))}
    </div>
  );
}

// Helper to get tasks for a specific date from API tasks
function getTasksForDate(dateStr: string, tasks: Task[]): Task[] {
  return tasks.filter(task => task.dueDate === dateStr);
}

// Helper to get mood distribution from API tasks
function getMoodDistributionFromTasks(tasks: Task[]): Record<AnticipatedMood, number> {
  const distribution: Record<AnticipatedMood, number> = {
    energized: 0,
    calm: 0,
    tense: 0,
    drained: 0,
    curious: 0,
  };

  tasks.forEach(task => {
    if (task.anticipatedMood && task.anticipatedMood in distribution) {
      distribution[task.anticipatedMood as AnticipatedMood]++;
    }
  });

  return distribution;
}

export default function WelcomeHeader() {
  const { tasks } = useTasksStore();
  const today = getTodayISO();
  const todayTasks = getTasksForDate(today, tasks);
  const moodCounts = getMoodDistributionFromTasks(todayTasks);
  const smartTip = getSmartTip(moodCounts);
  const totalTasks = todayTasks.filter(t => t.status !== 'done').length;
  const allPendingTasks = tasks.filter(t => t.status !== 'done').length;

  return (
    <GlassCard className="p-6 mb-6" delay={0}>
      {/* Date header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20">
          <Calendar size={20} className="text-orange-300" />
        </div>
        <div>
          <p className="text-white/50 text-xs uppercase tracking-wider">Today</p>
          <h2 className="text-white font-medium">{formatTodayDate()}</h2>
        </div>
      </motion.div>

      {/* Energy forecast section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">
          Energy Forecast
        </h3>
        <ForecastList moodCounts={moodCounts} />
        {totalTasks > 0 ? (
          <p className="text-white/40 text-xs mt-2">
            {totalTasks} task{totalTasks > 1 ? 's' : ''} due today
          </p>
        ) : (
          <p className="text-white/40 text-xs mt-2">
            {allPendingTasks} pending task{allPendingTasks !== 1 ? 's' : ''} total
          </p>
        )}
      </motion.div>

      {/* Smart tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-pink-500/10 border border-white/5"
      >
        <Sparkles size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-white/70 text-sm leading-relaxed">{smartTip}</p>
      </motion.div>
    </GlassCard>
  );
}
