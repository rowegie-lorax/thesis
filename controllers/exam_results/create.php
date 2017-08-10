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

	$exam_result->user_id = $data->user_id;
	$exam_result->exam_id = $data->exam_id;
	$exam_result->score = $data->score;
	$exam_result->total = $data->total;
	$exam_result->date_taken = $data->date_taken;
	$exam_result->exam_result = $data->exam_result;


	


	echo json_encode($exam_result->create());
	// echo "HEllo";
   
?>