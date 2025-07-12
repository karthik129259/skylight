import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

// Reservation Manager Component
function ReservationManager({ onConfirm, onReject }) {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = () => {
    const stored = JSON.parse(localStorage.getItem('reservations') || '[]')
    setReservations(stored)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f39c12'
      case 'confirmed': return '#27ae60'
      case 'rejected': return '#e74c3c'
      default: return '#95a5a6'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return '⏳'
      case 'confirmed': return '✅'
      case 'rejected': return '❌'
      default: return '❓'
    }
  }

  const handleConfirm = (id) => {
    onConfirm(id)
    setTimeout(loadReservations, 100) // Reload after state change
  }

  const handleReject = (id) => {
    onReject(id)
    setTimeout(loadReservations, 100) // Reload after state change
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <p>Total Reservations: <strong>{reservations.length}</strong></p>
        <p>
          Pending: <span style={{color: '#f39c12'}}>{reservations.filter(r => r.status === 'pending').length}</span> | 
          Confirmed: <span style={{color: '#27ae60'}}>{reservations.filter(r => r.status === 'confirmed').length}</span> | 
          Rejected: <span style={{color: '#e74c3c'}}>{reservations.filter(r => r.status === 'rejected').length}</span>
        </p>
      </div>

      <div style={{ maxHeight: '500px', overflow: 'auto' }}>
        {reservations.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No reservations yet.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#f9f9f9'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, color: '#2c3e50' }}>
                  {reservation.firstName} {reservation.lastName}
                </h4>
                <div style={{
                  padding: '5px 10px',
                  borderRadius: '15px',
                  backgroundColor: getStatusColor(reservation.status),
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {getStatusIcon(reservation.status)} {reservation.status.toUpperCase()}
                </div>
              </div>

              <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                <p><strong>📧 Email:</strong> {reservation.email}</p>
                <p><strong>📞 Phone:</strong> {reservation.phone}</p>
                <p><strong>📅 Date:</strong> {reservation.date}</p>
                <p><strong>🕒 Time:</strong> {reservation.time}</p>
                <p><strong>👥 Guests:</strong> {reservation.guests}</p>
                <p><strong>🎉 Occasion:</strong> {reservation.occasion || 'None'}</p>
                <p><strong>📝 Requests:</strong> {reservation.requests || 'None'}</p>
                <p><strong>⏰ Submitted:</strong> {new Date(reservation.submittedAt).toLocaleString()}</p>
              </div>

              {reservation.status === 'pending' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleConfirm(reservation.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#27ae60',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Confirm
                  </button>
                  <button
                    onClick={() => handleReject(reservation.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showReservationPopup, setShowReservationPopup] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Add keyboard shortcut for admin panel (Ctrl+Shift+A)
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault()
        setShowAdminPanel(!showAdminPanel)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showAdminPanel])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const openReservationPopup = () => {
    setShowReservationPopup(true)
    document.body.style.overflow = 'hidden'
  }

  const closeReservationPopup = () => {
    setShowReservationPopup(false)
    document.body.style.overflow = 'auto'
  }

  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel)
  }

  const handleReservationSubmit = async (e) => {
    e.preventDefault()
    
    // Collect form data
    const formData = new FormData(e.target)
    const reservationData = {
      id: Date.now().toString(),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
      occasion: formData.get('occasion'),
      requests: formData.get('requests'),
      submittedAt: new Date().toISOString(),
      status: 'pending' // Initial status is pending
    }

    console.log('Reservation Data:', reservationData)

    // Use EmailJS for Netlify deployment (works on static hosting)
    await sendEmailNotification(reservationData)

    // Store locally as backup
    storeReservationLocally(reservationData)

    alert(`Thank you ${reservationData.firstName}! Your reservation request for ${reservationData.guests} guests on ${reservationData.date} at ${reservationData.time} has been submitted and is PENDING confirmation. We will contact you at ${reservationData.email} or ${reservationData.phone} within 24 hours to confirm.`)
    closeReservationPopup()
  }

  // EmailJS Integration for Netlify (Free email service)
  const sendEmailNotification = async (data) => {
    try {
      // EmailJS configuration - You need to set these up at emailjs.com
      const serviceId = 'service_rm9kpgq'  // Your EmailJS service ID
      const templateId = 'template_x87ys11' // Your EmailJS template ID
      const publicKey = 'eYYR8ByzKKro9TUAl' // Your EmailJS public key
      
      const emailData = {
        to_email: 'karthik.idikuda129259@marwadiuniversity.ac.in',
        customer_name: `${data.firstName} ${data.lastName}`,
        customer_email: data.email,
        customer_phone: data.phone,
        reservation_date: data.date,
        reservation_time: data.time,
        number_of_guests: data.guests,
        special_occasion: data.occasion || 'None',
        special_requests: data.requests || 'None',
        submitted_at: new Date(data.submittedAt).toLocaleString()
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        emailData,
        publicKey
      )
      
      console.log('Email sent successfully!', response)
      return response
    } catch (error) {
      console.error('Email failed to send:', error)
      // Fallback: show instructions to call directly
      alert('Reservation saved locally! Please call us at 098989 22501 to confirm your booking.')
      throw error
    }
  }

  // Store reservations locally as backup
  const storeReservationLocally = (data) => {
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    existingReservations.push(data)
    localStorage.setItem('reservations', JSON.stringify(existingReservations))
    console.log('Reservation stored locally. Check localStorage for data.')
  }

  // Confirm reservation function
  const confirmReservation = async (reservationId) => {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    const reservationIndex = reservations.findIndex(r => r.id === reservationId)
    
    if (reservationIndex !== -1) {
      reservations[reservationIndex].status = 'confirmed'
      reservations[reservationIndex].confirmedAt = new Date().toISOString()
      localStorage.setItem('reservations', JSON.stringify(reservations))
      
      // Send confirmation email to customer
      await sendConfirmationEmail(reservations[reservationIndex], 'confirmed')
      alert('Reservation confirmed! Customer has been notified.')
    }
  }

  // Reject reservation function
  const rejectReservation = async (reservationId) => {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    const reservationIndex = reservations.findIndex(r => r.id === reservationId)
    
    if (reservationIndex !== -1) {
      reservations[reservationIndex].status = 'rejected'
      reservations[reservationIndex].rejectedAt = new Date().toISOString()
      localStorage.setItem('reservations', JSON.stringify(reservations))
      
      // Send rejection email to customer
      await sendConfirmationEmail(reservations[reservationIndex], 'rejected')
      alert('Reservation rejected. Customer has been notified.')
    }
  }

  // Send confirmation/rejection email to customer
  const sendConfirmationEmail = async (reservation, status) => {
    try {
      const serviceId = 'service_rm9kpgq'
      const templateId = 'template_x87ys11' // You'll need a second template for customer notifications
      const publicKey = 'eYYR8ByzKKro9TUAl'
      
      const emailData = {
        to_email: reservation.email, // Send to customer
        customer_name: `${reservation.firstName} ${reservation.lastName}`,
        reservation_status: status,
        reservation_date: reservation.date,
        reservation_time: reservation.time,
        number_of_guests: reservation.guests,
        restaurant_phone: '098989 22501',
        status_message: status === 'confirmed' 
          ? 'Your reservation has been CONFIRMED! We look forward to serving you.'
          : 'Unfortunately, we cannot accommodate your reservation at this time. Please call us to discuss alternative options.'
      }

      await emailjs.send(serviceId, templateId, emailData, publicKey)
      console.log(`${status} email sent to customer`)
    } catch (error) {
      console.error('Failed to send confirmation email:', error)
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isVisible ? 'navbar-visible' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Skylight Cafe</h2>
          </div>
          <div className="nav-menu">
            <button 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
              onClick={() => scrollToSection('services')}
            >
              Services
            </button>
            <button 
              className={`nav-link ${activeSection === 'location' ? 'active' : ''}`}
              onClick={() => scrollToSection('location')}
            >
              Location
            </button>
            <button 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`hero ${isVisible ? 'hero-visible' : ''}`}>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">Skylight Cafe</span>
            </h1>
            <p className="hero-subtitle">
              Experience exceptional dining with our all-you-can-eat buffet and happy hour specials in the heart of Gujarat
            </p>
            <div className="hero-status">
              <span className="status-indicator closed"></span>
              <span className="status-text">Currently Closed • Opens 5:00 PM</span>
            </div>
            <button 
              className="cta-button"
              onClick={openReservationPopup}
            >
              Make a Reservation
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                alt="All You Can Eat Buffet" 
                className="service-image"
              />
              <h3>All You Can Eat</h3>
              <p>Enjoy our extensive buffet featuring a variety of delicious dishes prepared with the finest ingredients.</p>
              <button className="reservation-button" onClick={openReservationPopup}>
                Reserve Now
              </button>
            </div>
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=964&q=80" 
                alt="Happy Hour Food" 
                className="service-image"
              />
              <h3>Happy Hour Food</h3>
              <p>Special prices on selected appetizers and beverages during our happy hour. Perfect for evening gatherings.</p>
              <button className="reservation-button" onClick={openReservationPopup}>
                Reserve Now
              </button>
            </div>
            <div className="service-card">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Restaurant Reservations" 
                className="service-image"
              />
              <h3>Reservations Required</h3>
              <p>To ensure the best dining experience, we recommend making reservations in advance. Call us to book your table.</p>
              <button className="reservation-button" onClick={openReservationPopup}>
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="location">
        <div className="container">
          <h2 className="section-title">Visit Us</h2>
          <div className="location-content">
            <div className="location-info">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <h3>Address</h3>
                  <p>Atlanta Rd, Kalavad Rd<br />
                     Opp. Drive in Cinema<br />
                     Near Govind Ashram, Vajdi<br />
                     Gujarat 360005</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⏰</div>
                <div className="info-text">
                  <h3>Hours</h3>
                  <p>Opens daily at 5:00 PM<br />
                     Currently Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <a href="tel:09898922501" className="contact-link">098989 22501</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🍽️</div>
                <div className="contact-details">
                  <h3>Reservations</h3>
                  <p>Call us to reserve your table<br />Reservations are required</p>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <h3>Ready to Dine?</h3>
              <p>Contact us now to make your reservation and experience the finest dining in Gujarat.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="tel:09898922501" className="phone-button">Call Now</a>
                <button className="phone-button" onClick={openReservationPopup}>
                  Book Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Skylight Cafe</h3>
              <p>Exceptional dining experience in the heart of Gujarat</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Phone: 098989 22501</p>
              <p>Reservations Required</p>
            </div>
            <div className="footer-section">
              <h4>Location</h4>
              <p>Atlanta Rd, Kalavad Rd<br />Vajdi, Gujarat 360005</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Skylight Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Reservation Popup */}
      <div className={`popup-overlay ${showReservationPopup ? 'active' : ''}`} onClick={closeReservationPopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={closeReservationPopup}>×</button>
          <h2 className="popup-title">Make a Reservation</h2>
          <form className="popup-form" onSubmit={handleReservationSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date</label>
                <input type="date" id="date" name="date" required />
              </div>
              <div className="form-group">
                <label htmlFor="time">Preferred Time</label>
                <select id="time" name="time" required>
                  <option value="">Select Time</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="guests">Number of Guests</label>
              <select id="guests" name="guests" required>
                <option value="">Select Guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
                <option value="7">7 Guests</option>
                <option value="8">8 Guests</option>
                <option value="more">More than 8</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="occasion">Special Occasion (Optional)</label>
              <select id="occasion" name="occasion">
                <option value="">None</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="business">Business Meeting</option>
                <option value="celebration">Celebration</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="requests">Special Requests (Optional)</label>
              <textarea 
                id="requests" 
                name="requests" 
                rows="3" 
                placeholder="Any dietary restrictions, seating preferences, or special requests..."
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Submit Reservation
            </button>
          </form>
        </div>
      </div>

      {/* Admin Panel for Managing Reservations */}
      <div className={`popup-overlay ${showAdminPanel ? 'active' : ''}`} onClick={toggleAdminPanel}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '900px', height: '80vh', overflow: 'auto'}}>
          <button className="popup-close" onClick={toggleAdminPanel}>×</button>
          <h2 className="popup-title">🍽️ Reservation Management</h2>
          <ReservationManager onConfirm={confirmReservation} onReject={rejectReservation} />
        </div>
      </div>

      {/* Admin Access Button (Hidden - Access via keyboard shortcut) */}
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          opacity: 0.1,
          cursor: 'pointer'
        }}
        onClick={toggleAdminPanel}
        title="Admin Panel (Ctrl+Shift+A)"
      >
        ⚙️
      </div>
    </div>
  )
}

export default App
