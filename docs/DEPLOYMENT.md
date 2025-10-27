# GitHub Pages Deployment

This guide explains how the documentation site is deployed to GitHub Pages.

## Configuration

The deployment is configured via GitHub Actions workflow located at `.github/workflows/github-pages.yml`.

## Setup Steps

### 1. GitHub Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** as the source
4. The workflow will automatically deploy when changes are pushed to the `master` branch

### 2. Custom Domain Configuration

The site is configured to work with the custom domain: `react-custom-syntax.trugraph.io`

To set up the custom domain:

1. In repository settings → **Pages**, enter your custom domain: `react-custom-syntax.trugraph.io`
2. Update your DNS provider to add a CNAME record pointing to your GitHub Pages domain
3. Wait for DNS propagation (can take up to 48 hours)

## How It Works

1. **Trigger**: The workflow runs automatically when:
   - Changes are pushed to the `master` branch that affect the `docs/` directory
   - Or when manually triggered from the Actions tab

2. **Build Process**:
   - Installs root dependencies
   - Builds the main library
   - Installs docs dependencies
   - Builds the docs site

3. **Deployment**:
   - Uploads the built docs from `docs/dist` to GitHub Pages
   - Deploys to the configured custom domain

## Manual Deployment

To manually trigger a deployment:

1. Go to the **Actions** tab in your GitHub repository
2. Select **Deploy Docs to GitHub Pages**
3. Click **Run workflow** button
4. Select the branch (usually `master`)
5. Click **Run workflow**

## Local Testing

Before pushing, test the build locally:

```bash
# From the repository root
cd docs

# Install dependencies
npm install

# Build
npm run build

# Preview the production build
npm run preview
```

The preview will be available at `http://localhost:4173`

## Troubleshooting

### Build fails with module not found

Make sure you've built the main library first:
```bash
# From repository root
npm run build
```

### Assets not loading correctly

Check that the `base` in `docs/vite.config.ts` is set correctly (`'/'` for custom domain).

### DNS issues

If the custom domain isn't working:
1. Verify DNS records are properly configured
2. Check GitHub Pages settings show the custom domain
3. Ensure SSL certificate is enabled (usually automatic)
