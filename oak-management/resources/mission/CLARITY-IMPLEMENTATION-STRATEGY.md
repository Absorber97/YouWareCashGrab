# Clarity YouWare Implementation Strategy

> **Generated**: 2025-12-22
> **Purpose**: LLM-friendly context for implementing Clarity on YouWare platform
> **Load Command**: "Load this markdown to continue Clarity YouWare implementation"

---

## Quick Context

```yaml
Challenge: YouWare Challenge on Contra
Prize: $10,000 ($5,000 grand prize)
Deadline: 2025-12-24T08:00:00Z
App: Clarity - "Feel your productivity"
Concept: First app connecting mood directly to productivity tasks
Projected Score: 33-35/35
```

---

## Core Strategy: "Scaffold → Mock → Migrate"

### The Insight

**Don't sync two codebases.** Instead:
1. Get YouBase scaffold once (auth config, API patterns)
2. Develop locally with mocks (fast, no deploy cycles)
3. Migrate finished code to YouWare once
4. Test YouBase at the end

### Why This Works

| Approach | Problem |
|----------|---------|
| Continuous sync | Time-consuming, error-prone, distracting |
| YouWare-only | Slow iteration, cloud-only testing |
| **Mock → Migrate** | Fast local dev, one-time migration, focused |

---

## Phase Timeline

```
┌─────────────────────────────────────────────────────────────┐
│ PHASE 1: FOUNDATION (4 hours)                               │
├─────────────────────────────────────────────────────────────┤
│ • Set up local project structure                            │
│ • Copy reusable components from Clarity                     │
│ • Create DataProvider interface (abstraction layer)         │
│ • Implement MockProvider (localStorage)                     │
│ • Adapt useUnifiedData hook to use provider                 │
│ • Result: Calendar + Kanban work with mock data             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 2: MOOD FEATURES (6 hours)                            │
├─────────────────────────────────────────────────────────────┤
│ • Mood picker component (5 tier-1 moods)                    │
│ • Completion celebration modal                              │
│ • Calendar mood border coloring                             │
│ • Kanban mood emoji badges                                  │
│ • Full mood flow with mocks                                 │
│ • Result: Core differentiator complete                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 3: YOUBASE MIGRATION (4 hours)                        │
├─────────────────────────────────────────────────────────────┤
│ • Create tasks + preferences tables in YouWare              │
│ • Enable Google OAuth in YouBase config                     │
│ • Implement YouBaseProvider (same interface)                │
│ • Switch NEXT_PUBLIC_USE_MOCK=false                         │
│ • Test auth + CRUD in deployed app                          │
│ • Result: Real backend working                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 4: POLISH (4 hours)                                   │
├─────────────────────────────────────────────────────────────┤
│ • Add demo data for judges                                  │
│ • Skyscape gradient (if time)                               │
│ • Week soul card (if time)                                  │
│ • Submit to Contra                                          │
│ • Social media post                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## YouBase Analysis

### Current State (from database export)

```yaml
Auth Config:
  email_password: ENABLED
  google_oauth: NOT ENABLED (needs setup)
  anonymous: DISABLED

Existing Tables:
  - es_system__auth_user
  - es_system__auth_account
  - es_system__auth_session
  - es_system__auth_config
  - es_system__auth_verification

Custom Tables: NONE (need to create)

Schema Pattern:
  - SQLite-based
  - Timestamps: Unix milliseconds
  - Foreign keys to auth_user
```

### Required Database Schema

```sql
-- Tasks table (core)
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  due_date TEXT,
  due_time TEXT,
  anticipated_mood TEXT,
  completed_mood TEXT,
  reflection_note TEXT,
  reflection_photo TEXT,
  order_index REAL,
  completed_at INTEGER,
  created_at INTEGER DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  updated_at INTEGER DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  FOREIGN KEY (user_id) REFERENCES es_system__auth_user(id) ON DELETE CASCADE
);

-- User preferences table
CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY,
  emoji_set TEXT DEFAULT 'default',
  custom_emojis TEXT,
  color_palette TEXT DEFAULT 'vibrant',
  visualization_intensity TEXT DEFAULT 'balanced',
  reflection_depth TEXT DEFAULT 'optional',
  created_at INTEGER DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  updated_at INTEGER DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  FOREIGN KEY (user_id) REFERENCES es_system__auth_user(id) ON DELETE CASCADE
);
```

---

## Data Provider Architecture

### Interface (shared by mock and real)

```typescript
// lib/data/types.ts
export type MoodType = 'energized' | 'calm' | 'tense' | 'drained' | 'curious';
export type CompletionMoodType = 'proud' | 'relieved' | 'satisfied' | 'meh' | 'exhausted';
export type StatusType = 'backlog' | 'todo' | 'in-progress' | 'done';
export type PriorityType = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: StatusType;
  priority: PriorityType;
  due_date?: string;
  due_time?: string;
  anticipated_mood?: MoodType;
  completed_mood?: CompletionMoodType;
  reflection_note?: string;
  reflection_photo?: string;
  order_index: number;
  completed_at?: number;
  created_at: number;
  updated_at: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

export interface UserPreferences {
  user_id: string;
  emoji_set: 'default' | 'nature' | 'expressive' | 'minimal';
  custom_emojis?: string[];
  color_palette: 'vibrant' | 'pastel' | 'mono';
  visualization_intensity: 'full' | 'balanced' | 'subtle' | 'off';
  reflection_depth: 'always' | 'optional' | 'never';
}

// lib/data/provider.ts
export interface DataProvider {
  auth: {
    login: (email: string, password: string) => Promise<User>;
    loginWithGoogle: () => Promise<User>;
    logout: () => Promise<void>;
    getCurrentUser: () => Promise<User | null>;
    onAuthStateChange: (callback: (user: User | null) => void) => () => void;
  };
  tasks: {
    list: () => Promise<Task[]>;
    get: (id: string) => Promise<Task | null>;
    create: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => Promise<Task>;
    update: (id: string, updates: Partial<Task>) => Promise<Task>;
    delete: (id: string) => Promise<void>;
  };
  preferences: {
    get: () => Promise<UserPreferences | null>;
    update: (prefs: Partial<UserPreferences>) => Promise<UserPreferences>;
  };
}
```

### Provider Switch

```typescript
// lib/data/index.ts
import { mockProvider } from './mock-provider';
import { youbaseProvider } from './youbase-provider';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const dataProvider: DataProvider = USE_MOCK ? mockProvider : youbaseProvider;
```

---

## Code Reuse from Original Clarity

### Reuse Matrix

| Component | Reuse | Adaptation Needed |
|-----------|-------|-------------------|
| Schedule-X calendar | 100% | Add mood border coloring |
| dnd-kit kanban | 100% | Add mood badges |
| Camera-pan transitions | 100% | None |
| Glassmorphic UI | 100% | None |
| Motion animations | 100% | None |
| BottomNav | 100% | None |
| useUnifiedData hook | 70% | Replace API calls with provider |
| CaptureModal | 70% | Add mood picker |
| TaskCard | 70% | Add mood badge |
| Storage helpers | 50% | Adapt for new schema |
| Craft API client | 0% | Replace with provider |

### Key Files to Copy

```
From: /Users/oak/Downloads/Core/Dev/Craft/
To: /Users/oak/Downloads/Core/Competition/YouWare/clarity/

Copy:
├── components/clarity/calendar/schedule-calendar.tsx
├── components/clarity/board/kanban-board.tsx
├── components/clarity/board/column.tsx
├── components/clarity/board/task-card.tsx (adapt for mood)
├── components/clarity/ui/bottom-nav.tsx
├── components/clarity/capture/create-item-modal.tsx (adapt for mood)
├── lib/clarity/tab-transition-context.tsx
├── lib/clarity/capture-context.tsx
├── app/clarity/template.tsx (camera-pan)
└── app/clarity/layout.tsx (providers, video bg)
```

---

## Mood System Implementation

### Tier 1 Moods (Quick Pick)

```typescript
export const TIER1_MOODS = [
  { id: 'energized', emoji: '🔥', label: 'Energized', color: '#FFB347' },
  { id: 'calm', emoji: '😌', label: 'Calm', color: '#98D8AA' },
  { id: 'tense', emoji: '😰', label: 'Tense', color: '#FF6B6B' },
  { id: 'drained', emoji: '😴', label: 'Drained', color: '#9CA3AF' },
  { id: 'curious', emoji: '🤔', label: 'Curious', color: '#A78BFA' },
] as const;
```

### Completion Moods

```typescript
export const COMPLETION_MOODS = [
  { id: 'proud', emoji: '🎉', label: 'Proud' },
  { id: 'relieved', emoji: '😮‍💨', label: 'Relieved' },
  { id: 'satisfied', emoji: '😊', label: 'Satisfied' },
  { id: 'meh', emoji: '😐', label: 'Meh' },
  { id: 'exhausted', emoji: '😫', label: 'Exhausted' },
] as const;
```

### Three Pillars Flow

```
ANTICIPATE (task creation)
    ↓ "How do I feel about this?"
    └── 5 mood options (optional)

EXPERIENCE (during task)
    ↓ Visual feedback
    └── Calendar borders, kanban badges, skyscape

REFLECT (task completion)
    ↓ "How did that feel?"
    └── 5 completion moods + optional note
```

---

## Priority Matrix

### P0: Must Have (Day 1)

- [ ] Data provider abstraction
- [ ] Mock provider (localStorage)
- [ ] Calendar with mood borders
- [ ] Kanban with mood badges
- [ ] Mood picker in task creation
- [ ] Completion celebration modal
- [ ] YouBase Auth (Email + Google)
- [ ] YouBase Database CRUD

### P1: Should Have (Day 2 AM)

- [ ] Energy forecast header
- [ ] Week soul card
- [ ] Emoji/color customization
- [ ] Skyscape gradient overlay

### P2: Nice to Have (Day 2 PM)

- [ ] Month heatmap grid
- [ ] Stacked area chart

### P3: Stretch (If time)

- [ ] Radar balance chart
- [ ] Photo attachments
- [ ] AI-generated insights

---

## YouWare Migration Prompts

### When ready to create schema:

```
Add these database tables to my YouBase:

CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  due_date TEXT,
  due_time TEXT,
  anticipated_mood TEXT,
  completed_mood TEXT,
  reflection_note TEXT,
  order_index REAL,
  completed_at INTEGER,
  created_at INTEGER,
  updated_at INTEGER
);

CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY,
  emoji_set TEXT DEFAULT 'default',
  color_palette TEXT DEFAULT 'vibrant',
  visualization_intensity TEXT DEFAULT 'balanced'
);

Also enable Google OAuth in the auth config.
```

### When ready to upload code:

```
I'm uploading my Clarity app code. Please:
1. Wire the auth components to YouBase Auth
2. Wire the data provider to YouBase Database
3. Ensure all CRUD operations work with the tasks table
4. Add proper error handling for auth flows
```

---

## Technical Stack

```yaml
Frontend: Next.js (App Router)
Language: TypeScript (strict)
Styling: Tailwind CSS + glassmorphic tokens
Animation: Motion.dev (NEVER framer-motion)
Calendar: Schedule-X
Kanban: dnd-kit
Charts: shadcn/ui + Recharts
Icons: @hugeicons-pro/core-solid-rounded
Backend: YouBase (Auth + Database + Storage)
```

---

## File Structure

```
clarity/
├── app/
│   ├── layout.tsx (providers, video bg)
│   ├── template.tsx (camera-pan transitions)
│   ├── page.tsx (redirect to /calendar)
│   ├── calendar/page.tsx
│   ├── board/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── calendar/
│   │   └── schedule-calendar.tsx
│   ├── board/
│   │   ├── kanban-board.tsx
│   │   ├── column.tsx
│   │   └── task-card.tsx
│   ├── mood/
│   │   ├── mood-picker.tsx
│   │   ├── completion-celebration.tsx
│   │   └── mood-badge.tsx
│   ├── capture/
│   │   └── create-item-modal.tsx
│   └── ui/
│       ├── bottom-nav.tsx
│       └── glassmorphic-card.tsx
├── lib/
│   ├── data/
│   │   ├── types.ts
│   │   ├── provider.ts (interface)
│   │   ├── mock-provider.ts
│   │   ├── youbase-provider.ts
│   │   └── index.ts (switch)
│   ├── hooks/
│   │   └── use-unified-data.ts
│   ├── mood/
│   │   ├── constants.ts
│   │   └── utils.ts
│   └── contexts/
│       ├── auth-context.tsx
│       ├── capture-context.tsx
│       └── tab-transition-context.tsx
└── .env.local
    └── NEXT_PUBLIC_USE_MOCK=true
```

---

## Environment Variables

```bash
# Local development (mock mode)
NEXT_PUBLIC_USE_MOCK=true

# Production (YouBase mode)
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_YOUBASE_URL=https://your-project.youware.app
```

---

## Related Resources

```yaml
Mission Brief: oak-management/resources/mission/CLARITY-MISSION-BRIEF.md
Mission JSON: oak-management/resources/mission/clarity-youware-mission-2025-12-22.json
Guidelines: oak-management/resources/youware-challenge-guidelines.json
Charts: oak-management/resources/charts-and-mood-system.json
Original Clarity: /Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-context.json
YouBase Export: oak-management/resources/database_export_20251222_191130/
Session Memory (Dec 19): oak-management/SESSION_MEMORY_2025-12-19.json
Workflow Strategy: oak-management/YOUWARE_WORKFLOW_STRATEGY.md
```

---

## Serena Memories

```yaml
Active:
  - clarity-youware-mission-2025-12-22 (mission context)
  - clarity-youbase-migration-strategy (implementation strategy)

From Original Clarity:
  - clarity-page-transitions-implementation
  - clarity-data-refresh-patterns
  - clarity-tab-camera-pan-transitions
```

---

## Key Decisions Log

| Decision | Rationale |
|----------|-----------|
| Mock → Migrate workflow | YouBase is cloud-only; mocks enable fast local dev |
| Data provider abstraction | Same interface for mock and real; easy switch |
| 5 tier-1 moods | Balance simplicity vs granularity |
| Mood as data layer | Integrates naturally; no extra navigation |
| Reuse 60% of Clarity | Proven patterns; saves time |
| shadcn/ui + Recharts | Production-ready charts; matches design |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| YouBase issues | Mock provider as fallback |
| Time pressure | P0 only on Day 1; P1+ if time |
| OAuth complexity | Test early in Phase 3 |
| Integration bugs | 4 hours buffer for testing |

---

## Success Criteria

```yaml
Minimum Viable:
  - [ ] Calendar + Kanban working
  - [ ] Mood picker on tasks
  - [ ] Completion celebration
  - [ ] YouBase Auth (email)
  - [ ] YouBase Database CRUD

Full Vision:
  - [ ] Google OAuth
  - [ ] Energy forecast
  - [ ] Week soul card
  - [ ] Skyscape gradient
  - [ ] Customization options
  - [ ] Demo data
  - [ ] Social post for bonus points
```

---

## Next Steps

1. Create local project structure
2. Copy reusable components from original Clarity
3. Implement data provider abstraction
4. Build mock provider
5. Start Phase 1 implementation

---

*Load this document at session start for full implementation context.*
