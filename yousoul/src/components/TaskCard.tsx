import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical, Calendar } from "lucide-react";
import { Task } from "../api/client";
import { MOOD_CONFIG, AnticipatedMood } from "../types/task";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

const springTransition = { type: "spring", stiffness: 300, damping: 30 };

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(task.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const moodConfig = task.anticipatedMood 
    ? MOOD_CONFIG[task.anticipatedMood as AnticipatedMood] 
    : null;

  // Show placeholder when dragging
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-xl border-2 border-dashed border-orange-500/40 bg-orange-500/5 p-4"
      >
        <div className="pl-2 invisible">
          <h4 className="font-medium text-sm">{task.title}</h4>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout="position"
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`group relative rounded-xl border cursor-grab active:cursor-grabbing p-4 
        bg-white/8 border-white/10 hover:bg-white/12 hover:border-white/15
        transition-colors`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={springTransition}
    >
      {/* Priority indicator */}
      {task.priority && (
        <div
          className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${priorityColors[task.priority]}`}
        />
      )}

      {/* Content */}
      <div className="pl-2">
        {/* Title row with mood emoji */}
        <div className="flex items-start justify-between gap-2">
          <h4 className={`font-medium text-sm text-white ${
            task.status === 'done' ? 'line-through opacity-60' : ''
          }`}>
            {task.title}
          </h4>
          {moodConfig && (
            <span className="text-sm flex-shrink-0">{moodConfig.emoji}</span>
          )}
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-white/50 mt-1.5 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Meta row */}
        {task.dueDate && (
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs flex items-center gap-1 ${
              isOverdue(task.dueDate) ? "text-red-400" : "text-white/50"
            }`}>
              <Calendar size={10} />
              {formatDueDate(task.dueDate)}
              {task.dueTime && ` at ${formatTime(task.dueTime)}`}
            </span>
          </div>
        )}
      </div>

      {/* Drag handle indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity">
        <GripVertical size={12} className="text-white" />
      </div>
    </motion.div>
  );
}

function isOverdue(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
}

function formatDueDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}
