import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Calendar, Plus, X } from 'lucide-react';
import { TaskStatus, MOOD_CONFIG, CompletedMood, COMPLETED_MOOD_CONFIG, AnticipatedMood } from '../types/task';
import { useTasksStore } from '../store/tasksStore';
import { Task } from '../api/client';
import GlassCard from './GlassCard';

// Column configuration
const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

// Celebration confetti component
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

// Celebration modal for task completion
interface CelebrationModalProps {
  task: Task;
  onComplete: (mood: CompletedMood, note?: string) => void;
  onClose: () => void;
}

function CelebrationModal({ task, onComplete, onClose }: CelebrationModalProps) {
  const [selectedMood, setSelectedMood] = useState<CompletedMood | null>(null);
  const [note, setNote] = useState('');

  const moods: CompletedMood[] = ['proud', 'relieved', 'satisfied', 'meh', 'exhausted'];

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
          onClick={e => e.stopPropagation()}
          className="bg-[#1a1a24] rounded-3xl p-6 max-w-md w-full border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-white">Task Complete! 🎉</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60"
            >
              <X size={18} />
            </motion.button>
          </div>

          <p className="text-white/70 mb-6">
            You finished: <span className="text-white font-medium">{task.title}</span>
          </p>

          <p className="text-white/50 text-sm mb-3">How did that actually feel?</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {moods.map(mood => {
              const config = COMPLETED_MOOD_CONFIG[mood];
              const isSelected = selectedMood === mood;

              return (
                <motion.button
                  key={mood}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full
                    transition-all duration-200
                    ${isSelected 
                      ? 'bg-white/20 ring-2 ring-white/30' 
                      : 'bg-white/5 hover:bg-white/10'}
                  `}
                >
                  <span className="text-xl">{config.emoji}</span>
                  <span className="text-white/80 text-sm">{config.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="mb-6">
            <p className="text-white/50 text-sm mb-2">Quick reflection (optional)</p>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="One line about this moment..."
              maxLength={100}
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white placeholder-white/30
                focus:outline-none focus:border-white/30
                transition-all duration-200
              "
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!selectedMood}
            className={`
              w-full py-3 rounded-xl font-medium
              transition-all duration-200
              ${selectedMood
                ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white'
                : 'bg-white/10 text-white/40 cursor-not-allowed'}
            `}
          >
            Save & Close
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}

// Add Task Modal
interface AddTaskModalProps {
  onAdd: (task: Partial<Task>) => void;
  onClose: () => void;
}

function AddTaskModal({ onAdd, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [anticipatedMood, setAnticipatedMood] = useState<AnticipatedMood | null>(null);

  const moods: AnticipatedMood[] = ['energized', 'calm', 'tense', 'drained', 'curious'];

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        anticipatedMood: anticipatedMood,
        status: 'backlog',
        priority: 'medium',
      });
      onClose();
    }
  };

  return (
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
        onClick={e => e.stopPropagation()}
        className="bg-[#1a1a24] rounded-3xl p-6 max-w-md w-full border border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-white">Add Task</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60"
          >
            <X size={18} />
          </motion.button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            autoFocus
            className="
              w-full px-4 py-3 rounded-xl
              bg-white/5 border border-white/10
              text-white placeholder-white/30
              focus:outline-none focus:border-white/30
              transition-all duration-200
            "
          />
        </div>

        <p className="text-white/50 text-sm mb-3">How do you anticipate feeling about this?</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {moods.map(mood => {
            const config = MOOD_CONFIG[mood];
            const isSelected = anticipatedMood === mood;

            return (
              <motion.button
                key={mood}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAnticipatedMood(isSelected ? null : mood)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full
                  transition-all duration-200
                  ${isSelected 
                    ? 'bg-white/20 ring-2 ring-white/30' 
                    : 'bg-white/5 hover:bg-white/10'}
                `}
              >
                <span className="text-xl">{config.emoji}</span>
                <span className="text-white/80 text-sm">{config.label}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!title.trim()}
          className={`
            w-full py-3 rounded-xl font-medium
            transition-all duration-200
            ${title.trim()
              ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white'
              : 'bg-white/10 text-white/40 cursor-not-allowed'}
          `}
        >
          Add Task
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Task card for Kanban
interface KanbanCardProps {
  task: Task;
  onDragStart: () => void;
  onDragEnd: () => void;
}

function KanbanCard({ task, onDragStart, onDragEnd }: KanbanCardProps) {
  const moodConfig = task.anticipatedMood ? MOOD_CONFIG[task.anticipatedMood as AnticipatedMood] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`
        group relative p-3 rounded-xl cursor-grab active:cursor-grabbing
        bg-white/5 hover:bg-white/10
        border border-white/5 hover:border-white/10
        transition-colors duration-200
      `}
    >
      {/* Drag handle */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity">
        <GripVertical size={14} className="text-white" />
      </div>

      {/* Content */}
      <div className="pl-4">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-white text-sm font-medium ${task.status === 'done' ? 'line-through opacity-60' : ''}`}>
            {task.title}
          </p>
          {moodConfig && (
            <span className="text-sm flex-shrink-0">{moodConfig.emoji}</span>
          )}
        </div>

        {task.dueDate && (
          <p className="flex items-center gap-1 text-white/40 text-xs mt-2">
            <Calendar size={10} />
            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            {task.dueTime && ` at ${task.dueTime}`}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// Kanban column
interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onDrop: (taskId: number, newStatus: TaskStatus) => void;
  draggedTask: number | null;
}

function KanbanColumn({ status, title, tasks, onDrop, draggedTask }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (draggedTask) {
      onDrop(draggedTask, status);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        flex-1 min-w-[250px] p-3 rounded-2xl
        transition-all duration-200
        ${isDragOver ? 'bg-white/10 ring-2 ring-white/20' : 'bg-white/5'}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-white/40 text-xs bg-white/10 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-2 min-h-[200px]">
        <AnimatePresence>
          {tasks.map(task => (
            <div key={task.id}>
              <KanbanCard
                task={task}
                onDragStart={() => {}}
                onDragEnd={() => {}}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const { tasks, isLoading, fetchTasks, createTask, updateTask } = useTasksStore();
  const [draggedTask, setDraggedTask] = useState<number | null>(null);
  const [celebratingTask, setCelebratingTask] = useState<Task | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (tasks.length === 0 && !isLoading) {
      fetchTasks();
    }
  }, [tasks.length, isLoading, fetchTasks]);

  // Group tasks by status
  const groupedTasks = COLUMNS.reduce((acc, col) => {
    acc[col.id] = tasks.filter(t => t.status === col.id).sort((a, b) => a.orderIndex - b.orderIndex);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleDrop = useCallback(async (taskId: number, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // If moving to done, show celebration
    if (newStatus === 'done' && task.status !== 'done') {
      setCelebratingTask({ ...task, status: newStatus });
    }

    await updateTask(taskId, { status: newStatus });
    setDraggedTask(null);
  }, [tasks, updateTask]);

  const handleCelebrationComplete = async (mood: CompletedMood, note?: string) => {
    if (celebratingTask) {
      await updateTask(celebratingTask.id, {
        completedMood: mood,
        reflectionNote: note,
      });
    }
    setCelebratingTask(null);
  };

  const handleAddTask = async (taskData: Partial<Task>) => {
    await createTask(taskData);
  };

  if (isLoading) {
    return (
      <GlassCard className="p-6" delay={0.1}>
        <div className="text-center text-white/50 py-12">Loading tasks...</div>
      </GlassCard>
    );
  }

  return (
    <>
      <GlassCard className="p-6" delay={0.1}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white/60 text-sm uppercase tracking-wider">Task Board</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm"
          >
            <Plus size={16} />
            Add Task
          </motion.button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map(col => (
            <KanbanColumn
              key={col.id}
              status={col.id}
              title={col.title}
              tasks={groupedTasks[col.id]}
              onDrop={handleDrop}
              draggedTask={draggedTask}
            />
          ))}
        </div>
      </GlassCard>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddTaskModal
            onAdd={handleAddTask}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Celebration Modal */}
      <AnimatePresence>
        {celebratingTask && (
          <CelebrationModal
            task={celebratingTask}
            onComplete={handleCelebrationComplete}
            onClose={() => setCelebratingTask(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
