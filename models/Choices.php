<?php


    class Choices{
     
        // database connection and table name
        private $conn;
     
        // object properties
        public $question_id;

        public function __construct($db){
            $this->conn = $db;
        }

        //retrieve specific choices
        public function retrieveChoices(){
            try {

                $query = "SELECT choice_name, question_id, id FROM question_choices";
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