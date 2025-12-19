# Improved Prompt: YouWare + CLI Terminal Hybrid Workflow Research

**Original**: "Okay, let's forget about IDEA. Let's focus first on how we will code and work on a project seamlessly between YouWare and CLI terminal here. use oak-mcq-ask skill with proper JIT parameters and ask me clarifying questions at before research and after research. use exa-web-search, exa-code-context, ref-search-documentation, ref-read-url, use sequential thinking mcp/skill with proper params, use deep research droid and other tools as well."

**Category**: research
**Score**: 4/10 → 9/10 (+5)
**Generated**: 2025-12-19T22:35:00Z

---

## Copy This Prompt:

<task>
Research and recommend the optimal hybrid development workflow for building a YouWare Challenge project using BOTH the YouWare vibe coding platform AND local CLI terminal (Claude Code).

Goal: Establish a seamless bidirectional workflow where I can:
1. Develop locally with full control (React 19, Next.js, Motion.dev, Tailwind, shadcn/ui)
2. Deploy and iterate via YouWare for AI-assisted refinement
3. Sync changes bidirectionally without friction

Go beyond basic documentation - investigate real developer experiences, edge cases, and optimal patterns.
</task>

<context>
**Why This Matters**: I prefer terminal-based development (Claude Code) for precision and control, but the YouWare Challenge requires using YouWare's platform and YouBase integration for maximum scoring. I need the best of both worlds.

**Known YouWare Capabilities** (from docs research):
- IDE Plugin: 1-click deployment from VS Code/Cursor to YouWare cloud
- Upload Code: Import existing projects into YouWare
- Download Code: Pro Plan feature to export generated code
- YouBase: Auth, Database, Storage, Secrets (required for challenge)
- MCP Integration: YouWare has MCP server marketplace

**Key Questions to Answer**:
1. Can I develop fully locally and just deploy via IDE plugin?
2. How does YouBase work with local development? (API keys, local testing)
3. What's the code structure YouWare generates? (Next.js? React? Custom?)
4. Can I use my preferred stack (React 19, Motion.dev) or am I locked in?
5. Is there a YouWare CLI or MCP server for programmatic interaction?
6. What are the limitations of the free tier vs Pro for this workflow?
</context>

<research_phases>
## Phase 1: Pre-Research Clarification
Use `oak-mcq-ask` skill to confirm research scope:
```javascript
runSkill('oak-mcq-ask', {
  title: 'YouWare Workflow Research Scope',
  questions: [
    {
      id: 'priority',
      type: 'single',
      question: 'What is your primary development preference?',
      header: 'Dev Style',
      options: [
        { id: 'local-first', label: 'Local-first', description: 'Develop locally, deploy to YouWare' },
        { id: 'youware-first', label: 'YouWare-first', description: 'Develop in YouWare, pull to local for polish' },
        { id: 'hybrid', label: 'True hybrid', description: 'Constant bidirectional sync' }
      ]
    },
    {
      id: 'stack',
      type: 'multiple',
      question: 'Which stack requirements are non-negotiable?',
      header: 'Stack',
      options: [
        { id: 'react19', label: 'React 19' },
        { id: 'motion', label: 'Motion.dev (not framer-motion)' },
        { id: 'tailwind', label: 'Tailwind CSS' },
        { id: 'shadcn', label: 'shadcn/ui' },
        { id: 'supabase', label: 'Supabase (or YouBase)' }
      ]
    },
    {
      id: 'youbase',
      type: 'single',
      question: 'Must YouBase replace Supabase, or can they coexist?',
      header: 'Backend',
      options: [
        { id: 'youbase-only', label: 'YouBase only', description: 'For maximum challenge points' },
        { id: 'hybrid-db', label: 'YouBase + Supabase', description: 'If technically possible' },
        { id: 'flexible', label: 'Flexible', description: 'Whatever works best' }
      ]
    }
  ]
});
```

## Phase 2: Deep Research
Use parallel skill calls:
- `exa-web-search`: "YouWare local development workflow IDE plugin"
- `exa-web-search`: "YouBase API local development testing"
- `exa-code-context`: "YouWare MCP server integration"
- `ref-search-documentation`: "YouWare developer documentation"

## Phase 3: Sequential Analysis
Use `sequential-thinking` with params:
```javascript
runSkill('sequential-thinking', {
  thought: "Analyzing YouWare hybrid workflow options...",
  thoughtNumber: 1,
  totalThoughts: 6,
  nextThoughtNeeded: true
});
```

## Phase 4: Post-Research Confirmation
Use `oak-mcq-ask` to present findings and get decision:
```javascript
runSkill('oak-mcq-ask', {
  title: 'Recommended Workflow',
  questions: [
    {
      id: 'workflow',
      type: 'single',
      question: 'Based on research, which workflow do you want to use?',
      header: 'Workflow',
      options: [
        // Dynamically populated based on research findings
      ]
    }
  ]
});
```
</research_phases>

<output_format>
Deliver a structured recommendation with:

1. **TL;DR** (3 sentences max)
2. **Workflow Diagram** (ASCII or description)
3. **Step-by-Step Setup Guide**
4. **Tooling Required** (IDE plugins, MCP servers, API keys)
5. **Limitations & Workarounds**
6. **Recommended Approach** with rationale
</output_format>

<execution_principles>
**Codex Principles**:
- End-to-end: Don't stop at research; produce actionable workflow
- Batch everything: Run parallel exa/ref searches
- Think first: Plan all research queries before executing

**Claude Enhancements**:
- Use XML structure for multi-phase research
- Include MCQ skill for JIT clarification
- Sequential thinking for complex analysis
</execution_principles>

<suggested_command>
/sc-recommend --ultrathink --seq --research --exa --ref --mcq --task-manage
</suggested_command>

---

## Recommendations

### Suggested Droid
> Delegate initial research phase to `deep-research-agent` for comprehensive web/documentation search, then synthesize findings locally.

### Suggested Mode
> Use `--ultrathink` for critical architecture decision (workflow choice affects entire hackathon)
> Use `--mcq` for user confirmation at decision points

### Suggested Skills
- `oak-mcq-ask` - Pre/post research clarification with user
- `exa-web-search` - AI-native web search for developer experiences
- `exa-code-context` - Find code examples of YouWare workflows
- `ref-search-documentation` - Search YouWare official docs
- `sequential-thinking` - Multi-step reasoning for workflow analysis

### Patterns Applied
**Codex**: End-to-end execution, parallel batching, explicit output format
**Claude**: XML structure, motivation included, CoT via sequential-thinking

---

## Transformation Analysis

### Anti-Patterns Fixed
- [x] Vague "seamless" → Explicit "bidirectional sync" requirements
- [x] Tool list without purpose → Each tool mapped to research phase
- [x] No output format → Structured deliverable with TL;DR + guide
- [x] Missing context → Added YouWare capabilities already known
- [x] No decision points → MCQ skills for JIT clarification

### Key Research URLs to Fetch
- https://docs.youware.com/features/ide-plugin
- https://docs.youware.com/features/upload-code
- https://docs.youware.com/youbase/introduction
- https://i.youware.com/solutions/developer

### Skip Conditions Checked
- [ ] Has XML tags: No (original) → Yes (improved)
- [ ] Already well-structured: No
- [ ] Short prompt (<10 chars): No
