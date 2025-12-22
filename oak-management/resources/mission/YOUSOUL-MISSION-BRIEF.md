# YouSoul: Feel Your Productivity

> **Mission Brief for YouWare Challenge 2025**
> 
> Session Date: December 22, 2025
> Deadline: December 24, 2025 @ 08:00 UTC (2 days remaining)

---

## The Big Picture

**What we're building**: The first productivity app that remembers not just *what* you did, but *how it made you feel*.

**Why it wins**: Calendar and Kanban apps are everywhere. Mood trackers are everywhere. But NO app connects mood TO the task itself. We do.

**The tagline**: *"Feel your productivity"*

---

## Challenge Details

| | |
|---|---|
| **Prize Pool** | $10,000 total |
| **Grand Prize** | $5,000 + 100k YouWare credits |
| **Deadline** | Dec 24, 2025 @ 08:00 UTC |
| **Platform** | YouWare + YouBase |
| **Submission** | Contra Community #YouWareChallenge |

---

## Scoring Strategy

### Base Points (20 pts)

| Criterion | Points | Our Strategy |
|-----------|--------|--------------|
| Target Audience Fit | 5 | Non-developers, emotional appeal, 5 audience segments |
| Design Quality | 5 | Apple + Chibi aesthetic, glassmorphic UI, Motion.dev |
| Functionality | 5 | Zero bugs, proven YouSoul base from Craft challenge |
| Unique Idea | 5 | **FIRST app tying mood to productivity** |

### Bonus Points (15 pts)

| Criterion | Points | Action |
|-----------|--------|--------|
| Social Post | 5 | Post @YouWareAI #YouWareChallenge |
| Tag Friends | 5 | Tag 2-3 friends |
| YouBase Expert | 5 | Use Auth + Database + Storage |

**Projected Score: 33-35/35**

---

## The Concept: Emotional Productivity Intelligence

### Why This Works

Your calendar and kanban are already emotional - every task has a feeling attached:
- The meeting you're dreading
- The project you're excited about  
- The admin work that drains you

**We're not adding emotion. We're making visible what's already there.**

### The Three Pillars

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ANTICIPATE          EXPERIENCE           REFLECT               ║
║   ───────────         ──────────           ───────               ║
║   Before task         During task          After task            ║
║                                                                  ║
║   "How do I feel      Visual feedback      "How did that         ║
║    about this?"       (colors, skyscape)    feel?"               ║
║                                                                  ║
║                    ↓            ↓            ↓                   ║
║                                                                  ║
║                         LEARN                                    ║
║                    ───────────────                               ║
║                    See patterns,                                 ║
║                    get insights                                  ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### Psychology Behind It

| Principle | Research | Our Application |
|-----------|----------|-----------------|
| **Emotional Granularity** | Lisa Feldman Barrett | Nuanced mood options, not just good/bad |
| **Affect Labeling** | "Name it to tame it" | Even 1-tap mood selection reduces stress |
| **Plutchik's Wheel** | 8 primary emotions | Expandable tier-2 moods for power users |

---

## The Mood System

### Tier 1: Quick Moods (5 options, 1-tap)

| Emoji | Label | Color | Meaning |
|-------|-------|-------|---------|
| 🔥 | Energized | Gold `#FFB347` | Excited, motivated, ready |
| 😌 | Calm | Green `#98D8AA` | Peaceful, focused, in flow |
| 😰 | Tense | Coral `#FF6B6B` | Anxious, nervous, pressured |
| 😴 | Drained | Gray `#9CA3AF` | Tired, unmotivated |
| 🤔 | Curious | Purple `#A78BFA` | Interested, exploring |

### Tier 2: Nuanced Moods (15 options, optional expansion)

Each Tier 1 mood expands to 3 variants for users who want more granularity.

### Completion Moods (after task done)

🎉 Proud | 😮‍💨 Relieved | 😊 Satisfied | 😐 Meh | 😫 Exhausted

---

## How It Looks in Each View

### Daily Calendar View

```
┌─────────────────────────────────────────────────────┐
│ Tuesday, December 24                                │
│ ═══════════════════════════════════════════════════│
│ Today's Energy: ████████░░ Mixed                   │
│ 🔥 3 exciting  😰 1 anxious  😌 2 calm             │
│                                                     │
│ 💡 Tackle "Client call 😰" first to free up energy │
├─────────────────────────────────────────────────────┤
│ 9:00  ▌🔥▌ Design review                           │
│ 11:00 ▌😰▌ Client call                             │
│ 2:00  ▌😌▌ Deep work block                         │
│ 4:00  ▌😌▌ Documentation                           │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Energy forecast header with breakdown
- Smart tip based on mood composition
- Color-coded left borders on events

### Weekly Calendar View

```
┌─────────────────────────────────────────────────────┐
│ ✨ Week of Dec 16-22            Your Soul Summary  │
├─────────────────────────────────────────────────────┤
│ Completed: 18/23 tasks (78%) ████████████░░░       │
│                                                     │
│ Emotional Journey:                                  │
│ Mon   Tue   Wed   Thu   Fri   Sat   Sun            │
│  😰    🔥    🔥    😌    🎉    😴    😌             │
│  ╱     ╱     ─     ╲     ╱     ╲     ─             │
│                                                     │
│ ⭐ Peak: "Shipped the feature!" (Fri 🎉)           │
│ 📈 Pattern: You're 3x better after anxious tasks   │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Progress bar with completion rate
- Day-by-day emotional journey with trend arrows
- Peak moment highlight from reflections
- Pattern insight

### Monthly Calendar View

```
┌─────────────────────────────────────────────────────┐
│ December 2025                    Month Soul Map     │
├─────────────────────────────────────────────────────┤
│     M   T   W   T   F   S   S                      │
│ W1  🔥  😌  🔥  🔥  😰  😌  🔥                     │
│ W2  😌  🔥  🔥  😴  🔥  🎉  😌                     │
│ W3  🔥  🔥  😰  ●   ○   ○   ○   ← current          │
│ W4  ○   ○   ○   ○   ○   ○   ○                      │
│                                                     │
│ 💡 December: Productive with occasional anxiety    │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Year-in-Pixels style grid (iconic, familiar)
- Tap any day to see task details
- Month summary insight

### Kanban View

```
┌─ To Do ─────────┐ ┌─ In Progress ───┐ ┌─ Done ──────────┐
│ Energy: 🔥🔥😰   │ │ Energy: 😌      │ │ Energy: 🎉🎉😮‍💨  │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ ┌─────────────┐ │ │ ┌─────────────┐ │ │ ┌─────────────┐ │
│ │ Task A   🔥 │ │ │ │ Task D   😌 │ │ │ │ Task F   🎉 │ │
│ │ Due: Mon    │ │ │ │ Due: Today  │ │ │ │ "Nailed it!"│ │
│ └─────────────┘ │ │ └─────────────┘ │ │ └─────────────┘ │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

**Features:**
- Column energy header
- Mood emoji badge on each card
- Done cards show completion mood + note snippet

---

## Completion Celebration

When you check off a task:

```
┌────────────────────────────────────┐
│ ✨ Task completed!                  │
│                                    │
│ How did that feel?                 │
│ 🎉  😮‍💨  😊  😐  😫                │
│                                    │
│ [Quick note...            ] 📷    │
│                                    │
│ [Skip]              [Done]        │
└────────────────────────────────────┘
```

- Appears inline (not modal takeover)
- **1 tap** to select mood
- **Skip always available** (no friction)
- Photo = stretch goal for milestones

---

## Visualizations

### Ambient Skyscape

The app background subtly shifts based on your day's emotional composition:

| Dominant Mood | Gradient | Feel |
|--------------|----------|------|
| 🔥 Energized | Sunrise gold → orange | Warm, energizing |
| 😌 Calm | Sky blue → soft green | Peaceful |
| 😰 Tense | Storm gray → slate | Heavy, urgent |
| Mixed | Blended gradient | Dynamic |

*Implementation: CSS gradients, 40% opacity, 2s transitions*

### Charts (shadcn/ui + Recharts)

| View | Chart | Purpose |
|------|-------|---------|
| Daily | Energy Timeline | Mood blocks across day |
| Weekly | Stacked Area + Donut | Emotion flow + proportion |
| Monthly | Heatmap Grid | Year-in-Pixels style |
| Insights | Radar + Bar | Balance + correlation |

---

## Customization

### Emoji Sets

| Set | Moods |
|-----|-------|
| Default | 🔥 😌 😰 😴 🤔 |
| Nature | ⚡ 🌿 🌧️ 💤 ✨ |
| Expressive | 💪 😎 😬 😩 🧐 |
| Minimal | ● ◐ ◑ ○ ◉ |

### Color Palettes

- **Vibrant**: Bold, saturated colors
- **Pastel**: Soft, gentle tones
- **Mono**: Grayscale with accent

### Visualization Intensity

- **Full**: Skyscape + borders + badges + charts
- **Balanced**: Borders + badges
- **Subtle**: Badges only
- **Off**: Traditional view

---

## Competitive Advantage

### Why We Win Against Mood Apps

| App | Their Approach | Our Advantage |
|-----|---------------|---------------|
| Daylio | Generic daily mood | Mood tied to specific tasks |
| Bearable | Health/medical focus | Productivity focus |
| Apple State of Mind | Separate from tasks | Integrated into workflow |
| Lunatask | Separate mood tracker | Mood ON the task |

### Why We Win Against Productivity Apps

| App | Their Gap | Our Fill |
|-----|-----------|----------|
| Motion | No emotional context, $19-34/mo | Emotional intelligence, FREE |
| Linear | Developer-only, no calendar | Universal audience, calendar + kanban |
| Notion | Database-first | Task-first, emotionally aware |

**The moat**: We're the ONLY app that ties mood TO the task itself with at-moment capture.

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (from YouSoul base) |
| Styling | Tailwind CSS + glassmorphic tokens |
| Animation | Motion.dev (NEVER framer-motion) |
| Calendar | Schedule-X |
| Kanban | dnd-kit |
| Charts | shadcn/ui + Recharts |
| Backend | YouBase (Auth + Database + Storage) |
| Icons | @hugeicons-pro/core-solid-rounded |

---

## YouBase Integration

### Modules Used

| Module | Use Case | Status |
|--------|----------|--------|
| **Auth** | Email + Google login | ✅ Confirmed |
| **Database** | Tasks, moods, reflections, preferences | ✅ Confirmed |
| **Storage** | Completion photos | 🔶 Stretch |
| **Secrets** | OpenAI API for insights | 🔶 Stretch |

### Database Schema

**tasks table:**
```
id, user_id, title, description, status, priority,
due_date, due_time, anticipated_mood, completed_mood,
reflection_note, reflection_photo, completed_at, order
```

**user_preferences table:**
```
user_id, emoji_set, custom_emojis, color_palette,
visualization_intensity, reflection_depth
```

### Constraints to Remember

- ❌ No vector/embedding storage (semantic search not viable)
- ❌ No local emulator (must deploy to test)
- ❌ Cloud-only (no offline mode)

---

## Implementation Roadmap

### Day 1: Foundation (Dec 22-23)

| Hours | Task | Deliverable |
|-------|------|-------------|
| 0-2 | YouWare + YouBase setup | Project created, schema defined |
| 2-4 | Data layer adaptation | CRUD working with YouBase |
| 4-6 | Calendar + mood coloring | Daily view functional |
| 6-8 | Kanban + mood badges | Board view functional |

### Day 2: Features + Polish (Dec 23-24)

| Hours | Task | Deliverable |
|-------|------|-------------|
| 0-2 | Completion celebration | Mood capture flow working |
| 2-4 | Mood in capture + customization | Full mood integration |
| 4-6 | Visualizations | Soul card, skyscape |
| 6-8 | Demo data + polish | Ready to ship |

### Buffer: Dec 24 morning (4 hours before deadline)

---

## Priority Matrix

### P0: Must Have (Ship or fail)

- [ ] 5-mood picker in task creation
- [ ] Completion celebration + mood capture
- [ ] Calendar mood border coloring
- [ ] Kanban mood badges
- [ ] YouBase Auth (Email + Google)
- [ ] YouBase Database CRUD

### P1: Should Have (Makes it compelling)

- [ ] Energy forecast header (daily)
- [ ] Week soul card
- [ ] Mood donut chart
- [ ] Emoji/color customization
- [ ] Skyscape gradient overlay

### P2: Nice to Have (If time permits)

- [ ] Month heatmap grid
- [ ] Stacked area chart (weekly)
- [ ] Productivity × mood bar chart

### P3: Stretch (Probably not)

- [ ] Radar balance chart
- [ ] Photo attachments
- [ ] AI-generated insights

---

## Demo Script for Judges

1. **"Welcome to YouSoul - feel your productivity"**
2. Login with Google *(YouBase Auth demo)*
3. Show calendar with energy forecast header
4. Create task with anticipated mood *(1 tap)*
5. Complete task - watch celebration + mood capture
6. Reveal week soul card with emotional journey
7. Toggle visualization intensity in settings
8. **"All powered by YouBase - Auth, Database, and Storage"**

---

## Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| **Reject semantic search** | YouBase lacks vectors; doesn't show expertise; too complex for 2 days |
| **Choose "YouSoul with Soul"** | Highest score (27) for uniqueness + feasibility + YouBase fit |
| **Mood as data layer** | No separate view = less cognitive load, natural integration |
| **5 tier-1 moods** | Accessible for casual users; tier-2 expansion for power users |
| **shadcn/ui + Recharts** | Production-ready, themeable, matches design system |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Time pressure | P0 only on day 1, polish day 2, buffer day 3 |
| YouBase issues | Test early, fallback for Storage |
| Scope creep | Cut P2/P3 ruthlessly if behind |
| Demo failure | Pre-populate compelling demo data |

### Fallback MVP (worst case, still unique)

Calendar + Kanban + Auth + basic mood badges

---

## Insights We Can Show

> "Tasks you dread often turn out better than expected"

> "You complete 40% more tasks when energized"

> "Tackling anxious tasks first frees up energy"

> "Mondays are your most anxious days"

---

## Resources

| Resource | Location |
|----------|----------|
| Mission JSON | `oak-management/resources/mission/yousoul-youware-mission-2025-12-22.json` |
| Charts System | `oak-management/resources/charts-and-mood-system.json` |
| Challenge Guidelines | `oak-management/resources/youware-challenge-guidelines.json` |
| YouSoul Base (Craft) | `/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/yousoul-documentation/yousoul-context.json` |
| Previous Session | `oak-management/SESSION_MEMORY_2025-12-19.json` |

---

## Design Philosophy Reminders

- **Apple + Chibi**: Aspirational simplicity + warm humble persona
- **Zero friction**: Every tap should feel worth it
- **Motion.dev only**: Never framer-motion
- **Celebrate over track**: Reward completion, don't guilt about tracking
- **Skip is sacred**: Never penalize skipping mood selection

---

## Next Steps

1. Create YouWare project with detailed prompt
2. Enable YouBase (Auth + Database)
3. Define database schema
4. Download code to local (Claude Code)
5. Start P0 implementation

---

*Let's win this.* 🏆
