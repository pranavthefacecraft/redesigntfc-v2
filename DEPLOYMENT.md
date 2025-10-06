# GitHub Actions Deployment Setup Guide

This project now has automated deployment configured with GitHub Actions. Choose the deployment method that best suits your hosting setup.

## 🚀 Available Deployment Options

### Option 1: FTP Deployment (Recommended for cPanel/Shared Hosting)
**File**: `.github/workflows/deploy.yml`
- Best for: cPanel, shared hosting, traditional web hosts
- Deploys to: Your FTP server
- Triggers: Push to `main` or `pranav` branches

### Option 2: GitHub Pages Deployment
**File**: `.github/workflows/github-pages.yml`
- Best for: Free hosting on GitHub Pages
- Deploys to: `https://username.github.io/repository-name`
- Triggers: Push to `main` branch

### Option 3: SSH Deployment (Most Secure)
**File**: `.github/workflows/deploy-ssh.yml`
- Best for: VPS, dedicated servers with SSH access
- Deploys to: Your server via SSH
- Triggers: Push to `main` or `pranav` branches

## 🔧 Setup Instructions

### For FTP Deployment (Option 1)

1. **Add GitHub Secrets** (Go to your repo → Settings → Secrets and variables → Actions):
   ```
   FTP_SERVER: your-ftp-server.com
   FTP_USERNAME: your-ftp-username
   FTP_PASSWORD: your-ftp-password
   ```

2. **Modify the workflow** if needed:
   - Change `server-dir: ./public_html/` to your server's web directory
   - Update branch names in the `on.push.branches` section

### For GitHub Pages (Option 2)

1. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: "GitHub Actions"

2. **Update Vite config** for GitHub Pages:
   ```javascript
   // vite.config.js
   export default defineConfig({
     base: '/your-repo-name/', // Important for GitHub Pages
     // ... rest of config
   })
   ```

### For SSH Deployment (Option 3)

1. **Add GitHub Secrets**:
   ```
   SSH_HOST: your-server-ip-or-domain.com
   SSH_USERNAME: your-ssh-username
   SSH_PRIVATE_KEY: your-private-key-content
   SSH_PORT: 22 (optional, defaults to 22)
   ```

2. **Update the deployment path**:
   - Change `/path/to/your/website` to your actual web directory
   - Update `/path/to/backup/` to your preferred backup location

## 🎯 Current Configuration

Your project is set up with:
- ✅ React + Vite build process
- ✅ Automatic .htaccess generation for SPA routing
- ✅ Node.js 18 runtime
- ✅ NPM caching for faster builds
- ✅ Support for both `main` and `pranav` branches

## 🔄 How It Works

1. **Trigger**: Push code to specified branches
2. **Build**: 
   - Install dependencies with `npm ci`
   - Build project with `npm run build`
   - Create `.htaccess` file automatically
3. **Deploy**: Upload files to your chosen destination
4. **Complete**: Your site is live with the latest changes!

## 🛠️ Customization

### Change Deployment Branches
Edit the workflow file:
```yaml
on:
  push:
    branches: [ main, your-branch-name ]
```

### Add Environment Variables
Add secrets in GitHub repo settings and reference them:
```yaml
env:
  VITE_API_URL: ${{ secrets.API_URL }}
```

### Deploy to Subdirectory
Update the `server-dir` in FTP deployment:
```yaml
server-dir: ./public_html/subdirectory/
```

## 🔍 Monitoring Deployments

- View deployment status: Go to your repo → Actions tab
- See deployment logs: Click on any workflow run
- Get deployment URLs: Check the workflow output

## 🚨 Troubleshooting

### Common Issues:
1. **Build Fails**: Check Node.js version compatibility
2. **FTP Fails**: Verify FTP credentials and server path
3. **SSH Fails**: Ensure SSH key is properly formatted
4. **404 Errors**: Check if .htaccess is being deployed correctly

### Getting Help:
- Check the Actions tab for detailed error logs
- Verify all secrets are properly configured
- Ensure your hosting supports the chosen deployment method

---

**Next Steps**: 
1. Choose your preferred deployment method
2. Configure the required secrets
3. Push your code to trigger the first deployment!