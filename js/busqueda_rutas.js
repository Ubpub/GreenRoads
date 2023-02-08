let contenido = document.querySelector('#wrapper');
let btn_ver1 = "";
let btn_ver2 = "";
let rutas = [];
window.addEventListener('resize', changeText);

renderPage();

async function renderPage() {
    crearMenu();
    crearMejoresRutas();
    crearCercanas();
    crearFiltros();
    const response = await fetch('http://localhost/GreenRoads/api/rutas.php')
        .catch(error => console.error(error));
    const data = await response.json();
    data.forEach(item => {
        console.log(item.usuario);
        crearRutas(item);
    })
}

function crearMenu() {
    // Div principal
    let menu = document.createElement('div');
    menu.id = 'busqueda';

    let seleccion = document.createElement('div');
    seleccion.id = 'menu';
    let rutas = document.createElement('a');
    rutas.href = '#';
    rutas.id = "link-rutas";
    rutas.textContent = 'Rutas';
    seleccion.append(rutas);
    seleccion.append('|');
    let mapa = document.createElement('a');
    mapa.href = 'mapa.html';
    mapa.id = "link-mapa";
    mapa.textContent = 'Mapa';
    seleccion.append(mapa);

    menu.append(seleccion);

    let barra = document.createElement('div');
    barra.id = 'barra';
    let busqueda = document.createElement('div');
    busqueda.classList.add('barra-item');
    busqueda.innerHTML = `<input type="text" name="buscar-ruta" id="buscar-ruta" placeholder="Buscar rutas...">`;
    barra.append(busqueda);
    let subir = document.createElement('div');
    subir.classList.add('barra-item');
    subir.innerHTML = `<div id="subir-ruta"><i class="bi bi-cloud-arrow-up"></i>&nbsp;&nbsp;Subir ruta</div>`;
    barra.append(subir);

    menu.append(barra);

    contenido.append(menu);
}

function crearMejoresRutas() {
    // Div principal
    let mejoresRutas = document.createElement('div');
    mejoresRutas.id = 'mejores-rutas';

    // Título
    let titulo = document.createElement('div');
    titulo.id = 'mr-titulo';
    let t1 = document.createElement('div');
    t1.id = 'mr-titulo-1';
    t1.innerHTML = `
        <img src="../imgs/icons/senderismo-icono.webp" alt="Senderista">
        <h2>Mejores rutas de senderismo</h2>`;
    titulo.append(t1);

    let t2 = document.createElement('div');
    t2.id = 'mr-titulo-2';
    
    fetch('http://localhost/GreenRoads/api/rutas.php')
    .then(response => {
        switch(response.status) {
            case 200:
                return response.json();
            case 404:
                console.log("ERROR");
        }
    })
    .then(data => {
        t2.innerHTML = `<h4><span>${ data.length }</span> ${ data.length == 1 ? "ruta" : "rutas" }</h4>`;
    });

    titulo.append(t2);

    mejoresRutas.append(titulo);

    // Rutas
    let img = document.createElement('div');
    img.id = "mr-img";
    for (let i = 0; i < 3; i++) {
        let item = document.createElement('div');
        img.append(item);
    }
    mejoresRutas.append(img);

    // Botón
    let boton = document.createElement('div');
    boton.id = 'mr-ver-mas';
    let bItem = document.createElement('div');
    bItem.id = "mr-btn-ver-mas";
    bItem.textContent = "Ver más";
    boton.append(bItem);
    btn_ver1 = bItem;
    mejoresRutas.append(boton);

    contenido.append(mejoresRutas);
}

function crearCercanas() {
    // Principal
    let principal = document.createElement('div');
    principal.id = 'cerca-de-ti';

    // Titulo
    let titulo = document.createElement('div');
    titulo.id = 'cr-titulo';

    let t1 = document.createElement('div');
    t1.id = 'cr-titulo-1';
    t1.innerHTML = `
        <img src="../imgs/icons/ubicacion.png" alt="Ubicación">
        <h2>Cerca de ti</h2>`;
    titulo.append(t1);

    let t2 = document.createElement('div');
    t2.id = 'cr-titulo-2';
    fetch('http://localhost/GreenRoads/api/rutas.php')
    .then(response => {
        switch(response.status) {
            case 200:
                return response.json();
            case 404:
                console.log("ERROR");
        }
    })
    .then(data => {
        t2.innerHTML = `<h4><span>${ data.length }</span> ${ data.length == 1 ? "ruta" : "rutas" }</h4>`;
    });
    titulo.append(t2);

    principal.append(titulo);

    // Rutas
    let img = document.createElement('div');
    img.id = "cr-img";
    for (let i = 0; i < 3; i++) {
        let item = document.createElement('div');
        img.append(item);
    }
    principal.append(img);

    // Botón
    let boton = document.createElement('div');
    boton.id = 'cr-ver-mas';
    let bItem = document.createElement('div');
    bItem.id = "cr-btn-ver-mas";
    bItem.textContent = "Ver más";
    boton.append(bItem);
    btn_ver2 = bItem;
    principal.append(boton);

    contenido.append(principal);
}

function crearFiltros() {
    // Formulario
    let formulario = document.createElement('form');
    formulario.action = "";
    formulario.method = "post";

    // Principal
    let principal = document.createElement('div');
    principal.id = 'filtros';
    principal.innerHTML = `
        <div class="filtro-titulo"><h2><i class="bi bi-search"></i>Filtros de búsqueda</h2></div>
        <div class="filtros-item"><input type="text" name="filtro-nombre" id="filtro-nombre" placeholder="Nombre de la ruta"></div>
        <div class="filtros-item"><input type="text" name="localidad" id="localidad" placeholder="Localidad"></div>
        <div class="filtros-item"><input type="text" name="ciudad" id="ciudad" placeholder="Ciudad"></div>
        <div class="filtros-item"><div id="buscar-filtros">Buscar</div></div>`;
    
    formulario.append(principal);

    contenido.append(formulario);
}

function crearRutas(ruta) {
    console.log(ruta);
    // Pincipal
    let principal = document.createElement('div');
    principal.classList.add('item-ruta');

    // Título
    let titulo = document.createElement('div');
    titulo.classList.add('rt-titulo');
    titulo.innerHTML = `
        <div class="nombre-ruta"><h2>${ ruta.nombre_ruta }</h2></div>
        <div class="lugar-ruta"><h4>País - Comunidad - Ciudad</h4></div>`;
    principal.append(titulo);

    // Contenido
    let contenidoImg = document.createElement('div');
    contenidoImg.classList.add('rt-contenido');

    // Imágenes
    let imagen = document.createElement('div');
    imagen.classList.add('rt-ct-img');
    imagen.innerHTML = `
        <div class="img-principal"></div>
        <div class="img-mini"></div>
        <div class="img-mini"></div>
        <div class="more-img"></div>`;
    contenidoImg.append(imagen);

    // Info
    let info = document.createElement('div');
    info.classList.add('rt-info');

    let tabla = document.createElement('div');
    tabla.classList.add('rt-table');

    let distancia = document.createElement('div');
    distancia.classList.add('div-info');
    distancia.innerHTML = `
        <table>
            <tr><th>Distancia</th></tr>
            <tr><td class="distancia">${ ruta.distancia } km</td></tr>
        </table>`;
    tabla.append(distancia);

    let dificultad = document.createElement('div');
    dificultad.classList.add('div-info');
    dificultad.innerHTML = `
        <table>
            <tr><th>Dificultad</th></tr>
            <tr><td class="dificultad">--</td></tr>
        </table>`;
    tabla.append(dificultad);

    let puntuacion = document.createElement('div');
    puntuacion.classList.add('div-puntuacion');
    puntuacion.innerHTML = `<span class="cantidad">0</span>&nbsp;|&nbsp;<i class="bi bi-star-fill"></i>&nbsp;<span class="puntuacion">5</span>`;
    tabla.append(puntuacion);

    info.append(tabla);

    // Descripción
    let desc = document.createElement('div');
    desc.classList.add('rt-descripcion');
    desc.textContent = `${ ruta.descripcion }`;
    info.append(desc);

    // Ver ruta
    let boton = document.createElement('div');
    boton.classList.add('ver-ruta');
    boton.innerHTML = `<a href="#">Ver ruta</a>`;
    info.append(boton);

    contenidoImg.append(info);
    principal.append(contenidoImg);
    contenido.append(principal);
}

async function obtenerRutas() {
    const response = await fetch('http://localhost/GreenRoads/api/rutas.php')
        .catch(error => console.error(error));
    const data = await response.json();
    return data;
}

function changeText() {
    if(document.documentElement.clientWidth < 420) {
        btn_ver1.innerHTML = `<i class="bi bi-plus-lg"></i>`;
        btn_ver2.innerHTML = `<i class="bi bi-plus-lg"></i>`;
    } else {
        btn_ver1.textContent = `Ver más`;
        btn_ver2.textContent = `Ver más`;
    }
}
