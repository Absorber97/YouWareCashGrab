// Mood types for tasks
export type AnticipatedMood = 'energized' | 'calm' | 'tense' | 'drained' | 'curious';
export type CompletedMood = 'proud' | 'relieved' | 'satisfied' | 'meh' | 'exhausted';

// Task status for Kanban
export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'done';

// Priority levels
export type Priority = 'high' | 'medium' | 'low';

// Main Task interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  anticipatedMood?: AnticipatedMood;
  completedMood?: CompletedMood;
  reflectionNote?: string;
  orderIndex: number;
  completedAt?: number; // unix timestamp
  createdAt: number;
  updatedAt: number;
}

// Mood configuration with colors and emojis
export const MOOD_CONFIG = {
  // Anticipated moods
  energized: {
    emoji: '🔥',
    label: 'Energized',
    color: '#FFB347', // warm orange
    bgClass: 'bg-orange-400/20',
    textClass: 'text-orange-300',
    borderClass: 'border-l-orange-400'
  },
  calm: {
    emoji: '😌',
    label: 'Calm',
    color: '#98D8AA', // soft green
    bgClass: 'bg-emerald-400/20',
    textClass: 'text-emerald-300',
    borderClass: 'border-l-emerald-400'
  },
  tense: {
    emoji: '😰',
    label: 'Tense',
    color: '#FF6B6B', // muted red
    bgClass: 'bg-red-400/20',
    textClass: 'text-red-300',
    borderClass: 'border-l-red-400'
  },
  drained: {
    emoji: '😴',
    label: 'Drained',
    color: '#9CA3AF', // gray
    bgClass: 'bg-gray-400/20',
    textClass: 'text-gray-300',
    borderClass: 'border-l-gray-400'
  },
  curious: {
    emoji: '🤔',
    label: 'Curious',
    color: '#A78BFA', // purple
    bgClass: 'bg-purple-400/20',
    textClass: 'text-purple-300',
    borderClass: 'border-l-purple-400'
  }
} as const;

// Completed mood configuration
export const COMPLETED_MOOD_CONFIG = {
  proud: { emoji: '🎉', label: 'Proud' },
  relieved: { emoji: '😮‍💨', label: 'Relieved' },
  satisfied: { emoji: '😊', label: 'Satisfied' },
  meh: { emoji: '😐', label: 'Meh' },
  exhausted: { emoji: '😫', label: 'Exhausted' }
} as const;

// User preferences
export interface UserPreferences {
  emojiSet: 'default' | 'nature' | 'expressive' | 'minimal';
  colorPalette: 'vibrant' | 'pastel' | 'mono';
  visualizationIntensity: 'full' | 'balanced' | 'subtle' | 'off';
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  emojiSet: 'default',
  colorPalette: 'vibrant',
  visualizationIntensity: 'balanced'
};
