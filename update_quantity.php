<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory";

$conn = mysqli_connect($servername, $username, $password, $dbname);

$barcode = $_GET['barcode'];

$sql = "UPDATE products SET quantity = quantity + 1 WHERE barcode = '$barcode'";

if ($conn->query($sql) === TRUE) {
    echo "Quantity updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
