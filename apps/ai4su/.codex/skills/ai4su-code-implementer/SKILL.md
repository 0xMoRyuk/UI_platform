---
name: ai4su-code-implementer
description: Implement and verify code changes in ai4su from chat or Notion. Always work on the jeanne branch, never edit or merge on main, and finish with a conventional commit only after checks pass.
---

Use this skill when the user wants code changes applied in `ai4su`.

## Scope

- Default target is `/Users/mo/creative_home/UI_platform/apps/ai4su`.
- Treat Notion as the preferred source of truth when the user provides a Notion page or database URL.
- Do not mutate other apps unless the user explicitly overrides scope.

## Branch rules

- Before any code edit or commit, confirm the current branch with `git -C /Users/mo/creative_home/UI_platform/apps/ai4su branch --show-current`.
- If the current branch is `main`, switch to `jeanne` before editing.
- If `jeanne` does not exist, create it from the current local branch state, then switch to it.
- Never edit code while staying on `main`.
- Never merge into `main`.
- Never push directly to `origin/main`.
- Only create commits on `jeanne`.

## Workflow

1. Gather source material.
   - If a Notion URL is present, fetch it first and extract only the implementation-relevant facts.
   - If the request is chat-only, derive the task from the prompt and local code.
2. Inspect the code before editing.
   - Read the relevant files, types, routes, and scripts.
   - Use targeted search rather than broad scans.
3. Apply the implementation.
   - Make direct code changes in `ai4su`.
   - Keep changes narrow and aligned with the source request.
4. Verify.
   - Run the checks from `references/verification.md`.
   - If a check fails, keep iterating until it passes or a real blocker is confirmed.
5. Finish.
   - Commit on `jeanne` with a conventional commit message.
   - Summarize the files changed, verification result, and any blocker or follow-up.

## Git policy

- Commit format must be one of:
  - `feat(ai4su): ...`
  - `fix(ai4su): ...`
  - `refactor(ai4su): ...`
  - `chore(ai4su): ...`
- Do not create or switch to any branch other than `jeanne` unless the user explicitly changes policy.
- Do not run destructive cleanup commands.
- Do not commit when verification is failing.
- The intended landing path is a pull request from `jeanne` to protected `main`.

## References

- For Notion intake and translation rules, read `references/notion-workflow.md`.
- For completion gates and failure handling, read `references/verification.md`.
