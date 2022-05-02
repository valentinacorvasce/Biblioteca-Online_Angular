<?php
/*METHOD GET AND GET WITH GET ID*/

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Content-Type: application/json; charset=UTF-8");
require_once 'conn.php';

$usersGet = [];
$sql = "SELECT id, username, email, password FROM user";

if ($result = mysqli_query($con, $sql)) {
    $cr = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $usersGet[$cr]['id']    = $row['id'];
        $usersGet[$cr]['username'] = $row['username'];
        $usersGet[$cr]['email'] = $row['email'];
        $usersGet[$cr]['password'] = $row['password'];
        $cr++;
    }

    echo json_encode(['data' => $usersGet]);
} else {
    http_response_code(404);
}
