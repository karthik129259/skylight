// test-reservation.js - Test the reservation server
const fetch = require('node-fetch')

const testReservation = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '9876543210',
  date: '2025-01-15',
  time: '19:00',
  guests: '4',
  occasion: 'anniversary',
  requests: 'Window seat please, vegetarian options needed'
}

async function testServer() {
  try {
    console.log('🧪 Testing reservation server...')
    console.log('📤 Sending test reservation:', testReservation)
    
    const response = await fetch('http://localhost:3001/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testReservation)
    })
    
    const result = await response.json()
    
    if (response.ok) {
      console.log('✅ Success! Server response:', result)
      console.log('📧 Check your email for the reservation notification!')
    } else {
      console.log('❌ Error:', result.error)
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message)
    console.log('💡 Make sure the server is running: node server.js')
  }
}

testServer()
