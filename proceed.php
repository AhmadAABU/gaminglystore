<?php
// Get form data
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$address = $_POST['address'];
$city = $_POST['city'];
$phoneNo = $_POST['phoneNo'];
$email = $_POST['Email'];
$cartData = json_decode($_POST['cartData'], true);


$conn = new mysqli('localhost', 'root', '', 'form11');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO orders (firstname, lastname, address, city, phoneNo, email, item_name, item_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssssd", $firstname, $lastname, $address, $city, $phoneNo, $email, $name, $price);
foreach ($cartData['items'] as $item) {
    $name = $item['name'];
    $price = $item['price'];
    $stmt->execute();
}

// Close connections
$stmt->close();
$conn->close();

   // Redirect to the main page
    header("Location: index.html");
    exit();
?>
