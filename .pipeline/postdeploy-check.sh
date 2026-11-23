#!/bin/bash
set -uo pipefail

REPO="${PDZENG_REPO:-panda850819/pdzeng.com}"
WORKFLOW="${PDZENG_DEPLOY_WORKFLOW:-deploy.yml}"
SITE="${PDZENG_SITE_URL:-https://pdzeng.com}"
COMMIT="${PIPELINE_MERGE_COMMIT:-}"

[ $# -eq 0 ] || { echo "usage: PIPELINE_MERGE_COMMIT=<sha> $0" >&2; exit 2; }

FAILED=0
check() {
  printf 'CHECK: %s | %s | %s\n' "$1" "$2" "$3"
  [ "$2" = PASS ] || [ "$2" = SKIP ] || FAILED=1
}

probe() {
  local name=$1 url=$2 out code ctype
  out=$(curl -sS -o /dev/null -m 15 -w '%{http_code} %{content_type}' "$url" 2>/dev/null) || out="000 curl-error"
  code=${out%% *}
  ctype=${out#* }
  if [ "$code" = 200 ]; then check "$name" PASS "$url $code $ctype"; else check "$name" FAIL "$url $code $ctype"; fi
}

probe site-root "$SITE"
probe site-root-slash "$SITE/"

if [ -z "$COMMIT" ]; then
  check deploy-run SKIP "PIPELINE_MERGE_COMMIT not set"
elif ! command -v gh >/dev/null 2>&1; then
  check deploy-run SKIP "gh not on PATH"
else
  runs=$(gh run list --repo "$REPO" --workflow "$WORKFLOW" --branch main --limit 30 \
    --json headSha,status,conclusion,url 2>/dev/null) || runs=''
  if [ -z "$runs" ]; then
    check deploy-run FAIL "gh run list failed for $REPO $WORKFLOW"
  else
    hit=$(jq -r --arg c "$COMMIT" '[.[] | select(.headSha == $c)] | first | if . == null then "" else .status + " " + (.conclusion // "") + " " + .url end' <<<"$runs")
    latest=$(jq -r '[.[] | select(.status == "completed" and .conclusion == "success")] | first | if . == null then "" else .headSha + " " + .url end' <<<"$runs")
    rel=none
    [ -z "$latest" ] || rel=$(gh api "repos/$REPO/compare/$COMMIT...${latest%% *}" --jq .status 2>/dev/null || echo error)
    case "$hit|$rel" in
      "completed success "*) check deploy-run PASS "${hit##* } success for $COMMIT" ;;
      "|ahead"|"completed cancelled "*"|ahead") check deploy-run PASS "own run ${hit:-absent}; later success ${latest##* } on ${latest%% *} contains $COMMIT" ;;
      "|"*) check deploy-run SKIP "no $WORKFLOW run for $COMMIT (paths-ignore); deploy.sh decides" ;;
      *) check deploy-run FAIL "${hit%% http*} ${hit##* }" ;;
    esac
  fi
fi

check served-commit SKIP "the static export carries no commit id; deploy-run ties the commit to the deploy"

exit "$FAILED"
