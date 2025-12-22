import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { Task } from "../api/client";
import { useCapture } from "../contexts/capture-context";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  accentColor: string;
  activeId?: string | null;
  onTaskClick?: (task: Task) => void;
}

const springTransition = { type: "spring", stiffness: 300, damping: 30 };

export default function Column({
  id,
  title,
  tasks,
  accentColor,
  activeId,
  onTaskClick,
}: ColumnProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id });
  const { openCapture } = useCapture();

  return (
    <motion.div
      className={`flex-shrink-0 w-64 md:w-72 flex flex-col rounded-2xl border backdrop-blur-xl transition-all ${
        isOver
          ? "bg-white/10 border-orange-500/50"
          : "bg-white/5 border-white/10"
      }`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={springTransition}
    >
      {/* Column Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between px-4 py-3 hover:bg-white/5 rounded-t-2xl transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-2.5 h-2.5 rounded-full ring-2 ring-white/10"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="text-sm font-medium text-white/80">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
          <motion.div
            className="text-white/30"
            animate={{ rotate: isCollapsed ? -90 : 0 }}
            transition={springTransition}
          >
            <ChevronDown size={14} />
          </motion.div>
        </div>
      </button>

      {/* Column Content */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            ref={setNodeRef}
            className="flex-1 p-2 space-y-2 min-h-[200px] overflow-y-auto"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springTransition}
          >
            <SortableContext
              items={tasks.map((task) => String(task.id))}
              strategy={verticalListSortingStrategy}
            >
              {tasks.length === 0 ? (
                <div
                  className={`flex flex-col items-center justify-center h-24 border border-dashed rounded-xl gap-2 transition-colors ${
                    activeId && isOver
                      ? "border-orange-500/50 bg-orange-500/5"
                      : "border-white/15"
                  }`}
                >
                  <p className="text-xs text-white/40">
                    {activeId && isOver ? "Drop here" : "No tasks"}
                  </p>
                  {!activeId && (
                    <button 
                      onClick={() => openCapture()}
                      className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <Plus size={12} className="inline mr-1" />
                      Add task
                    </button>
                  )}
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => onTaskClick?.(task)}
                    />
                  ))}
                </AnimatePresence>
              )}
            </SortableContext>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
