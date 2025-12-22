import { Task, AnticipatedMood, TaskStatus } from '../types/task';

// Get time-based greeting
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Format today's date
export function formatTodayDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

// Get today's date in YYYY-MM-DD format
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

// Generate smart tip based on mood distribution
export function getSmartTip(moodCounts: Record<AnticipatedMood, number>): string {
  const tips: Record<string, string[]> = {
    energized: [
      "Your morning looks energizing - great time for creative work!",
      "High energy day ahead! Tackle challenging tasks early.",
      "Feeling energized? Perfect for brainstorming sessions."
    ],
    calm: [
      "A peaceful day ahead - ideal for deep focus work.",
      "Calm vibes today - great for reflection and planning.",
      "Your schedule looks balanced and mindful."
    ],
    tense: [
      "Some challenging moments ahead - remember to breathe.",
      "A few tense tasks today - schedule short breaks between them.",
      "Take it one step at a time today."
    ],
    drained: [
      "Light load today - be gentle with yourself.",
      "Low-energy day ahead - prioritize rest when you can.",
      "Today's pace is sustainable - no rush needed."
    ],
    curious: [
      "Curiosity-driven day ahead - embrace exploration!",
      "Great day for learning something new.",
      "Your curious tasks will spark creativity."
    ]
  };

  // Find dominant mood
  const dominant = Object.entries(moodCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])[0];

  if (!dominant) {
    return "Start fresh today - set your intentions mindfully.";
  }

  const moodTips = tips[dominant[0]];
  return moodTips[Math.floor(Math.random() * moodTips.length)];
}

// Mock tasks with dates and moods
const today = getTodayISO();
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Morning meditation session',
    description: 'Start the day with 15 minutes of mindfulness',
    status: 'todo',
    priority: 'high',
    dueDate: today,
    dueTime: '07:00',
    anticipatedMood: 'calm',
    orderIndex: 1,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now()
  },
  {
    id: '2',
    title: 'Team standup meeting',
    description: 'Daily sync with the product team',
    status: 'todo',
    priority: 'medium',
    dueDate: today,
    dueTime: '09:30',
    anticipatedMood: 'energized',
    orderIndex: 2,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now()
  },
  {
    id: '3',
    title: 'Deep work: Project proposal',
    description: 'Focus time for Q1 strategy document',
    status: 'in-progress',
    priority: 'high',
    dueDate: today,
    dueTime: '10:00',
    anticipatedMood: 'energized',
    orderIndex: 3,
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now()
  },
  {
    id: '4',
    title: 'Client presentation prep',
    description: 'Review slides and practice delivery',
    status: 'todo',
    priority: 'high',
    dueDate: today,
    dueTime: '14:00',
    anticipatedMood: 'tense',
    orderIndex: 4,
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now()
  },
  {
    id: '5',
    title: 'Research new design patterns',
    description: 'Explore glassmorphism and neumorphism trends',
    status: 'backlog',
    priority: 'low',
    dueDate: today,
    dueTime: '15:30',
    anticipatedMood: 'curious',
    orderIndex: 5,
    createdAt: Date.now() - 345600000,
    updatedAt: Date.now()
  },
  {
    id: '6',
    title: 'Take a mindful walk',
    description: '20 minutes outside to reset',
    status: 'done',
    priority: 'medium',
    dueDate: today,
    dueTime: '12:00',
    anticipatedMood: 'calm',
    completedMood: 'satisfied',
    reflectionNote: 'Really needed this break!',
    orderIndex: 6,
    completedAt: Date.now() - 3600000,
    createdAt: Date.now() - 432000000,
    updatedAt: Date.now()
  },
  {
    id: '7',
    title: 'Review quarterly goals',
    description: 'Check progress on OKRs',
    status: 'todo',
    priority: 'medium',
    dueDate: tomorrow,
    dueTime: '10:00',
    anticipatedMood: 'curious',
    orderIndex: 7,
    createdAt: Date.now() - 518400000,
    updatedAt: Date.now()
  },
  {
    id: '8',
    title: 'Evening journaling',
    description: 'Reflect on the day and plan tomorrow',
    status: 'backlog',
    priority: 'low',
    dueDate: today,
    dueTime: '20:00',
    anticipatedMood: 'calm',
    orderIndex: 8,
    createdAt: Date.now() - 604800000,
    updatedAt: Date.now()
  }
];

// Get tasks for a specific date
export function getTasksForDate(date: string, tasks: Task[]): Task[] {
  return tasks.filter(task => task.dueDate === date);
}

// Calculate mood distribution for tasks
export function getMoodDistribution(tasks: Task[]): Record<AnticipatedMood, number> {
  const counts: Record<AnticipatedMood, number> = {
    energized: 0,
    calm: 0,
    tense: 0,
    drained: 0,
    curious: 0
  };

  tasks.forEach(task => {
    if (task.anticipatedMood && task.status !== 'done') {
      counts[task.anticipatedMood]++;
    }
  });

  return counts;
}

// Group tasks by status for Kanban
export function groupTasksByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  const groups: Record<TaskStatus, Task[]> = {
    backlog: [],
    todo: [],
    'in-progress': [],
    done: []
  };

  tasks.forEach(task => {
    groups[task.status].push(task);
  });

  // Sort by orderIndex within each group
  Object.keys(groups).forEach(status => {
    groups[status as TaskStatus].sort((a, b) => a.orderIndex - b.orderIndex);
  });

  return groups;
}

// Motivational messages based on mood
export const moodMessages: Record<AnticipatedMood, string> = {
  energized: "You're radiating energy today! Channel it wisely.",
  calm: "In stillness, you find clarity. Embrace the peace.",
  tense: "Take a breath. This feeling will pass.",
  drained: "Rest is productive too. Be gentle with yourself.",
  curious: "Follow your curiosity. Discovery awaits."
};
