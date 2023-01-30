<?php
    // CONTRASEÑA ADMIN -> admin123
    require_once('conexion.php');
    $con = new Conexion();

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $json = file_get_contents('php://input');
        if (isset($json)) {
            //Almacenar el json en usuario
            $usuario = json_decode($json);
            $passHash = hash("sha512", $usuario->contrasena);
            
            //Creación de sentencia sql para insertar nuevo usuario
            $sql = "INSERT INTO usuarios (usuario, nom_ape, correo, pass, fecnac, estatura, peso,  activ_fav, rol)
                    VALUES ('{$usuario->nombre}', '{$usuario->usuario}', '{$usuario->correo}', '$passHash', 
                    '{$usuario->nacimiento}', '{$usuario->estatura}', '{$usuario->peso}', '{$usuario->actividades}', 'user')";
            
            try {
                $con->query($sql);
                header("HTTP/1.1 201 Created");
                echo json_encode($con->insert_id);
            } catch (mysqli_sql_exception) {
                header("HTTP/1.1 400 Bad Request");
            }
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
?>