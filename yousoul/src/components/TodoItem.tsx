import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import MoodBadge, { MoodType } from './MoodBadge';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  anticipatedMood?: MoodType;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  index: number;
}

export default function TodoItem({ todo, onToggle, index }: TodoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`
        group flex items-center gap-4 p-4 rounded-2xl
        bg-white/5 hover:bg-white/10
        transition-all duration-200
        cursor-pointer
      `}
      onClick={() => onToggle(todo.id)}
    >
      {/* Checkbox */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          flex-shrink-0 w-6 h-6 rounded-full
          flex items-center justify-center
          transition-all duration-200
          ${todo.completed 
            ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500' 
            : 'border-2 border-white/20 group-hover:border-white/40'}
        `}
      >
        {todo.completed ? (
          <Check size={14} className="text-white" />
        ) : (
          <Circle size={14} className="text-transparent" />
        )}
      </motion.button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`
          text-white font-medium transition-all duration-200
          ${todo.completed ? 'line-through opacity-50' : ''}
        `}>
          {todo.title}
        </p>
      </div>

      {/* Mood badge */}
      {todo.anticipatedMood && !todo.completed && (
        <MoodBadge mood={todo.anticipatedMood} size="sm" />
      )}
    </motion.div>
  );
}
