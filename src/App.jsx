import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showReservationPopup, setShowReservationPopup] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  const handleReservationSubmit = async (e) => {
    e.preventDefault()
    
    // Collect form data
    const formData = new FormData(e.target)
    const reservationData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
      occasion: formData.get('occasion'),
      requests: formData.get('requests'),
      submittedAt: new Date().toISOString()
    }

    console.log('Reservation Data:', reservationData)

    // Use EmailJS for Netlify deployment (works on static hosting)
    await sendEmailNotification(reservationData)

    // Store locally as backup
    storeReservationLocally(reservationData)

    alert(`Thank you ${reservationData.firstName}! Your reservation request for ${reservationData.guests} guests on ${reservationData.date} at ${reservationData.time} has been submitted. We will contact you at ${reservationData.email} or ${reservationData.phone} soon.`)
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
    </div>
  )
}

export default App
