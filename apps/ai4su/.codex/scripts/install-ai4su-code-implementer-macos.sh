#!/bin/sh

set -eu

log() {
  printf '%s\n' "$1"
}

fail() {
  printf '%s\n' "Error: $1" >&2
  exit 1
}

prompt_yes_no() {
  prompt_text="$1"
  response=""

  printf '%s ' "$prompt_text"
  read -r response

  case "$response" in
    y|Y|yes|YES)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

require_macos() {
  if [ "$(uname -s)" != "Darwin" ]; then
    fail "this installer targets macOS only"
  fi
}

install_with_brew_if_missing() {
  package_name="$1"
  command_name="$2"
  brew_target="${3:-$1}"

  if command -v "$command_name" >/dev/null 2>&1; then
    return 0
  fi

  if ! command -v brew >/dev/null 2>&1; then
    fail "missing '$command_name'. Install Homebrew first, then run: brew install $brew_target"
  fi

  log "Installing $package_name with Homebrew..."
  brew install "$brew_target"
}

install_cask_with_brew_if_missing() {
  package_name="$1"
  app_path="$2"
  brew_target="${3:-$1}"

  if [ -d "$app_path" ]; then
    return 0
  fi

  if ! command -v brew >/dev/null 2>&1; then
    fail "missing app '$package_name'. Install Homebrew first, then run: brew install --cask $brew_target"
  fi

  log "Installing $package_name with Homebrew..."
  brew install --cask "$brew_target"
}

install_bun_if_missing() {
  if command -v bun >/dev/null 2>&1; then
    return 0
  fi

  if command -v brew >/dev/null 2>&1; then
    if brew install oven-sh/bun/bun; then
      return 0
    fi

    if brew install bun; then
      return 0
    fi
  fi

  if ! command -v curl >/dev/null 2>&1; then
    fail "missing 'bun' and no supported installer was available. Install curl or Bun manually"
  fi

  log "Installing Bun with the official installer..."
  curl -fsSL https://bun.sh/install | bash
  export PATH="$HOME/.bun/bin:$PATH"
  command -v bun >/dev/null 2>&1 || fail "Bun install finished but 'bun' is still not on PATH. Open a new shell or add \$HOME/.bun/bin to PATH"
}

backup_hook_if_present() {
  hook_path="$1"
  backup_dir="$2"

  if [ -f "$hook_path" ] || [ -L "$hook_path" ]; then
    mkdir -p "$backup_dir"
    cp -f "$hook_path" "$backup_dir/$(basename "$hook_path")"
  fi
}

write_hook() {
  hook_path="$1"
  hook_body="$2"

  printf '%s\n' "$hook_body" > "$hook_path"
  chmod +x "$hook_path"
}

ensure_gh_auth() {
  if gh auth status >/dev/null 2>&1; then
    return 0
  fi

  log "GitHub CLI is installed but not authenticated."
  if prompt_yes_no "Run 'gh auth login -h github.com' now? [y/N]"; then
    gh auth login -h github.com
  fi

  gh auth status >/dev/null 2>&1 || fail "GitHub CLI authentication is required before cloning the repo"
}

clone_repo_if_missing() {
  repo_root="$1"
  parent_dir="$(dirname "$repo_root")"
  repo_url="https://github.com/0xMoRyuk/UI_platform.git"

  mkdir -p "$parent_dir"

  if [ -d "$repo_root/.git" ]; then
    log "Repo already exists at $repo_root"
    return 0
  fi

  if [ -e "$repo_root" ] && [ ! -d "$repo_root/.git" ]; then
    fail "path exists but is not a git repo: $repo_root"
  fi

  ensure_gh_auth
  log "Cloning UI_platform into $repo_root"
  git clone "$repo_url" "$repo_root"
}

ensure_jeanne_branch() {
  ai4su_dir="$1"

  if git -C "$ai4su_dir" show-ref --verify --quiet refs/heads/jeanne; then
    log "Local branch 'jeanne' already exists."
    return 0
  fi

  current_branch="$(git -C "$ai4su_dir" branch --show-current)"
  git -C "$ai4su_dir" branch jeanne "$current_branch"
  log "Created local branch 'jeanne' from '$current_branch'."
}

main() {
  require_macos

  website_root="${UI_PLATFORM_WEBSITE_ROOT:-$HOME/Documents/website}"
  repo_root="${UI_PLATFORM_REPO_ROOT:-$website_root/UI_platform}"
  ai4su_dir="$repo_root/apps/ai4su"
  codex_home="${CODEX_HOME:-$HOME/.codex}"
  codex_skills_dir="$codex_home/skills"
  skill_source="$ai4su_dir/.codex/skills/ai4su-code-implementer"
  skill_link="$codex_skills_dir/ai4su-code-implementer"
  husky_dir="$repo_root/.husky"
  guard_script="$ai4su_dir/.codex/scripts/git-branch-guard.sh"
  backup_dir="$husky_dir/.codex-backups"

  install_with_brew_if_missing "git" "git"
  install_with_brew_if_missing "GitHub CLI" "gh" "gh"
  install_bun_if_missing
  install_with_brew_if_missing "Codex CLI" "codex" "codex"
  install_cask_with_brew_if_missing "Warp Terminal" "/Applications/Warp.app" "warp"

  mkdir -p "$website_root"
  clone_repo_if_missing "$repo_root"

  [ -d "$repo_root/.git" ] || fail "repo root not found at $repo_root"
  [ -d "$ai4su_dir" ] || fail "ai4su app not found at $ai4su_dir"
  [ -f "$guard_script" ] || fail "branch guard script not found at $guard_script"
  [ -f "$skill_source/SKILL.md" ] || fail "skill source not found at $skill_source"

  mkdir -p "$codex_skills_dir"
  ln -sfn "$skill_source" "$skill_link"
  log "Linked skill into $skill_link"

  mkdir -p "$husky_dir"
  backup_hook_if_present "$husky_dir/pre-commit" "$backup_dir"
  backup_hook_if_present "$husky_dir/pre-merge-commit" "$backup_dir"
  backup_hook_if_present "$husky_dir/pre-push" "$backup_dir"

  write_hook "$husky_dir/pre-commit" "#!/usr/bin/env sh
. \"\$(dirname -- \"\$0\")/_/husky.sh\"

$guard_script pre-commit"

  write_hook "$husky_dir/pre-merge-commit" "#!/usr/bin/env sh
. \"\$(dirname -- \"\$0\")/_/husky.sh\"

$guard_script pre-merge-commit"

  write_hook "$husky_dir/pre-push" "#!/usr/bin/env sh
. \"\$(dirname -- \"\$0\")/_/husky.sh\"

$guard_script pre-push \"\$1\"
bun run type-check && bun run lint"

  ensure_jeanne_branch "$ai4su_dir"

  log ""
  log "Install complete."
  log "Next steps:"
  log "1. Enable branch protection on origin/main in GitHub settings."
  log "2. Ensure Codex has Notion MCP access in the session before invoking the skill."
  log "3. Launch Warp if you want to use the terminal UI there."
  log "4. Invoke the skill as \$ai4su-code-implementer."
}

main "$@"
