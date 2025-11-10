# GitHub Actions Deployment Setup Guide

This project supports automated deployment to multiple domains/servers using GitHub Actions.

## 🚀 Available Deployment Options

### Primary Deployment (tfcnew.tfcmockup.com)
**File**: `.github/workflows/deploy.yml`
- Triggers: Push to `main` or `pranav` branches
- Deploys to: Your primary FTP server
- Secrets needed: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`

### Secondary Domain Deployment
**File**: `.github/workflows/deploy-secondary.yml`
- Triggers: Push to `production` or `release` branches, or manual trigger
- Deploys to: Your secondary domain
- Secrets needed: `FTP_SERVER_SECONDARY`, `FTP_USERNAME_SECONDARY`, `FTP_PASSWORD_SECONDARY`

### Environment-Based Deployment
**File**: `.github/workflows/deploy-production.yml`
- Triggers: Manual trigger only (workflow_dispatch)
- Supports: production, staging, development environments
- Secrets needed: Environment-specific secrets

## 🔧 How to Deploy to Multiple Domains

### Approach 1: Branch-Based Deployment (Recommended)

1. **Primary domain (tfcnew.tfcmockup.com)**:
   - Push to `main` or `pranav` branch
   - Uses existing `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` secrets
   
2. **Secondary domain**:
   - Push to `production` or `release` branch
   - Add these secrets to your GitHub repo:
     ```
     FTP_SERVER_SECONDARY: your-second-domain-server.com
     FTP_USERNAME_SECONDARY: your-username
     FTP_PASSWORD_SECONDARY: your-password
     ```

### Approach 2: Manual Environment Selection

1. Go to: `Actions` tab in GitHub
2. Select: "Deploy to Production Domain"
3. Click: "Run workflow"
4. Choose environment: production/staging/development
5. Each environment uses its own set of secrets

### Approach 3: Multiple Workflow Files

Create separate workflow files for each domain:
- `deploy-domain1.yml`
- `deploy-domain2.yml`
- `deploy-domain3.yml`

Each with its own triggers and secrets.

## 📝 Setting Up Secrets for Multiple Domains

### For Primary Domain (Already Set):
```
FTP_SERVER: 147.93.92.53
FTP_USERNAME: u706445394.tfcnew
FTP_PASSWORD: (your password)
```

### For Secondary Domain:
Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Add these secrets:
```
Name: FTP_SERVER_SECONDARY
Value: your-second-server-ip-or-domain

Name: FTP_USERNAME_SECONDARY
Value: your-second-username

Name: FTP_PASSWORD_SECONDARY
Value: your-second-password

Name: SERVER_DIR (optional)
Value: ./public_html/ or your custom directory
```

### For Environment-Based Deployment:
1. Go to: `Settings` → `Environments`
2. Create environments: `production`, `staging`, `development`
3. For each environment, add:
   ```
   FTP_SERVER
   FTP_USERNAME
   FTP_PASSWORD
   SERVER_DIR (optional)
   ```

## 🎯 Deployment Workflows

### Example 1: Deploy to Primary Domain
```bash
git checkout main
git add .
git commit -m "Update features"
git push origin main
# Automatically deploys to tfcnew.tfcmockup.com
```

### Example 2: Deploy to Secondary Domain
```bash
git checkout production
git merge main
git push origin production
# Automatically deploys to your secondary domain
```

### Example 3: Manual Deployment
1. Go to GitHub → Actions
2. Select "Deploy to Production Domain"
3. Click "Run workflow"
4. Select environment
5. Click "Run workflow" button

## 🔍 Monitoring Deployments

- View status: `https://github.com/pranavthefacecraft/redesigntfc-v2/actions`
- Check logs: Click on any workflow run
- Get notifications: Configure in Settings → Notifications

## � Quick Reference

| Deployment Type | Branch | Workflow File | Domain |
|----------------|--------|---------------|---------|
| Primary | `main`, `pranav` | `deploy.yml` | tfcnew.tfcmockup.com |
| Secondary | `production`, `release` | `deploy-secondary.yml` | Your choice |
| Environment | Manual | `deploy-production.yml` | Based on env |

## 🚨 Troubleshooting

### Issue: FTP temporary files error
**Solution**: The workflow includes cleanup steps. If it persists, manually delete `.in.*` files from your server.

### Issue: Deployment to wrong domain
**Solution**: Check which branch you're pushing to and verify the corresponding secrets are set correctly.

### Issue: Build fails
**Solution**: Test locally with `npm run build` first, check error logs in GitHub Actions.

---

**Need Help?** Check the workflow logs in the Actions tab for detailed information.