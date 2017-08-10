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

        public function sanitize(){
            // sanitize
            $this->user_id=htmlspecialchars(strip_tags($this->user_id));
            $this->exam_id=htmlspecialchars(strip_tags($this->exam_id));
            $this->score=htmlspecialchars(strip_tags($this->score));
            $this->total=htmlspecialchars(strip_tags($this->total));
            $this->date_taken=htmlspecialchars(strip_tags($this->date_taken));
            $this->exam_result=htmlspecialchars(strip_tags($this->exam_result));

        }

        // create exam_result
        public function create(){
            try {
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
                        return array("message"=>"Exam Results saved", 
                                     "success"=>"True");
                    }else{
                        return array('message' => "Error",
                                     'success' => 'False');
                    }

            }catch(PDOException $e){
                return array('message' => $e->getMessage(),
                             'success' => 'False');
            }

            $conn = null;
        }

        //retrieve specific user
        public function retrieve(){

            try {

                $query = "SELECT 
                            exam_results.id, exam_results.score, exam_results.exam_result,
                            exam_results.total, exam_results.date_taken,
                            exam.id, exam.exam_type, exam.passing_rate
                          FROM 
                            exam_results  
                          INNER JOIN exam 
                            on exam_results.exam_id = exam.id
                          WHERE 
                            exam_results.user_id = :user_id ";


                $stmt = $this->conn->prepare($query);

                $this->exam_id=htmlspecialchars(strip_tags($this->user_id));
                $stmt->bindParam(":user_id", $this->user_id);

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
                    // return $this->user_id;
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