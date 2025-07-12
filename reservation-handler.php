<?php
// reservation-handler.php
// Place this file on your web server to receive reservation data

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Validate required fields
    $required = ['firstName', 'lastName', 'email', 'phone', 'date', 'time', 'guests'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing required field: $field"]);
            exit;
        }
    }
    
    // Your restaurant email
    $restaurantEmail = 'your-restaurant@example.com';
    
    // Email subject
    $subject = 'New Reservation Request - Skylight Cafe';
    
    // Email body
    $message = "
New Reservation Request

Customer Details:
- Name: {$data['firstName']} {$data['lastName']}
- Email: {$data['email']}
- Phone: {$data['phone']}

Reservation Details:
- Date: {$data['date']}
- Time: {$data['time']}
- Number of Guests: {$data['guests']}
- Special Occasion: " . ($data['occasion'] ?: 'None') . "
- Special Requests: " . ($data['requests'] ?: 'None') . "

Submitted: " . date('Y-m-d H:i:s') . "

Please contact the customer to confirm the reservation.
    ";
    
    // Email headers
    $headers = "From: noreply@skylightcafe.com\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send email
    if (mail($restaurantEmail, $subject, $message, $headers)) {
        // Save to file (optional)
        $logFile = 'reservations.txt';
        $logEntry = date('Y-m-d H:i:s') . " | " . json_encode($data) . "\n";
        file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
        
        echo json_encode(['success' => true, 'message' => 'Reservation request sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
