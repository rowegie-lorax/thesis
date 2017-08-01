<?php


    class QuestionCategory{
     
        // database connection and table name
        private $conn;
     
        public function __construct($db){
            $this->conn = $db;
        }

        //retrieve all categories
        public function retrieveAll(){
            try {

                $query = "SELECT *FROM question_categories";
                $stmt = $this->conn->prepare($query);
                $result = $stmt->execute(); 
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
                // return array('message' => "Error retrieving");

            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;

        }
    }
?>