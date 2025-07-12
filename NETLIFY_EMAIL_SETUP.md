# EmailJS Setup for Netlify - Skylight Cafe

## 🚨 Why Emails Don't Work on Netlify

**Netlify only hosts static websites** - it can't run Node.js servers like Vercel. That's why you get "unable to connect" errors when trying to use the `/api/reservations` endpoint.

## ✅ Solution: EmailJS (Perfect for Netlify)

EmailJS sends emails directly from the browser - no backend needed!

## 🔧 Setup Steps

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up for FREE account
3. Verify your email

### Step 2: Create Email Service
1. In EmailJS dashboard → **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** 
4. Service ID: `service_skylight`
5. Connect your Gmail: `karthik.idikuda129259@marwadiuniversity.ac.in`
6. Save service

### Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Template ID: `template_skylight`
4. Email template:

```html
Subject: 🍽️ New Reservation - Skylight Cafe

Dear Skylight Cafe,

You have a new reservation request:

Customer: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}
Date: {{reservation_date}}
Time: {{reservation_time}}
Guests: {{number_of_guests}}
Occasion: {{special_occasion}}
Special Requests: {{special_requests}}

Submitted: {{submitted_at}}

Please contact the customer to confirm.

Best regards,
Skylight Cafe Reservation System
```

5. **To Email**: `karthik.idikuda129259@marwadiuniversity.ac.in`
6. Save template

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. Copy your **Public Key**
3. It looks like: `abc123xyz789`

### Step 5: Update Your Code
Replace these in your App.jsx:

```javascript
const serviceId = 'service_skylight'  // Your actual service ID
const templateId = 'template_skylight' // Your actual template ID  
const publicKey = 'YOUR_ACTUAL_PUBLIC_KEY' // Your actual public key
```

### Step 6: Test & Deploy
1. Save your changes
2. Build: `npm run build`
3. Deploy to Netlify
4. Test the reservation form

## 📧 How It Works

1. Customer fills reservation form
2. EmailJS sends email directly from browser
3. You receive email at: `karthik.idikuda129259@marwadiuniversity.ac.in`
4. Reservation also saved in browser localStorage as backup

## 🎯 Free Tier Limits

- ✅ **200 emails/month** FREE
- ✅ **No credit card** required
- ✅ **Unlimited templates**
- ✅ **Works on all static hosts** (Netlify, Vercel, GitHub Pages)

## 🔒 Security

- ✅ **No sensitive data exposed** (only public key in frontend)
- ✅ **CAPTCHA protection** available
- ✅ **Rate limiting** built-in

## 🚀 Alternative: Contact Form Fallback

If you don't want to set up EmailJS right now, the form will:
1. Save reservation data locally
2. Show message: "Please call 098989 22501 to confirm"
3. You can check reservations in browser storage

## 💡 Pro Tips

1. **Custom Domain**: Set up email forwarding if needed
2. **Auto-Reply**: Create customer confirmation template
3. **Analytics**: Track email delivery rates
4. **Backup**: Export reservations from localStorage regularly

Ready to receive reservation emails on Netlify! 🚀

## Quick Start Commands

```bash
# Build for Netlify
npm run build

# Upload dist/ folder to Netlify
# Or connect your GitHub repo for auto-deploy
```
