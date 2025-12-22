import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Calendar, Plus } from 'lucide-react';
import { TaskStatus, MOOD_CONFIG, CompletedMood, AnticipatedMood } from '../types/task';
import { useTasksStore } from '../store/tasksStore';
import { Task } from '../api/client';
import GlassCard from './GlassCard';
import CompletionCelebration from './CompletionCelebration';
import { useCapture } from '../contexts/capture-context';

// Column configuration
const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

// Task card for Kanban
interface KanbanCardProps {
  task: Task;
  onDragStart: () => void;
  onDragEnd: () => void;
  onClick?: () => void;
}

function KanbanCard({ task, onDragStart, onDragEnd, onClick }: KanbanCardProps) {
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
      onClick={onClick}
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
  onTaskClick: (task: Task) => void;
  draggedTask: number | null;
}

function KanbanColumn({ status, title, tasks, onDrop, onTaskClick, draggedTask }: KanbanColumnProps) {
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
                onClick={() => onTaskClick(task)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const { tasks, isLoading, fetchTasks, updateTask } = useTasksStore();
  const { openCapture } = useCapture();
  const [draggedTask, setDraggedTask] = useState<number | null>(null);
  const [celebratingTask, setCelebratingTask] = useState<Task | null>(null);

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

  const handleTaskClick = (task: Task) => {
    openCapture(task);
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
            onClick={() => openCapture()}
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
              onTaskClick={handleTaskClick}
              draggedTask={draggedTask}
            />
          ))}
        </div>
      </GlassCard>

      {/* Celebration Modal */}
      <AnimatePresence>
        {celebratingTask && (
          <CompletionCelebration
            task={celebratingTask}
            onComplete={handleCelebrationComplete}
            onClose={() => setCelebratingTask(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
