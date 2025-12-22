# Improved Prompt: YouSoul Emotional Productivity App Foundation

**Original**: "Okay, this is the version that I have downloaded... Let's start developing the code... create some kind of an index JSON... start creating the app that fits with my vision..."
**Category**: `implementation`
**Score**: 3/10 → 9/10 (+6)
**Generated**: 2025-12-22T20:00:00Z

---

## Copy This Prompt:

```xml
<task>
Build YouSoul - "The soul of your schedule" - the first productivity app that connects mood directly to tasks. Execute the complete foundation phase using the downloaded YouWare source code snapshot and existing Clarity context documentation.

Go beyond basic scaffolding to create a production-ready foundation with the Scaffold → Mock → Migrate strategy.

## Core Deliverables
1. **Codebase Index**: Generate comprehensive index JSON mapping all source code structure
2. **Project Scaffold**: Initialize YouSoul project with proper architecture
3. **Foundation Integration**: Merge YouWare patterns with Clarity vision
4. **Mock Data Layer**: Implement data provider pattern with mock/real switching
</task>

<context>
## YouSoul Vision
- **Tagline**: "The soul of your schedule"
- **Core Innovation**: First productivity app connecting mood directly to tasks
- **Mood System**: 5 tier-1 moods, completion moods, ANTICIPATE → EXPERIENCE → REFLECT pillars
- **Aesthetic**: Apple + Chibi, emotionally resonant, zero friction

## Tech Stack (STRICT)
| Layer | Technology | Note |
|-------|------------|------|
| Framework | Next.js 15 | App Router |
| Language | TypeScript | Strict mode |
| Animation | Motion.dev | ⚠️ NEVER framer-motion |
| Calendar | Schedule-X | Primary calendar lib |
| Kanban | dnd-kit | Drag-and-drop |
| Components | shadcn/ui | Base component lib |
| Styling | Tailwind CSS | Utility-first |
| Backend | YouBase | Auth, Database, Storage, Secrets |

## Source Materials
| Resource | Path |
|----------|------|
| YouWare Source | `oak-management/resources/snapshots/v1/source_code` |
| Clarity Context | `/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-context.json` |
| Related Artifacts | `oak-management/artifacts/` |

## Challenge Context
- **Deadline**: December 24, 2025 @ 08:00 UTC (~36 hours remaining)
- **Prize Pool**: $10,000
- **Strategy**: Scaffold → Mock → Migrate
- **Phase Timeline**: Foundation (4h) → Mood Features (6h) → YouBase Migration (4h) → Polish (4h)
</context>

<execution_phases>
## Phase 1: Codebase Understanding (45 min)
Use WarpGrep for semantic exploration of source code structure:

```bash
# Semantic queries for YouWare source
morph-mcp___warpgrep_codebase_search:
  path: oak-management/resources/snapshots/v1/source_code
  queries:
    - "Main application architecture and entry points"
    - "Component library structure and patterns"
    - "Data models and state management approach"
    - "API routes and backend integration patterns"
    - "Authentication and YouBase integration"
```

**Deliverable**: Understanding of YouWare patterns to adopt

## Phase 2: Index Generation (30 min)
Create comprehensive codebase index:

```json
{
  "schema_version": "1.0",
  "generated": "ISO_TIMESTAMP",
  "source": "oak-management/resources/snapshots/v1/source_code",
  "structure": {
    "directories": [],
    "files": [],
    "components": [],
    "hooks": [],
    "utils": [],
    "types": [],
    "api_routes": []
  },
  "patterns": {
    "state_management": "",
    "data_fetching": "",
    "styling": "",
    "animation": ""
  },
  "dependencies": {}
}
```

**Output**: `oak-management/artifacts/codebase-index/youware-source-index.json`

## Phase 3: Clarity Context Integration (30 min)
Load and merge previous development context:

```bash
# Read Clarity context
Read: /Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-context.json

# Search related artifacts
Glob: oak-management/artifacts/**/*.{json,md}

# Load relevant Serena memories
mcp__serena__read_memory:
  keys: ["clarity", "yousoul", "youware", "mood-system"]
```

**Deliverable**: Merged context document with aligned vision

## Phase 4: Project Initialization (60 min)
Create YouSoul project with proper structure:

```
yousoul/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (dashboard)/       # Main app routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── calendar/          # Schedule-X wrappers
│   │   ├── kanban/            # dnd-kit kanban
│   │   └── mood/              # Mood system components
│   ├── lib/
│   │   ├── providers/         # Data providers (mock/real)
│   │   ├── hooks/             # Custom hooks
│   │   └── utils/             # Utility functions
│   ├── types/                 # TypeScript definitions
│   └── styles/                # Global styles + Tailwind
├── public/
└── package.json
```

**Key Files to Create**:
1. `src/lib/providers/data-provider.ts` - Mock/real switching pattern
2. `src/types/mood.ts` - Mood system type definitions
3. `src/types/task.ts` - Task with mood integration
4. `tailwind.config.ts` - With Apple aesthetic tokens

## Phase 5: Foundation Implementation (90 min)
Implement core foundation components:

### 5.1 Data Provider Pattern
```typescript
// src/lib/providers/data-provider.ts
interface DataProvider {
  tasks: TaskProvider;
  moods: MoodProvider;
  calendar: CalendarProvider;
}

const mockProvider: DataProvider = { /* mock implementations */ };
const youbaseProvider: DataProvider = { /* real implementations */ };

export const dataProvider = process.env.NEXT_PUBLIC_USE_MOCK 
  ? mockProvider 
  : youbaseProvider;
```

### 5.2 Mood System Types
```typescript
// src/types/mood.ts
type Tier1Mood = 'energized' | 'calm' | 'focused' | 'creative' | 'tired';
type CompletionMood = 'satisfied' | 'relieved' | 'accomplished' | 'neutral';
type MoodPillar = 'anticipate' | 'experience' | 'reflect';
```

### 5.3 Motion Setup
```typescript
// src/lib/motion/config.ts
// Motion.dev configuration (NOT framer-motion)
import { spring } from 'motion';

export const motionConfig = {
  spring: spring({ stiffness: 300, damping: 30 }),
  // ... Apple-inspired easing
};
```

## Phase 6: Memory & Context Persistence (15 min)
Save progress to Serena and Core memory:

```bash
# Serena memory (session context)
mcp__serena__write_memory:
  key: "yousoul-foundation-complete"
  value: { phase: "foundation", timestamp: "...", deliverables: [...] }

# Core memory (long-term decisions)
core-memory-ingest:
  category: "yousoul"
  content: "Foundation phase completed with data provider pattern..."
```
</execution_phases>

<output_format>
## Expected Deliverables

### 1. Codebase Index JSON
Path: `oak-management/artifacts/codebase-index/youware-source-index.json`
- Complete file/directory mapping
- Component registry
- Pattern documentation

### 2. YouSoul Project Directory
Path: `yousoul/` (new project directory)
- Initialized Next.js 15 project
- Configured with correct dependencies
- Basic structure in place

### 3. Foundation Files Created
```
FILES CREATED                           STATUS
──────────────────────────────────────────────
src/lib/providers/data-provider.ts      ✓
src/lib/providers/mock-provider.ts      ✓
src/types/mood.ts                       ✓
src/types/task.ts                       ✓
src/types/calendar.ts                   ✓
src/lib/motion/config.ts                ✓
tailwind.config.ts                      ✓
```

### 4. Context Integration Report
- Patterns adopted from YouWare source
- Features aligned with Clarity vision
- Decisions saved to memory

### 5. Phase Completion Summary
| Phase | Duration | Status |
|-------|----------|--------|
| Codebase Understanding | 45 min | ⬜ |
| Index Generation | 30 min | ⬜ |
| Clarity Integration | 30 min | ⬜ |
| Project Init | 60 min | ⬜ |
| Foundation Impl | 90 min | ⬜ |
| Memory Persistence | 15 min | ⬜ |
| **Total** | **4.5h** | - |
</output_format>

<execution_principles>
## Codex Principles (Apply These)
- **End-to-end**: Complete all 6 phases, don't stop at understanding
- **Batch everything**: Read all source files in parallel, not one-by-one
- **Tool over shell**: Use WarpGrep for semantic search, not grep
- **Codebase conventions**: Adopt YouWare patterns where sensible
- **Behavior-safe**: Preserve Clarity vision while adapting YouWare code
- **No excessive looping**: If a file yields nothing useful, move on

## Claude Enhancements (Apply These)
- **Explicit**: "Create ALL foundation files, not just stubs"
- **Motivation**: "Data provider pattern enables mock development before YouBase migration"
- **CoT hints**: Think through architectural decisions before implementing

## Constraints
- ⚠️ Motion.dev ONLY - never install or use framer-motion
- ⚠️ Strict TypeScript - no `any` types
- ⚠️ 36 hours remaining - prioritize shipping over perfection
- ⚠️ Mock-first - don't block on YouBase integration yet
</execution_principles>

<suggested_command>
/sc-pm --think-hard --seq --morph --task-manage --serena --ref
</suggested_command>
```

---

## Recommendations

### Suggested Droid
> **`frontend-architect`** - Optimal for this task because:
> - Foundation/scaffolding work requires architectural decisions
> - Next.js 15 app structure expertise needed
> - Component library integration (shadcn, Schedule-X, dnd-kit)

> **Backup: `full-stack-specialist`** - If YouBase integration issues arise

### Suggested Mode
| Mode | Flag | Why Use |
|------|------|---------|
| Sequential Thinking | `--seq` | 6-phase execution requires ordered reasoning |
| Task Management | `--task-manage` | Track 6 phases with TODO states |
| Ultrathink | `--think-hard` | Architectural decisions need deep analysis |

### Suggested Skills & Tools

| Tool | Phase | Purpose |
|------|-------|---------|
| `morph-mcp___warpgrep_codebase_search` | 1 | Semantic source understanding |
| `mcp__serena__read_memory` | 3 | Load previous context |
| `mcp__serena__write_memory` | 6 | Persist foundation state |
| `mcp__Ref__search_documentation` | 4 | Next.js 15, Schedule-X docs |
| `core-memory-ingest` | 6 | Long-term decision storage |
| `sequential-thinking___sequentialthinking` | All | Multi-step reasoning |

### Patterns Applied

**Codex Principles Used**:
- End-to-end execution (6 complete phases)
- Batch file reading (parallel source exploration)
- Codebase conventions (adopt YouWare patterns)
- Reconcile TODOs (phase completion tracking)
- No pending items (all phases have clear completion criteria)

**Claude Enhancements Used**:
- XML structure (`<task>`, `<context>`, `<execution_phases>`, `<output_format>`)
- Explicit instructions ("Create ALL foundation files")
- Motivation ("Data provider pattern enables mock development")
- CoT hints (sequential-thinking for architectural decisions)

---

## Transformation Analysis

### Anti-Patterns Fixed

| Detected | Fixed |
|----------|-------|
| Preambles ("Okay, this is...", "Okay, what I have in mind...") | Direct task statement |
| Typos ("march", "accoringly", "relaetd") | Corrected throughout |
| Vague output ("some kind of an index JSON") | Explicit JSON schema provided |
| Unstructured flow | 6 clear execution phases |
| Missing deadline context | Explicit "36 hours remaining" warning |
| Tool mentions without structure | Tools mapped to specific phases |
| No success metrics | Phase completion table with durations |

### Scoring Breakdown

| Dimension | Before | After | Delta |
|-----------|--------|-------|-------|
| Clarity | 4 | 9 | +5 |
| Structure | 2 | 10 | +8 |
| Context | 3 | 9 | +6 |
| Actionability | 4 | 9 | +5 |
| Specificity | 3 | 9 | +6 |
| **Weighted Total** | **3/10** | **9/10** | **+6** |

### Key Improvements

1. **6 Explicit Phases**: Transformed vague "start developing" into 6 time-boxed phases
2. **Index Schema**: Defined exact JSON structure for codebase index (was "some kind of")
3. **Project Structure**: Full directory tree with specific files to create
4. **Data Provider Pattern**: Implementation code snippets provided
5. **Tech Stack Table**: Strict technology constraints with warnings
6. **Timeline Urgency**: "36 hours remaining" explicit in context
7. **Memory Routing**: Serena for session, Core for long-term decisions
8. **Tool Mapping**: Each tool assigned to specific phase

### Issues Detected & Addressed

| Issue | Solution |
|-------|----------|
| No project output location specified | Defined `yousoul/` as new project dir |
| Clarity context path had typo | Corrected full path provided |
| Mixed tool/flag references | Separated tools (phase-mapped) from flags (behavioral) |
| No completion criteria | Added deliverables checklist and status table |

### Skip Conditions Checked
- [x] Has XML tags: No (original) → Added comprehensive tags
- [x] Already well-structured: No → Transformed to structured format
- [x] Short prompt (<10 chars): No → Substantial prompt
- [x] Direct command: No → Complex task

---

## Related Files

| Resource | Path |
|----------|------|
| YouWare Source | `oak-management/resources/snapshots/v1/source_code` |
| Clarity Context | `/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-context.json` |
| Artifacts | `oak-management/artifacts/` |
| Uniqueness Strategy | `oak-management/artifacts/improved-prompts/2025-12-22/brainstorming/143000-youware-clarity-uniqueness-exploration.md` |

---

## Quick Copy (Minimal Version)

```
/sc-pm "Build YouSoul foundation using YouWare source (oak-management/resources/snapshots/v1/source_code) + Clarity context (/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-context.json). 

Phases: 
1. WarpGrep semantic understanding of source 
2. Generate codebase index JSON 
3. Merge Clarity vision 
4. Init Next.js 15 project with data provider pattern 
5. Implement foundation (types, providers, motion config) 
6. Save to Serena/Core memory

Stack: Next.js 15, TypeScript, Motion.dev (NOT framer-motion), Schedule-X, dnd-kit, shadcn/ui, Tailwind

Output: yousoul/ project + oak-management/artifacts/codebase-index/

DEADLINE: Dec 24 08:00 UTC (~36h)" --think-hard --seq --morph --task-manage --serena --ref
```
