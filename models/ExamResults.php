<?php


    class ExamResults{
     
        // database connection and table name
        private $conn;
     
        // object properties
        public $id;
        public $user_id;
        public $exam_id;
        public $score;
        public $total;
        public $date_taken;
        public $exam_result;
     
        public function __construct($db){
            $this->conn = $db;
        }

       
        // create exam_result
        public function create(){
            try {
                $user_count = 0;
                $user_count = $this->checkEmail();
                if ($user_count == 0 ){
                    $query = "INSERT INTO exam_results (user_id, exam_id, score, total, date_taken, exam_result)
                    VALUES (:user_id , :exam_id, :score, :total, :date_taken, :exam_result)";
                    // prepare query
                    $stmt = $this->conn->prepare($query);
                    // bind values
                    $this->sanitize();
                    $stmt->bindParam(":user_id", $this->user_id);
                    $stmt->bindParam(":exam_id", $this->exam_id);
                    $stmt->bindParam(":score", $this->score);
                    $stmt->bindParam(":total", $this->total);
                    $stmt->bindParam(":date_taken", $this->date_taken);
                    $stmt->bindParam(":exam_result", $this->exam_result);
                    
                    if($stmt->execute()){
                        return array("message"=>"Successfully registered", 
                                     "success"=>"True");
                    }else{
                        return false;
                    }
                }else{
                    return array('message' =>"Email Already Exists !" , 'success' => false );
                }
                
            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;
        }

        //retrieve specific user
        public function retrieve(){
            try {

                $query = "SELECT first_name, last_name, email, birthdate, is_admin FROM users WHERE id=:id";
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