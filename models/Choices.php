<?php


    class Choices{
     
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
                    foreach ($choices as $choice) {
                        $query = "INSERT INTO question_choices (question_id, choice_name)
                          VALUES (:question_id, :choice)";
                        $stmt = $this->conn->prepare($query);
                        $question_id=htmlspecialchars(strip_tags($question_id));
                        $choice=htmlspecialchars(strip_tags($choice));
                        $stmt->bindParam(":question_id", $question_id);
                        $stmt->bindParam(":choice", $choice);
                    }

                }else{
                    return false;
                }
            
            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;
        }

        //login user
        public function login(){
            try {

                $query = "SELECT *FROM questions WHERE email=:email";
                // prepare query
                $stmt = $this->conn->prepare($query);
                // bind values
                // echo $this->password;
                $this->email=htmlspecialchars(strip_tags($this->email));
                // $this->password=htmlspecialchars(strip_tags($this->password));
                $stmt->bindParam(":email", $this->email);
                // $stmt->bindParam(":password", $this->password); 
                $stmt->execute();
                $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
                foreach ($stmt->fetchAll() as $data) {
                    $is_correct = password_verify($this->password, $data['password']);
                    return $is_correct ? $data : array("message"=>"Incorrect Password", "success"=>false);
                };

            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;

        }

        //retrieve specific user
        public function retrieve(){
            try {

                $query = "SELECT first_name, last_name, email, is_admin FROM questions WHERE id=:id";
                $stmt = $this->conn->prepare($query);
                $this->email=htmlspecialchars(strip_tags($this->id));
                $stmt->execute(array(':id' => $this->id));
                $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
                foreach ($stmt->fetchAll() as $data) {
                    return $data;
                };

            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;

        }
    }
?>