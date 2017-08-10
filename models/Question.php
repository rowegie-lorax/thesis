<?php


    class Question{
     
        // database connection and table name
        private $conn;
     
        // object properties
        public $id;
        public $category_id;
        public $question;
        public $answer;
        public $exam_id;
        public $choices;
     
        public function __construct($db){
            $this->conn = $db;
        }

        public function sanitize(){
            // sanitize
            $this->category_id=htmlspecialchars(strip_tags($this->category_id));
            $this->question=htmlspecialchars(strip_tags($this->question));
            $this->answer=htmlspecialchars(strip_tags($this->answer));
            $this->exam_id=htmlspecialchars(strip_tags($this->exam_id));
        }
        
        // create questions
        public function create(){
            try {
                $query = "INSERT INTO questions (category_id, question, answer, exam_id)
                          VALUES (:category_id, :question, :answer, :exam_id)";
                // prepare query
                $stmt = $this->conn->prepare($query);
                // bind values
                $this->sanitize();
                $stmt->bindParam(":category_id", $this->category_id);
                $stmt->bindParam(":question", $this->question);
                $stmt->bindParam(":answer", $this->answer);
                $stmt->bindParam(":exam_id", $this->exam_id);
                
                if($stmt->execute()){
                    $question_id = $this->conn->lastInsertId();
                    foreach ($this->choices as $choice) {
                        $query = "INSERT INTO question_choices (question_id, choice_name)
                          VALUES (:question_id, :choice)";

                        $stmt = $this->conn->prepare($query);
                        $stmt->execute(
                            array(
                                ':question_id' =>$question_id,
                                ':choice' => $choice
                            )

                        );
                    }
                    return array("message"=>"Successful Insertion", "success" =>true);

                }else{
                    return false;
                }
            
            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;
        }

        //retrieve all questions
        public function list(){
            try {

                $query = "SELECT 
                            questions.id, questions.question, questions.answer, questions.exam_id,
                            question_categories.category_name, exam.exam_type, exam.passing_rate
                          FROM questions  
                          INNER JOIN question_categories on questions.category_id = question_categories.id 
                          INNER JOIN exam on questions.exam_id = exam.id";
                $results = array();
                $data =  array();
                $stmt = $this->conn->prepare($query);

                if ($stmt->execute()){
                    // foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $value) {
                    //     // echo $value['question'];
                    //     $data = array(
                    //         'category_name' => $value['category_name'],
                    //         'question' => $value['question']
                    //     );
                    //     array_push($results, $data);
                    // }
                    // return(($stmt->fetchAll(PDO::FETCH_OBJ)));
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                    // // return $rsults;
                    // // foreach( $results as $row ) {
                    // //     echo $row['question'];
                    // //     echo $row['answer'];
                    // }
                }
              
            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;

        }

        public function retrieveSpecificQuestions(){
            try {

                $query = "SELECT 
                            questions.id, questions.question, questions.answer, questions.exam_id,
                            question_categories.category_name, exam.exam_type, exam.passing_rate
                          FROM 
                            questions  
                          INNER JOIN question_categories 
                            on questions.category_id = question_categories.id 
                          INNER JOIN exam 
                            on questions.exam_id = exam.id
                          WHERE 
                            questions.exam_id = :exam_id ";

                $results = array();
                $data =  array();
                $stmt = $this->conn->prepare($query);

                $this->exam_id=htmlspecialchars(strip_tags($this->exam_id));
                $stmt->bindParam(":exam_id", $this->exam_id);

                if ($stmt->execute()){
                    // foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $value) {
                    //     // echo $value['question'];
                    //     $data = array(
                    //         'category_name' => $value['category_name'],
                    //         'question' => $value['question']
                    //     );
                    //     array_push($results, $data);
                    // }
                    // return(($stmt->fetchAll(PDO::FETCH_OBJ)));
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                    // // return $rsults;
                    // // foreach( $results as $row ) {
                    // //     echo $row['question'];
                    // //     echo $row['answer'];
                    // }
                }
              
            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;
            
        }
    }
?>