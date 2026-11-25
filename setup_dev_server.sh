#!/usr/bin/env bash
# Start (or restart) the Vite dev server for the app in app/, in the
# background, and print the link to open it.
#
#   ./setup_dev_server.sh          start or restart the server
#   ./setup_dev_server.sh stop     stop it
#
# The server's output goes to dev-server.log in the repo folder.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
APP="$ROOT/app"
PORT=5173
LOG="$ROOT/dev-server.log"

stop_server() {
  local pids
  pids="$(lsof -ti tcp:"$PORT" 2>/dev/null || true)"
  if [ -z "$pids" ]; then
    pids="$(pgrep -f "vite.*--port $PORT" 2>/dev/null || true)"
  fi
  if [ -n "$pids" ]; then
    echo "Stopping the old dev server..."
    kill $pids 2>/dev/null || true
    sleep 1
  fi
}

if [ "${1:-}" = "stop" ]; then
  stop_server
  echo "Dev server stopped."
  exit 0
fi

if [ ! -f "$APP/package.json" ]; then
  echo "There is no app yet (no app/package.json)."
  echo "Ask the agent to build the app from your Stitch design first."
  exit 1
fi

cd "$APP"

if [ ! -d node_modules ]; then
  echo "Installing the app's packages (first time only)..."
  npm install
fi

stop_server

echo "Starting the dev server..."
nohup npm run dev -- --host 0.0.0.0 --port "$PORT" --strictPort > "$LOG" 2>&1 &

for _ in $(seq 1 30); do
  if curl -s -o /dev/null "http://localhost:$PORT"; then
    if [ -n "${CODESPACE_NAME:-}" ]; then
      URL="https://${CODESPACE_NAME}-${PORT}.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-app.github.dev}"
    else
      URL="http://localhost:$PORT"
    fi
    echo "The app is running: $URL"
    echo "(Log: dev-server.log. Stop it with: ./setup_dev_server.sh stop)"
    exit 0
  fi
  sleep 1
done

echo "The dev server did not start. Last lines of dev-server.log:"
tail -n 20 "$LOG"
exit 1
