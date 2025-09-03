# NPM Publishing Setup Guide

This guide explains how to set up automated NPM publishing for the ngx-tw library.

## Prerequisites

1. **NPM Account**: You need an NPM account to publish packages
2. **GitHub Repository**: Code should be hosted on GitHub
3. **NPM Token**: Generate an access token for automated publishing

## Setup Steps

### 1. NPM Account Setup

1. Create an account at [npmjs.com](https://www.npmjs.com)
2. Verify your email address
3. Enable two-factor authentication (recommended)

### 2. Generate NPM Access Token

1. Go to [NPM Access Tokens](https://www.npmjs.com/settings/tokens)
2. Click "Generate New Token"
3. Select "Automation" type (for CI/CD)
4. Copy the generated token

### 3. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add a new repository secret:
   - Name: `NPM_TOKEN`
   - Value: Your NPM access token from step 2

### 4. Verify Package Name

Ensure your package name is unique:

```bash
npm search ngx-tw
```

If the name is taken, update the name in:

- `projects/ngx-tw/package.json`
- Update imports in documentation

### 5. Test Local Build

Before pushing, test the build locally:

```bash
# Install dependencies
npm install

# Build the library
npm run build:lib

# Test package creation
npm run release:dry
```

### 6. Initial Manual Publish (Optional)

For the first release, you might want to publish manually:

```bash
# Build the library
npm run build:lib

# Navigate to build output
cd dist/ngx-tw

# Publish to NPM
npm publish --access public
```

### 7. Automated Publishing

Once GitHub secrets are configured, the automated publishing works as follows:

1. **On Pull Request**: Runs tests and builds library
2. **On Merge to Main**:
   - Runs tests
   - Builds library
   - Bumps version based on conventional commits
   - Publishes to NPM
   - Creates GitHub release

## Conventional Commits for Versioning

The automated system uses conventional commits to determine version bumps:

- `feat: new feature` → Minor version (1.0.0 → 1.1.0)
- `fix: bug fix` → Patch version (1.0.0 → 1.0.1)
- `feat!: breaking change` → Major version (1.0.0 → 2.0.0)
- `docs:`, `style:`, `refactor:` → No version bump

## Troubleshooting

### Common Issues

1. **NPM Token Invalid**

   - Regenerate token in NPM settings
   - Update GitHub secret

2. **Package Name Conflict**

   - Choose a unique package name
   - Update all references

3. **Build Failures**

   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Run tests locally first

4. **Permission Denied**
   - Ensure NPM token has publish permissions
   - Check if you're the package owner

### Testing the Workflow

1. Create a test branch
2. Make a small change
3. Commit with conventional format: `feat: test automated publishing`
4. Create pull request
5. Merge to main
6. Check GitHub Actions and NPM for successful publish

## Manual Emergency Publish

If automated publishing fails, you can publish manually:

```bash
# Build the library
npm run build:lib

# Navigate to dist folder
cd dist/ngx-tw

# Login to NPM (if not already)
npm login

# Publish package
npm publish --access public
```

## Post-Publishing

After successful publishing:

1. Verify package appears on [npmjs.com](https://www.npmjs.com/package/ngx-tw)
2. Test installation: `npm install ngx-tw`
3. Update documentation with latest version
4. Announce release on relevant channels

## Security Notes

- Never commit NPM tokens to version control
- Use automation tokens for CI/CD
- Enable 2FA on your NPM account
- Regularly rotate access tokens
- Monitor package downloads and usage
