<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $json = file_get_contents('php://input');
        if (isset($json)) {
            $usuario = json_decode($json);
            echo "<p>{$usuario->usuario}</p>";
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
?>