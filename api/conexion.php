<?php
    class Conexion extends mysqli {
        private $host = "localhost";
        private $db = "greenroads";
        private $user = "greenroads";
        private $pass = "greenroads";

        public function __construct() {
            try {
                parent::__construct($this->host, $this->user, $this->pass, $this->db);
            } catch(mysqli_sql_exception $e) {
                echo "ERROR: {e->getMessage()}";
                exit;
            }
        }
    }
?>