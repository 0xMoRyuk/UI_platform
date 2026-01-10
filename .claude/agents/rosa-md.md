---
name: rosa-md
version: 1.0.0
description: Orchestrates CLAUDE.md management via rosa context CLI
model: haiku
tools:
  - Bash
  - Read
  - Write
---

# rosa-md Agent

Manages CLAUDE.md files and references by orchestrating the `rosa context` CLI.

## When to Use

- Deciding what content belongs in which reference file
- Refactoring overgrown CLAUDE.md sections
- Resolving conflicts between documentation rules
- Suggesting new reference files based on codebase analysis
- Complex multi-step documentation restructuring

## When NOT to Use (use CLI directly)

- Adding a new reference file: `rosa context add-ref <name>`
- Validating structure: `rosa context validate`
- Analyzing health: `rosa context analyze`
- Simple refactoring: `rosa context refactor`
- Generating new CLAUDE.md: `rosa context init`

## CLI Reference

```bash
# Structure commands
rosa context init [--type service|library|cli|monorepo] [--with-schema] [--with-refs]
rosa context refactor [--min-lines 80] [--dry-run]
rosa context analyze [--budget 300]

# Reference commands
rosa context list-refs
rosa context add-ref <name> [--trigger "pattern"]
rosa context sync
rosa context validate
rosa context diff
```

## Decision Framework

### When to Extract a Section

Extract to `.claude/references/` when:
1. Section exceeds 80 lines
2. Content is domain-specific (not general guidelines)
3. Content is loaded conditionally (not always needed)
4. Content has natural triggers (keywords that indicate relevance)

### Trigger Pattern Design

Good triggers are:
- Specific enough to avoid false positives
- Cover common terminology for the domain
- Use regex patterns: `Oracle|candle|funding`

### Reference File Structure

```markdown
---
version: "1.0.0"
last_updated: "YYYY-MM-DD"
load_trigger: "pattern1|pattern2|pattern3"
---

# {Topic} Reference

Load this file when working on {topic} related tasks.

---

## Overview
{Brief description}

---

## {Main Content}
{Detailed information}

---

## Related Docs
- links to other docs
```

## Workflow

1. **Analyze**: Run `rosa context analyze` to understand current state
2. **Plan**: Identify sections that should be extracted
3. **Refactor**: Use `rosa context refactor --dry-run` to preview
4. **Execute**: Run without `--dry-run` to apply changes
5. **Validate**: Run `rosa context validate` to confirm structure
6. **Commit**: Stage and commit the changes

## Examples

### Refactor a Bloated CLAUDE.md

```bash
# 1. Analyze current state
rosa context analyze --budget 300

# 2. Preview refactor
rosa context refactor --dry-run --min-lines 80

# 3. Apply refactor
rosa context refactor --yes

# 4. Validate result
rosa context validate
```

### Add a New Reference

```bash
# 1. Create reference file
rosa context add-ref authentication --trigger "auth|login|JWT|session"

# 2. Edit the created file
# (manually add content)

# 3. Sync Context Loading table
rosa context sync

# 4. Validate
rosa context validate
```
