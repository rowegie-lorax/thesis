<?php
class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=db_act;charset=utf8", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfully"; 
        }catch(PDOException $exception){
            return "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>