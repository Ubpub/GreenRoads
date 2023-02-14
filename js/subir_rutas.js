
let botones = document.querySelectorAll('.btn-dif');
Array.from(botones).forEach(item => {
    item.addEventListener('click', () => {
        Array.from(botones).forEach(bot => {
            bot.classList.remove('selected');
        })
        item.classList.add('selected');
    })
});

// Fichero GPX
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Cargar el fichero
    let fileInput = document.getElementById("gpx");
    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function() {
        let gpx = reader.result;
        let parser = new gpxParser();
        parser.parse(gpx);
        let json = parser.tracks[0];
        console.log(json);

        // Array para los puntos de la ruta
        let puntos = [];
        json.points.forEach(item => {
            /* puntos.push({
                'lat': item.lat,
                'lon': item.lon,
            }) */
            puntos.push([item.lat, item.lon]);
        })

        let ruta = {
            'nombre_ruta': document.querySelector('#nombre').value,
            'distancia': Math.round(json.distance.total),
            'max-height': Math.round(json.elevation.max),
            'min-height': Math.round(json.elevation.min),
            'dificultad': document.querySelector('.selected').textContent,
            'pos_slope': Math.round(json.elevation.neg),
            'neg_slope': Math.round(json.elevation.pos),
            'start_lat': json.points[0].lat,
            'start_lon': json.points[0].lon,
            'usuario': localStorage.getItem('id'),
            'fecha': json.points[0].time,
            'descripcion': document.querySelector('#descripcion').value,
            'puntos': JSON.stringify(puntos),
        };

        fetch('http://localhost/GreenRoads/api/rutas.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json,charset-utf-8'
            },
            body: JSON.stringify({ruta})
        })
        .then((response) => {
            switch (response.status) {
                case 200:
                    return response.json();
                case 404:
                    console.log(response);
            }
        })
        .then(data => {
            console.log(data);
        });
    };
    reader.readAsText(file);
    let gpx = new gpxParser();
    gpx.parse("<xml><gpx></gpx></xml>");
});
