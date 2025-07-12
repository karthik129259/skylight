# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Skylight Cafe - Professional Landing Page

A modern, responsive React landing page for Skylight Cafe with integrated reservation system and email notifications.

## 🏪 About Skylight Cafe

**Location**: Atlanta Rd, Kalavad Rd, opp. Drive in Cinema, near Govind Ashram, Vajdi, Gujarat 360005  
**Phone**: 098989 22501  
**Services**: All-you-can-eat buffet, Happy hour specials, Reservations required  
**Hours**: Opens daily at 5:00 PM

## ✨ Features

- 🎨 **Professional Design**: Clean, elegant cafe-themed interface
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- 🍽️ **Reservation System**: Complete booking form with email notifications
- 📧 **Email Integration**: Automated emails to both restaurant and customers
- 🔧 **Admin Panel**: View and manage reservations
- 🌐 **Multiple Deployment Options**: Ready for Vercel, Netlify, or any hosting platform

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Email Service**: Gmail SMTP with Nodemailer
- **Styling**: CSS with Google Fonts
- **Images**: Unsplash integration
- **Deployment**: Vercel-ready configuration

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend server (in another terminal)
node server.js
```

### Deployment

See `VERCEL_DEPLOYMENT.md` for complete deployment instructions.

## 📁 Project Structure

```
skylight/
├── src/
│   ├── App.jsx              # Main React component
│   ├── ReservationAdmin.jsx # Admin panel
│   └── ...
├── server.js                # Node.js backend
├── vercel.json             # Vercel configuration
├── VERCEL_DEPLOYMENT.md    # Deployment guide
└── README.md               # This file
```

## 🎯 Live Demo

Once deployed, the website will include:
- Hero section with cafe branding
- Services showcase with images
- Location and contact information
- Interactive reservation form
- Email confirmation system

## 📧 Email System

- **Restaurant notifications**: New reservation alerts
- **Customer confirmations**: Booking confirmations
- **Gmail integration**: Uses Gmail SMTP for reliable delivery

## 🔒 Security

- Environment variables for sensitive data
- Gmail app passwords for secure authentication
- CORS configuration for API security

## 👨‍💻 Developer

Created with ❤️ for Skylight Cafe by Karthik

---

Ready for deployment to Vercel! 🚀
