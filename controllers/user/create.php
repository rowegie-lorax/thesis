<?php

	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	include_once '../../config/database.php';
	include_once '../../models/User.php';

	$database = new Database();
	$db = $database->getConnection();
	$user = new User($db);
	$data = json_decode(file_get_contents("php://input"));

	$user->firstName = $data->firstName;
	$user->lastName = $data->lastName;
	$user->email = $data->email;
	$user->password = password_hash($data->password, PASSWORD_DEFAULT);
	$user->is_admin = 0;

	echo json_encode($user->create());
   
?>