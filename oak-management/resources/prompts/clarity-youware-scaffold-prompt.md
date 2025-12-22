# Clarity YouWare Scaffold Prompt

> **Purpose**: Use this prompt in YouWare to generate the initial scaffold for Clarity
> **Strategy**: Following YouWare's "Three Golden Rules" - Feeling → Story → Sculpt
> **After**: Download the code and develop locally with Claude Code

---

## PROMPT 1: THE FEELING

```
I want to create Clarity, an emotional productivity app. The feeling should be calm, focused, and self-aware. Imagine a peaceful morning where you know exactly what to do and how you feel about it. The design should feel warm and supportive - like a gentle friend who helps you understand yourself - not cold and corporate like typical productivity tools.

The vibe is "Apple meets emotional intelligence" - minimalist, beautiful, but with a soul. Think soft gradients, glassmorphic cards, and smooth animations. Dark mode by default with a subtle ambient background.
```

---

## PROMPT 2: THE STORY

```
Let's build this app like a story.

**Chapter 1 (The Welcome):** When users arrive, greet them with today's date and an "energy forecast" - a beautiful header that shows how they're likely to feel today based on their upcoming tasks. Display a simple breakdown like "3 energizing, 2 calm, 1 tense" with soft colored dots. Include a smart tip like "Your morning looks energizing - great time for creative work!"

**Chapter 2 (The Calendar):** Below the forecast, show their calendar view. Each task/event has a subtle colored left border based on anticipated mood:
- 🔥 Energized = warm orange (#FFB347)
- 😌 Calm = soft green (#98D8AA)  
- 😰 Tense = muted red (#FF6B6B)
- 😴 Drained = gray (#9CA3AF)
- 🤔 Curious = purple (#A78BFA)

Users can switch between Day, Week, and Month views. The calendar should support drag-to-reschedule.

**Chapter 3 (The Board):** Add a Kanban board view as an alternative to the calendar. Four columns: Backlog, Todo, In Progress, Done. Each card shows:
- Task title
- Due date (if set)
- Small mood emoji badge in the corner

When users drag a task to "Done", pause for a celebration moment - gentle confetti animation and a modal asking "How did that actually feel?" with 5 emoji options:
- 🎉 Proud
- 😮‍💨 Relieved  
- 😊 Satisfied
- 😐 Meh
- 😫 Exhausted

Let them add an optional one-line reflection note.

**Chapter 4 (The Settings):** A settings page where users can:
- Choose their emoji set (default, nature, expressive, minimal)
- Pick a color palette (vibrant, pastel, mono)
- Adjust visualization intensity (full, balanced, subtle, off)
- Sign out

Navigation should be a clean bottom nav with icons for Calendar, Board, and Settings.
```

---

## PROMPT 3: YOUBASE INTEGRATION

```
For the backend, please use YouBase to make this a real, functional app:

**Auth Module:**
- Email/password signup and login
- Google OAuth login
- Show the user's name in the header when logged in
- Redirect to login page if not authenticated

**Database Module:**
Create a "tasks" table with these fields:
- id (auto-generated)
- user_id (linked to authenticated user)
- title (text, required)
- description (text, optional)
- status (text: "backlog", "todo", "in-progress", "done")
- priority (text: "high", "medium", "low")
- due_date (date, optional)
- due_time (time, optional)
- anticipated_mood (text: "energized", "calm", "tense", "drained", "curious", or null)
- completed_mood (text: "proud", "relieved", "satisfied", "meh", "exhausted", or null)
- reflection_note (text, optional)
- order_index (number for drag-drop ordering)
- completed_at (timestamp, optional)
- created_at (timestamp)
- updated_at (timestamp)

Create a "user_preferences" table:
- user_id (primary key, linked to auth user)
- emoji_set (text, default "default")
- color_palette (text, default "vibrant")
- visualization_intensity (text, default "balanced")

**Storage Module (Optional/Stretch):**
- Allow users to attach a photo to their reflection when completing a task
```

---

## PROMPT 4: TECHNICAL PREFERENCES

```
Technical setup:
- Next.js with App Router
- TypeScript in strict mode
- Tailwind CSS for styling
- Clean, well-organized file structure
- Separate components into logical folders (calendar/, board/, mood/, ui/)
- Create reusable hooks for data fetching (useUnifiedData pattern)

The code should be clean enough that I can download it and extend it locally.
```

---

## FOLLOW-UP SCULPTING PROMPTS

After seeing the first result, use these to refine:

### If the design feels too corporate:
```
This is a good start, but the design feels a bit corporate. Can we make it more warm and personal? Add some subtle glassmorphic effects to the cards - think frosted glass with soft shadows. The background could have a very subtle gradient that shifts based on the time of day.
```

### If the mood picker needs work:
```
The mood picker works, but it feels clinical. Can we make selecting a mood feel more delightful? Maybe the emojis could have a subtle bounce animation when hovered, and when selected, there's a gentle pulse effect. The whole picker should feel playful, not like a form.
```

### If the completion celebration is underwhelming:
```
The completion celebration is too quick. This is the emotional payoff moment! Can we add:
1. A 1-second pause with gentle confetti falling
2. A warm congratulatory message like "Nice work!" or "You did it!"
3. Then fade in the mood picker with the question "How did that feel?"
4. Smooth transitions between each step
```

### If the calendar needs mood colors:
```
I love the calendar, but the mood colors aren't showing on the events. Can you add a subtle 3px left border to each event colored by its anticipated_mood? If no mood is set, use a neutral gray border.
```

### If the kanban cards need badges:
```
The kanban cards need mood badges. In the top-right corner of each card, show a small circular badge with the task's anticipated mood emoji. Make it subtle - maybe 20px diameter with a soft background matching the mood color at 20% opacity.
```

---

## YOUBASE SCHEMA (for reference)

If YouWare asks for schema details:

```sql
-- Tasks table
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
  color_palette TEXT DEFAULT 'vibrant',
  visualization_intensity TEXT DEFAULT 'balanced',
  created_at INTEGER DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  updated_at INTEGER DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  FOREIGN KEY (user_id) REFERENCES es_system__auth_user(id) ON DELETE CASCADE
);
```

---

## CHECKLIST BEFORE DOWNLOADING

After YouWare generates the app, verify:

- [ ] Auth works (can sign up, login, logout)
- [ ] Google OAuth is enabled
- [ ] Tasks can be created, edited, deleted
- [ ] Calendar view shows tasks with mood colors
- [ ] Kanban view shows tasks with mood badges
- [ ] Completion celebration appears when marking done
- [ ] Mood picker saves to database
- [ ] Settings page works
- [ ] Code is well-organized

Then download and continue development locally!

---

## NOTES

- **Don't over-specify**: Let YouWare make design decisions
- **Be conversational**: "Can we try..." not "Implement X with Y"
- **Iterate**: Sculpt one thing at a time
- **Focus on feeling**: The vibe matters more than the specs
