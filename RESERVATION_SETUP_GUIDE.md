# Skylight Cafe Reservation System Setup Guide

## 📧 How to Receive Customer Reservation Data

You now have **4 different options** to receive customer reservation data:

---

## 🚀 Option 1: EmailJS (Recommended - Easiest Setup)

**Steps to set up EmailJS (Free):**

1. **Sign up at [EmailJS.com](https://www.emailjs.com/)**
2. **Create a service:**
   - Go to Email Services
   - Click "Add New Service"
   - Choose Gmail (or your email provider)
   - Connect your email account

3. **Create an email template:**
   - Go to Email Templates
   - Click "Create New Template"
   - Use this template:

```
Subject: New Reservation - Skylight Cafe

Dear Restaurant Manager,

You have received a new reservation request:

Customer Information:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}

Reservation Details:
- Date: {{reservation_date}}
- Time: {{reservation_time}}
- Number of Guests: {{number_of_guests}}
- Special Occasion: {{special_occasion}}
- Special Requests: {{special_requests}}

Submitted: {{submitted_at}}

Please contact the customer to confirm.

Best regards,
Skylight Cafe Reservation System
```

4. **Get your credentials:**
   - Service ID (from Email Services)
   - Template ID (from Email Templates) 
   - User ID (from Account settings)

5. **Update App.jsx:**
   - Install EmailJS: `npm install emailjs-com`
   - Uncomment the EmailJS code in `sendEmailNotification()`
   - Replace with your actual IDs

---

## 💻 Option 2: Local Storage + Admin Panel (Currently Active)

**What happens now:**
- Customer submits reservation → Data saved locally in browser
- Click "Admin Panel" button (bottom right) to view all reservations
- Export to CSV for record keeping
- Click "Email" button to send confirmation emails

**Features:**
- ✅ View all reservations in a table
- ✅ Export data to CSV
- ✅ Send emails directly from admin panel
- ✅ Clear all data when needed

---

## 🌐 Option 3: PHP Backend (For Web Servers)

**If you have a web server with PHP:**

1. Upload `reservation-handler.php` to your server
2. Update the email address in the PHP file
3. Update the API endpoint in App.jsx:
   ```javascript
   const response = await fetch('https://yoursite.com/reservation-handler.php', {
   ```

**What it does:**
- Receives reservation data via POST request
- Sends email to your restaurant email
- Saves data to a text file on server

---

## ⚡ Option 4: Node.js Server (Advanced)

**For developers with Node.js knowledge:**

1. Use the provided `server.js` file
2. Install dependencies: `npm install express cors nodemailer`
3. Set up Gmail app password
4. Update email credentials in server.js
5. Run: `node server.js`

**Features:**
- Professional email notifications
- Customer confirmation emails
- JSON data storage
- REST API endpoints

---

## 📱 Current Setup Status

**✅ Active Right Now:**
- Local storage system
- Admin panel to view reservations
- CSV export functionality
- Direct email integration

**🔧 To Activate EmailJS:**
1. Run: `npm install emailjs-com`
2. Sign up at EmailJS.com
3. Get your service/template/user IDs
4. Uncomment the EmailJS code in App.jsx
5. Replace placeholder IDs with real ones

---

## 📊 Accessing Reservation Data

**Current Method (Local Storage):**
1. Look for "Admin Panel" button (bottom right of page)
2. Click to view all reservations
3. Use "Export CSV" to download data
4. Use "Email" button to send confirmations

**Data Location:** Browser's localStorage (check browser dev tools → Application → Local Storage)

---

## 🎯 Recommended Setup for Restaurant

**For immediate use:** Use the current local storage system + admin panel

**For production:** Set up EmailJS (takes 10 minutes, completely free)

**For advanced users:** Use the Node.js server with automatic email notifications

---

## 📞 Customer Experience

When customers submit a reservation, they see:
> "Thank you [Name]! Your reservation request for [X] guests on [Date] at [Time] has been submitted. We will contact you at [Email] or [Phone] soon."

The system collects:
- ✅ Full name
- ✅ Email address  
- ✅ Phone number
- ✅ Preferred date/time
- ✅ Number of guests
- ✅ Special occasion
- ✅ Special requests
- ✅ Submission timestamp

---

## 🔧 Need Help?

1. **Check the Admin Panel** - Click the button to see if data is being stored
2. **Check Browser Console** - Look for any error messages
3. **Test the form** - Submit a test reservation to see the flow

The system is working and storing data locally. Choose your preferred method above to start receiving the data via email!
