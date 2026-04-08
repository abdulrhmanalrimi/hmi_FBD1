#!/bin/bash

# Deploy script for GitHub Pages
# This script builds the project and pushes to gh-pages branch

set -e

echo "🔨 Building project..."
pnpm build

echo "📦 Preparing deployment..."
cd /tmp
rm -rf hmi_FBD1_deploy
cp -r /home/ubuntu/fbd120-hmi-viz/dist/public hmi_FBD1_deploy
cd hmi_FBD1_deploy

echo "🚀 Initializing git repository..."
git init
git config user.email "bot@example.com"
git config user.name "Deploy Bot"
git add .
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

echo "📤 Pushing to gh-pages branch..."
git remote add origin https://x-access-token:ghs_RuL7XWhmTIecjPfgIiTzYakQ28TRpm3hBYLy@github.com/abdulrhmanalrimi/hmi_FBD1.git
git branch -M gh-pages
git push -u origin gh-pages -f

echo "✅ Deployment complete!"
echo "🌐 Your site is live at: https://abdulrhmanalrimi.github.io/hmi_FBD1/"
