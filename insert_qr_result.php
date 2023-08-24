<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$database = "qr_code_db"; // Create this database in MySQL

// Rest of the PHP code (same as provided earlier).
// Create a connection
$conn = mysqli_connect($localhost, $root, $"", $qr_code_db);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['qrResult'])) {
    $qrResult = $_POST['qrResult'];

    // Insert the QR code result into the database
    $query = "INSERT INTO qr_codes (result) VALUES ('$qrResult')";
    if (mysqli_query($conn, $query)) {
        echo "QR code result inserted successfully";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

// Close the connection
mysqli_close($conn);
?>
?>
