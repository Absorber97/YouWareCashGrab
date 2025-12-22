import { create } from 'zustand';
import { tasksApi, Task } from '../api/client';

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<Task>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
  reorderTasks: (items: { id: number; orderIndex: number }[]) => Promise<void>;
  setTasks: (tasks: Task[]) => void;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await tasksApi.getAll();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    }
  },

  createTask: async (task) => {
    const newTask = await tasksApi.create(task);
    set((state) => ({ tasks: [...state.tasks, newTask] }));
    return newTask;
  },

  updateTask: async (id, updates) => {
    const updatedTask = await tasksApi.update(id, updates);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
    }));
    return updatedTask;
  },

  deleteTask: async (id) => {
    await tasksApi.delete(id);
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },

  reorderTasks: async (items) => {
    // Optimistic update
    const currentTasks = get().tasks;
    const updatedTasks = currentTasks.map((task) => {
      const item = items.find((i) => i.id === task.id);
      return item ? { ...task, orderIndex: item.orderIndex } : task;
    });
    set({ tasks: updatedTasks });

    try {
      await tasksApi.reorder(items);
    } catch {
      // Revert on failure
      set({ tasks: currentTasks });
    }
  },

  setTasks: (tasks) => set({ tasks }),
}));
