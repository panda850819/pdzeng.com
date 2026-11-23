#!/bin/bash
set -uo pipefail

usage() {
  echo "usage: PIPELINE_MERGE_COMMIT=<sha> $0 [--dry-run]" >&2
  echo "  waits for the existing Deploy workflow (.github/workflows/deploy.yml) to succeed on that commit" >&2
  exit 2
}

REPO="${PDZENG_REPO:-panda850819/pdzeng.com}"
WORKFLOW="${PDZENG_DEPLOY_WORKFLOW:-deploy.yml}"
TIMEOUT_S="${PDZENG_DEPLOY_TIMEOUT_S:-600}"
INTERVAL_S="${PDZENG_DEPLOY_POLL_S:-15}"
COMMIT="${PIPELINE_MERGE_COMMIT:-}"
DRY_RUN=0
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1 ;;
    *) usage ;;
  esac
  shift
done

FAILED=0
step() {
  printf 'STEP: %s | %s | %s\n' "$1" "$2" "$3"
  [ "$2" != FAIL ] || FAILED=1
}
finish() {
  local result=PASS
  [ "$FAILED" -eq 0 ] || result=FAIL
  [ "$DRY_RUN" -eq 0 ] || result="DRY-RUN-$result"
  echo "DEPLOY-RESULT: $result"
  echo "DEPLOY-COMMIT: ${COMMIT:-unknown}"
  echo "DEPLOY-HOST: github-actions ($REPO $WORKFLOW)"
  [ -z "${RUN_URL:-}" ] || echo "DEPLOY-RUN: $RUN_URL"
  exit "$FAILED"
}

if ! printf '%s' "$COMMIT" | grep -Eq '^[0-9a-f]{40}$'; then
  step merge-commit FAIL "PIPELINE_MERGE_COMMIT must be a 40-char sha, got '${COMMIT}'"
  finish
fi
step merge-commit PASS "$COMMIT"

if ! command -v gh >/dev/null 2>&1; then
  step gh FAIL "gh not on PATH"
  finish
fi

on_main=$(gh api "repos/$REPO/compare/$COMMIT...main" --jq .status 2>/dev/null || echo error)
case "$on_main" in
  ahead|identical) step on-main PASS "main contains $COMMIT ($on_main)" ;;
  *) step on-main FAIL "main does not contain $COMMIT ($on_main)"; finish ;;
esac

ignored_only() {
  local files patterns f p hit
  files=$(gh api "repos/$REPO/commits/$COMMIT" --jq '.files[].filename' 2>/dev/null) || return 1
  [ -n "$files" ] || return 1
  patterns=$(gh api "repos/$REPO/contents/.github/workflows/$WORKFLOW?ref=$COMMIT" --jq .content 2>/dev/null | base64 --decode 2>/dev/null \
    | awk '/^[[:space:]]*paths-ignore:/{on=1; next} on && /^[[:space:]]*-[[:space:]]/{sub(/^[[:space:]]*-[[:space:]]*/, ""); gsub(/["\047]/, ""); print; next} on{exit}')
  [ -n "$patterns" ] || return 1
  while IFS= read -r f; do
    hit=0
    while IFS= read -r p; do
      p=${p//\*\*/*}
      case "$f" in $p) hit=1; break ;; esac
    done <<EOF
$patterns
EOF
    [ "$hit" -eq 1 ] || return 1
  done <<EOF
$files
EOF
  return 0
}

if [ "$DRY_RUN" -eq 1 ]; then
  step wait-deploy PLAN "poll gh run list --repo $REPO --workflow $WORKFLOW --branch main for $COMMIT or a descendant, up to ${TIMEOUT_S}s"
  finish
fi

deadline=$(( $(date +%s) + TIMEOUT_S ))
RUN_URL=""
while :; do
  runs=$(gh run list --repo "$REPO" --workflow "$WORKFLOW" --branch main --limit 30 \
    --json databaseId,headSha,status,conclusion,url,event 2>/dev/null) || runs='[]'
  own=$(jq -c --arg c "$COMMIT" '[.[] | select(.headSha == $c)] | first // empty' <<<"$runs")
  if [ -n "$own" ]; then
    status=$(jq -r .status <<<"$own")
    conclusion=$(jq -r '.conclusion // ""' <<<"$own")
    RUN_URL=$(jq -r .url <<<"$own")
    if [ "$status" = completed ] && [ "$conclusion" = success ]; then
      step deploy-run PASS "$RUN_URL success"
      finish
    fi
    if [ "$status" = completed ] && [ "$conclusion" != cancelled ] && [ "$conclusion" != skipped ]; then
      step deploy-run FAIL "$RUN_URL $conclusion"
      finish
    fi
  fi
  for later in $(jq -r --arg c "$COMMIT" '.[] | select(.status == "completed" and .conclusion == "success" and .headSha != $c) | .headSha + "|" + .url' <<<"$runs"); do
    rel=$(gh api "repos/$REPO/compare/$COMMIT...${later%%|*}" --jq .status 2>/dev/null || echo error)
    if [ "$rel" = ahead ]; then
      RUN_URL=${later#*|}
      own_state=absent
      [ -z "$own" ] || own_state=$(jq -r '.status + "/" + (.conclusion // "")' <<<"$own")
      step deploy-run PASS "$RUN_URL success on descendant ${later%%|*}; own run $own_state"
      finish
    fi
  done
  if [ -z "$own" ] && ignored_only; then
    step deploy-run SKIP "every file in $COMMIT matches $WORKFLOW paths-ignore; Deploy does not run"
    finish
  fi
  if [ "$(date +%s)" -ge "$deadline" ]; then
    step deploy-run FAIL "no successful $WORKFLOW run for $COMMIT within ${TIMEOUT_S}s${RUN_URL:+ (last: $RUN_URL)}"
    finish
  fi
  sleep "$INTERVAL_S"
done
