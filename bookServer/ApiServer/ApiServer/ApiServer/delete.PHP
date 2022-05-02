<?php
/*delete method*/

	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
	header("Content-Type: application/json; charset=UTF-8");
	require_once 'conn.php';

	if(isset ($_GET['id'])){
	$id = $_GET['id'];	
		try{
	$sql = "Delete From book WHERE id= :id";
	$stmt = $dbh->prepare($sql);                                  
	$stmt->bindParam(':id', $id);   
	$stmt->execute();
	}catch(PDOException $e) {
				echo $sql ."<br/>" . $e->getMessage();
	}
	
	}