# YouSoul Clarity-First Approach - Dec 22, 2025

## Strategy Revision
**OLD**: Scaffold → Mock → Migrate (create new Next.js project)
**NEW**: YouWare Foundation + Clarity UX + YouSoul Mood (enhance existing)

## Key Insight
Don't rewrite from scratch. Port Clarity's exact UI/UX patterns to YouWare's existing Vite SPA structure.

## Architecture Decision
- **Keep**: Vite SPA, EdgeSpark API, Zustand stores, framer-motion
- **Port**: Schedule-X calendar, camera-pan transitions, glassmorphic modals
- **Add**: Mood system (MoodPicker, CompletionCelebration)

## Files Created
- `oak-management/phases/clarity-youware-mapping.json` - Full component mapping
- `oak-management/phases/yousoul-workflow-plan-v2.json` - Revised 6-phase plan
- `oak-management/phases/implementation-steps.md` - Updated step-by-step guide

## Phase Overview (9.5 hours total)
0. Clarity Shell Port (2h) - Contexts, camera-pan, enhanced BottomNav
1. Schedule-X Calendar (2h) - Full calendar integration
2. Enhanced Kanban (1.5h) - Column, TaskCard, Swimlane
3. Capture Modal (1h) - CreateItemModal with mood
4. Mood System (1.5h) - MoodPicker, CompletionCelebration
5. Polish & Demo (1h) - Demo data, final testing
6. Deployment (0.5h) - YouWare upload

## Critical Patterns to Port from Clarity
1. Camera-pan transitions (TabTransitionContext)
2. Schedule-X with temporal-polyfill
3. Glassmorphic modal design
4. Spring indicator on BottomNav

## Next Action
Start Phase 0: Create contexts and refactor App.tsx
