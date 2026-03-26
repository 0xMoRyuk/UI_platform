# Verification and completion

Run verification from `/Users/mo/creative_home/UI_platform/apps/ai4su`.

## Required checks

Default completion gate:

```sh
bun run type-check
bun run test
```

## Optional checks

Use these when the task warrants broader validation:

```sh
bun run lint
bun run build
```

## Failure handling

- If `type-check` fails, fix the implementation and rerun it.
- If tests fail, fix the regression or update the relevant tests, then rerun them.
- Stop only when:
  - the checks pass, or
  - a real blocker exists outside the skill's control
- Do not create a commit while required checks are failing.

## Git completion

- Confirm the branch is `jeanne` before committing.
- Use a conventional commit with `ai4su` scope.
- Leave the branch ready for a pull request into protected `main`.
