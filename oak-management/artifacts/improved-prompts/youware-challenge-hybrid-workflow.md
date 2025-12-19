# Improved Prompt: YouWare Challenge Hybrid Workflow

**Original**: "Study YouWare docs, participate in challenge, code in terminal instead of YouWare, sync via JSON..."
**Category**: `research` + `brainstorming`
**Score**: 3/10 → 9/10 (+6)
**Generated**: 2025-12-19T00:00:00Z

---

## Copy This Prompt

```xml
<task>
Design and validate a hybrid development workflow for the YouWare Challenge ($10k prizes, Dec 16-23, 2025) where Claude Code terminal acts as the "brain" (architecture, code generation, version control) and YouWare acts as the "worker" (execution, deployment, YouBase integration).

Go beyond basic analysis to create a fully-featured, actionable workflow specification with concrete sync mechanisms.
</task>

<context>
## Challenge Overview
- **Timeline**: December 16-23, 2025
- **Platform**: YouWare (youware.com) - required
- **Deliverable**: Functional web app with YouBase integration preferred
- **Submission**: Contra Community under #YouWareChallenge

## Scoring (35pts max)
| Criterion | Points |
|-----------|--------|
| Target audience fit | 5 |
| Design quality | 5 |
| Functionality | 5 |
| Unique idea | 5 |
| BONUS: Tag 2-3 on social | 5 |
| BONUS: Expert YouBase usage | 5 |
| BONUS: Social post @YouWareAI | 5 |

## Technical Constraint
YouWare locks code editing to their platform. Pro plan enables codebase download.

## Core Hypothesis
Terminal generates code + JSON change manifests → YouWare executes prompts to apply changes → Sync via Pro download/upload cycle.
</context>

<constraints>
- Must use YouWare platform for final submission
- Cannot directly edit YouWare code from terminal
- Sync latency should be < 2 minutes per cycle
- Must demonstrate YouBase expertise for bonus points
- Project must be functional, not just mockup
</constraints>

<research_sources>
Study these URLs in order (use ref-read-url):
1. https://docs.youware.com/introduction/quickstartguide
2. https://docs.youware.com/features/ide-plugin
3. https://docs.youware.com/prompting/prompting
4. https://docs.youware.com/youbase/introduction

Search queries (use exa-web-search):
- "YouWare API endpoints"
- "YouWare CLI tools"
- "YouWare export import workflow"
- "YouBase database operations tutorial"
</research_sources>

<execution_phases>
## Phase 1: Pre-Research Clarification
Use oak-mcq-ask skill with these questions:
- Q1: What project idea? (AI tool / SaaS / Dashboard / Landing page)
- Q2: YouWare Pro plan status? (Yes / No / Will purchase)
- Q3: Tech stack preference? (React / Next.js / Vue / Other)
- Q4: Daily time commitment? (2h / 4h / 8h / Full-time)

## Phase 2: Deep Research (Parallel)
Batch these tool calls together:
- ref-read-url for all 4 documentation URLs
- exa-web-search for API/CLI/export queries
- exa-code-context for YouBase implementation patterns

## Phase 3: Sequential Analysis
Use sequential-thinking with 10 thought steps:
1. Analyze YouWare platform capabilities
2. Identify sync bottlenecks
3. Design JSON manifest schema
4. Map terminal actions to YouWare prompts
5. Define version control strategy
6. Plan YouBase integration approach
7. Evaluate risk factors
8. Design fallback mechanisms
9. Create timeline milestones
10. Synthesize final workflow

## Phase 4: Post-Research Validation
Use oak-mcq-ask skill:
- Q1: Primary workflow approach? (JSON manifest / Direct prompts / Hybrid)
- Q2: Sync frequency? (Per-file / Per-feature / Daily batch)
- Q3: Priority? (Speed / Reliability / Simplicity)

## Phase 5: Deliverables
Generate these artifacts:
1. Workflow diagram (ASCII)
2. JSON manifest schema specification
3. YouWare prompt templates
4. Risk mitigation matrix
5. 7-day implementation timeline
</execution_phases>

<output_format>
## Expected Output Structure

### 1. Feasibility Assessment
- Viability score (1-10) with rationale
- Blocking issues identified
- Workarounds proposed

### 2. Workflow Specification
```
TERMINAL                    YOUWARE
────────                    ───────
1. Generate code        →   4. Receive prompt
2. Create manifest      →   5. Apply changes
3. Push to sync         →   6. Deploy/test
       ↑                         ↓
       └──── 7. Download updated code ────┘
```

### 3. JSON Manifest Schema
```json
{
  "version": "string",
  "changes": [{"type": "enum", "path": "string", "prompt": "string"}],
  "youbase": {"tables": [], "queries": []}
}
```

### 4. Risk Matrix
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|

### 5. Project Ideas (YouBase-optimized)
Top 3 ideas with YouBase bonus potential
</output_format>

<execution_principles>
## Codex Principles (Apply These)
- **End-to-end**: Complete the full analysis, don't stop at "it depends"
- **Batch everything**: Read all 4 URLs in parallel, run all searches together
- **Think first**: Plan all tool calls before executing any
- **No preambles**: Start with findings, not "I'll analyze..."
- **Reconcile TODOs**: Mark each phase Done/Blocked/Cancelled

## Claude Enhancements (Apply These)
- Use sequential-thinking for the 10-step analysis
- Include motivation for key recommendations ("because...")
- Provide multishot examples for prompt templates
</execution_principles>
```

---

## Suggested Command

```bash
/sc-recommend --ultrathink --seq --research --brainstorm --task-manage --mcq
```

**Flags explained**:
- `--ultrathink`: Critical architecture decision requiring deep analysis
- `--seq`: 10+ reasoning steps needed
- `--research`: 4 URLs + web searches required
- `--brainstorm`: Exploring novel workflow approach
- `--task-manage`: Multi-phase execution
- `--mcq`: User clarification before/after research

**Removed flags** (redundant or implicit):
- `--eli5`, `--tldr`: Output format already specified
- `--human`, `--oak`: Personal preferences, not execution modifiers
- `--introspect`: Not needed for external research
- `--exa`, `--ref`: Tool selection, not behavioral flags
- `--improve-prompt`: Already improved

---

## Recommendations

### Suggested Droids
| Droid | Purpose |
|-------|---------|
| `deep-research-agent` | Phase 2: Comprehensive documentation scraping |
| `requirements-analyst` | Phase 3: Transform findings into specs |
| `system-architect` | Phase 3: Design sync architecture |

### Suggested Skills
| Skill | Phase | Purpose |
|-------|-------|---------|
| `oak-mcq-ask` | 1, 4 | Clarifying questions |
| `sequential-thinking___sequentialthinking` | 3 | 10-step analysis |
| `exa-web-search` | 2 | AI-native web search |
| `ref-read-url` | 2 | Fetch documentation |
| `ref-search-documentation` | 2 | Search docs |

### Suggested Modes
| Mode | Trigger | Benefit |
|------|---------|---------|
| Deep Research | `--research` | Systematic URL analysis |
| Brainstorming | `--brainstorm` | Requirements discovery |
| Task Management | `--task-manage` | Phase tracking |
| Sequential Thinking | `--seq` | Multi-step reasoning |

---

## Transformation Analysis

### Anti-Patterns Fixed
- [x] Preambles ("I want to...", "I'm thinking about...") → Direct task statement
- [x] Vague output ("What do you think?") → Explicit output format
- [x] Typos (challange, resaerch, versin) → Corrected
- [x] Filler words ("like", "but like", "basically") → Removed
- [x] Unstructured tool list → Mapped to phases
- [x] Missing constraints → Added sync latency, platform requirements
- [x] No success metrics → Added measurable outcomes

### Structure Improvements
- [x] Added XML tags: `<task>`, `<context>`, `<constraints>`, `<execution_phases>`, `<output_format>`
- [x] Created tabular scoring criteria
- [x] Defined 5 execution phases
- [x] Specified exact tool-to-phase mapping
- [x] Added execution principles from Codex Guide
- [x] Included multishot-ready prompt template format

### Scoring Breakdown
| Dimension | Before | After | Delta |
|-----------|--------|-------|-------|
| Clarity | 2 | 9 | +7 |
| Structure | 1 | 10 | +9 |
| Context | 4 | 9 | +5 |
| Actionability | 3 | 9 | +6 |
| Specificity | 5 | 9 | +4 |
| **Total** | **3/10** | **9/10** | **+6** |
