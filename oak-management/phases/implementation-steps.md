# YouSoul Implementation Steps

> **Strategy**: Scaffold → Mock → Migrate  
> **Deadline**: Dec 24, 2025 @ 08:00 UTC (~36 hours)  
> **Source**: `oak-management/resources/snapshots/v1/source_code`

---

## Quick Reference

| Phase | Duration | Dependencies | Status |
|-------|----------|--------------|--------|
| 0. Project Init | 30 min | - | ⬜ |
| 1. Types & Core | 45 min | Phase 0 | ⬜ |
| 2. Data Provider | 60 min | Phase 1 | ⬜ |
| 3. Zustand Stores | 30 min | Phase 2 | ⬜ |
| 4. Layout & Nav | 45 min | Phase 3 | ⬜ |
| 5. Mood Components | 60 min | Phase 4 | ⬜ |
| 6. Calendar View | 60 min | Phase 5 | ⬜ |
| 7. Kanban Board | 60 min | Phase 5 | ⬜ |
| 8. Task Modal | 45 min | Phase 5 | ⬜ |
| 9. Settings | 30 min | Phase 4 | ⬜ |
| 10. Auth Flow | 30 min | Phase 3 | ⬜ |
| 11. Demo & Polish | 30 min | All above | ⬜ |
| **Total** | **7.5 hours** | | |

---

## Phase 0: Project Initialization (30 min)

### Commands

```bash
# 1. Create Next.js project
npx create-next-app@latest yousoul --typescript --tailwind --eslint --app --src-dir --import-alias '@/*'

# 2. Navigate to project
cd yousoul

# 3. Install core dependencies (motion NOT framer-motion!)
pnpm add motion zustand @edgespark/client zod clsx tailwind-merge

# 4. Install UI dependencies
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
pnpm add @schedule-x/react @schedule-x/calendar @schedule-x/theme-default
pnpm add lucide-react

# 5. Setup shadcn/ui
npx shadcn@latest init -y
npx shadcn@latest add button card dialog input textarea

# 6. Install dev dependencies
pnpm add -D @types/node
```

### Files to Create

```
yousoul/
├── .env.local                 # NEXT_PUBLIC_USE_MOCK=true
├── tsconfig.json              # Enable strict mode
└── tailwind.config.ts         # Custom colors
```

---

## Phase 1: Types & Core Structure (45 min)

### Files to Create

#### `src/types/mood.ts`

```typescript
export type AnticipatedMood = 'energized' | 'calm' | 'tense' | 'drained' | 'curious';
export type CompletedMood = 'proud' | 'relieved' | 'satisfied' | 'meh' | 'exhausted';

export const MOOD_CONFIG = {
  energized: {
    emoji: '🔥',
    label: 'Energized',
    color: '#FFB347',
    bgClass: 'bg-orange-400/20',
    textClass: 'text-orange-300',
    borderClass: 'border-l-orange-400'
  },
  calm: {
    emoji: '😌',
    label: 'Calm',
    color: '#98D8AA',
    bgClass: 'bg-emerald-400/20',
    textClass: 'text-emerald-300',
    borderClass: 'border-l-emerald-400'
  },
  tense: {
    emoji: '😰',
    label: 'Tense',
    color: '#FF6B6B',
    bgClass: 'bg-red-400/20',
    textClass: 'text-red-300',
    borderClass: 'border-l-red-400'
  },
  drained: {
    emoji: '😴',
    label: 'Drained',
    color: '#9CA3AF',
    bgClass: 'bg-gray-400/20',
    textClass: 'text-gray-300',
    borderClass: 'border-l-gray-400'
  },
  curious: {
    emoji: '🤔',
    label: 'Curious',
    color: '#A78BFA',
    bgClass: 'bg-purple-400/20',
    textClass: 'text-purple-300',
    borderClass: 'border-l-purple-400'
  }
} as const;

export const COMPLETED_MOOD_CONFIG = {
  proud: { emoji: '🎉', label: 'Proud' },
  relieved: { emoji: '😮‍💨', label: 'Relieved' },
  satisfied: { emoji: '😊', label: 'Satisfied' },
  meh: { emoji: '😐', label: 'Meh' },
  exhausted: { emoji: '😫', label: 'Exhausted' }
} as const;
```

#### `src/types/task.ts`

```typescript
import type { AnticipatedMood, CompletedMood } from './mood';

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'done';
export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  dueTime?: string;
  anticipatedMood?: AnticipatedMood;
  completedMood?: CompletedMood;
  reflectionNote?: string;
  orderIndex: number;
  completedAt?: number;
  createdAt: number;
  updatedAt: number;
}
```

#### `src/types/user.ts`

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}

export interface UserPreferences {
  userId: string;
  emojiSet: 'default' | 'nature' | 'expressive' | 'minimal';
  colorPalette: 'vibrant' | 'pastel' | 'mono';
  visualizationIntensity: 'full' | 'balanced' | 'subtle' | 'off';
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  userId: '',
  emojiSet: 'default',
  colorPalette: 'vibrant',
  visualizationIntensity: 'balanced'
};
```

#### `src/lib/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### `src/lib/motion/config.ts`

```typescript
export const springs = {
  default: { stiffness: 300, damping: 30 },
  tabIndicator: { stiffness: 400, damping: 30 },
  cardDrag: { stiffness: 300, damping: 30 },
  modal: { stiffness: 350, damping: 30 },
  celebration: { stiffness: 260, damping: 20 }
} as const;

export const pageTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1]
} as const;
```

---

## Phase 2: Data Provider Pattern (60 min)

### Key Concept

```
NEXT_PUBLIC_USE_MOCK=true  → Uses mockProvider (localStorage)
NEXT_PUBLIC_USE_MOCK=false → Uses youbaseProvider (EdgeSpark API)
```

### Files to Create

#### `src/lib/providers/types.ts`

```typescript
import type { Task } from '@/types/task';
import type { User, UserPreferences } from '@/types/user';

export interface AuthProvider {
  login(email: string, password: string): Promise<User>;
  loginWithGoogle(): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  onAuthStateChange(callback: (user: User | null) => void): () => void;
}

export interface TasksProvider {
  list(): Promise<Task[]>;
  get(id: string): Promise<Task | null>;
  create(task: Partial<Task>): Promise<Task>;
  update(id: string, updates: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
  reorder(items: { id: string; orderIndex: number }[]): Promise<void>;
}

export interface PreferencesProvider {
  get(): Promise<UserPreferences>;
  update(prefs: Partial<UserPreferences>): Promise<UserPreferences>;
}

export interface DataProvider {
  auth: AuthProvider;
  tasks: TasksProvider;
  preferences: PreferencesProvider;
}
```

#### `src/lib/providers/mock-provider.ts`

```typescript
import type { DataProvider } from './types';
import type { Task } from '@/types/task';
import type { User, UserPreferences, DEFAULT_PREFERENCES } from '@/types/user';
import { DEMO_TASKS } from '@/lib/data/demo-tasks';
import { DEMO_USER } from '@/lib/data/demo-user';

const STORAGE_KEYS = {
  USER: 'yousoul-mock-user',
  TASKS: 'yousoul-mock-tasks',
  PREFERENCES: 'yousoul-mock-preferences'
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockProvider: DataProvider = {
  auth: {
    async login(email, password) {
      await delay(200);
      const user = { ...DEMO_USER, email };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return user;
    },
    async loginWithGoogle() {
      await delay(200);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEMO_USER));
      return DEMO_USER;
    },
    async logout() {
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
    async getCurrentUser() {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    },
    onAuthStateChange(callback) {
      // Simplified - just return current user
      this.getCurrentUser().then(callback);
      return () => {};
    }
  },
  tasks: {
    async list() {
      await delay(150);
      const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
      return stored ? JSON.parse(stored) : DEMO_TASKS;
    },
    async get(id) {
      const tasks = await this.list();
      return tasks.find(t => t.id === id) || null;
    },
    async create(task) {
      await delay(100);
      const tasks = await this.list();
      const newTask: Task = {
        id: crypto.randomUUID(),
        userId: 'demo-user',
        title: task.title || 'New Task',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        orderIndex: task.orderIndex || tasks.length,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...task
      };
      tasks.push(newTask);
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return newTask;
    },
    async update(id, updates) {
      await delay(100);
      const tasks = await this.list();
      const index = tasks.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Task not found');
      tasks[index] = { ...tasks[index], ...updates, updatedAt: Date.now() };
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return tasks[index];
    },
    async delete(id) {
      await delay(100);
      const tasks = await this.list();
      const filtered = tasks.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(filtered));
    },
    async reorder(items) {
      await delay(50);
      const tasks = await this.list();
      for (const item of items) {
        const task = tasks.find(t => t.id === item.id);
        if (task) task.orderIndex = item.orderIndex;
      }
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    }
  },
  preferences: {
    async get() {
      await delay(100);
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES, userId: 'demo-user' };
    },
    async update(prefs) {
      await delay(100);
      const current = await this.get();
      const updated = { ...current, ...prefs };
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
      return updated;
    }
  }
};
```

#### `src/lib/providers/index.ts`

```typescript
import type { DataProvider } from './types';
import { mockProvider } from './mock-provider';
// import { youbaseProvider } from './youbase-provider';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const dataProvider: DataProvider = USE_MOCK 
  ? mockProvider 
  : mockProvider; // TODO: Replace with youbaseProvider when ready

export type { DataProvider };
```

---

## Phase 3: Zustand Stores Migration (30 min)

**Source files to port:**
- `source_code/src/store/authStore.ts`
- `source_code/src/store/tasksStore.ts`
- `source_code/src/store/preferencesStore.ts`

**Key changes:**
- Replace direct API calls with `dataProvider` methods
- Keep persist middleware for session/cache
- Add mood-related selectors

---

## Phase 4: App Layout & Navigation (45 min)

**Key files:**
- `src/app/layout.tsx` - Root layout
- `src/app/(dashboard)/layout.tsx` - Dashboard with BottomNav
- `src/app/(dashboard)/template.tsx` - Page transitions

**Components to port:**
- `Aurora.tsx` - Keep as-is
- `BottomNav.tsx` - Convert framer-motion → motion/react

---

## Phase 5: Mood System Components (60 min)

**Core components:**
- `MoodPicker` - Mood selection row
- `MoodBadge` - Small emoji badge
- `CompletionCelebration` - Done task modal

---

## Phase 6-7: Calendar & Kanban (2 hours)

**Calendar (Schedule-X):**
- Day/Week/Month views
- 3px mood-colored left border on tasks
- Drag to reschedule

**Kanban (dnd-kit):**
- 4 columns: Backlog, Todo, In Progress, Done
- Spring physics on drag
- CompletionCelebration on drop to Done

---

## Phase 8-11: Task Modal, Settings, Auth, Polish (2.5 hours)

See `yousoul-workflow-plan.json` for detailed steps.

---

## Critical Constraints

| Constraint | Reason |
|------------|--------|
| ⚠️ `motion/react` NOT `framer-motion` | Challenge requirement |
| ⚠️ TypeScript strict | Code quality |
| ⚠️ Mock-first | Don't block on YouBase |
| ⚠️ Deadline | Dec 24 08:00 UTC |

---

## After All Phases Complete

### Phase 12: YouBase Migration (4 hours, separate session)

1. Complete `src/lib/providers/youbase-provider.ts`
2. Set `NEXT_PUBLIC_USE_MOCK=false`
3. Test all CRUD operations
4. Deploy to YouWare

---

## Files to Port from Source

| Source | Target | Changes |
|--------|--------|---------|
| `types/task.ts` | `types/mood.ts`, `types/task.ts` | Split, keep configs |
| `store/*.ts` | `lib/stores/*.ts` | Use dataProvider |
| `Aurora.tsx` | `components/ui/aurora.tsx` | Keep as-is |
| `GlassCard.tsx` | `components/ui/glass-card.tsx` | Keep as-is |
| `BottomNav.tsx` | `components/ui/bottom-nav.tsx` | motion/react |
| `MoodBadge.tsx` | `components/mood/mood-badge.tsx` | Keep as-is |
| `LoginPage.tsx` | `app/(auth)/login/page.tsx` | Next.js page |
| `KanbanBoard.tsx` | `components/board/kanban-board.tsx` | motion/react |
| `CalendarView.tsx` | `components/calendar/schedule-calendar.tsx` | Schedule-X |
| `SettingsPage.tsx` | `app/(dashboard)/settings/page.tsx` | Next.js page |

---

## Memory Persistence

After completing phases, save progress:

```bash
# Serena (session context)
serena___write_memory:
  key: yousoul-foundation-progress
  content: { completedPhases: [...], blockers: [...], nextSteps: [...] }

# Core (long-term decisions)
core-memory-ingest:
  category: yousoul
  content: "Data provider pattern, Motion.dev for animations, mock-first strategy"
```
