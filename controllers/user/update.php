<?php

	// required headers
	header("Access-Control-Allow-Origin: *");
	// header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	include_once '../../config/database.php';
	include_once '../../models/User.php';

	// protected $user;
	// protected $database;
	// protected $db;

	$database = new Database();
	$db = $database->getConnection();
	$user = new User($db);
	$data = json_decode(file_get_contents("php://input"));

	$user->userObject = $data;
	$user->id = $data->id;
	echo json_encode($user->update());
	// echo "HEllo";
   
?>