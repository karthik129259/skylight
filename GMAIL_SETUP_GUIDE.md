# 📧 Gmail Setup Guide for Skylight Cafe Reservations

## 🚀 Quick Setup Steps

### Step 1: Enable Gmail App Password

1. **Go to your Google Account settings**: https://myaccount.google.com/
2. **Click "Security"** in the left sidebar
3. **Enable 2-Factor Authentication** (required for app passwords)
4. **Search for "App passwords"** in the security section
5. **Generate a new app password**:
   - Select "Mail" as the app
   - Select "Other" for device and name it "Skylight Cafe Reservations"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 2: Update Server Configuration

1. **Open `server.js`**
2. **Find this section** (around line 16):
   ```javascript
   auth: {
     user: 'skylightcafe.gujarat@gmail.com', // Your restaurant email
     pass: 'your-gmail-app-password'        // Your Gmail app password
   }
   ```
3. **Replace with your actual details**:
   ```javascript
   auth: {
     user: 'your-actual-email@gmail.com',    // Your real Gmail address
     pass: 'abcd efgh ijkl mnop'             // The app password from Step 1
   }
   ```

### Step 3: Start the Server

1. **Open terminal in your project folder**
2. **Run the server**:
   ```bash
   node server.js
   ```
3. **You should see**: `Server running on port 3001`

### Step 4: Test the System

1. **Keep the server running** (don't close the terminal)
2. **Open your website** in another terminal:
   ```bash
   npm run dev
   ```
3. **Submit a test reservation** on your website
4. **Check your email** - you should receive the reservation notification!

---

## 📱 What Happens When Someone Makes a Reservation:

1. **Customer fills out the form** on your website
2. **Data is sent to your server** (localhost:3001)
3. **Server saves the data** to `reservations.json` file
4. **TWO emails are sent**:
   - 📧 **To YOU**: Notification with customer details
   - 📧 **To CUSTOMER**: Confirmation that request was received

---

## 🎯 Email Templates

### Restaurant Notification Email:
```
Subject: 🍽️ New Reservation Request - Skylight Cafe

New Reservation Request

Customer Details:
- Name: [Customer Name]
- Email: [Customer Email]  
- Phone: [Customer Phone]

Reservation Details:
- Date: [Date]
- Time: [Time]
- Guests: [Number]
- Occasion: [Special Occasion]
- Special Requests: [Any requests]

Please contact the customer to confirm the reservation.
```

### Customer Confirmation Email:
```
Subject: ✅ Reservation Request Received - Skylight Cafe

Thank you for your reservation request!

Dear [Customer Name],

We have received your reservation request with the following details:
- Date: [Date]
- Time: [Time]  
- Guests: [Number]
- Occasion: [Occasion]

We will contact you within 24 hours to confirm your reservation.

If you need immediate assistance, please call us at 098989 22501.

Best regards,
Skylight Cafe Team
```

---

## 🔧 Troubleshooting

### Email Not Working?
1. **Check Gmail app password** - make sure it's the 16-character code
2. **Verify 2FA is enabled** on your Google account
3. **Check server logs** - look for error messages in terminal

### Server Not Starting?
1. **Make sure you installed dependencies**: `npm install express cors nodemailer`
2. **Check if port 3001 is free** - close other applications using that port

### Reservations Not Saving?
1. **Check file permissions** - server needs write access to create `reservations.json`
2. **Look at server terminal** - it will show error messages

---

## 📊 Viewing Reservation Data

### Method 1: Admin Panel (Already Working)
- Click "Admin Panel" button on your website
- View, export, and manage all reservations

### Method 2: Server File
- Check `reservations.json` file in your project folder
- Contains all reservation data in JSON format

### Method 3: API Endpoint
- Visit `http://localhost:3001/api/reservations` in your browser
- Shows all reservations in JSON format

---

## 🚀 Ready to Go Live?

Once everything works locally, you can:

1. **Deploy to a hosting service** (Heroku, DigitalOcean, etc.)
2. **Update the API URL** in App.jsx from `localhost:3001` to your live server
3. **Set up a custom domain** for professional emails

---

## ✅ Current Status

- ✅ Server code ready
- ✅ Email templates configured  
- ✅ Frontend integration complete
- ✅ Admin panel functional
- ⏳ **Need to**: Set up Gmail app password and test

**Next step**: Follow Step 1-4 above to get emails working!
