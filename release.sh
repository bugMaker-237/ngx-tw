#!/bin/bash

# ngx-tw Release Script
# This script helps with manual releases when automated publishing isn't available

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 ngx-tw Release Script${NC}"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "projects/ngx-tw/package.json" ]; then
    echo -e "${RED}❌ Error: Not in the correct project directory${NC}"
    echo "Please run this script from the project root"
    exit 1
fi

# Check if we have uncommitted changes
# if [ -n "$(git status --porcelain)" ]; then
#     echo -e "${YELLOW}⚠️  Warning: You have uncommitted changes${NC}"
#     echo "Please commit or stash your changes before releasing"
#     exit 1
# fi

# Check if we're on main/master branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ] && [ "$BRANCH" != "master" ]; then
    echo -e "${YELLOW}⚠️  Warning: You're not on main/master branch${NC}"
    echo "Current branch: $BRANCH"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./projects/ngx-tw/package.json').version")
echo -e "Current version: ${YELLOW}$CURRENT_VERSION${NC}"

# Ask for version bump type
echo ""
echo "Select version bump type:"
echo "1) Patch (bug fixes) - $CURRENT_VERSION → $(npm --prefix ./projects/ngx-tw version patch --dry-run | grep -o 'v[0-9]*\.[0-9]*\.[0-9]*' | sed 's/v//')"
echo "2) Minor (new features) - $CURRENT_VERSION → $(npm --prefix ./projects/ngx-tw version minor --dry-run | grep -o 'v[0-9]*\.[0-9]*\.[0-9]*' | sed 's/v//')"
echo "3) Major (breaking changes) - $CURRENT_VERSION → $(npm --prefix ./projects/ngx-tw version major --dry-run | grep -o 'v[0-9]*\.[0-9]*\.[0-9]*' | sed 's/v//')"
echo "4) Custom version"
echo "5) Skip version bump"

read -p "Enter choice (1-5): " choice

case $choice in
    1)
        VERSION_TYPE="patch"
        ;;
    2)
        VERSION_TYPE="minor"
        ;;
    3)
        VERSION_TYPE="major"
        ;;
    4)
        read -p "Enter custom version: " CUSTOM_VERSION
        VERSION_TYPE="custom"
        ;;
    5)
        VERSION_TYPE="skip"
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

# Install dependencies
echo ""
echo -e "${GREEN}📦 Installing dependencies...${NC}"
npm install

# Run tests
# echo ""
# echo -e "${GREEN}🧪 Running tests...${NC}"
# npm run test:lib -- --watch=false --browsers=ChromeHeadless

# Build library
echo ""
echo -e "${GREEN}🔨 Building library...${NC}"
npm run build:lib

# Bump version
if [ "$VERSION_TYPE" != "skip" ]; then
    echo ""
    echo -e "${GREEN}📈 Bumping version...${NC}"
    cd projects/ngx-tw

    if [ "$VERSION_TYPE" = "custom" ]; then
        npm version "$CUSTOM_VERSION" --no-git-tag-version
    else
        npm version "$VERSION_TYPE" --no-git-tag-version
    fi

    NEW_VERSION=$(node -p "require('./package.json').version")
    cd ../..
    echo -e "New version: ${GREEN}$NEW_VERSION${NC}"
else
    NEW_VERSION=$CURRENT_VERSION
fi

# Test package
echo ""
echo -e "${GREEN}🔍 Testing package...${NC}"
npm run release:dry

# Ask for confirmation
echo ""
echo -e "${YELLOW}📋 Release Summary:${NC}"
echo "  Version: $NEW_VERSION"
echo "  Branch: $BRANCH"
echo "  Package: ngx-tw"
echo ""
read -p "Proceed with publishing? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Release cancelled${NC}"
    exit 0
fi

# Publish to NPM
echo ""
echo -e "${GREEN}🚀 Publishing to NPM...${NC}"
cd dist/ngx-tw
npm publish --access public
cd ../..

# Create git tag if version was bumped
if [ "$VERSION_TYPE" != "skip" ]; then
    echo ""
    echo -e "${GREEN}🏷️  Creating git tag...${NC}"
    git add projects/ngx-tw/package.json
    git commit -m "chore: bump version to $NEW_VERSION"
    git tag "v$NEW_VERSION"

    echo ""
    echo -e "${GREEN}📤 Pushing to git...${NC}"
    git push origin $BRANCH
    git push origin "v$NEW_VERSION"
fi

echo ""
echo -e "${GREEN}✅ Release completed successfully!${NC}"
echo ""
echo -e "📦 Package published: ${GREEN}ngx-tw@$NEW_VERSION${NC}"
echo -e "🔗 NPM: ${YELLOW}https://www.npmjs.com/package/ngx-tw${NC}"
echo -e "🏷️  Tag: ${YELLOW}v$NEW_VERSION${NC}"
echo ""
echo -e "${GREEN}🎉 Happy coding!${NC}"
