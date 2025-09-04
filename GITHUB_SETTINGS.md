# GitHub Repository Settings for Automated Publishing

This document explains the GitHub repository settings needed for the automated NPM publishing workflow to work correctly.

## Required Repository Settings

### 1. Actions Permissions

Go to your repository → **Settings** → **Actions** → **General**

**Workflow permissions:**

- ✅ Select "Read and write permissions"
- ✅ Check "Allow GitHub Actions to create and approve pull requests"

### 2. Branch Protection (Optional but Recommended)

Go to your repository → **Settings** → **Branches**

For the `main` branch:

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Include administrators (recommended)

### 3. NPM Token Secret

Go to your repository → **Settings** → **Secrets and variables** → **Actions**

**Repository secrets:**

- Name: `NPM_TOKEN`
- Value: Your NPM automation token (from npmjs.com)

## How to Get NPM Token

1. Go to [NPM Access Tokens](https://www.npmjs.com/settings/tokens)
2. Click "Generate New Token"
3. Select "Automation" (for CI/CD)
4. Copy the generated token
5. Add it as `NPM_TOKEN` in your GitHub repository secrets

## Workflow Permissions Explained

The workflow needs these permissions:

```yaml
permissions:
  contents: write # To create git tags
  packages: write # To publish packages (if using GitHub Packages)
  pull-requests: read # To read PR information
```

## Troubleshooting Common Issues

### Issue: "Permission denied to github-actions[bot]"

**Solutions:**

1. Check "Workflow permissions" are set to "Read and write permissions"
2. Ensure the repository allows Actions to create tags
3. Verify the `GITHUB_TOKEN` has proper scope

### Issue: "NPM publish failed"

**Solutions:**

1. Verify `NPM_TOKEN` is correctly set in repository secrets
2. Check if the package name is available on NPM
3. Ensure you have publish permissions for the package

### Issue: "Branch protection rule violations"

**Solutions:**

1. Temporarily disable branch protection for automated commits
2. Use a service account with bypass permissions
3. Configure status checks to pass before publishing

## Manual Publishing Fallback

If automated publishing fails, you can always publish manually:

```bash
# On Windows
.\release.bat

# On Linux/Mac
./release.sh
```

## Testing the Workflow

1. **Test Branch**: Create a test branch and make a small change
2. **Conventional Commit**: Use format like `feat: test automated publishing`
3. **Create PR**: Open a pull request to trigger CI
4. **Merge**: Merge to main to trigger publishing workflow
5. **Monitor**: Check GitHub Actions tab for workflow progress

## Repository Settings Checklist

- [ ] Actions permissions set to "Read and write permissions"
- [ ] "Allow GitHub Actions to create and approve pull requests" enabled
- [ ] NPM_TOKEN secret added with valid automation token
- [ ] Branch protection configured (optional)
- [ ] Repository is public or you have proper package permissions
- [ ] Package name is unique on NPM registry

## Security Best Practices

1. **Use Automation Tokens**: Never use personal access tokens for CI/CD
2. **Enable 2FA**: Enable two-factor authentication on your NPM account
3. **Rotate Tokens**: Regularly rotate your NPM tokens
4. **Monitor Usage**: Review package downloads and usage regularly
5. **Scope Permissions**: Use minimum required permissions for tokens

## Getting Help

If you're still having issues:

1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review the [NPM publishing guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
3. Check the workflow logs in the Actions tab for detailed error messages
4. Open an issue in this repository with the error details
