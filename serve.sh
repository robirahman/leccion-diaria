#!/usr/bin/env bash
# Start a local development server for offline testing.
# Usage: ./serve.sh [port]
#   Default port is 8000.

PORT="${1:-8000}"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Serving at http://localhost:$PORT"
echo "Press Ctrl+C to stop."

python3 -m http.server "$PORT" --directory "$DIR"
