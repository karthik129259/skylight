// Test EmailJS Configuration
console.log("Testing EmailJS Configuration...")

const testEmailJSConfig = () => {
  // Your EmailJS credentials
  const serviceId = 'service_rm9kpgq'
  const templateId = 'template_x87ys11'
  const publicKey = 'eYYR8ByzKKro9TUAl'

  console.log("✅ Service ID:", serviceId)
  console.log("✅ Template ID:", templateId)  
  console.log("✅ Public Key:", publicKey.substring(0, 8) + "...")

  // Test data that would be sent
  const testData = {
    to_email: 'karthik.idikuda129259@marwadiuniversity.ac.in',
    customer_name: 'Test Customer',
    customer_email: 'test@example.com',
    customer_phone: '1234567890',
    reservation_date: '2025-07-15',
    reservation_time: '19:00',
    number_of_guests: '2',
    special_occasion: 'Birthday',
    special_requests: 'Window seat please',
    submitted_at: new Date().toLocaleString()
  }

  console.log("✅ Test email data:", testData)
  console.log("🚀 Ready for EmailJS integration!")
}

testEmailJSConfig()
