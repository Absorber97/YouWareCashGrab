# YouSoul Workflow Plan - Dec 22, 2025

## Workflow Created
- **Main Plan**: `oak-management/phases/yousoul-workflow-plan.json`
- **Step-by-Step**: `oak-management/phases/implementation-steps.md`
- **Codebase Index**: `oak-management/artifacts/codebase-index/youware-source-index.json`

## 12 Phases Defined
0. Project Init (30 min)
1. Types & Core (45 min)
2. Data Provider (60 min)
3. Zustand Stores (30 min)
4. Layout & Nav (45 min)
5. Mood Components (60 min)
6. Calendar View (60 min)
7. Kanban Board (60 min)
8. Task Modal (45 min)
9. Settings (30 min)
10. Auth Flow (30 min)
11. Demo & Polish (30 min)
12. YouBase Migration (4h - blocked until mock complete)

**Total Time**: 7.5 hours (phases 0-11) + 4 hours (phase 12)

## Source Analysis Complete
- Vite + React SPA with Zustand stores
- framer-motion (⚠️ must migrate to motion/react)
- 13 components, 3 stores, full type definitions
- Backend: Hono on EdgeSpark with complete CRUD API

## Key Files to Port
- types/task.ts → HIGH reuse (split into mood.ts, task.ts, user.ts)
- store/*.ts → HIGH reuse (adapt to dataProvider)
- Aurora, GlassCard, MoodBadge → HIGH reuse
- BottomNav, KanbanBoard → MEDIUM reuse (motion/react migration)

## Critical Constraints
- ⚠️ motion/react NOT framer-motion
- ⚠️ TypeScript strict mode
- ⚠️ Mock-first development
- ⚠️ Deadline: Dec 24 08:00 UTC

## Next Action
Run Phase 0: Project Initialization
