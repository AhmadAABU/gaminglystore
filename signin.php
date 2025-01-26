<?php
$Email = $_POST['Email'];
$Password = $_POST['Password'];

$con = new mysqli('localhost', 'root', '', 'form11');

if ($con->connect_error) {
    die("Connection Failed: " . $con->connect_error);
} else {
    $stmt = $con->prepare("SELECT * FROM red WHERE Email = ?");
    $stmt->bind_param("s", $Email);
    $stmt->execute();
    $stmt_result = $stmt->get_result();
    if ($stmt_result->num_rows > 0) {
        $data = $stmt_result->fetch_assoc();
        // Use password_verify() to check the hashed password
        if (password_verify($Password, $data['Password'])) {
            header("Location: index.html");
            exit();
        } else {
            // Incorrect password
            header("Refresh: 2; URL=login2.html");
            exit();
        }
    } else {
        // Email not found
        header("Refresh: 2; URL=login2.html");
        exit();
    }
}
?>
