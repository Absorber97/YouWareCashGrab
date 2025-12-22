# Clarity YouBase Migration Strategy

## YouBase Export Analysis (Dec 22, 2025)

### Current State
- **Auth Config**: Email/password enabled, Google OAuth NOT enabled
- **Schema**: SQLite-based, Better-Auth pattern
- **Timestamps**: Unix milliseconds `(cast(unixepoch('subsecond') * 1000 as integer))`
- **No custom tables**: Only es_system__auth_* tables exist

### Required Tables (to create)
```sql
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

## Workflow: Scaffold → Mock → Migrate

### Phase 1: Foundation (4 hours)
- Create data provider abstraction
- Implement mock provider (localStorage)
- Adapt useUnifiedData hook
- Verify calendar + kanban work

### Phase 2: Mood Features (6 hours)
- Mood picker component
- Completion celebration modal
- Calendar mood coloring
- Kanban mood badges

### Phase 3: YouBase Migration (4 hours)
- Create database schema in YouWare
- Implement youbase-provider.ts
- Enable Google OAuth
- Test in deployed app

### Phase 4: Polish (4 hours)
- Demo data, visualizations, submit

## Code Reuse from Original Clarity

| Keep As-Is | Adapt | Replace |
|------------|-------|---------|
| Schedule-X calendar | useUnifiedData hook | Craft API calls |
| dnd-kit kanban | Data transformations | Auth flow |
| Camera-pan transitions | Storage helpers | - |
| Glassmorphic UI | - | - |
| Motion animations | - | - |

## Data Provider Interface
```typescript
interface DataProvider {
  auth: { login, loginWithGoogle, logout, getCurrentUser };
  tasks: { list, create, update, delete };
  preferences: { get, update };
}
```
