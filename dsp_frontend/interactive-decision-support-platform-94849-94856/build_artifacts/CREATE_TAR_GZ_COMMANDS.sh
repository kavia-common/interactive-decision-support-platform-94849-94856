#!/usr/bin/env bash
# This script creates build_artifacts/simple-deploy.tar.gz with the minimal deployable assets.
# It excludes node_modules and __pycache__ directories.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/build_artifacts"
OUT_TAR="${OUT_DIR}/simple-deploy.tar.gz"

mkdir -p "${OUT_DIR}"

# Verify required files exist
required_backend=(Dockerfile requirements.txt .env.example)
required_frontend=(Dockerfile package.json .env.example)
for f in "${required_backend[@]}"; do
  if [ ! -e "${ROOT_DIR}/dsp_backend/${f}" ]; then
    echo "Missing dsp_backend/${f}"
    exit 1
  fi
done
for f in "${required_frontend[@]}"; do
  if [ ! -e "${ROOT_DIR}/dsp_frontend/${f}" ]; then
    echo "Missing dsp_frontend/${f}"
    exit 1
  fi
done
if [ ! -e "${ROOT_DIR}/RUN_ME_FIRST.md" ]; then
  echo "Missing RUN_ME_FIRST.md at repo root"
  exit 1
fi

cd "${ROOT_DIR}"

# Create the tarball, excluding node_modules and __pycache__
tar --exclude='**/node_modules' \
    --exclude='**/__pycache__' \
    -czf "${OUT_TAR}" \
    RUN_ME_FIRST.md \
    dsp_backend/Dockerfile \
    dsp_backend/requirements.txt \
    dsp_backend/.env.example \
    dsp_backend/app \
    dsp_backend/routers \
    dsp_backend/services \
    dsp_frontend/Dockerfile \
    dsp_frontend/package.json \
    dsp_frontend/.env.example \
    dsp_frontend/src \
    dsp_frontend/public 2>/dev/null || true

echo "Created ${OUT_TAR}"
