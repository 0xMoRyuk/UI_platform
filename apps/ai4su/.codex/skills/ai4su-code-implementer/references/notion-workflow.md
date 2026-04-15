# Notion workflow

Use Notion as the canonical task source when the user provides a Notion URL.

## Intake

- Fetch the page or database before planning edits.
- Extract only the facts needed to implement the code change:
  - required behavior
  - content that must appear in the UI
  - data relationships or IDs that must remain stable
  - assets or links that must be wired into the app
- Do not mirror large Notion pages into chat output.

## Translation into code work

- Map the request into concrete code changes in `ai4su`:
  - page content updates
  - component or layout changes
  - data or schema changes
  - asset path wiring
  - tests that need updating
- Validate Notion assumptions against repo truth before editing.
- If Notion conflicts with the current codebase, prefer executable repo truth and report the mismatch in the final summary.

## Completion expectations

- The deliverable is applied code on `jeanne`, not a plan.
- Verification is mandatory before commit.
- Final output should mention:
  - source Notion page if relevant
  - branch used
  - checks run
  - blockers or follow-up items
