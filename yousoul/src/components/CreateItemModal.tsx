import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';
import { useCapture } from '../contexts/capture-context';
import { useTasksStore } from '../store/tasksStore';
import { MOOD_CONFIG, AnticipatedMood, TaskStatus, Priority } from '../types/task';
import MoodPicker from './MoodPicker';

const STATUS_OPTIONS: { id: TaskStatus; label: string }[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'todo', label: 'Todo' },
  { id: 'in-progress', label: 'In Progress' },
];

const PRIORITY_OPTIONS: { id: Priority; label: string; color: string }[] = [
  { id: 'high', label: 'High', color: '#FF6B6B' },
  { id: 'medium', label: 'Medium', color: '#FFB347' },
  { id: 'low', label: 'Low', color: '#98D8AA' },
];

export default function CreateItemModal() {
  const { editingTask, closeCapture } = useCapture();
  const { createTask, updateTask } = useTasksStore();

  const isEditing = !!editingTask;

  // Form state
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [hasTime, setHasTime] = useState(false);
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<Priority>('medium');
  const [anticipatedMood, setAnticipatedMood] = useState<AnticipatedMood | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDueDate(editingTask.dueDate || '');
      setDueTime(editingTask.dueTime || '');
      setHasTime(!!editingTask.dueTime);
      setStatus(editingTask.status as TaskStatus);
      setPriority((editingTask.priority as Priority) || 'medium');
      setAnticipatedMood((editingTask.anticipatedMood as AnticipatedMood) || null);
    }
  }, [editingTask]);

  const handleSubmit = async () => {
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const taskData = {
        title: title.trim(),
        status,
        priority,
        dueDate: dueDate || null,
        dueTime: hasTime && dueTime ? dueTime : null,
        anticipatedMood: anticipatedMood,
      };

      if (isEditing && editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      closeCapture();
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={closeCapture}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#1a1a2e]/70 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-medium text-white">
            {isEditing ? 'Edit Task' : 'New Task'}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeCapture}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60"
          >
            <X size={18} />
          </motion.button>
        </div>

        <div className="p-4 space-y-5">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
            />
          </div>

          {/* Due Date & Time */}
          <div className="rounded-xl bg-white/[0.03] p-4 border border-white/8">
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={16} className="text-white/50" />
              <span className="text-sm text-white/70">Due Date</span>
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all"
            />

            {/* Time Toggle */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-white/50" />
                <span className="text-sm text-white/60">Add time</span>
              </div>
              <button
                onClick={() => setHasTime(!hasTime)}
                className={`relative w-10 h-5 rounded-full transition-colors ${hasTime ? 'bg-orange-500' : 'bg-white/20'}`}
              >
                <motion.div
                  animate={{ x: hasTime ? 20 : 2 }}
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                />
              </button>
            </div>

            {hasTime && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <input
                  type="time"
                  value={dueTime}
                  onChange={e => setDueTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all"
                />
              </motion.div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">
              Status
            </label>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map(opt => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStatus(opt.id)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    status === opt.id
                      ? 'bg-white/20 text-white ring-1 ring-white/30'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">
              Priority
            </label>
            <div className="flex gap-2">
              {PRIORITY_OPTIONS.map(opt => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPriority(opt.id)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    priority === opt.id
                      ? 'bg-white/20 text-white ring-1 ring-white/30'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                  style={{ borderBottom: priority === opt.id ? `2px solid ${opt.color}` : undefined }}
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Anticipated Mood */}
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">
              How do you anticipate feeling?
            </label>
            <MoodPicker
              type="anticipated"
              value={anticipatedMood}
              onChange={setAnticipatedMood}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={closeCapture}
            className="flex-1 py-3 rounded-xl font-medium bg-white/5 text-white/60 hover:bg-white/10 transition-all"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!title.trim() || isSubmitting}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              title.trim() && !isSubmitting
                ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Task'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
