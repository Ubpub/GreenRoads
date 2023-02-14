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
            $componentes = parse_url($_SERVER['REQUEST_URI']);
            parse_str($componentes['query'], $results);
            $id = $results['id'];
            $rutaJSON = file_get_contents("http://localhost/GreenRoads/api/rutas.php?id=$id");
            $ruta = json_decode($rutaJSON);
            // echo "<h2>{$ruta[0]->puntos}</h2>";
        ?>
        <div id="volver">
            <a href="inicio.html"><i class="bi bi-caret-left-fill"></i>Página de inicio</a>
        </div>

        <!-- Div izquierda -->
        <div id="izquierda">
            <div id="imagen">
                <div id="anterior"><i class="bi bi-chevron-compact-left"></i></div>
                <div id="siguiente"><i class="bi bi-chevron-compact-right"></i></div>
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

    <!-- FOOTER -->
    <div id="index-footer"></div>

    <script src="../js/header_footer.js"></script>
    <script type="text/javascript">
        let start_lat = <?php echo $ruta[0]->start_lat; ?>;
        let start_lon = <?php echo $ruta[0]->start_lon; ?>;
        if (start_lat == "" || start_lat == null) start_lat = 42.60003;
        if (start_lon == "" || start_lon == null) start_lon = -5.57032;
        
        // L.map es la clase central de la API. Creamos y manipulamos el mapa
        let map = L.map('map').setView([start_lat, start_lon], 15);

        // Mapa base con máximo nivel de zoom
        L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=b8b39a61c93e4e49ac1dab84527bedff', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.thunderforest.com/terms/">Thunderforest</a>'
        }).addTo(map);

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

        L.marker([start_lat, start_lon], {icon:marcador}).addTo(map);
    </script>
</body>
</html>