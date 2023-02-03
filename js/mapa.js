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

/* let circle = L.circle([42.60, -5.57], {
    radius: 1000,
    color: 'yellow',
    fillColor: 'green',
    weight: 10,
}).addTo(map); */

/* L.polyline([[42.70, -5.60], [42.800, -5.80], [42.750, -5.55], [42.7350, -5.5532] ], {
    color: 'blue',
    weight: 10,
}).addTo(map); */

// ¡¡ Icono que se puede mover !!
// L.marker([42.60, -5.57],{draggable: true}).addTo(map);
    // .bindPopup('Estás aquí')
    // .openPopup(); 

L.marker([42.60, -5.57], {icon:marcador}).addTo(map);

