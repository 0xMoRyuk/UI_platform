#!/bin/sh

set -eu

repo_root="$(git rev-parse --show-toplevel)"
branch="$(git -C "$repo_root/apps/ai4su" branch --show-current 2>/dev/null || true)"
hook_name="${1:-}"
remote_name="${2:-}"

if [ -z "$branch" ]; then
  exit 0
fi

deny_main_branch() {
  printf '%s\n' "Blocked: ${hook_name} is not allowed on branch 'main'. Switch to 'jeanne' first." >&2
  exit 1
}

case "$hook_name" in
  pre-commit|pre-merge-commit)
    if [ "$branch" = "main" ]; then
      deny_main_branch
    fi
    ;;
  pre-push)
    if [ "$branch" = "main" ]; then
      printf '%s\n' "Blocked: pushing from branch 'main' is not allowed. Use 'jeanne' and open a PR." >&2
      exit 1
    fi

    while IFS=' ' read -r local_ref local_sha remote_ref remote_sha; do
      if [ "${remote_name}" = "origin" ] && [ "${remote_ref}" = "refs/heads/main" ]; then
        printf '%s\n' "Blocked: direct pushes to origin/main are not allowed. Push 'jeanne' and open a PR." >&2
        exit 1
      fi
    done
    ;;
esac
