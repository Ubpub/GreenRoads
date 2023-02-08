<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    require_once('../vendor/autoload.php');

    // CONTRASEÑA ADMIN -> admin123
    require_once('conexion.php');
    $con = new Conexion();
    $key = 'example_key';
    
    // Insertar un usuario
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $json = file_get_contents('php://input');
        if (isset($json)) {
            //Almacenar el json en usuario
            $usuario = json_decode($json);
            $passHash = hash("sha512", $usuario->contrasena);
            
            //Creación de sentencia sql para insertar nuevo usuario
            $sql = "INSERT INTO usuarios (nom_ape, usuario, correo, pass, fecnac, estatura, peso,  activ_fav, rol)
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
        exit;
    }
    

    // Obtener los usuarios
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        try {
            $sql = "SELECT * FROM usuarios WHERE 1";

            // Comprobar si se ha enviado el id como parámetro
            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                $sql .= " AND id = '$id'";
            }
            if (isset($_GET['usuario']) && isset($_GET['pass'])) {
                $usuario = $_GET['usuario'];
                $contrasena = $_GET['pass'];
                $hashPass = hash("sha512", $contrasena);
                $sql .= " AND usuario = '$usuario' AND pass = '$hashPass'";
            }
            $usuario = $_GET['usuario'];

            $result = $con->query($sql);
            $usuarios = $result->fetch_all(MYSQLI_ASSOC); // Obtiene lo usuarios

            $payload = [
                'iss' => $usuarios[0]['usuario'],
            ];

            $jwt = JWT::encode($payload, $key, 'HS256');

            $usuarios[0]['webToken'] = $jwt;

            HEADER("HTTP/1.1 200 OK");
            echo json_encode($usuarios);
        } catch(mysqli_sql_exception $e) {
            header("HTTP/1.1 404 Not Found");
        }
        exit;
    }
?>