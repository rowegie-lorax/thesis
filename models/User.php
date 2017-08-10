<?php


    class User{
     
        // database connection and table name
        private $conn;
     
        // object properties
        public $id;
        public $firstName;
        public $lastName;
        public $email;
        public $password;
        public $is_admin;
        public $has_taken_entrance;
        public $userObject;
     
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
            $this->has_taken_entrance=htmlspecialchars(strip_tags($this->has_taken_entrance));

        }
        

        public function checkEmail(){
            try{
                $query = "SELECT  COUNT(id) FROM users WHERE email=:email";
                $stmt = $this->conn->prepare($query);
                $this->email=htmlspecialchars(strip_tags($this->email));
                $stmt->bindParam(":email", $this->email);
                if($stmt->execute()){
                    return $stmt->fetchColumn();
                }else{
                    return false;
                }

            }catch(PDOException $e){
                return $e->getMessage();
            }
        }
        // create user
        public function create(){
            try {
                $user_count = 0;
                $user_count = $this->checkEmail();
                if ($user_count == 0 ){
                    $query = "INSERT INTO users (first_name, last_name, email, password, is_admin, has_taken_entrance)
                    VALUES (:firstName, :lastName, :email, :password, :is_admin :has_taken_entrance)";
                    // prepare query
                    $stmt = $this->conn->prepare($query);
                    // bind values
                    $this->sanitize();
                    $stmt->bindParam(":firstName", $this->firstName);
                    $stmt->bindParam(":lastName", $this->lastName);
                    $stmt->bindParam(":email", $this->email);
                    $stmt->bindParam(":password", $this->password);
                    $stmt->bindParam(":is_admin", $this->is_admin);
                    $stmt->bindParam(":has_taken_entrance", $this->has_taken_entrance);
                    
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

        //login user
        public function login(){
            try {

                $query = "SELECT *FROM users WHERE email=:email";
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

         //udpate specific user
        public function update(){
            try {

                $data = ( (array) $this->userObject );

                $query = "UPDATE users SET";
                $values = array();


                $data = array_filter($data, function ($value) {
                    return null !== $value;
                });

                foreach ($data as $name => $value) {
                    if ($name !== 'id'){
                        $query .= ' '.$name.' = :'.$name.','; 
                    }
                    $values[':'.$name] = $value;
                    
                }
                $query = substr($query, 0, -1).' WHERE id = :id;'; 

                $stmt = $this->conn->prepare($query);
                $stmt->execute($values);
                if ( $stmt->rowCount() > 0 ){
                    return array('message' => "Updated Successfully", 'success' => true  );
                }
                

            }catch(PDOException $e){
                return $e->getMessage();
            }

            $conn = null;

        }
    }
?>