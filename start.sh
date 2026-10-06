#!/usr/bin/env bash
PORT=3000
echo "🚀 Starting WhatsApp Voice & Chat Animation Studio on http://localhost:$PORT ..."
python3 -m http.server $PORT
