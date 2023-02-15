<?php
    require_once('../vendor/autoload.php');
    require_once('conexion.php');

    // Creación de una nueva conexión
    $con = new Conexion();

    // Editar un usuario
    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        // Obtener el fichero enviado en el cuerpo
        $json = file_get_contents('php://input');

        // Comprueba si se ha obtenido el fichero
        if (isset($json)) {
            try {
                // Almacenar el json en usuario
                $usuario = json_decode($json);

                // Cifrado de contraseña
                $passHash = hash("sha512", $usuario->contrasena);

                // Comprueba si el usuario existe con la contraseña pasada
                $comprobacion = "SELECT * FROM usuarios WHERE usuario = '{$usuario->usuario}' AND pass = '$passHash'";
                $result = $con->query($comprobacion);

                // Se ejecuta si obtiene un usuario
                if ($result->num_rows == 1){
                    // Sentencia para actualizar los campos editados del usuario
                    $sql = "UPDATE usuarios SET nom_ape = '{$usuario->nombre}', usuario = '{$usuario->usuario}', correo = '{$usuario->correo}',
                            fecnac = '{$usuario->nacimiento}', estatura = '{$usuario->estatura}', peso = '{$usuario->peso}',
                            activ_fav = '{$usuario->actividades}' WHERE usuario = '{$usuario->usuario}' AND pass = '$passHash'";
                    
                    // Ejecución de la sentencia
                    $con->query($sql);

                    // Devuelve 201 si se ha creado exitosamente
                    header("HTTP/1.1 201 Created");
                    echo json_encode($usuario);
                } else {
                    header("HTTP/1.1 404 Not Found");
                }
            } catch (mysqli_sql_exception) {
                // Devuelve un 400 en caso de que haya un problema con la petición
                header("HTTP/1.1 400 Bad Request");
            }
        }
        exit;
    }

    // Eliminar el usuario
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

        // Obtener el fichero enviado en el cuerpo
        $json = file_get_contents('php://input');

        // Comprueba si se ha obtenido el fichero
        if (isset($json)){

            // Almacenar el json en usuario
            $usuario = json_decode($json);

            // Cifrado de contraseña
            $hashPass = hash("sha512", $usuario->pass);

            // Sentencia para eliminar el usuario que coincida en contraseña e id
            $sql = "DELETE FROM usuarios WHERE id = '$usuario->id' AND pass = '$hashPass'";
            try {
                $con->query($sql);
                header("HTTP/1.1 200 OK");
            } catch(mysqli_sql_exception $e) {
                header("HTTP/1.1 404 Not Found");
            }
        } else {
            header("HTTP/1.1 400 Bad Request");
        }
        exit;
    }
?>