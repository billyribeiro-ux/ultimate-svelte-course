#!/usr/bin/env bash
set -euo pipefail

# Tauri smoke test: opens the built .app, takes a screenshot, and asserts
# the screenshot PNG is non-trivially sized (>50KB — a blank/failed window
# is typically ~20KB). Exits non-zero on failure.

APP_DIR="src-tauri/target/universal-apple-darwin/release/bundle/macos"
SCREENSHOT="/tmp/tauri-smoke.png"
MIN_SIZE=51200 # 50 KB

if [ ! -d "$APP_DIR" ]; then
	echo "error: bundle directory not found at $APP_DIR" >&2
	exit 1
fi

APP_PATH="$(find "$APP_DIR" -maxdepth 1 -name '*.app' -print -quit)"
if [ -z "${APP_PATH:-}" ]; then
	echo "error: no .app found in $APP_DIR" >&2
	exit 1
fi

echo "Opening $APP_PATH"
open "$APP_PATH"

echo "Waiting for app to render..."
sleep 4

echo "Capturing screenshot to $SCREENSHOT"
screencapture -x "$SCREENSHOT"

if [ ! -f "$SCREENSHOT" ]; then
	echo "error: screenshot not captured" >&2
	exit 1
fi

SIZE=$(stat -f%z "$SCREENSHOT" 2>/dev/null || stat -c%s "$SCREENSHOT")
echo "Screenshot size: ${SIZE} bytes"

if [ "$SIZE" -lt "$MIN_SIZE" ]; then
	echo "error: screenshot ${SIZE} bytes is below threshold ${MIN_SIZE} — window is likely blank" >&2
	exit 1
fi

echo "Tauri smoke test passed."
