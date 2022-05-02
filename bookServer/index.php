<?php
/*METHOD GET AND GET WITH GET ID*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT,PATCH, POST, GET, OPTIONS, DELETE");

/*CONN DB*/
$host = 'localhost';
$dbname = 'books';
$user = 'root';
$pass = 'ValeFreyja21!%';
$port = 3307;

try {
    $dbh = new PDO("mysql:host=$host:$port;dbname=$dbname", $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Errore connessione al database !' . $e->getMessage();
    die();
}
/*END CONN DB*/

$json = trim(file_get_contents('php://input'));
$input = json_decode($json, true);
$method = $_SERVER['REQUEST_METHOD'];


if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];

    try {
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
    try {
        $sql = 'SELECT *FROM book';
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    } catch (PDOException $e) {
        echo 'Errore select tabella!' . $e->getMessage();
        die();
    }
}

switch ($method) {
    case 'PATCH':
        $id = (int) $_GET['id'];
        $author = $input["author"];
        $country = $input["country"];
        $imageLink = $input["imageLink"];
        $language = $input["language"];
        $link1 = $input["link1"];
        $link2 = $input["link2"];
        $pages = $input["pages"];
        $title = $input["title"];
        $year = $input["year"];
        $descr = $input["descr"];
        try {
            $sql = "UPDATE book SET author=?, country=?, imageLink=?, language=?, link1=?, link2=?, pages=?, title=? , year=?, descr=? WHERE id=?";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([$author, $country, $imageLink, $language, $link1, $link2, $pages, $title, $year, $descr, $id]);
        } catch (PDOException $e) {
            echo $sql . "<br/>" . $e->getMessage();
        }
        break;

    case 'POST':
        $author = htmlentities($input["author"]);
        $country = htmlentities($input["country"]);
        $imageLink = htmlentities($input["imageLink"]);
        $language = htmlentities($input["language"]);
        $link1 = htmlentities($input["link1"]);
        $link2 = htmlentities($input["link2"]);
        $pages = htmlentities($input["pages"]);
        $title = htmlentities($input["title"]);
        $year = htmlentities($input["year"]);
        $descr = htmlentities($input["descr"]);
        try {
            $sql = "INSERT INTO book (author, country, imageLink, language, link1, link2, pages, title, year, descr)
		VALUES('$author','$country','$imageLink','$language','$link1','$link2', '$pages', '$title', '$year', '$descr')";
            $dbh->exec($sql);
        } catch (PDOException $e) {
            echo $sql . "<br/>" . $e->getMessage();
        }
        break;

    case 'DELETE':
        $id = (int) $_GET['id'];
        try {
            $sql = "Delete From book WHERE id= :id";
            $stmt = $dbh->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        } catch (PDOException $e) {
            echo $sql . "<br/>" . $e->getMessage();
        }
        break;
}
