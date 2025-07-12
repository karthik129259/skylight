# Vercel Deployment Guide for Skylight Cafe

## 🚀 Quick Deployment Steps

### 1. Prepare Your Project

Your project is already configured with:
- ✅ Gmail credentials: `karthik.idikuda129259@marwadiuniversity.ac.in`
- ✅ App password: `xcup roza ixqp biru`
- ✅ Node.js backend with email functionality
- ✅ Vercel configuration file

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (run from your project root)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (choose your account)
# - Link to existing project? N  
# - Project name: skylight-cafe
# - In which directory is your code located? ./
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Configure Environment Variables (Important!)

After deployment, add these environment variables in Vercel Dashboard:

1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
GMAIL_USER=karthik.idikuda129259@marwadiuniversity.ac.in
GMAIL_PASS=xcup roza ixqp biru
NODE_ENV=production
```

### 4. Update Server for Production

The server.js is already configured to use your Gmail credentials, but for security, you should use environment variables:

```javascript
// In server.js (for production security)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'karthik.idikuda129259@marwadiuniversity.ac.in',
    pass: process.env.GMAIL_PASS || 'xcup roza ixqp biru'
  }
})
```

### 5. Test Your Deployment

After deployment:
1. Visit your Vercel URL
2. Test the reservation form
3. Check your email (`karthik.idikuda129259@marwadiuniversity.ac.in`) for notifications
4. Verify both customer and restaurant emails are received

## 📁 Project Structure for Vercel

```
skylight-landing-page/
├── src/
│   ├── App.jsx          # React frontend
│   └── ReservationAdmin.jsx
├── dist/                # Built frontend (auto-generated)
├── server.js            # Node.js backend
├── vercel.json          # Vercel configuration
├── package.json
└── reservations.json    # Data storage (auto-created)
```

## 🔧 Vercel Configuration Explained

Your `vercel.json` configures:
- Node.js serverless function for `/api/*` routes
- Static file serving for the React frontend
- Automatic routing between frontend and backend

## 🎯 Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] Reservation form submits successfully
- [ ] Restaurant email notifications received
- [ ] Customer confirmation emails sent
- [ ] Mobile responsiveness works
- [ ] All images load properly

## 🚨 Important Notes

1. **Email Security**: Your Gmail app password is configured
2. **Free Tier**: Vercel offers generous free tier for hobby projects
3. **Domain**: You'll get a free `.vercel.app` domain
4. **SSL**: HTTPS is automatically enabled
5. **Auto-Deploy**: Pushes to main branch auto-deploy

## 🔗 Useful Commands

```bash
# Build locally
npm run build

# Preview build locally
npm run preview

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs
```

Your Skylight Cafe website will be live at: `https://your-project-name.vercel.app`

## 💡 Pro Tips

1. **Custom Domain**: Add your own domain in Vercel dashboard
2. **Analytics**: Enable Vercel Analytics for visitor insights  
3. **Monitoring**: Check function logs for email delivery status
4. **Backup**: Reservation data is stored in `reservations.json`

## 📧 Email Testing

Test emails by making a reservation - you should receive:
- Restaurant notification at: `karthik.idikuda129259@marwadiuniversity.ac.in`
- Customer confirmation at the email address used in the form

Ready to deploy! 🚀
