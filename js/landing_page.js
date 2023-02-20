let rutas = document.querySelector('#w-rutas-destacadas');
let maxRutas = 4;
let numRutas = 0;

renderPage();

async function renderPage() {
    const response = await fetch('http://localhost/GreenRoads/api/rutas.php')
        .catch(error => console.error(error));
    const data = await response.json();

    // Recorro las rutas obtenidas y creo un item con cada una
    data.forEach(item => {
        numRutas++;
        if (numRutas <= 4) {
            let ruta = document.createElement('div');
            ruta.classList.add('w-ruta-img');
            ruta.innerHTML = `
                <div class="ruta-img"></div>
                <div class="ruta-texto">
                    <div>${ item.nombre_ruta }</div>
                    <div class="texto-ruta">Dificultad: <span class="span-dificultad">${ item.dificultad }</span></div>
                    <div class="texto-ruta">Distancia: <span class="span-longitud">${ item.distancia } km</span></div>
                    <div class="texto-ruta">Tiempo: <span class="span-tiempo">${ item.tiempo }</span></div>
                </div>`;
            rutas.append(ruta);
        }
    })
}
