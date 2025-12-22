# YOUWARE.md - YouSoul Emotional Productivity App

This file provides guidance to YOUWARE Agent (youware.com) when working with code in this repository.

## Project Overview

**YouSoul** is an emotional productivity app that connects mood to tasks. The design philosophy is "Apple meets emotional intelligence" - minimalist, beautiful, but with a soul.

### Design Language
- **Theme**: Dark mode by default (#0a0a0f background)
- **Colors**: Mood-specific colors (orange=energized, green=calm, red=tense, gray=drained, purple=curious)
- **Components**: Glassmorphic cards with backdrop blur and subtle borders
- **Animations**: Smooth fade-in with blur effects, micro-interactions on hover/tap
- **Background**: Animated Aurora effect using WebGL (ogl library)

### Key Features (Story-Driven)
1. **Chapter 1 - The Welcome**: Energy forecast header showing mood breakdown for the day with smart tips
2. **Chapter 2 - The Calendar**: Day/Week/Month views with mood-colored left borders on tasks
3. **Chapter 3 - The Board**: Kanban board (Backlog, Todo, In Progress, Done) with celebration modal on completion
4. **Chapter 4 - Settings**: User preferences with cloud sync

## Tech Stack

### Frontend
- **React**: 18.3.1 with TypeScript 5.8.3
- **Vite**: 7.0.0 (build tool)
- **Tailwind CSS**: 3.4.17
- **Framer Motion**: 11.0.8 - React animation library
- **GSAP**: 3.13.0 - Professional animation library
- **ogl**: WebGL library for Aurora background
- **Zustand**: State management with persistence
- **@edgespark/client**: Youbase frontend SDK for auth and API calls

### Backend (Youbase)
- **Hono**: Lightweight web framework on Cloudflare Workers
- **Drizzle ORM**: Type-safe database access
- **D1/SQLite**: Cloudflare's edge database
- **R2 Storage**: Object storage for reflection photos

## Development Commands

- **Install dependencies**: `npm install`
- **Build project**: `npm run build`
- **Deploy backend**: `cd backend && npx edgespark deploy`

## Backend Architecture

### Database Tables

**tasks**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Auto-increment primary key |
| user_id | TEXT | FK to auth user |
| title | TEXT | Task title (required) |
| description | TEXT | Optional description |
| status | TEXT | backlog, todo, in-progress, done |
| priority | TEXT | high, medium, low |
| due_date | TEXT | YYYY-MM-DD format |
| due_time | TEXT | HH:mm format |
| anticipated_mood | TEXT | energized, calm, tense, drained, curious |
| completed_mood | TEXT | proud, relieved, satisfied, meh, exhausted |
| reflection_note | TEXT | Optional reflection |
| reflection_photo_s3_uri | TEXT | S3 URI for photo |
| order_index | INTEGER | For drag-drop ordering |
| completed_at | INTEGER | Unix timestamp |
| created_at | INTEGER | Unix timestamp |
| updated_at | INTEGER | Unix timestamp |

**user_preferences**
| Column | Type | Description |
|--------|------|-------------|
| user_id | TEXT | Primary key, FK to auth user |
| emoji_set | TEXT | default, nature, expressive, minimal |
| color_palette | TEXT | vibrant, pastel, mono |
| visualization_intensity | TEXT | full, balanced, subtle, off |
| created_at | INTEGER | Unix timestamp |
| updated_at | INTEGER | Unix timestamp |

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/me | Get current user profile |
| GET | /api/tasks | List all user tasks |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create task |
| PATCH | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| POST | /api/tasks/reorder | Bulk update order |
| GET | /api/preferences | Get user preferences |
| PUT | /api/preferences | Update preferences |
| POST | /api/reflections/upload-url | Get presigned upload URL |
| GET | /api/reflections/download-url | Get presigned download URL |

### Storage Buckets
- **reflections**: Stores reflection photos attached to completed tasks

## Frontend Architecture

### State Management
```
src/store/
├── authStore.ts        # User session with Zustand persist
├── tasksStore.ts       # Tasks state with API sync
└── preferencesStore.ts # User preferences with persist
```

### API Client
```typescript
// src/api/client.ts
import { createEdgeSpark } from '@edgespark/client';

const client = createEdgeSpark({ baseUrl: WORKER_URL });

// Auth: client.auth.renderAuthUI(), client.auth.getSession()
// API: client.api.fetch('/api/tasks')
```

### Key Components
```
src/
├── pages/
│   └── LoginPage.tsx      # Managed auth UI with Youbase
├── components/
│   ├── Aurora.tsx         # WebGL ambient background
│   ├── WelcomeHeader.tsx  # Energy forecast (uses tasksStore)
│   ├── CalendarView.tsx   # Calendar (uses tasksStore)
│   ├── KanbanBoard.tsx    # Kanban with CRUD (uses tasksStore)
│   ├── SettingsPage.tsx   # Settings (uses authStore, preferencesStore)
│   └── Header.tsx         # Shows user name from authStore
└── App.tsx                # Auth flow: isChecking → LoginPage or MainApp
```

## Authentication Flow

1. App mounts → restoreSession() checks for existing session
2. If session exists → show MainApp
3. If no session → show LoginPage with Youbase managed UI
4. On login success → redirectTo '/' and setUser in authStore
5. On logout → client.auth.signOut() and reset authStore

## Mood Color Mapping

| Mood | Color | Hex |
|------|-------|-----|
| Energized | Warm orange | #FFB347 |
| Calm | Soft green | #98D8AA |
| Tense | Muted red | #FF6B6B |
| Drained | Gray | #9CA3AF |
| Curious | Purple | #A78BFA |

## Google OAuth Setup

To enable Google login, configure Google OAuth in Youbase settings:
1. Go to Youbase settings
2. Add Google OAuth credentials
3. Users can then sign in with Google on the login page
