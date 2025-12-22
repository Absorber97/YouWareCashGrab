import { useState, useCallback, useEffect, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  type DropAnimation,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Column from "./Column";
import TaskCard from "./TaskCard";
import GlassCard from "./GlassCard";
import CompletionCelebration from "./CompletionCelebration";
import { useTasksStore } from "../store/tasksStore";
import { useCapture } from "../contexts/capture-context";
import { Task } from "../api/client";
import { TaskStatus, CompletedMood } from "../types/task";

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: "backlog", title: "Backlog", color: "#6B7280" },
  { id: "todo", title: "To Do", color: "#3B82F6" },
  { id: "in-progress", title: "In Progress", color: "#F59E0B" },
  { id: "done", title: "Done", color: "#10B981" },
];

const dropAnimation: DropAnimation = {
  duration: 150,
  easing: "ease-out",
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: "0" } },
  }),
};

export default function KanbanBoardDndKit() {
  const { tasks, isLoading, fetchTasks, updateTask } = useTasksStore();
  const { openCapture } = useCapture();
  
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [celebratingTask, setCelebratingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (tasks.length === 0 && !isLoading) {
      fetchTasks();
    }
  }, [tasks.length, isLoading, fetchTasks]);

  // Group tasks by status
  const groupedTasks = useMemo(() => {
    return COLUMNS.reduce((acc, col) => {
      acc[col.id] = tasks
        .filter((t) => t.status === col.id)
        .sort((a, b) => a.orderIndex - b.orderIndex);
      return acc;
    }, {} as Record<TaskStatus, Task[]>);
  }, [tasks]);

  const findColumnByTaskId = useCallback(
    (taskId: string): TaskStatus | null => {
      for (const col of COLUMNS) {
        if (groupedTasks[col.id]?.some((t) => String(t.id) === taskId)) {
          return col.id;
        }
      }
      return null;
    },
    [groupedTasks]
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const taskId = String(active.id);
      const task = tasks.find((t) => String(t.id) === taskId);
      
      if (task) {
        setActiveTask(task);
        setActiveId(taskId);
      }
    },
    [tasks]
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      // Handle visual feedback during drag
    },
    []
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      
      setActiveTask(null);
      setActiveId(null);

      if (!over) return;

      const activeTaskId = String(active.id);
      const overId = String(over.id);
      
      // Find source and destination columns
      const sourceColumn = findColumnByTaskId(activeTaskId);
      let destColumn: TaskStatus | null = null;

      // Check if dropped on a column directly
      if (COLUMNS.some((c) => c.id === overId)) {
        destColumn = overId as TaskStatus;
      } else {
        // Dropped on another task - find its column
        destColumn = findColumnByTaskId(overId);
      }

      if (!sourceColumn || !destColumn) return;

      const task = tasks.find((t) => String(t.id) === activeTaskId);
      if (!task) return;

      // If moving to done column, show celebration
      if (destColumn === "done" && sourceColumn !== "done") {
        setCelebratingTask({ ...task, status: "done" });
      }

      // Update task status
      if (sourceColumn !== destColumn) {
        await updateTask(task.id, { status: destColumn });
      }
    },
    [findColumnByTaskId, tasks, updateTask]
  );

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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                tasks={groupedTasks[col.id] || []}
                accentColor={col.color}
                activeId={activeId}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask && (
              <div className="w-64 md:w-72">
                <TaskCard task={activeTask} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
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
