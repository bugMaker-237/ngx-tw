@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 ngx-tw Release Script
echo ==========================

REM Check if we're in the right directory
if not exist "projects\ngx-tw\package.json" (
    echo ❌ Error: Not in the correct project directory
    echo Please run this script from the project root
    pause
    exit /b 1
)

REM Check for uncommitted changes
git status --porcelain > temp_status.txt
set /p STATUS=<temp_status.txt
del temp_status.txt
if not "%STATUS%"=="" (
    echo ⚠️  Warning: You have uncommitted changes
    echo Please commit or stash your changes before releasing
    pause
    exit /b 1
)

REM Get current branch
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%i
if not "%BRANCH%"=="main" if not "%BRANCH%"=="master" (
    echo ⚠️  Warning: You're not on main/master branch
    echo Current branch: %BRANCH%
    set /p "CONTINUE=Continue anyway? (y/N): "
    if /i not "!CONTINUE!"=="y" exit /b 1
)

REM Get current version
for /f "delims=" %%i in ('node -p "require('./projects/ngx-tw/package.json').version"') do set CURRENT_VERSION=%%i
echo Current version: %CURRENT_VERSION%

echo.
echo Select version bump type:
echo 1) Patch (bug fixes)
echo 2) Minor (new features)
echo 3) Major (breaking changes)
echo 4) Custom version
echo 5) Skip version bump

set /p "CHOICE=Enter choice (1-5): "

if "%CHOICE%"=="1" set VERSION_TYPE=patch
if "%CHOICE%"=="2" set VERSION_TYPE=minor
if "%CHOICE%"=="3" set VERSION_TYPE=major
if "%CHOICE%"=="4" (
    set /p "CUSTOM_VERSION=Enter custom version: "
    set VERSION_TYPE=custom
)
if "%CHOICE%"=="5" set VERSION_TYPE=skip

if not defined VERSION_TYPE (
    echo ❌ Invalid choice
    pause
    exit /b 1
)

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Run tests
echo.
echo 🧪 Running tests...
call npm run test:lib -- --watch=false --browsers=ChromeHeadless
if errorlevel 1 (
    echo ❌ Tests failed
    pause
    exit /b 1
)

REM Build library
echo.
echo 🔨 Building library...
call npm run build:lib
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

REM Bump version
if not "%VERSION_TYPE%"=="skip" (
    echo.
    echo 📈 Bumping version...
    cd projects\ngx-tw

    if "%VERSION_TYPE%"=="custom" (
        call npm version "%CUSTOM_VERSION%" --no-git-tag-version
    ) else (
        call npm version "%VERSION_TYPE%" --no-git-tag-version
    )

    if errorlevel 1 (
        echo ❌ Version bump failed
        cd ..\..
        pause
        exit /b 1
    )

    for /f "delims=" %%i in ('node -p "require('./package.json').version"') do set NEW_VERSION=%%i
    cd ..\..
    echo New version: !NEW_VERSION!
) else (
    set NEW_VERSION=%CURRENT_VERSION%
)

REM Test package
echo.
echo 🔍 Testing package...
call npm run release:dry
if errorlevel 1 (
    echo ❌ Package test failed
    pause
    exit /b 1
)

REM Ask for confirmation
echo.
echo 📋 Release Summary:
echo   Version: %NEW_VERSION%
echo   Branch: %BRANCH%
echo   Package: ngx-tw
echo.
set /p "PROCEED=Proceed with publishing? (y/N): "
if /i not "%PROCEED%"=="y" (
    echo Release cancelled
    pause
    exit /b 0
)

REM Publish to NPM
echo.
echo 🚀 Publishing to NPM...
cd dist\ngx-tw
call npm publish --access public
if errorlevel 1 (
    echo ❌ Publishing failed
    cd ..\..
    pause
    exit /b 1
)
cd ..\..

REM Create git tag if version was bumped
if not "%VERSION_TYPE%"=="skip" (
    echo.
    echo 🏷️  Creating git tag...
    git add projects\ngx-tw\package.json
    git commit -m "chore: bump version to %NEW_VERSION%"
    git tag "v%NEW_VERSION%"

    echo.
    echo 📤 Pushing to git...
    git push origin %BRANCH%
    git push origin "v%NEW_VERSION%"
)

echo.
echo ✅ Release completed successfully!
echo.
echo 📦 Package published: ngx-tw@%NEW_VERSION%
echo 🔗 NPM: https://www.npmjs.com/package/ngx-tw
echo 🏷️  Tag: v%NEW_VERSION%
echo.
echo 🎉 Happy coding!
pause
