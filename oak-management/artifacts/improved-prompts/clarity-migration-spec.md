# Improved Prompt: Clarity → YouWare Migration Specification

**Original**: "Why am I still seeing my YouWare ugly UI? I want one-on-one of craftie clarity. You need to map one-on-one on YouWare architecture... create a LLM-friendly JSON that will provide all the references, file references and indexing, UI architecture, and everything..."

**Category**: documentation
**Score**: 3/10 → 9/10 (+6)
**Generated**: 2025-12-22T00:00:00Z

---

## Copy This Prompt:

<task>
Create a comprehensive LLM-friendly JSON architecture document that fully captures Craftie Clarity's UI system, enabling a precise 1:1 migration to YouWare/YouSoul.

The JSON must be complete enough that any AI agent can read it and accurately reproduce Clarity's UI, components, and interactions in the YouWare Vite+React architecture.
</task>

<context>
**Source Application**: Craftie Clarity
- Path: `/Users/oak/Downloads/Core/Dev/Craft/craftie/app/clarity`
- Framework: Next.js (App Router)
- Notable Features: Schedule-X calendar, dnd-kit Kanban, glassmorphic UI, camera-pan page transitions, video background

**Target Application**: YouSoul (YouWare Challenge Entry)
- Path: `/Users/oak/Downloads/Core/Competition/YouWare/yousoul`
- Framework: Vite + React SPA (NOT Next.js)
- Current State: Still showing default YouWare template styling

**WHY This Matters**: The user has already attempted partial migration but the app still looks like the default template. A complete architectural reference is needed because piecemeal copying has failed to capture the full design system. The JSON will serve as a single source of truth for systematic migration.

**Existing Context**: `/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-context.json`
</context>

<output_format>
Generate a JSON file with this exact structure:

```json
{
  "meta": {
    "source": "craftie/app/clarity",
    "target": "yousoul",
    "generated": "ISO-timestamp",
    "framework_mapping": {
      "from": "Next.js App Router",
      "to": "Vite + React SPA"
    }
  },
  
  "file_tree": {
    "description": "Complete file structure with purpose annotations",
    "files": [
      {
        "path": "relative/path/to/file.tsx",
        "type": "component|page|hook|util|style|config",
        "purpose": "Brief description",
        "exports": ["ComponentName", "hookName"],
        "dependencies": ["external-lib", "./local-import"],
        "migration_notes": "Any Next.js → Vite considerations"
      }
    ]
  },
  
  "component_registry": {
    "description": "All UI components with their props, styling, and relationships",
    "components": [
      {
        "name": "ComponentName",
        "file": "path/to/component.tsx",
        "props": { "propName": "type" },
        "styling": {
          "approach": "tailwind|css-modules|styled-components",
          "key_classes": ["glassmorphic", "backdrop-blur-xl"],
          "css_variables": ["--glass-opacity", "--accent-color"]
        },
        "children": ["ChildComponent1", "ChildComponent2"],
        "state": ["useState hooks", "context dependencies"],
        "animations": {
          "library": "framer-motion|css|none",
          "effects": ["fade-in", "slide-up", "camera-pan"]
        }
      }
    ]
  },
  
  "page_structure": {
    "description": "Route/view hierarchy with layout nesting",
    "pages": [
      {
        "route": "/clarity or view name",
        "file": "page.tsx path",
        "layout": "layout.tsx path if any",
        "components_used": ["Header", "Sidebar", "MainContent"],
        "data_requirements": ["tasks", "schedule", "user"],
        "transitions": {
          "enter": "animation description",
          "exit": "animation description"
        }
      }
    ]
  },
  
  "design_system": {
    "colors": {
      "primary": "#hex",
      "secondary": "#hex",
      "background": "gradient or solid",
      "glass": "rgba values for glassmorphism",
      "text": { "primary": "#hex", "secondary": "#hex" }
    },
    "typography": {
      "font_families": ["Font Name"],
      "scale": { "h1": "size", "body": "size" }
    },
    "spacing": {
      "scale": "tailwind defaults or custom"
    },
    "effects": {
      "glassmorphism": {
        "backdrop_blur": "value",
        "background": "rgba value",
        "border": "border style"
      },
      "shadows": ["shadow definitions"],
      "gradients": ["gradient definitions"]
    },
    "border_radius": {
      "small": "value",
      "medium": "value",
      "large": "value"
    }
  },
  
  "dependencies": {
    "critical": [
      {
        "package": "package-name",
        "version": "^x.x.x",
        "purpose": "What it's used for",
        "components_using": ["ComponentA", "ComponentB"]
      }
    ],
    "optional": [],
    "dev": []
  },
  
  "state_management": {
    "approach": "context|zustand|redux|etc",
    "stores": [
      {
        "name": "StoreName",
        "file": "path/to/store.ts",
        "state_shape": { "key": "type" },
        "actions": ["action1", "action2"]
      }
    ],
    "contexts": [
      {
        "name": "ContextName",
        "file": "path/to/context.tsx",
        "provides": { "key": "type" }
      }
    ]
  },
  
  "special_features": {
    "schedule_x_calendar": {
      "config_file": "path",
      "theme_customization": {},
      "integration_points": []
    },
    "dnd_kit_kanban": {
      "config_file": "path",
      "column_structure": {},
      "card_component": "path"
    },
    "video_background": {
      "implementation": "how it works",
      "fallback": "static image path"
    },
    "camera_pan_transitions": {
      "library": "framer-motion or custom",
      "implementation_file": "path",
      "trigger_mechanism": "how transitions are triggered"
    }
  },
  
  "migration_checklist": [
    {
      "step": 1,
      "task": "Install dependencies",
      "files_affected": ["package.json"],
      "commands": ["pnpm add package1 package2"]
    },
    {
      "step": 2,
      "task": "Copy design tokens",
      "files_affected": ["tailwind.config.ts", "globals.css"],
      "source_files": ["clarity/tailwind.config.ts"]
    }
  ],
  
  "nextjs_to_vite_mappings": {
    "routing": {
      "from": "app/page.tsx file-based routing",
      "to": "react-router-dom or similar",
      "notes": "Specific conversion guidance"
    },
    "layouts": {
      "from": "layout.tsx nesting",
      "to": "Layout component wrapping",
      "notes": "How to replicate layout behavior"
    },
    "metadata": {
      "from": "export const metadata",
      "to": "react-helmet or document.title",
      "notes": "SEO handling differences"
    },
    "images": {
      "from": "next/image",
      "to": "standard img or vite-imagetools",
      "notes": "Optimization differences"
    }
  }
}
```

**Save Location**: `/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-architecture-for-migration.json`
</output_format>

<execution_principles>
**Codex Principles to Apply:**
- **End-to-end**: Generate the complete JSON, not just a template
- **Batch everything**: Read all Clarity source files in parallel before generating
- **DRY/search first**: Check existing clarity-context.json and incorporate its data
- **Tool over shell**: Use Glob/Grep tools to discover all files systematically

**Process:**
1. Glob all files in `/Users/oak/Downloads/Core/Dev/Craft/craftie/app/clarity`
2. Read existing context: `/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-context.json`
3. Analyze each component for props, styling, animations
4. Extract design tokens from Tailwind config and CSS files
5. Map all dependencies from package.json
6. Document the special features (Schedule-X, dnd-kit, video BG, transitions)
7. Generate migration checklist specific to Next.js → Vite conversion
8. Output complete JSON to specified location
</execution_principles>

<suggested_command>
/sc-document --task-manage --seq
</suggested_command>

---

## Recommendations

### Suggested Droid
> Consider delegating to `technical-writer` for systematic documentation, or `system-architect` for architecture analysis

### Suggested Mode
> Use `--task-manage` because this involves multiple files and systematic extraction
> Use `--seq` for complex analysis of component relationships

### Suggested Skills
- `mcp__morph__warpgrep_codebase_search` - Semantic search for component patterns in Clarity
- `mcp__serena__find_symbol` - Navigate component exports and relationships
- `mcp__serena__write_memory` - Persist migration context across sessions

### Patterns Applied
**Codex**: End-to-end execution, batch file reading, tool-over-shell, DRY
**Claude**: XML structure, explicit output format, motivation ("because piecemeal copying has failed")

---

## Transformation Analysis

### Anti-Patterns Fixed
- [x] Vague deliverable ("create a JSON") → Explicit 200+ line JSON schema with every field defined
- [x] Emotional framing ("ugly UI") → Action-oriented specification
- [x] Missing paths → Both source and target paths explicitly stated
- [x] No success criteria → Migration checklist provides verification steps
- [x] Unclear scope → Comprehensive enumeration of what to extract (components, styles, state, animations, etc.)

### Issues Detected & Addressed
- **Frustration signal**: User tried partial migration; addressed by requiring complete architecture capture
- **Framework mismatch**: Next.js → Vite noted explicitly with mapping section in JSON
- **Implicit requirements**: Video background, camera-pan, glassmorphism now explicitly listed in special_features

### Skip Conditions Checked
- [ ] Has XML tags: no (raw prompt)
- [ ] Already well-structured: no
- [ ] Short prompt (<10 chars): no

---

## Quick Start

Copy the prompt above and run:

```bash
# In your terminal or Factory session:
/sc-document --task-manage --seq
```

Then paste the `<task>` through `<execution_principles>` sections.

The agent will:
1. Discover all Clarity source files
2. Extract architecture into the specified JSON format
3. Save to `/Users/oak/Downloads/Core/Dev/Craft/oak-management/artifacts/clarity-documentation/clarity-architecture-for-migration.json`
4. This JSON becomes the single source of truth for 1:1 migration
