#!/bin/bash

echo "====================================="
echo "🚀 Build script for Docker Compose"
echo "====================================="

show_menu() {
  echo "Choose an option:"
  echo "1) Build & Run Frontend Only"
  echo "2) Build & Run Backend Only"
  echo "3) Build & Run Both Frontend + Backend"
  echo "4) Rebuild & Restart All Containers"
  echo "5) Exit"
  echo "-------------------------------------"
  read -p "Enter your choice [1-5]: " choice
}

run_frontend() {
  echo "====================================="
  echo "🔧 Building frontend..."
  docker compose build frontend
  echo "🚀 Starting frontend container..."
  docker compose up -d frontend
}

run_backend() {
  echo "====================================="
  echo "🔧 Building backend..."
  docker compose build backend
  echo "🚀 Starting backend container..."
  docker compose up -d backend
}

run_both() {
  echo "====================================="
  echo "🔧 Building frontend and backend..."
  docker compose build
  echo "🚀 Starting all containers..."
  docker compose up -d
}

restart_all() {
  echo "====================================="
  echo "♻️  Stopping all containers..."
  docker compose down
  echo "🔧  Rebuilding all containers..."
  docker compose build
  echo "🚀  Starting all containers..."
  docker compose up -d
}

# Check for CLI param
if [ -z "$1" ]; then
  show_menu
else
  choice=$1
fi

case $choice in
  1) run_frontend ;;
  2) run_backend ;;
  3) run_both ;;
  4) restart_all ;;
  5) echo "👋 Exiting..."; exit 0 ;;
  *) echo "❌ Invalid choice. Use 1–5."; exit 1 ;;
esac
