<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "books";
$port = 3307;

try {
  $conn = new PDO("mysql:host=$servername:$port;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // sql to create table
  $sql = "CREATE TABLE /* book */user (
  id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  scadenza VARCHAR(100) NOT NULL,
  token VARCHAR(100) NOT NULL
  /* author VARCHAR(800) NOT NULL,
  country VARCHAR(800) NOT NULL,
  imageLink MEDIUMTEXT NOT NULL,
  language VARCHAR(800) NOT NULL,
  link VARCHAR(800) NOT NULL,
  pages INT(3) NOT NULL,
  title VARCHAR(800) NOT NULL,
  year VARCHAR(100) NOT NULL */	
  /* reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP */
  )";

  // use exec() because no results are returned
  $conn->exec($sql);
  echo "Table USER created successfully";
} catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

$conn = null;

?>