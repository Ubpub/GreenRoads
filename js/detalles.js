const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
const id = urlParams.get('id');
console.log(id);

renderPage();

function renderPage() {
    cargarMapa();
    obtenerRuta();
}

async function obtenerRuta() {
    const response = await fetch(`http://localhost/GreenRoads/api/rutas.php?id=${ id }`)
        .catch(error => console.error(error));
    const data = await response.json();
    document.querySelector('#titulo').innerHTML = `<h3>${ data[0].nombre_ruta }</h3>`;
}

function cargarMapa() {
    // L.map es la clase central de la API. Creamos y manipulamos el mapa
    let map = L.map('map').setView([42.60, -5.57], 15);

    // Mapa base con máximo nivel de zoom
    L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=b8b39a61c93e4e49ac1dab84527bedff', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.thunderforest.com/terms/">Thunderforest</a>'
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

    L.marker([42.60, -5.57], {icon:marcador}).addTo(map);
}