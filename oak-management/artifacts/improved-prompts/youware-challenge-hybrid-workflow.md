# YouWare Challenge: Terminal-YouWare Hybrid Workflow Strategy

> **Enhanced Prompt** | Generated: 2025-12-19
> **Original Context**: YouWare Challenge participation with terminal-based development preference

---

## Improved Prompt

```
/sc-recommend --ultrathink --seq --brainstorm --research --task-manage --mcq

## OBJECTIVE
Design an optimized hybrid workflow for the YouWare Challenge (Dec 16-23, 2025, $10k prizes) that leverages terminal-based development as the "brain" while using YouWare as the "execution worker."

## CONTEXT & CONSTRAINTS

### Challenge Requirements
- **Timeline**: December 16-23, 2025
- **Platform**: Must use YouWare (youware.com)
- **Deliverable**: Functional web app (YouBase integration preferred)
- **Submission**: Publish to Contra Community under #YouWareChallenge

### Scoring Criteria (30pts max)
| Criterion | Points |
|-----------|--------|
| Target audience solution fit | 5 |
| Design quality | 5 |
| Functionality | 5 |
| Fresh/unique idea | 5 |
| **BONUS**: Tag 2-3 people on X/LinkedIn | 5 |
| **BONUS**: Expert YouBase 1.0 usage | 5 |
| **BONUS**: Social post with @YouWareAI + #YouWareChallenge | 5 |

### Technical Constraint
YouWare locks code editing to their platform. Pro plan enables codebase download.

## RESEARCH PHASE

### Primary Documentation (Study in Order)
1. https://docs.youware.com/introduction/quickstartguide
2. https://docs.youware.com/features/ide-plugin
3. https://docs.youware.com/prompting/prompting
4. https://docs.youware.com/youbase/introduction

### Research Questions
- What are YouWare's prompting best practices?
- How does YouBase work and what makes "expert usage"?
- What sync/export capabilities exist in Pro plan?
- Are there API endpoints or CLI tools?

## WORKFLOW HYPOTHESIS

### Proposed Architecture
```
┌─────────────────────────────────────────────────────────┐
│ TERMINAL (Brain)                                        │
│ - Architecture decisions                                │
│ - Code generation with Claude                           │
│ - Version control (local git)                           │
│ - JSON change manifests                                 │
└──────────────────────┬──────────────────────────────────┘
                       │ Sync via Pro Download
                       ▼
┌─────────────────────────────────────────────────────────┐
│ YOUWARE (Worker)                                        │
│ - Execute prompts from terminal                         │
│ - Apply JSON-described changes                          │
│ - Handle YouWare-specific features                      │
│ - Final deployment                                      │
└─────────────────────────────────────────────────────────┘
```

### JSON Change Manifest Format (Proposed)
```json
{
  "version": "1.0.0",
  "timestamp": "ISO-8601",
  "changes": [
    {
      "type": "create|modify|delete",
      "path": "relative/file/path",
      "content": "full content or diff",
      "prompt": "YouWare-optimized prompt to apply this change"
    }
  ],
  "dependencies": [],
  "youbase_operations": []
}
```

## EXECUTION PHASES

### Phase 1: Pre-Research MCQ Clarification
Use `oak-mcq-ask` to clarify:
1. What project idea are you considering? (affects YouBase strategy)
2. Do you have YouWare Pro plan already?
3. What's your primary tech stack preference?
4. Time commitment per day for this challenge?

### Phase 2: Deep Research
Using: `exa-web-search`, `ref-search-documentation`, `ref-read-url`
- Scrape all 4 documentation URLs
- Search for "YouWare API", "YouWare CLI", "YouWare export"
- Find community examples of YouBase implementations

### Phase 3: Strategy Brainstorming
Using: `sequential-thinking` with 8-12 thought steps
- Evaluate sync frequency options
- Design prompt templates for YouWare execution
- Identify bottleneck risks and mitigations

### Phase 4: Post-Research MCQ Validation
Use `oak-mcq-ask` to validate:
1. Which workflow approach seems most viable?
2. What's the acceptable latency for sync cycles?
3. Should we optimize for speed or reliability?

### Phase 5: Implementation Planning
- Create detailed task breakdown
- Define milestones for Dec 16-23 timeline
- Set up local development environment

## TOOLS TO USE

### MCP Skills
- `sequential-thinking___sequentialthinking` - Multi-step reasoning
- `oak-mcq-ask` - Clarifying questions before/after research

### Research Tools
- `exa-web-search` - AI-native web search for YouWare info
- `ref-search-documentation` - Documentation search
- `ref-read-url` - Fetch URL content

### Droids
- `deep-research-agent` - Comprehensive research phase
- `requirements-analyst` - Transform ideas into specs
- `system-architect` - Design the hybrid workflow

## SUCCESS METRICS
1. Sync cycle < 2 minutes
2. Zero manual copy-paste between environments
3. Full YouBase integration demonstrated
4. Project submitted before Dec 23 deadline

## OUTPUT REQUESTED
1. Feasibility assessment of terminal-YouWare hybrid approach
2. Recommended workflow with specific steps
3. Risk analysis with mitigations
4. Alternative approaches if primary fails
5. Project idea suggestions optimized for YouBase bonus points
```

---

## Enhancement Rationale

### Structural Improvements
1. **Clear Objective Statement**: Moved from scattered thoughts to focused goal
2. **Tabular Scoring**: Made evaluation criteria scannable
3. **Visual Architecture**: ASCII diagram clarifies brain/worker concept
4. **Phased Execution**: Sequential phases prevent context overload

### Technical Enhancements
1. **JSON Manifest Spec**: Concretized the vague "JSON to make changes" idea
2. **Tool Mapping**: Assigned specific MCP skills to each phase
3. **Success Metrics**: Added measurable outcomes

### Flag Optimization
- **Removed redundant flags**: `--eli5`, `--oak`, `--introspect`, `--tldr`, `--human`, `--exa`, `--ref` (these are implicit or tool-specific)
- **Retained essential flags**: `--ultrathink`, `--seq`, `--brainstorm`, `--research`, `--task-manage`, `--mcq`

### Grammar & Clarity Fixes
- "challange" → "challenge"
- "resaerch" → "research"
- "versin" → "version"
- "guidenacnde" → "guidance"
- "badically" → "basically"
- Removed filler words ("like", "but like")

### Added Value
- Specific MCQ questions for before/after research
- Timeline-aware planning (Dec 16-23)
- YouBase bonus strategy
- Fallback approaches
