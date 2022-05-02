<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "books";
$port = 3307;

// Table Data;
/* $author = 'Hans Christian Andersen';
$country = 'Denmark';
$imageLink = '';
$language = 'Danish';
$link = 'https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n';
$pages = 784;
$title = 'Fairy tales';
$year = 1836; */
$user = 'demo';
$pass = 'demo';
$dead = '30000';
$token = '';

try {
  $conn = new PDO("mysql:host=$servername:$port;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = "INSERT INTO /* book */user (username, password, scadenza, token)
  VALUES ('$user','$pass','$dead','$token')";
  // use exec() because no results are returned
  $conn->exec($sql);
  echo "New record created successfully";
} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;

?>