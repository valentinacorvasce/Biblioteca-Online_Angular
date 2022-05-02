<?php
/*METHOD GET AND GET WITH GET ID*/

	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
	header("Content-Type: application/json; charset=UTF-8");
	require_once 'conn.php';

if(isset ($_GET['id'])){
	$id = $_GET['id'];	
	
	try{
    $sql = 'SELECT *FROM book WHERE id = :id';
    $stmt = $dbh->prepare($sql);
	$id = $id;
    $stmt->execute(['id' => $id]);
    $rows = $stmt->fetch();
    echo json_encode($rows);
} catch (PDOException $e) {
    echo 'Errore select tabella !' . $e->getMessage();
    die();
}
} else {
	try{
    $sql = 'SELECT *FROM book';
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
} catch (PDOException $e) {
    echo 'Errore select tabella !' . $e->getMessage();
    die();
}
	
}

