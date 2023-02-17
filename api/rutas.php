<?php
    require_once('../vendor/autoload.php');
    require_once('conexion.php');

    // Crea una nueva conexión
    $con = new Conexion();

    // Obtener rutas
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        try {
            // Selecciona todas las rutas
            $sql = "SELECT * FROM rutas WHERE 1";

            // Comprueba si se le ha pasado el id por parámetro y lo añade a la consulta
            // Sirve para los detalles de rutas, donde se le pasa una id para  obtenerlos
            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                $sql .= " AND id = '$id'";
            }

            // Comprueba si se ha pasado un usuario por parámetro y lo añade a la consulta
            // Sirve para obtener las rutas de un determinado usuario
            if (isset($_GET['usuario'])) {
                $usuario = $_GET['usuario'];
                $sql .= " AND usuario LIKE '%$usuario%'";
            }
            if (isset($_GET['nombre_ruta'])) {
                $nombre_ruta = $_GET['nombre_ruta'];
                $sql .= " AND nombre_ruta LIKE '%$nombre_ruta%'";
            }
            if (isset($_GET['dificultad'])) {
                $dificultad = $_GET['dificultad'];
                $sql .= " AND dificultad = '$dificultad'";
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

    // Subir ruta
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Obtiene toda la información de la ruta pasada en la cabecera de la petición
        $json = file_get_contents('php://input');

        // Comprueba si se ha obtenido un fichero
        if (isset($json)) {
            try {
                $ruta = json_decode($json);

                // Sentencia para insertat la ruta en la tabla ruta
                $sql = "INSERT INTO rutas (nombre_ruta, distancia, max_height, min_height, dificultad, pos_slope, neg_slope, start_lat, start_lon, usuario, fecha, descripcion, puntos) 
                        VALUES ('{$ruta->nombre_ruta}', '{$ruta->distancia}', '{$ruta->max_height}', '{$ruta->min_height}', '{$ruta->dificultad}', '{$ruta->pos_slope}', '{$ruta->neg_slope}', 
                        '{$ruta->start_lat}', '{$ruta->start_lon}', '{$ruta->usuario}', '{$ruta->fecha}', '{$ruta->descripcion}', '{$ruta->puntos}')";
                
                $con->query($sql);
                header("HTTP/1.1 201 OK");
                echo json_encode($ruta);
            } catch(mysqli_sql_exception $e) {
                header("HTTP/1.1 400 Bad Request");
            }
        }
        exit;
    }
?>