<?php

	// required headers
	header("Access-Control-Allow-Origin: *");
	// header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	include_once '../../config/database.php';
	include_once '../../models/Question.php';

	// protected $user;
	// protected $database;
	// protected $db;

	$database = new Database();
	$db = $database->getConnection();
	$questions = new Question($db);
	$data = json_decode(file_get_contents("php://input"));

	$questions->category_id = $data->category;
	$questions->question = $data->content;
	$questions->choices = $data->choices;
	$questions->answer = $data->answer;
	$questions->exam_id = $data->exam_type;;

	echo json_encode($questions->create());
	// echo "HEllo";
   
?>