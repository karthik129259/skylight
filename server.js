// server.js - Node.js Express server for handling reservations
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Email configuration (using Gmail SMTP)
// IMPORTANT: Replace these with your actual email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'karthik.idikuda129259@marwadiuniversity.ac.in', // Your restaurant email
    pass: 'xcup roza ixqp biru'        // Your Gmail app password (NOT regular password)
  }
})

// Reservation endpoint
app.post('/api/reservations', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      guests,
      occasion,
      requests
    } = req.body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({
        error: 'Missing required fields'
      })
    }

    const reservation = {
      ...req.body,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString()
    }

    // Save to file
    const reservationsFile = path.join(__dirname, 'reservations.json')
    let reservations = []
    
    if (fs.existsSync(reservationsFile)) {
      const data = fs.readFileSync(reservationsFile, 'utf8')
      reservations = JSON.parse(data)
    }
    
    reservations.push(reservation)
    fs.writeFileSync(reservationsFile, JSON.stringify(reservations, null, 2))

    // Send email to restaurant
    const restaurantEmailOptions = {
      from: 'karthik.idikuda129259@marwadiuniversity.ac.in',
      to: 'karthik.idikuda129259@marwadiuniversity.ac.in', // Your restaurant email
      subject: '🍽️ New Reservation Request - Skylight Cafe',
      html: `
        <h2>New Reservation Request</h2>
        
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        
        <h3>Reservation Details:</h3>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Guests:</strong> ${guests}</li>
          <li><strong>Occasion:</strong> ${occasion || 'None'}</li>
          <li><strong>Special Requests:</strong> ${requests || 'None'}</li>
        </ul>
        
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        
        <p>Please contact the customer to confirm the reservation.</p>
      `
    }

    // Send confirmation email to customer
    const customerEmailOptions = {
      from: 'karthik.idikuda129259@marwadiuniversity.ac.in',
      to: email,
      subject: '✅ Reservation Request Received - Skylight Cafe',
      html: `
        <h2>Thank you for your reservation request!</h2>
        
        <p>Dear ${firstName},</p>
        
        <p>We have received your reservation request with the following details:</p>
        
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Guests:</strong> ${guests}</li>
          <li><strong>Occasion:</strong> ${occasion || 'None'}</li>
        </ul>
        
        <p>We will contact you within 24 hours to confirm your reservation.</p>
        
        <p>If you need immediate assistance, please call us at <strong>098989 22501</strong>.</p>
        
        <p>Best regards,<br>
        Skylight Cafe Team</p>
      `
    }

    // Send both emails
    await transporter.sendMail(restaurantEmailOptions)
    await transporter.sendMail(customerEmailOptions)

    res.json({
      success: true,
      message: 'Reservation request received successfully',
      reservationId: reservation.id
    })

  } catch (error) {
    console.error('Error processing reservation:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Get all reservations (for admin)
app.get('/api/reservations', (req, res) => {
  try {
    const reservationsFile = path.join(__dirname, 'reservations.json')
    
    if (fs.existsSync(reservationsFile)) {
      const data = fs.readFileSync(reservationsFile, 'utf8')
      const reservations = JSON.parse(data)
      res.json(reservations.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)))
    } else {
      res.json([])
    }
  } catch (error) {
    console.error('Error fetching reservations:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// To set up this server:
// 1. npm init -y
// 2. npm install express cors nodemailer
// 3. Set up Gmail app password
// 4. Update email credentials above
// 5. node server.js
