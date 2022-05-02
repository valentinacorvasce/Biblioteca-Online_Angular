<?php
/*METHOD POST AND PUT*/

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
require_once 'conn.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if (trim($request->data->username) === '' || trim($request->data->email) === '' || trim($request->data->password === '')) {
    return http_response_code(400);
  }

  // Sanitize.
  $username = mysqli_real_escape_string($con, trim($request->data->username));
  $email = mysqli_real_escape_string($con, trim($request->data->email));
  $password = mysqli_real_escape_string($con, trim($request->data->password));


  // Store.
  $sql = "INSERT INTO `user`(`username`,`email`, `password`) VALUES ('{$username}','{$email}','{$password}')";

  if (mysqli_query($con, $sql)) {
    http_response_code(201);
    $usersGet = [
      'username' => $username,
      'email' => $email,
      'password' => $password,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data' => $usersGet]);
  } else {
    http_response_code(422);
  }
}
