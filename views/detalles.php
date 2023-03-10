<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Green Roads - Detalles</title>

    <!-- Tipo de fuente -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Arimo:wght@500&display=swap" rel="stylesheet">

    <!-- Iconos de Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

    <!-- Mapa leaflet -->
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin=""/>

    <!-- Estilos Leafley Awesome Markers -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css">

    <!-- Hojas de estilos -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/detalles.css">
    <link rel="icon" href="../imgs/icons/icono-senderista.png">
</head>
<body>
    
    <!-- HEADER -->
    <div id="index-header"></div>

    <!-- CONTENIDO -->
    <div id="wrapper">
        <?php

            // Obtener la URL del servidor
            $componentes = parse_url($_SERVER['REQUEST_URI']);

            // Obtener los parámetros pasados en la URL
            parse_str($componentes['query'], $results);

            // Almacenar en una variable la id obtenida de la URL
            $id = $results['id'];

            // Obtenemos los detalles con una petición a rutas.php pasando el id de ésta
            $rutaJSON = file_get_contents("http://localhost/GreenRoads/api/rutas.php?id=$id");

            // Pasamos el resultado obtenido a JSON
            $ruta = json_decode($rutaJSON);

            $comentariosJSON = file_get_contents("http://localhost/GreenRoads/api/comentario.php?id_ruta=$id");
            $comentarios = json_decode($comentariosJSON);
        ?>
        <div id="volver">
            <a href="inicio.html"><i class="bi bi-caret-left-fill"></i>Página de inicio</a>
        </div>

        <!-- Div izquierda -->
        <div id="izquierda">
            <div id="img-hidden">
                <div id="imagen">
                    <div id="anterior"><i class="bi bi-chevron-compact-left"></i></div>
                    <div id="siguiente"><i class="bi bi-chevron-compact-right"></i></div>
                </div>
            </div>

            <!-- Contenido izquierda -->
            <div id="contenido">
                <div id="contenido2">

                    <div id="titulo"><h3><?php echo $ruta[0]->nombre_ruta; ?></h3></div>
                    <div class="boton">
                        <div id="realizada">He realizado esta ruta</div>
                    </div>

                    <div class="puntuacion"><span id="punct">0</span>&nbsp;|&nbsp;<i class="bi bi-star-fill"></i>&nbsp;<span id="punct-total">5</span></div>

                    <div id="info">
                        <div id="distancia">
                            <p>Distancia</p>
                            <div><?php echo $ruta[0]->distancia; ?></div>
                        </div>
                        <div id="dificultad">
                            <p>Dificultad</p>
                            <div><?php echo $ruta[0]->dificultad; ?></div>
                        </div>
                        <div id="tipo">
                            <p>Tipo de ruta</p>
                            <div><?php 
                                if ($ruta[0]->circular) $tipo = "Cirucular";
                                else $tipo = "Recta";
                                echo $tipo; 
                            ?></div>
                        </div>
                        <div id="tiempo">
                            <p>Tiempo</p>
                            <div><?php echo $ruta[0]->distancia; ?></div>
                        </div>
                        <div id="coords">
                            <p>Coordenadas</p>
                            <div><?php echo $ruta[0]->start_lat; ?></div>
                        </div>
                    </div>

                    <div id="descripcion">
                        <?php echo $ruta[0]->descripcion ?>
                    </div>
                </div>
            </div>
            <!-- Fin contenido izquierda -->

        </div>
        <!-- Fin div izquierda -->
        
        <div id="derecha">
            <div id="map"></div>
        </div>

    </div>
    <!-- FIN CONTENIDO -->

    <!-- COMENTARIOS -->
    <div id="comments">
        <h2>Comentarios</h2>
        <div id="all-comments">
            <?php
                if (is_array($comentarios) && count($comentarios) > 0) {

                    foreach($comentarios as $comentario) {
                        $usuarioJSON = file_get_contents("http://localhost/GreenRoads/api/usuario.php?usuario={$comentario->usuario}");
                        $usuario = json_decode($usuarioJSON);
                        echo "<div class='comentario'>";
                        echo "<div class='user-imagen'>";
                        if ($usuario[0]->imagen != null) {
                            echo "<div class='cargar-imagen' style='background-image: url({$usuario[0]->imagen}); border-radius: 50%;'></div>";
                        } else {
                            echo "<div class='cargar-imagen'></div>";
                        }
                        echo "</div>";
                        echo "<div class='comentario-user'>";
                        echo "<p>{$comentario->usuario}</p>";
                        echo "<div class='all-text'>{$comentario->comentario}</div>";
                        echo "</div>";
                        echo "</div>";
                    }
                }
            ?>
        </div>
        <div id="add-comment">
            <div id="user">
                <div class="image-user"></div>
            </div>
            <div id="comment-part">
                <p>
                    Añadir comentario como (<span class="username"></span>)&nbsp;
                    <!-- <span><i class="bi bi-star-fill star" id="star1"></i></span>
                    <span><i class="bi bi-star-fill star" id="star2"></i></span>
                    <span><i class="bi bi-star-fill star" id="star3"></i></span>
                    <span><i class="bi bi-star-fill star" id="star4"></i></span>
                    <span><i class="bi bi-star-fill star" id="star5"></i></span> -->
                </p>
                <textarea name="comentario" id="comentario-txt" rows="8" maxlength="700"></textarea>
                <a href="#" class="com-enlace"><div class="com-btn">Enviar comentario</div></a>
            </div>
        </div>
        <div id="iniciar-sesion">
            <a href="login.html">&#187; Inicia sesión para escribir comentarios &#171;</a>
        </div>
    </div>
    <!-- FIN COMENTARIOS -->

    <!-- FOOTER -->
    <div id="index-footer"></div>

    <script src="../js/header_footer.js"></script>
    <script src="../js/image_user.js"></script>
    <script type="text/javascript">
        if (localStorage.getItem('usuario') != null) {
            document.querySelector('#iniciar-sesion').style.display = 'none';
            document.querySelector('.username').textContent = `${ localStorage.getItem('usuario') }`;
        } else {
            document.querySelector('#add-comment').style.display = 'none';
            document.querySelector('#iniciar-sesion').style.display = 'block';
        }

        // Con ayuda de PHP obtenemos la latitud y longitud del punto de partida de la ruta
        let start_lat = <?php echo $ruta[0]->start_lat; ?>;
        let start_lon = <?php echo $ruta[0]->start_lon; ?>;

        // Si no tiene punto de partida le ponemos un valor predeterminado
        if (start_lat == "" || start_lat == null) start_lat = 42.60003;
        if (start_lon == "" || start_lon == null) start_lon = -5.57032;
        
        // L.map es la clase central de la API. Creamos y manipulamos el mapa
        let map = L.map('map', {scrollWheelZoom: false}).setView([start_lat, start_lon], 15);

        // Mapa base con máximo nivel de zoom
        L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=b8b39a61c93e4e49ac1dab84527bedff', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.thunderforest.com/terms/">Thunderforest</a>'
        }).addTo(map);

        // Dibujar el trazo de la ruta
        L.polyline([<?php echo $ruta[0]->puntos ?> ], {
            color: '#87A330',
            weight: 5,
        }).addTo(map);

        // Control de escala
        L.control.scale().addTo(map);

        // Estilos personalizados del marcador con iconos de font-awesome
        let marcador = L.AwesomeMarkers.icon({
            icon: 'leaf',
            prefix: 'fa',
            markerColor: 'green',
            iconColor: 'white',
        });

        // Colocar el marcador en las posiciones iniciales de la ruta
        L.marker([start_lat, start_lon], {icon:marcador}).addTo(map);

        if (localStorage.getItem('usuario') != null) {
            document.querySelector('.com-enlace').addEventListener('click', (e) => {
                e.preventDefault();
                let texto = document.querySelector('#comentario-txt').value;
                if (texto != "") {
                    let comentario = {
                        'usuario': localStorage.usuario,
                        'comentario': texto,
                        'id_ruta': <?php echo $id; ?>
                    }
                    
                    fetch('http://localhost/GreenRoads/api/comentario.php', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json,charset-utf-8'
                        },
                        body: JSON.stringify(comentario)
                    })
                    .then((response) => {
                        switch (response.status) {
                            case 200:
                                window.location.href = 'inicio.html';
                                return response.json();
                            case 400:
                                console.log(response);
                        }
                    });
                }
            });
        }
    </script>
</body>
</html>