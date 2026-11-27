# Verification: verification-record gate

## What was verified ／ 驗證項目
The canonical checker (byte-identical to wave-archive/wave-archive#479 at 7aefd0d)
runs in this repo: fixture tests pass, the no-comments rule accepts the new
scripts, and the gate fails this branch before a record exists.

## Command ／ 指令
```bash
bash scripts/ci/check-verification-record.test.sh
bun scripts/check-comments.ts --diff origin/main
bash scripts/ci/check-verification-record.sh --base origin/main   # before adding this record
```

## Result ／ 結果
```
38 passed, 0 failed
check-comments: PASS (0 problems)
verification-record: FAIL: this PR changes non-doc paths but adds no verifications/*.md record.
```

## When ／ 時間或 commit
2026-11-27 17:10 Asia/Taipei
