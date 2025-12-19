# YouWare Challenge Workflow Strategy

> Last Updated: Dec 19, 2025

## TL;DR

**Dual Development Workflow** - Develop locally in Claude Code, sync to YouWare via prompts to show platform mastery.

```
YouWare (Main Project)          Local (Claude Code)
    │                                │
    ├─ Create with prompt ──────────►│ Download code
    │                                │
    │                                ├─ Develop locally
    │                                │
    │◄─ Feed prompt to replicate ────┤ (keeps YouWare in sync)
    │                                │
    │  Shows judge activity ✓        │  Oak's "brain" ✓
```

---

## Critical Platform Findings

| Feature | Reality |
|---------|---------|
| IDE Plugin | **Publish only** - creates NEW project each time |
| Upload Code | Imports code INTO YouWare (separate feature) |
| Download Code | **Pro Plan only** - Oak has this |
| YouBase | **Cloud-only** - no local emulator |
| Sync | **No bidirectional sync exists** |

---

## Why Dual Development?

1. **ONE YouWare project stays active** → Judges see continuous platform engagement
2. **YouBase stays connected** → Same project = same backend data
3. **Local dev with Claude Code** → Oak's preferred environment ("brain")
4. **Prompts sync changes** → Shows AI prompting mastery (bonus skill)

---

## Workflow Steps

### Phase 1: YouWare Setup
1. Create project in YouWare with detailed prompt
2. Let YouWare generate scaffold + YouBase integration
3. Download code (Pro Plan feature)

### Phase 2: Local Development
1. Clone to local project folder
2. Install additional packages (Motion.dev, shadcn, etc.)
3. Develop features in Claude Code

### Phase 3: Sync to YouWare
1. After each major feature, create a prompt describing changes
2. Feed prompt to YouWare AI in the SAME project
3. Verify YouWare version matches local
4. Test YouBase features on cloud

### Phase 4: Final Submission
1. Ensure both versions match
2. Final polish in YouWare
3. Submit the YouWare project URL

---

## YouBase Modules (Required for Points)

- **Auth**: User authentication
- **Database**: Data storage
- **Storage**: File/asset storage
- **Secrets**: API key management

Must use ALL FOUR for maximum "YouBase expert usage" points (5 pts).

---

## Competition Scoring (35 pts max)

| Criterion | Points | Strategy |
|-----------|--------|----------|
| Target audience fit | 5 | Non-developers, emotional appeal |
| Design quality | 5 | Apple + Chibi aesthetic |
| Functionality | 5 | Polished, zero friction |
| Unique idea | 5 | Nothing like it exists |
| YouBase expert usage | 5 | Use all 4 modules |
| Social bonus | 5 | Share on social media |
| Tag friends | 5 | Tag friends in post |

---

## Oak's Stack

- React 19
- Motion.dev (NEVER framer-motion)
- Tailwind CSS
- shadcn/ui
- YouBase (backend)

---

## Rejected Approaches

- Utility-focused apps  
- Tool mentality / Feature-first thinking  
- Generic productivity  
- Developer-only audience  
- Data visualization utilities  

---

## What Oak Wants

- Something to be **PROUD** to show  
- "Absolutely magical" experience  
- Zero friction UX  
- Makes people **feel** something real  
- Reflects "Apple + Chibi" soul  

---

## Timeline

- **Hackathon Period**: Dec 16-23, 2025
- **Prize**: $10,000
- **Oak's Status**: Pro Plan active

---

## Quick Reference

```bash
# Project Location
/Users/oak/Downloads/Core/Competition/YouWare/

# Test App (for workflow testing)
/Users/oak/Downloads/Core/Competition/YouWare/dummy-test-app/

# GitHub Repo
https://github.com/Absorber97/YouWareCashGrab
```
