# Vercel Environment Setup Guide

## Overview
This guide explains how to set up Vercel to work with our Git workflow.

## Environment Structure

1. **Production**: Deployed from `main` branch
   - URL: https://pickleball-match.com (or your custom domain)
   - Environment: Production
   - Purpose: Live site for users

2. **Staging**: Deployed from `develop` branch
   - URL: https://develop-pickleball-match.vercel.app
   - Environment: Preview
   - Purpose: Testing before production

3. **Feature Previews**: Deployed from feature branches (optional)
   - URL: https://feature-project-setup-pickleball-match.vercel.app
   - Environment: Preview
   - Purpose: Testing individual features

## Setting Up Vercel

### 1. Connect GitHub Repository
1. Go to vercel.com and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the `PickleballMatch-com/pickballmatch.com` repo

### 2. Configure Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3. Configure Environment Variables
Add your environment variables for each environment:
- `DATABASE_URL`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- etc.

### 4. Configure Branch Deployments
In Vercel Project Settings → Git:

1. **Production Branch**: Set to `main`
2. **Preview Branches**: Enable for `develop` and optionally feature branches
3. **Automatic Deployments**: Enable for all branches

## Testing Workflow

### Local Development
```bash
npm run dev
# Test at http://localhost:3000
```

### After Push to Feature Branch
1. Create PR to `develop`
2. Vercel creates preview URL for the PR
3. Test at preview URL

### After Merge to Develop
1. Vercel automatically deploys to staging
2. Test at staging URL (develop-*.vercel.app)
3. If everything works, create PR to `main`

### After Merge to Main
1. Vercel automatically deploys to production
2. Live at production URL

## Environment Variables per Branch

You can set different environment variables for each environment in Vercel:

1. Go to Project Settings → Environment Variables
2. Add variables and select which environments they apply to:
   - Development (local)
   - Preview (feature branches and develop)
   - Production (main branch)

## Example Workflow

1. **Develop locally**: `npm run dev` at localhost:3000
2. **Push to feature branch**: `git push origin feature/my-feature`
3. **Create PR**: GitHub → Create PR to develop
4. **Test preview**: Vercel creates preview URL for PR
5. **Merge to develop**: After approval
6. **Test staging**: Automatic deploy to staging environment
7. **Create PR to main**: When ready for production
8. **Deploy to production**: Automatic after merge to main

## Benefits of This Workflow

1. **Safety**: Changes are tested multiple times before production
2. **Collaboration**: Team can review features in preview URLs
3. **Rollback**: Easy to revert if issues arise
4. **Environments**: Separate staging and production environments