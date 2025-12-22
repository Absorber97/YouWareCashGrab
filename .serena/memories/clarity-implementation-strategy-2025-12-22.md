# Clarity Implementation Strategy - Dec 22, 2025

## Quick Load
Strategy doc: oak-management/resources/mission/CLARITY-IMPLEMENTATION-STRATEGY.md

## Core Strategy: Scaffold → Mock → Migrate
1. Get YouBase scaffold once (auth config, patterns)
2. Develop locally with mocks (fast)
3. Migrate finished code to YouWare once
4. Test YouBase at the end

## Phases
- Phase 1 (4h): Foundation - provider abstraction, mocks, adapt hooks
- Phase 2 (6h): Mood features - picker, celebration, coloring, badges
- Phase 3 (4h): YouBase migration - schema, OAuth, test
- Phase 4 (4h): Polish - demo data, visualizations, submit

## YouBase Current State
- Email/password: ENABLED
- Google OAuth: NOT ENABLED (needs setup)
- Custom tables: NONE (need to create tasks, user_preferences)

## Data Provider Pattern
```typescript
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
export const dataProvider = USE_MOCK ? mockProvider : youbaseProvider;
```

## Code Reuse (~60%)
- Keep: Schedule-X, dnd-kit, camera-pan, glassmorphic UI, Motion
- Adapt: useUnifiedData hook, CaptureModal, TaskCard
- Replace: Craft API → YouBase provider

## Priority
- P0: Provider, mocks, calendar+kanban, mood picker, celebration, Auth, DB
- P1: Energy forecast, soul card, customization, skyscape
- P2: Month heatmap, stacked area chart
- P3: Radar, photos, AI insights

## Files Created
- CLARITY-IMPLEMENTATION-STRATEGY.md (comprehensive)
- This memory (quick reference)
