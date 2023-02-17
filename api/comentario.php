<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    require_once('../vendor/autoload.php');
    require_once('conexion.php');

    // Creación de una nueva conexión
    $con = new Conexion();

    // Obtener comentarios
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        try {
            // Selecciona todos los comentarios
            $sql = "SELECT * FROM comentarios WHERE 1";

            if (isset($_GET['id'])) {
                $id = urlencode($_GET['id']);
                $sql .= " AND id = '$id'";
            }
            if (isset($_GET['usuario'])) {
                $usuario = $_GET['usuario'];
                $sql .= " AND usuario = '$usuario'";
            }
            if (isset($_GET['id_ruta'])) {
                $id_ruta = $_GET['id_ruta'];
                $sql .= " AND id_ruta = '$id_ruta'";
            }

            $result = $con->query($sql);

            // Obtener los comentarios
            $comentarios = $result->fetch_all(MYSQLI_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($comentarios);
        } catch(mysqli_sql_exception $e) {
            header("HTTP/1.1 404 Not Found");
        }
        exit;
    }

    // Subir comentario
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Obtiene toda la información del comentario pasado en la cabecera de la petición
        $json = file_get_contents('php://input');

        // Comprueba si se ha obtenido un fichero
        if (isset($json)) {
            try {
                $comentario = json_decode($json);

                // Sentencia para insertat la ruta en la tabla ruta
                $sql = "INSERT INTO comentarios (usuario, comentario, id_ruta) 
                        VALUES ('{$comentario->usuario}', '{$comentario->comentario}', '{$comentario->id_ruta}')";
                
                $con->query($sql);
                header("HTTP/1.1 200 OK");
                echo json_encode($comentario);
            } catch(mysqli_sql_exception $e) {
                header("HTTP/1.1 400 Bad Request");
            }
        }
        exit;
    }
?>