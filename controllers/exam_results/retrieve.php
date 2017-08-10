<?php

	// required headers
	header("Access-Control-Allow-Origin: *");
	// header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	include_once '../../config/database.php';
	include_once '../../models/ExamResults.php';

	// protected $user;
	// protected $database;
	// protected $db;

	$database = new Database();
	$db = $database->getConnection();
	$exam_result = new ExamResults($db);
	$data = json_decode(file_get_contents("php://input"));

	$exam_result->user_id = $_GET['id'];

	echo json_encode($exam_result->retrieve());
	// echo "HEllo";
   
?>