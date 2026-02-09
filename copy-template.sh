#!/bin/bash

# RPMS Website Template Copy Script
# Usage: ./copy-template.sh /path/to/new-project

if [ -z "$1" ]; then
  echo "Usage: ./copy-template.sh /path/to/new-project"
  exit 1
fi

TARGET_DIR="$1"

# Create target directory
mkdir -p "$TARGET_DIR"

# Copy all files except .git and company-specific files
rsync -av --progress \
  --exclude='.git' \
  --exclude='.next' \
  --exclude='node_modules' \
  --exclude='out' \
  --exclude='.env.local' \
  --exclude='public/images/logo.png' \
  --exclude='public/images/partners/' \
  --exclude='public/images/certificates/' \
  --exclude='src/app/icon.png' \
  --exclude='.sisyphus/' \
  ./ "$TARGET_DIR/"

# Create placeholder directories
mkdir -p "$TARGET_DIR/public/images/partners"
mkdir -p "$TARGET_DIR/public/images/certificates"

# Create placeholder files
touch "$TARGET_DIR/public/images/logo.png.placeholder"
touch "$TARGET_DIR/src/app/icon.png.placeholder"

echo ""
echo "========================================"
echo "Template copied to: $TARGET_DIR"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. git init"
echo "3. Update src/config/site.ts with new company info"
echo "4. Add logo: public/images/logo.png"
echo "5. Add favicon: src/app/icon.png"
echo "6. Add partner logos to: public/images/partners/"
echo "7. Add certificates to: public/images/certificates/"
echo "8. Update translation files in src/i18n/locales/"
echo "9. cp .env.local.example .env.local"
echo "10. pnpm install && pnpm dev"
echo ""
