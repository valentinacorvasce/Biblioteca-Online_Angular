	<?php
	/*METHOD POST AND PUT*/
	
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
	require_once 'conn.php';
	
	$json = file_get_contents('php://input');
	
	$mypost = json_decode($json,true);
	$author = $mypost["author"];
	$country = $mypost["country"];
	$imageLink = $mypost["imageLink"];
	$language = $mypost["language"];
	$link = $mypost["link"];
	$pages = $mypost["pages"];
	$title = $mypost["title"];
	$year = $mypost["year"];
	
	if(isset ($_GET['id'])){
	$id = $_GET['id'];	
	try{
	$sql = "UPDATE book SET  
            author= :author, 
            country= :country,  
            imageLink= :imageLink,  
            language= :language,
			link= :link,
			pages= :pages,
			title= :title,
			year= :year,
            WHERE id= :id";
$stmt = $dbh->prepare($sql);                                  
$stmt->bindParam(':author', $author);       
$stmt->bindParam(':country', $country);    
$stmt->bindParam(':imageLink', $imageLink); 
$stmt->bindParam(':language', $language); 
$stmt->bindParam(':link', $link);
$stmt->bindParam(':pages', $pages); 
$stmt->bindParam(':title', $title); 
$stmt->bindParam(':year', $year); 
$stmt->bindParam(':id', $id);   
$stmt->execute();
	}catch(PDOException $e) {
				echo $sql ."<br/>" . $e->getMessage();
	}
}
	
	else if($titolo){
		try {
			$sql = "INSERT INTO book (author, country, imageLink, language, link, pages, title, year)
		VALUES('$author','$country','$imageLink','$language','$link','$pages', '$title', '$year')";
			$dbh->exec($sql);
		}catch(PDOException $e) {
			echo $sql ."<br/>" . $e->getMessage();
		}
	}
	

