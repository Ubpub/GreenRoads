// L.map es la clase central de la API. Creamos y manipulamos el mapa
let map = L.map('map').setView([42.60, -5.57], 15);

// Mapa base con máximo nivel de zoom
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
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

// ¡¡ Icono que se puede mover !!
// L.marker([42.60, -5.57],{draggable: true}).addTo(map);
    // .bindPopup('Estás aquí')
    // .openPopup(); 

L.marker([42.60, -5.57], {icon:marcador}).addTo(map);

