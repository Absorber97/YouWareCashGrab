import { useState } from 'react';
import TodoItem, { Todo } from './TodoItem';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onAdd?: (title: string) => void;
}

export default function TodoList({ todos, onToggle, onAdd }: TodoListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() && onAdd) {
      onAdd(newTitle.trim());
      setNewTitle('');
      setIsAdding(false);
    }
  };

  const pendingTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className="space-y-4">
      {/* Pending todos */}
      <div className="space-y-2">
        {pendingTodos.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} index={index} />
        ))}
      </div>

      {/* Add new todo */}
      <AnimatePresence>
        {isAdding ? (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="flex gap-3"
          >
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What do you want to accomplish?"
              autoFocus
              className="
                flex-1 px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white placeholder-white/40
                focus:outline-none focus:border-white/30
                transition-all duration-200
              "
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="
                px-6 py-3 rounded-xl
                bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500
                text-white font-medium
              "
            >
              Add
            </motion.button>
          </motion.form>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAdding(true)}
            className="
              w-full flex items-center justify-center gap-2 p-4 rounded-xl
              bg-white/5 hover:bg-white/10
              text-white/60 hover:text-white/80
              transition-all duration-200
              border border-dashed border-white/10 hover:border-white/20
            "
          >
            <Plus size={20} />
            <span>Add a gentle task</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Completed todos */}
      {completedTodos.length > 0 && (
        <div className="pt-4 border-t border-white/10">
          <p className="text-white/40 text-sm mb-3">Completed today</p>
          <div className="space-y-2 opacity-60">
            {completedTodos.map((todo, index) => (
              <TodoItem key={todo.id} todo={todo} onToggle={onToggle} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
