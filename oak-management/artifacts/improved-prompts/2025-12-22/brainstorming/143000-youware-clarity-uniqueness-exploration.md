# Improved Prompt: YouWare Clarity Uniqueness Exploration

**Original**: "I want to win a grand prize! ... how do I stand out and unique? ... semantic search... YouBase embeddings..."
**Category**: `brainstorming` + `research`
**Score**: 3/10 → 9/10 (+6)
**Generated**: 2025-12-22T14:30:00Z

---

## Copy This Prompt

```xml
<task>
Systematically explore uniqueness differentiators for repurposing the Clarity app (calendar + kanban hybrid from Craft Winter Challenge) into a YouWare submission that maximizes scoring across all 35 possible points.

Core investigation: Can semantic/natural language search over user data (tasks, events, notes) become the killer differentiator? Specifically:
1. Assess YouBase's embedding/vector storage capabilities
2. Evaluate alternative differentiation strategies if embeddings aren't natively supported
3. Generate a ranked decision matrix of uniqueness approaches

Go beyond surface-level analysis to produce an actionable uniqueness strategy with technical validation.
</task>

<context>
## Challenge Stakes
- **Grand Prize**: $5,000 + 100k credits
- **Deadline**: December 24, 2025 08:00 UTC (2 days remaining)
- **Max Points**: 35 (20 base + 15 bonus)

## Scoring Breakdown
| Criterion | Points | Oak's Strategy |
|-----------|--------|----------------|
| Target audience fit | 5 | Non-developers, emotional appeal, general audience |
| Design quality | 5 | Apple + Chibi aesthetic, polished UI, zero friction |
| Functionality | 5 | Everything works, no bugs, smooth UX |
| **Uniqueness** | **5** | **THIS IS THE FOCUS OF THIS PROMPT** |
| Social post bonus | 5 | Post @YouWareAI #YouWareChallenge |
| Tag friends bonus | 5 | Tag 2-3 others |
| YouBase expert bonus | 5 | Expert YouBase 1.0 usage (Auth, Database, Storage, Secrets) |

## Existing Asset: Clarity App
Source: `/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/`
- **Core concept**: Calendar + Kanban hybrid
- **Original platform**: Craft (tightly integrated with Craft features)
- **Tech stack**: Needs verification via codebase exploration
- **Oak's preferences**: Motion.dev (never framer-motion), Apple aesthetic, zero friction UX

## Uniqueness Hypothesis
Oak's initial idea: Replace traditional search with semantic/natural language search
- "I can just talk and use natural language, and it should find all the relevant stuff"
- Requires: Embedding generation + vector storage + similarity search
- Unknown: Does YouBase support this natively?

## YouBase Documentation
- https://docs.youware.com/youbase/introduction
- Modules: Auth, Database, Storage, Secrets
- Expert usage = 5 bonus points
</context>

<constraints>
- Must use YouWare platform for submission
- YouBase usage "preferred" (5 bonus points for expert usage)
- 2 days remaining - scope must be achievable
- Calendar + Kanban exists in some form - competitor analysis needed
- Must work for non-developers (target audience criterion)
</constraints>

<research_questions>
## Technical Questions (YouBase)
1. Does YouBase support vector/embedding storage natively?
2. Can YouBase do similarity search queries?
3. If no native support, can embeddings be stored as JSON blobs?
4. What's the query latency for large datasets?

## Competitive Questions
5. What calendar + kanban apps already exist?
6. Which ones have natural language search?
7. What's missing in the market?

## Differentiation Questions
8. Beyond semantic search, what other differentiators align with Oak's philosophy?
9. Which differentiator maximizes points vs implementation effort (2-day constraint)?
10. How can YouBase expert usage be demonstrated regardless of chosen differentiator?
</research_questions>

<execution_phases>
## Phase 1: Pre-Research Clarification (MCQ)
Use `oak-mcq-ask` skill to confirm assumptions:

```json
{
  "title": "Clarity → YouWare: Uniqueness Strategy",
  "questions": [
    {
      "id": "current_state",
      "type": "single",
      "question": "What's the current state of your Clarity codebase?",
      "header": "Codebase",
      "options": [
        { "id": "complete", "label": "Fully functional", "description": "Ready to adapt" },
        { "id": "partial", "label": "Partially built", "description": "Core features exist" },
        { "id": "concept", "label": "Concept only", "description": "Designs/specs, no code" },
        { "id": "other", "label": "Other", "isOther": true }
      ]
    },
    {
      "id": "priority",
      "type": "single",
      "question": "What matters most for your submission?",
      "header": "Priority",
      "options": [
        { "id": "unique", "label": "Maximum uniqueness", "description": "Stand out at all costs" },
        { "id": "polish", "label": "Maximum polish", "description": "Perfect execution" },
        { "id": "youbase", "label": "YouBase expertise", "description": "Nail the 5 bonus points" },
        { "id": "balanced", "label": "Balanced approach", "description": "Optimize across all criteria" }
      ]
    },
    {
      "id": "effort",
      "type": "single",
      "question": "How much development time can you dedicate?",
      "header": "Time",
      "options": [
        { "id": "full", "label": "Full-time (16h/day)", "description": "All-in sprint" },
        { "id": "heavy", "label": "Heavy (8-12h/day)", "description": "Major focus" },
        { "id": "moderate", "label": "Moderate (4-6h/day)", "description": "Balanced schedule" },
        { "id": "light", "label": "Light (2-4h/day)", "description": "Other commitments" }
      ]
    },
    {
      "id": "semantic_importance",
      "type": "single",
      "question": "How committed are you to the semantic search idea?",
      "header": "Semantic",
      "options": [
        { "id": "must", "label": "Must have", "description": "This IS the differentiator" },
        { "id": "preferred", "label": "Preferred", "description": "If technically feasible" },
        { "id": "open", "label": "Open to alternatives", "description": "Whatever wins" }
      ]
    }
  ]
}
```

## Phase 2: Parallel Deep Research

### Batch 1: YouBase Technical Assessment
```javascript
// Run these in parallel
await Promise.all([
  refReadUrl('https://docs.youware.com/youbase/introduction'),
  refReadUrl('https://docs.youware.com/youbase/database'),
  refSearchDocumentation('YouBase vector embeddings storage'),
  refSearchDocumentation('YouBase similarity search'),
]);
```

### Batch 2: Competitive Landscape
```javascript
// Run these in parallel
await Promise.all([
  exaWebSearch('calendar kanban app natural language search 2024'),
  exaWebSearch('semantic search task management productivity app'),
  exaWebSearch('AI powered calendar assistant unique features'),
  exaCodeContext('calendar kanban semantic search implementation'),
]);
```

### Batch 3: Clarity Codebase Exploration
```bash
# Use WarpGrep for semantic understanding
morph-mcp___warpgrep_codebase_search:
  path: /Users/oak/Downloads/Core/Dev/Craft
  query: "Clarity app core architecture, data models, and search implementation"
```

## Phase 3: Sequential Analysis (10 Steps)
Use `sequential-thinking___sequentialthinking` with:

```json
{
  "thought": "Synthesizing YouBase capabilities, competitive gaps, and Oak's Clarity foundation to identify the optimal uniqueness strategy for winning the YouWare Challenge grand prize",
  "thoughtNumber": 1,
  "totalThoughts": 10,
  "nextThoughtNeeded": true
}
```

**Reasoning chain:**
1. Summarize YouBase technical capabilities (embeddings? vectors? JSON only?)
2. Map competitive landscape (what's saturated vs underserved)
3. Analyze Clarity's reusable foundation vs rebuild effort
4. Evaluate semantic search feasibility given YouBase constraints
5. Generate 5 alternative differentiation strategies
6. Score each strategy: Uniqueness × Feasibility × YouBase-bonus-potential
7. Identify implementation risks for top 3 strategies
8. Design fallback plan if primary strategy hits blockers
9. Map strategy to 2-day implementation timeline
10. Synthesize final recommendation with confidence score

## Phase 4: Post-Research Decision (MCQ)
Use `oak-mcq-ask` with research-informed options:

```json
{
  "title": "Uniqueness Strategy Decision",
  "questions": [
    {
      "id": "strategy",
      "type": "single",
      "question": "Based on research, which uniqueness strategy should we pursue?",
      "header": "Strategy",
      "options": [
        { "id": "semantic", "label": "Semantic Search", "description": "[Research will inform feasibility]" },
        { "id": "alt1", "label": "Alternative 1", "description": "[Research will populate]" },
        { "id": "alt2", "label": "Alternative 2", "description": "[Research will populate]" },
        { "id": "hybrid", "label": "Hybrid Approach", "description": "Combine top strategies" }
      ]
    },
    {
      "id": "youbase_approach",
      "type": "single",
      "question": "How should we demonstrate YouBase expertise?",
      "header": "YouBase",
      "options": [
        { "id": "auth", "label": "Advanced Auth", "description": "OAuth, sessions, permissions" },
        { "id": "database", "label": "Complex Queries", "description": "Relations, real-time sync" },
        { "id": "storage", "label": "File Handling", "description": "Attachments, media" },
        { "id": "all", "label": "All Modules", "description": "Showcase everything" }
      ]
    }
  ]
}
```

## Phase 5: Deliverables Generation
1. **Uniqueness Strategy Document** - Chosen approach with rationale
2. **Technical Feasibility Assessment** - YouBase capability mapping
3. **Competitive Differentiation Matrix** - Why this wins
4. **2-Day Implementation Roadmap** - Hour-by-hour milestones
5. **YouBase Expert Usage Plan** - How to nail the 5 bonus points
</execution_phases>

<output_format>
## Expected Deliverables

### 1. YouBase Capability Assessment
```
CAPABILITY                  STATUS    NOTES
────────────────────────────────────────────────
Vector/embedding storage    ✓/✗/?    [finding]
Similarity search           ✓/✗/?    [finding]
JSON blob storage           ✓/✗/?    [finding]
Real-time queries           ✓/✗/?    [finding]
Auth/sessions               ✓/✗/?    [finding]
File storage                ✓/✗/?    [finding]
```

### 2. Differentiation Strategy Matrix
| Strategy | Uniqueness (1-10) | Feasibility (1-10) | YouBase Fit (1-10) | Total |
|----------|-------------------|--------------------|--------------------|-------|
| Semantic Search | ? | ? | ? | ? |
| [Alternative 1] | ? | ? | ? | ? |
| [Alternative 2] | ? | ? | ? | ? |
| [Alternative 3] | ? | ? | ? | ? |

### 3. Competitive Gap Analysis
```
FEATURE                 EXISTING APPS    CLARITY OPPORTUNITY
────────────────────────────────────────────────────────────
Calendar view           Saturated        [differentiation angle]
Kanban view             Saturated        [differentiation angle]
Hybrid view             Emerging         [differentiation angle]
Natural language        Rare             [differentiation angle]
[Feature X]             Gap              [differentiation angle]
```

### 4. Recommended Strategy
**Primary**: [Strategy name]
**Rationale**: [Why this maximizes 35 points]
**YouBase Expert Usage**: [How to nail the bonus]
**Risk**: [Main concern]
**Mitigation**: [Fallback plan]

### 5. 2-Day Implementation Roadmap
| Day | Hours | Milestone |
|-----|-------|-----------|
| Dec 22 | 0-4 | [milestone] |
| Dec 22 | 4-8 | [milestone] |
| Dec 23 | 0-4 | [milestone] |
| Dec 23 | 4-8 | [milestone] |
| Dec 24 | 0-4 | [polish + submit] |
</output_format>

<execution_principles>
## Codex Principles
- **End-to-end**: Don't stop at "semantic search might work" - validate and recommend
- **Batch everything**: All URLs and searches in parallel batches
- **Bias to action**: If YouBase lacks embeddings, immediately pivot to alternative
- **No excessive looping**: If codebase exploration yields nothing, report and move on
- **Reconcile TODOs**: Every phase marked Done/Blocked/Cancelled before proceeding

## Claude Enhancements
- **Explicit**: "Find ALL calendar+kanban competitors, not just the obvious ones"
- **Motivation**: "We need YouBase assessment because 5 bonus points depend on it"
- **CoT hints**: Use sequential-thinking for the 10-step strategy synthesis
- **Multishot**: Provide example differentiation strategies from other successful hackathons
</execution_principles>

<oak_preferences>
## Design Philosophy
- Apple + Chibi aesthetic
- Zero friction UX
- Emotionally resonant apps
- Typography: Expressive, purposeful (never Inter, Roboto, Arial)
- Motion: Motion.dev only (NEVER framer-motion)

## Workflow
- Claude Code terminal as primary interface
- Build artifacts in `/oak-management/artifacts/`
- Research first, then implement
</oak_preferences>
```

---

## Suggested Command

```bash
/sc-brainstorm --ultrathink --seq --research --mcq --task-manage
```

**Flag rationale:**
| Flag | Why |
|------|-----|
| `--ultrathink` | High-stakes $5k decision, needs deep analysis |
| `--seq` | 10-step reasoning chain required |
| `--research` | 4+ URLs + competitive analysis |
| `--mcq` | Pre/post research clarification |
| `--task-manage` | 5 execution phases to track |

**Removed from original:**
| Removed | Reason |
|---------|--------|
| `--human` | Implicit in Oak's preferences |
| `--exa`, `--ref` | Tool selection, not behavioral flags |
| `--introspect` | Not self-analysis task |
| `--brainstorm` | Implicit in `/sc-brainstorm` command |

---

## Recommendations

### Suggested Droids

| Droid | Phase | Purpose |
|-------|-------|---------|
| `deep-research-agent` | 2 | YouBase docs + competitive analysis |
| `requirements-analyst` | 3 | Synthesize findings into strategy |
| `frontend-architect` | 5 | Implementation planning |

### Suggested Skills & Tools (MCP-First)

| Tool/Skill | Phase | Purpose |
|------------|-------|---------|
| `oak-mcq-ask` | 1, 4 | Clarifying questions with proper params |
| `sequential-thinking___sequentialthinking` | 3 | 10-step analysis |
| `mcp__Ref__read_url` | 2 | Fetch YouBase docs |
| `mcp__Ref__search_documentation` | 2 | Search YouBase capabilities |
| `exa-web-search` | 2 | Competitive landscape |
| `exa-code-context` | 2 | Implementation patterns |
| `morph-mcp___warpgrep_codebase_search` | 2 | Clarity codebase analysis |

### Suggested Modes

| Mode | Trigger | Benefit |
|------|---------|---------|
| Brainstorming | `/sc-brainstorm` | Requirements discovery for uniqueness |
| Deep Research | `--research` | Systematic YouBase + competitor analysis |
| Sequential Thinking | `--seq` | 10-step strategy synthesis |
| Task Management | `--task-manage` | 5-phase execution tracking |
| MCQ | `--mcq` | Decision points before/after research |

---

## Transformation Analysis

### Anti-Patterns Fixed

| Detected | Fixed |
|----------|-------|
| Preambles ("I want to win!", "basically", "you know") | Direct task statement |
| Vague output ("how do I stand out?") | Explicit decision matrix format |
| Unstructured tool list | Mapped to execution phases |
| Typos (resaerch) | Corrected |
| Missing constraints | Added 2-day timeline, technical requirements |
| No success metrics | Added 35-point scoring breakdown |
| Redundant flags | Consolidated to essential 5 |
| Unclear MCQ usage | Provided full JSON question schemas |

### Scoring Breakdown

| Dimension | Before | After | Delta |
|-----------|--------|-------|-------|
| Clarity | 2 | 9 | +7 |
| Structure | 1 | 10 | +9 |
| Context | 4 | 9 | +5 |
| Actionability | 3 | 9 | +6 |
| Specificity | 5 | 9 | +4 |
| **Total** | **3/10** | **9/10** | **+6** |

### Key Improvements

1. **Structured MCQ schemas**: Provided exact JSON for `oak-mcq-ask` calls
2. **Parallel research batches**: Organized tools into concurrent batches
3. **10-step reasoning chain**: Defined sequential-thinking flow
4. **Decision matrix output**: Quantifiable strategy comparison
5. **2-day timeline**: Actionable milestone breakdown
6. **YouBase focus**: Explicit capability assessment for bonus points
7. **Oak preferences**: Incorporated Apple+Chibi, Motion.dev, terminal workflow

---

## Execution Phases Summary

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: MCQ Pre-Research                                   │
│ → Confirm codebase state, priorities, time, semantic commit │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: Parallel Deep Research                             │
│ → YouBase docs + Competitive + Clarity codebase             │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: Sequential Analysis (10 steps)                     │
│ → Synthesize capabilities + gaps + strategy                 │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 4: MCQ Post-Research                                  │
│ → Decide strategy + YouBase approach                        │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 5: Deliverables                                       │
│ → Strategy doc + Roadmap + YouBase plan                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Related Files

- Challenge guidelines: `oak-management/resources/youware-challenge-guidelines.json`
- YouBase docs: https://docs.youware.com/youbase/introduction
- Clarity codebase: `/Users/oak/Downloads/Core/Dev/Craft/`
- MCQ skill: `/Users/oak/.claude/skills/oak-mcq/oak-mcq-ask/SKILL.md`
