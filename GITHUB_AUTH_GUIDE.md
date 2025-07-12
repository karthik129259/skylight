# GitHub Authentication Setup

## 🔐 Authentication Failed Fix

You got the error: `Authentication failed for 'https://github.com/karthik129259/skylight.git/'`

Here are the solutions:

## Option 1: Personal Access Token (Recommended)

### Step 1: Create Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Skylight Cafe Deployment"
4. Select scopes: `repo` (full repository access)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Use Token for Authentication
```bash
# Remove the current remote
git remote remove origin

# Add remote with token
git remote add origin https://YOUR_TOKEN@github.com/karthik129259/skylight.git

# Push with token
git push -u origin main
```

Replace `YOUR_TOKEN` with the token you copied.

## Option 2: GitHub CLI (Easiest)

```bash
# Install GitHub CLI (if not installed)
# macOS: brew install gh
# Or download from: https://cli.github.com/

# Authenticate
gh auth login

# Push using GitHub CLI
gh repo create skylight --public --push --source=.
```

## Option 3: SSH Key Setup

### Step 1: Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "karthik.idikuda129259@marwadiuniversity.ac.in"
```

### Step 2: Add to SSH Agent
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Step 3: Add to GitHub
```bash
# Copy public key
cat ~/.ssh/id_ed25519.pub
```
1. Go to GitHub → Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste the public key

### Step 4: Change Remote to SSH
```bash
git remote remove origin
git remote add origin git@github.com:karthik129259/skylight.git
git push -u origin main
```

## Quick Fix Command

Try this first (you'll be prompted for username/password):
```bash
git push -u origin main
```

- **Username**: `karthik129259`
- **Password**: Use your GitHub personal access token (not your account password)

## After Successful Push

Once pushed, you can:
1. Deploy directly from GitHub to Vercel
2. Set up automatic deployments
3. Collaborate with others

Choose the option that works best for you! 🚀
