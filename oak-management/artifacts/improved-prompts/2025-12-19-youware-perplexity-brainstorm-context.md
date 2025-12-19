# Improved Prompt: YouWare Challenge Perplexity Brainstorm Context

**Original**: "create an LLM-friendly Perplexity JSON where you will provide all the necessary context that it needs to know: what I want, what I don't like, what I like, what needs to be researched or what are the constraints, what are the contexts, what are the current progress, what have you researched, all these references and my philosophies, what I truly want, what it should do, so that it can brainstorm all the creative ideas that I want and align with my vision and align with all the guidelines."

**Category**: brainstorming
**Score**: 3/10 → 9/10 (+6)
**Generated**: 2025-12-19T21:55:00Z

---

## Copy This Prompt Into Perplexity:

```
I need you to generate creative project ideas for the YouWare Challenge hackathon. I'm providing comprehensive context in JSON format. Your task is to deeply understand my preferences, constraints, and vision, then brainstorm 10-15 FRESH ideas that align with everything below.

<context_json>
{
  "creator_profile": {
    "name": "Oak",
    "role": "AI Reliability Engineer & Full-Stack Developer",
    "situation": {
      "current": "F1 OPT student, 56 days to secure H1B job by Feb 2026",
      "location": "Bay Area",
      "time_commitment": "Full-time available for this challenge"
    },
    "narrative": "I reduced AI hallucinations from 24% to <3% through dual-gate verification",
    "past_wins": [
      "Craft Winter Challenge Mini Award (youtube-digest-hub)",
      "EcoSmartLoop: 78% engagement vs 12% industry baseline"
    ]
  },

  "design_philosophy": {
    "identity": "Apple + Chibi - aspirational simplicity with warm humble persona",
    "core_principles": [
      "Zero friction, zero setup",
      "Absolutely magical experiences",
      "Visible transformation (before → after)",
      "Solo-developer authenticity (no 'we', pinky promise tone)"
    ],
    "motion_rules": {
      "use": "Motion.dev (motion/react)",
      "never_use": "framer-motion",
      "style": "Functional 150ms ease-out crossfades, no decorative micro-animations"
    },
    "visual_obsessions": [
      "Galaxy/cluster views",
      "Life mapped as universe",
      "Spatial data visualization",
      "Apple-level polish"
    ]
  },

  "technical_stack": {
    "frontend": ["React 19", "Next.js", "Tailwind", "shadcn/ui"],
    "animation": "Motion.dev exclusively",
    "backend": "Supabase + PostgreSQL",
    "ai": ["Claude", "Gemini", "pgvector for embeddings"],
    "expertise": [
      "220+ MCP skills system",
      "UOCE context orchestration (67-95% token reduction)",
      "Dual-gate AI verification architecture"
    ]
  },

  "challenge_details": {
    "name": "YouWare x Contra Hackathon",
    "prize": "$10,000 grand prize",
    "timeline": "Dec 16-23, 2025 (7 days)",
    "platform": "YouWare - vibe coding platform for AI-powered apps",
    "platform_users": "400K+ creators",
    "required_integration": {
      "YouBase": {
        "Auth": "User authentication",
        "Database": "Data storage",
        "Storage": "File/asset storage",
        "Secrets": "API key management"
      }
    },
    "scoring_rubric": {
      "target_audience_fit": 5,
      "design_quality": 5,
      "functionality": 5,
      "unique_idea": 5,
      "youbase_expert_usage": 5,
      "social_bonus": 5,
      "tag_friends_bonus": 5,
      "total_possible": 35
    },
    "judge_profile": "AI enthusiasts, developers, vibe coding advocates"
  },

  "rejected_ideas": {
    "explicitly_rejected": [
      "TrustScore - AI output verification tool",
      "AI Wrapped - year-in-review data visualization",
      "Prompt Galaxy - conversation history as galaxy viz",
      "TrendScope - content creator trend radar",
      "ApplyCheck - job application verifier",
      "ContextCraft - token optimization visualizer",
      "Motion Forge - AI animation generator",
      "Any MCP/skill showcase tools",
      "Generic productivity dashboards",
      "Data visualization utilities",
      "AI verification/fact-checking tools"
    ],
    "patterns_to_avoid": [
      "UTILITY-focused apps",
      "TOOL mentality",
      "FEATURE-first thinking",
      "Generic productivity",
      "Developer-only audience",
      "Technical showcases without soul"
    ]
  },

  "what_excites_me": {
    "app_types": [
      "COMPANIONS not tools",
      "EXPERIENCES not utilities",
      "FEELINGS not features",
      "TRANSFORMATION not productivity"
    ],
    "emotional_qualities": [
      "Makes you feel something",
      "Creates sense of wonder",
      "Builds genuine connection",
      "Feels alive, not static"
    ],
    "successful_patterns_from_my_work": {
      "youtube_digest_hub": "Transform passive video consumption into active productivity",
      "ecosmartloop": "SCAN. LEARN. EARN. IMPACT. - gamification + real impact",
      "craft_timeline_graph_vision": "Your life, mapped and celebrated as a galaxy"
    }
  },

  "categories_being_explored": {
    "experience_first": [
      {
        "name": "Chibi",
        "concept": "AI companion with personality, lives with you, grows over time",
        "from": "My own Apple+Chibi philosophy"
      },
      {
        "name": "Breath",
        "concept": "Living ambient art, screen as evolving visual experience",
        "from": "Refik Anadol inspiration"
      }
    ],
    "meaning_transformation": [
      {
        "name": "Future Self",
        "concept": "Talk to AI persona of who you'll become based on your goals",
        "from": "Motivation from within"
      },
      {
        "name": "Letters from Strangers",
        "concept": "Anonymous encouragement, AI-facilitated human connection",
        "from": "Genuine connection need"
      }
    ],
    "creative_expression": [
      {
        "name": "Story Weaver",
        "concept": "Collaborative fiction with AI, visual story presentation",
        "from": "Imagination made visible"
      },
      {
        "name": "Sound Palette",
        "concept": "Describe sounds you want, AI generates custom ambient",
        "from": "Personalized sonic environments"
      }
    ]
  },

  "research_completed": {
    "hackathon_winners": [
      "Alzheimer's care app - emotional impact wins",
      "$100K travel app (Unicorn Mafia)",
      "Speech AI projects at AssemblyAI hackathon"
    ],
    "viral_apps": [
      "Feel - app that makes you cry/feel joy on demand",
      "Refik Anadol - immersive AI art installations",
      "ARTECHOUSE World of AI-magination"
    ],
    "sticky_daily_apps": [
      "Saner.AI - 'Your Jarvis is here' (ADHD companion)",
      "Mem - 'AI Thought Partner'",
      "Oura Advisor - AI health companion",
      "HabitKit - built in public to $15K/mo"
    ],
    "key_insight": "Best apps are COMPANIONS not tools, create FEELINGS not features"
  },

  "constraints": {
    "time": "7 days to build",
    "must_use": "YouBase (all 4 modules for max points)",
    "must_appeal_to": "AI enthusiasts and judges",
    "must_be": "Shareable for social bonus points",
    "should_have": "Viral screenshot potential"
  },

  "what_i_truly_want": {
    "feeling": "Something I'd be PROUD to show",
    "experience": "Absolutely magical, zero friction",
    "impact": "Makes people feel something real",
    "uniqueness": "Nothing like this exists",
    "alignment": "Reflects my Apple+Chibi soul"
  }
}
</context_json>

<task>
Based on this comprehensive context, brainstorm 10-15 FRESH project ideas that:

1. I have NOT already considered (check rejected_ideas and categories_being_explored)
2. Create FEELINGS and EXPERIENCES, not utilities
3. Could be COMPANIONS or MOMENTS, not just tools
4. Align with my Apple+Chibi philosophy
5. Naturally integrate YouBase (all 4 modules)
6. Can be built in 7 days with React/Next.js/Motion.dev
7. Would WOW judges who are AI enthusiasts
8. Have viral/shareable potential
9. Feel "absolutely magical" to use
</task>

<output_format>
For each idea, provide:
- **Name**: Catchy, memorable name
- **Tagline**: One-sentence hook
- **Core Experience**: What does it FEEL like to use? (not what it does)
- **The Magic**: What makes it "absolutely magical"?
- **YouBase Integration**: How each module is used naturally
- **7-Day Feasibility**: Why this can be built in time
- **Viral Potential**: How/why people would share this
- **Why Oak Would Love This**: Connection to my philosophy and past work
- **Differentiation**: Why nothing like this exists

Also provide:
- 3 "wildcard" ideas that are unconventional but aligned with my vision
- 1 "if I were betting everything on one idea" recommendation with reasoning
</output_format>

<important>
- Do NOT suggest anything similar to my rejected ideas
- Focus on EMOTION over function
- Think COMPANION over tool
- Consider my galaxy/visualization obsession
- Remember: I want to feel PROUD of what I build
</important>
```

---

## Recommendations

### Suggested Usage
> Paste the entire prompt above directly into Perplexity Pro. The JSON structure provides Perplexity with rich context for deep research and creative synthesis.

### Why This Format Works
1. **JSON structure** - LLMs parse structured data more accurately
2. **Explicit negatives** - Rejected ideas prevent repetition
3. **Emotional language** - Guides toward feeling-focused outputs
4. **Concrete examples** - Past work shows what success looks like
5. **Clear output format** - Ensures actionable, comparable ideas

### Follow-Up Prompts for Perplexity
After receiving ideas, use these to drill deeper:

```
"For idea [X], research similar apps that exist and explain why mine would be different"
```

```
"Generate 3 variations of [X] that emphasize different emotional experiences"
```

```
"How would [X] look with a galaxy/cosmic visual theme while maintaining Apple-level polish?"
```

---

## Transformation Analysis

### Anti-Patterns Fixed
- [x] Vague "all the necessary context" → Explicit JSON structure with categories
- [x] No output format → Detailed template for each idea
- [x] Missing constraints → Clear feasibility and integration requirements
- [x] No examples → Past work patterns included
- [x] Negative framing → Reframed as what I WANT (feelings, companions)

### Patterns Applied
**Codex**: End-to-end execution, explicit output format, context-rich prompting
**Claude**: XML structure, motivation included (WHY feelings matter), multishot via past work examples

### Skip Conditions Checked
- [ ] Has XML tags: No (original) → Yes (improved)
- [ ] Already well-structured: No
- [ ] Short prompt (<10 chars): No
