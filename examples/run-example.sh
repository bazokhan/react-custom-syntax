#!/bin/bash

# Helper script to run examples
# Usage: ./run-example.sh basic-odata-editor

set -e

EXAMPLE_NAME=${1:-basic-odata-editor}

echo "🚀 Running example: $EXAMPLE_NAME"
echo ""

# Navigate to repository root
cd "$(dirname "$0")/.."

echo "📦 Building main package..."
npm run build

echo ""
echo "📂 Navigating to example: $EXAMPLE_NAME"
cd "examples/$EXAMPLE_NAME"

echo ""
echo "📥 Installing dependencies..."
npm install

echo ""
echo "🎉 Starting development server..."
echo ""
npm run dev

