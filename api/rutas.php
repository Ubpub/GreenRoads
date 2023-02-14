<?php
    require_once('../vendor/autoload.php');

    require_once('conexion.php');
    $con = new Conexion();

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        try {
            $sql = "SELECT * FROM rutas WHERE 1";

            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                $sql .= " AND id = '$id'";
            }
            if (isset($_GET['usuario'])) {
                $usuario = $_GET['usuario'];
                $sql .= " AND usuario = '$usuario'";
            }

            $result = $con->query($sql);

            // Obtener las rutas
            $rutas = $result->fetch_all(MYSQLI_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($rutas);
        } catch(mysqli_sql_exception $e) {
            header("HTTP/1.1 404 Not Found");
        }
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $json = file_get_contents('php://input');
        if (isset($json)) {
            try {
                $ruta = json_decode($json);
                $sql = "INSERT INTO rutas (nombre_ruta, distancia, max_height, min_height, dificultad, pos_slope, neg_slope, start_lat, start_lon, usuario, fecha, descripcion, puntos) 
                        VALUES ('{$ruta->nombre_ruta}', '{$ruta->distancia}', '{$ruta->max_height}', '{$ruta->min_height}', '{$ruta->dificultad}', '{$ruta->pos_slope}', '{$ruta->neg_slope}', 
                        '{$ruta->start_lat}', '{$ruta->start_lon}', '{$ruta->usuario}', '{$ruta->fecha}', '{$ruta->descripcion}', '{$ruta->puntos}')";
                
                $con->query($sql);
                header("HTTP/1.1 200 OK");
                echo json_encode($ruta);
            } catch(mysqli_sql_exception $e) {
                header("HTTP/1.1 404 Not Found");
            }
        }
        exit;
    }
?>