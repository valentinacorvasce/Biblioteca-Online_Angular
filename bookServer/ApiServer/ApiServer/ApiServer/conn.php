<?php
$host = 'localhost';
$dbname = 'books';
$user = 'root';
$pass = '';

try {
    $dbh = new PDO("mysql:host = $host;dbname=$dbname", $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Errore connessione al database !' . $e->getMessage();
    die();
}
