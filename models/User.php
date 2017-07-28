<?php


    class User{
     
        // database connection and table name
        private $conn;
        private $table_name = "users";
     
        // object properties
        public $firstName;
        public $lastName;
        public $email;
        public $password;
        public $is_admin;
        public $is_logged_in;
     
        public function __construct($db){
            $this->conn = $db;
        }

        public function sanitize(){
            // sanitize
            $this->firstName=htmlspecialchars(strip_tags($this->firstName));
            $this->lastName=htmlspecialchars(strip_tags($this->lastName));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->is_admin=htmlspecialchars(strip_tags($this->is_admin));
            $this->is_logged_in=htmlspecialchars(strip_tags($this->is_logged_in));

        }
     
        // create user
        public function create(){
            try {
                $query = "INSERT INTO users (first_name, last_name, email, password, is_admin, is_logged_in)
                VALUES (:firstName, :lastName, :email, :password, :is_admin, :is_logged_in )";
                // prepare query
                $stmt = $this->conn->prepare($query);
                // bind values
                $this->sanitize();
                $stmt->bindParam(":firstName", $this->firstName);
                $stmt->bindParam(":lastName", $this->lastName);
                $stmt->bindParam(":email", $this->email);
                $stmt->bindParam(":password", $this->password);
                $stmt->bindParam(":is_admin", $this->is_admin);
                $stmt->bindParam(":is_logged_in", $this->is_logged_in);
                
                if($stmt->execute()){
                    return true;
                }else{
                    return false;
                }
            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;
        }

        //retrieve user
        public function login(){
            try {

                $query = "SELECT password FROM users WHERE email=:email";
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
                    return password_verify($this->password, $data['password']);
                };
            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;

        }
    }
?>