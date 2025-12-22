import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { MOOD_CONFIG, AnticipatedMood } from '../types/task';
import { useTasksStore } from '../store/tasksStore';
import { Task } from '../api/client';
import GlassCard from './GlassCard';

type ViewMode = 'day' | 'week' | 'month';

interface CalendarViewProps {
  tasks?: Task[];
  onTaskClick?: (task: Task) => void;
  onTaskMove?: (taskId: string, newDate: string) => void;
}

// Format time to 12-hour format
function formatTime(time?: string): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Get mood border color
function getMoodBorderClass(mood?: AnticipatedMood): string {
  if (!mood) return 'border-l-white/20';
  return MOOD_CONFIG[mood].borderClass;
}

// Task card for calendar
interface TaskCardProps {
  task: Task;
  compact?: boolean;
  onClick?: () => void;
}

function TaskCard({ task, compact = false, onClick }: TaskCardProps) {
  const moodConfig = task.anticipatedMood ? MOOD_CONFIG[task.anticipatedMood] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      whileHover={{ scale: 1.02, x: 4 }}
      onClick={onClick}
      className={`
        relative pl-3 pr-3 py-2 rounded-lg cursor-pointer
        bg-white/5 hover:bg-white/10
        border-l-4 ${getMoodBorderClass(task.anticipatedMood)}
        transition-colors duration-200
        ${task.status === 'done' ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-white text-sm font-medium truncate ${task.status === 'done' ? 'line-through' : ''}`}>
            {task.title}
          </p>
          {!compact && task.dueTime && (
            <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
              <Clock size={10} />
              {formatTime(task.dueTime)}
            </p>
          )}
        </div>
        {moodConfig && (
          <span className="text-sm flex-shrink-0">{moodConfig.emoji}</span>
        )}
      </div>
    </motion.div>
  );
}

// Day view component
interface DayViewProps {
  date: Date;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

function DayView({ date, tasks, onTaskClick }: DayViewProps) {
  const dateStr = date.toISOString().split('T')[0];
  const dayTasks = tasks
    .filter(t => t.dueDate === dateStr)
    .sort((a, b) => (a.dueTime || '').localeCompare(b.dueTime || ''));

  // Generate time slots (7 AM to 9 PM)
  const timeSlots = Array.from({ length: 15 }, (_, i) => i + 7);

  return (
    <div className="space-y-1">
      {timeSlots.map(hour => {
        const hourStr = hour.toString().padStart(2, '0');
        const slotTasks = dayTasks.filter(t => t.dueTime?.startsWith(hourStr));
        
        return (
          <div key={hour} className="flex gap-3 min-h-[60px]">
            <div className="w-16 flex-shrink-0 text-right">
              <span className="text-white/30 text-xs">
                {hour % 12 || 12}:00 {hour >= 12 ? 'PM' : 'AM'}
              </span>
            </div>
            <div className="flex-1 border-l border-white/10 pl-3">
              <div className="space-y-1">
                {slotTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick?.(task)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Week view component
interface WeekViewProps {
  startDate: Date;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

function WeekView({ startDate, tasks, onTaskClick }: WeekViewProps) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(date => {
        const dateStr = date.toISOString().split('T')[0];
        const isToday = dateStr === today;
        const dayTasks = tasks
          .filter(t => t.dueDate === dateStr)
          .sort((a, b) => (a.dueTime || '').localeCompare(b.dueTime || ''));

        return (
          <div key={dateStr} className="min-h-[200px]">
            <div className={`
              text-center p-2 rounded-lg mb-2
              ${isToday ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20' : 'bg-white/5'}
            `}>
              <p className="text-white/40 text-xs uppercase">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className={`text-lg font-medium ${isToday ? 'text-white' : 'text-white/60'}`}>
                {date.getDate()}
              </p>
            </div>
            <div className="space-y-1">
              {dayTasks.slice(0, 4).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  compact
                  onClick={() => onTaskClick?.(task)}
                />
              ))}
              {dayTasks.length > 4 && (
                <p className="text-white/40 text-xs text-center">
                  +{dayTasks.length - 4} more
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Month view component
interface MonthViewProps {
  date: Date;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

function MonthView({ date, tasks, onTaskClick }: MonthViewProps) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPadding = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const today = new Date().toISOString().split('T')[0];
  const days = Array.from({ length: startPadding + daysInMonth }, (_, i) => {
    if (i < startPadding) return null;
    return new Date(year, month, i - startPadding + 1);
  });

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-white/40 text-xs py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) {
            return <div key={`empty-${i}`} className="min-h-[80px]" />;
          }

          const dateStr = day.toISOString().split('T')[0];
          const isToday = dateStr === today;
          const dayTasks = tasks.filter(t => t.dueDate === dateStr);

          // Get mood dots
          const moodDots = dayTasks
            .filter(t => t.anticipatedMood && t.status !== 'done')
            .slice(0, 3)
            .map(t => t.anticipatedMood!);

          return (
            <div
              key={dateStr}
              className={`
                min-h-[80px] p-1 rounded-lg
                ${isToday ? 'bg-gradient-to-br from-orange-500/20 to-pink-500/20 ring-1 ring-white/20' : 'bg-white/5 hover:bg-white/10'}
                transition-colors duration-200 cursor-pointer
              `}
            >
              <p className={`text-xs text-center mb-1 ${isToday ? 'text-white font-medium' : 'text-white/50'}`}>
                {day.getDate()}
              </p>
              
              {/* Mood dots */}
              <div className="flex justify-center gap-0.5 flex-wrap">
                {moodDots.map((mood, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: MOOD_CONFIG[mood].color }}
                  />
                ))}
              </div>

              {dayTasks.length > 3 && (
                <p className="text-white/30 text-[10px] text-center mt-0.5">
                  +{dayTasks.length - 3}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarView({ onTaskClick }: Omit<CalendarViewProps, 'tasks'>) {
  const { tasks } = useTasksStore();
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [currentDate, setCurrentDate] = useState(new Date());

  const viewModes: { id: ViewMode; label: string }[] = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' }
  ];

  // Navigation functions
  const navigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());

  // Get week start (Sunday)
  const weekStart = useMemo(() => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay());
    return date;
  }, [currentDate]);

  // Format header title
  const headerTitle = useMemo(() => {
    switch (viewMode) {
      case 'day':
        return currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'week':
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        if (weekStart.getMonth() === weekEnd.getMonth()) {
          return `${weekStart.toLocaleDateString('en-US', { month: 'long' })} ${weekStart.getDate()} - ${weekEnd.getDate()}`;
        }
        return `${weekStart.toLocaleDateString('en-US', { month: 'short' })} ${weekStart.getDate()} - ${weekEnd.toLocaleDateString('en-US', { month: 'short' })} ${weekEnd.getDate()}`;
      case 'month':
        return currentDate.toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        });
    }
  }, [viewMode, currentDate, weekStart]);

  return (
    <GlassCard className="p-6" delay={0.1}>
      {/* Header with view mode toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {viewModes.map(mode => (
            <motion.button
              key={mode.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(mode.id)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-200
                ${viewMode === mode.id
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'}
              `}
            >
              {mode.label}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToToday}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-white/80 text-sm hover:text-white transition-colors"
        >
          Today
        </motion.button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('prev')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
        >
          <ChevronLeft size={20} />
        </motion.button>

        <h3 className="text-white font-medium">{headerTitle}</h3>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('next')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Calendar content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${currentDate.toISOString()}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="max-h-[500px] overflow-y-auto pr-2"
        >
          {viewMode === 'day' && (
            <DayView date={currentDate} tasks={tasks} onTaskClick={onTaskClick} />
          )}
          {viewMode === 'week' && (
            <WeekView startDate={weekStart} tasks={tasks} onTaskClick={onTaskClick} />
          )}
          {viewMode === 'month' && (
            <MonthView date={currentDate} tasks={tasks} onTaskClick={onTaskClick} />
          )}
        </motion.div>
      </AnimatePresence>
    </GlassCard>
  );
}
