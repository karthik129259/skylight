import { useState, useEffect } from 'react'

const ReservationAdmin = () => {
  const [reservations, setReservations] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = () => {
    const stored = JSON.parse(localStorage.getItem('reservations') || '[]')
    setReservations(stored.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)))
  }

  const clearReservations = () => {
    if (confirm('Are you sure you want to clear all reservations?')) {
      localStorage.removeItem('reservations')
      setReservations([])
    }
  }

  const exportToCSV = () => {
    if (reservations.length === 0) return
    
    const headers = ['Name', 'Email', 'Phone', 'Date', 'Time', 'Guests', 'Occasion', 'Requests', 'Submitted']
    const csvContent = [
      headers.join(','),
      ...reservations.map(r => [
        `"${r.firstName} ${r.lastName}"`,
        r.email,
        r.phone,
        r.date,
        r.time,
        r.guests,
        r.occasion || '',
        `"${r.requests || ''}"`,
        new Date(r.submittedAt).toLocaleString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reservations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const sendEmail = (reservation) => {
    const subject = `Reservation Confirmation - ${reservation.firstName} ${reservation.lastName}`
    const body = `
Dear ${reservation.firstName},

Thank you for your reservation request at Skylight Cafe!

Reservation Details:
- Name: ${reservation.firstName} ${reservation.lastName}
- Email: ${reservation.email}
- Phone: ${reservation.phone}
- Date: ${reservation.date}
- Time: ${reservation.time}
- Number of Guests: ${reservation.guests}
- Special Occasion: ${reservation.occasion || 'None'}
- Special Requests: ${reservation.requests || 'None'}

We will contact you soon to confirm your reservation.

Best regards,
Skylight Cafe Team
Phone: 098989 22501
    `.trim()

    window.open(`mailto:${reservation.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#8b4513',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '25px',
          cursor: 'pointer',
          zIndex: 1000,
          fontFamily: 'Playfair Display, serif'
        }}
      >
        Admin Panel ({reservations.length})
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      zIndex: 2000,
      padding: '20px',
      overflow: 'auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#2c1810' }}>
            Reservation Admin Panel ({reservations.length} reservations)
          </h2>
          <button onClick={() => setIsVisible(false)} style={{
            background: 'none',
            border: '1px solid #ccc',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Close
          </button>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={loadReservations} style={{
            background: '#8b4513',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Refresh
          </button>
          <button onClick={exportToCSV} style={{
            background: '#d4af37',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Export CSV
          </button>
          <button onClick={clearReservations} style={{
            background: '#d32f2f',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Clear All
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Contact</th>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Date & Time</th>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Guests</th>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Occasion</th>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Requests</th>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Submitted</th>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    No reservations yet
                  </td>
                </tr>
              ) : (
                reservations.map((res, index) => (
                  <tr key={index} style={{ 
                    background: index % 2 === 0 ? '#fafafa' : 'white',
                    borderBottom: '1px solid #eee'
                  }}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <strong>{res.firstName} {res.lastName}</strong>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <div>{res.email}</div>
                      <div style={{ color: '#666', fontSize: '12px' }}>{res.phone}</div>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <div><strong>{res.date}</strong></div>
                      <div style={{ color: '#666' }}>{res.time}</div>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{res.guests}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{res.occasion || '-'}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', maxWidth: '150px' }}>
                      <div style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        fontSize: '12px'
                      }}>
                        {res.requests || '-'}
                      </div>
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', fontSize: '12px' }}>
                      {new Date(res.submittedAt).toLocaleString()}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      <button 
                        onClick={() => sendEmail(res)}
                        style={{
                          background: '#8b4513',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Email
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReservationAdmin
