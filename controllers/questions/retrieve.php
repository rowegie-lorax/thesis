<?php

	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json");
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
	$question = new Question($db);

	$data = array();
	foreach ($question->retrieve() as $value) {
		$data = array(
			'id' => $value['id'],
			'question' => $value['question'],
			'answer' => $value['answer'],
			'category_name' => $value['category_name'],
			'exam_type' => $value['exam_type']
            
        );
	echo json_encode($question->retrieve(), JSON_FORCE_OBJECT);
	}

	// echo json_encode(($question->retrieve()));

	// foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $value) {
                    //     // echo $value['question'];
                    //     $data = array(
                    //         'category_name' => $value['category_name'],
                    //         'question' => $value['question']
                    //     );
                    //     array_push($results, $data);
                    // }
                    // return(($stmt->fetchAll(PDO::FETCH_OBJ)));
	// echo ( json_encode($question->retrieve()) );
	// echo json_encode(array_values($question->retrieve()));
	// echo "HEllo";
   
?>