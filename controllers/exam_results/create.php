<?php

	// required headers
	header("Access-Control-Allow-Origin: *");
	// header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	include_once '../../config/database.php';
	include_once '../../models/ExamResults.php';
	include_once '../../models/User.php';

	// protected $user;
	// protected $database;
	// protected $db;

	$database = new Database();
	$db = $database->getConnection();
	$exam_result = new ExamResults($db);
	$user = new User($db);
	$data = json_decode(file_get_contents("php://input"));

	$user->id = $data->user_id;
	$exam_result->user_id = $data->user_id;
	$exam_result->exam_id = $data->exam_id;
	$exam_result->score = $data->score;
	$exam_result->total = $data->total;
	$exam_result->date_taken = $data->date_taken;
	$exam_result->exam_result = $data->exam_result;


	$result = $exam_result->create();
	$update_entrance = new stdClass();
	foreach ($result as $KEY=>$value) {
		if($value == "True"){
			$update_entrance->has_taken_entrance = 1;
			$user->userObject = $update_entrance;

			echo json_encode($user->update());
		}
		// echo json_encode($value['success']);
	}

	
	// echo "HEllo";
   
?>