<?php
// Database connection settings
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database_name";

// Create connection
$conn = new mysqli('localhost', 'root', '', 'form11');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);
$items = $data['items'];
$total = $data['total'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO orders (item_name, item_price) VALUES (?, ?)");
$stmt->bind_param("sd", $name, $price);

foreach ($items as $item) {
    $name = $item['name'];
    $price = $item['price'];
    $stmt->execute();
}

// Close connections
$stmt->close();
$conn->close();

echo "Order placed successfully";
?>
