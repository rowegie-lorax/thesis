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
        public function retrieve(){
            try {

                $query = "SELECT 
                            questions.id, questions.question, questions.answer, question_categories.category_name, exam.exam_type
                          FROM questions  
                          INNER JOIN question_categories on questions.category_id = question_categories.id 
                          INNER JOIN exam on questions.exam_id = exam.id";
                $stmt = $this->conn->prepare($query);

                if ($stmt->execute()){
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                }
              
            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;

        }
    }
?>