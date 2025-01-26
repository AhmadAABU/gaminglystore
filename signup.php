<?php
$Email = $_POST['Email'];
$Password = $_POST['Password'];

// Hash the password before storing it
$hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

$conn = new mysqli('localhost', 'root', '', 'form11');

if ($conn->connect_error) {
    echo "$conn->connect_error";
    die("Connection Failed : " . $conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT INTO red (Email, Password) VALUES (?, ?)");
    $stmt->bind_param("ss", $Email, $hashedPassword);  // Use hashed password
    $execval = $stmt->execute();
    echo $execval;
    echo "Registration successfully...";
    $stmt->close();
    $conn->close();
    
    header("Location: index.html");
    exit();
}
?>
