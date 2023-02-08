<?php
    require_once('../vendor/autoload.php');

    require_once('conexion.php');
    $con = new Conexion();

    // Insertar un usuario
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $json = file_get_contents('php://input');
        if (isset($json)) {
            try {
                //Almacenar el json en usuario
                $usuario = json_decode($json);
                $passHash = hash("sha512", $usuario->contrasena);
                
                $sql = "UPDATE usuarios SET nom_ape = '{$usuario->nombre}', usuario = '{$usuario->usuario}', correo = '{$usuario->correo}',
                        fecnac = '{$usuario->nacimiento}', estatura = '{$usuario->estatura}', peso = '{$usuario->peso}',
                        activ_fav = '{$usuario->actividades}' WHERE usuario = '{$usuario->usuario}' AND pass = '$passHash'";
                
                $con->query($sql);
                header("HTTP/1.1 201 Created");
                echo json_encode($usuario);
            } catch (mysqli_sql_exception) {
                header("HTTP/1.1 400 Bad Request");
            }
        }
        exit;
    }
?>