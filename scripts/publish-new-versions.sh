#!/usr/bin/env bash
# Publishes each package version npm doesn't have yet, in dependency order: the pickers need the core
# package, and the Pro package needs the pickers.
set -euo pipefail

for pkg in mui x-date-pickers x-date-pickers-pro; do
  name=$(node -p "require('./packages/$pkg/package.json').name")
  version=$(node -p "require('./packages/$pkg/package.json').version")
  if [ -n "$(npm view "$name@$version" version 2>/dev/null)" ]; then
    echo "$name@$version is already on npm"
  else
    npm publish --provenance --access public -w "packages/$pkg"
  fi
done
