let contenido = document.querySelector('#wrapper');
let all_rutas = document.createElement('div');
let btn_ver1 = "";
let btn_ver2 = "";
let rutas = [];
window.addEventListener('resize', changeText);

renderPage();

// Carga todos los componentes de la página y sus funciones
async function renderPage() {
    crearMenu(); // Crea el menú superior
    crearMejoresRutas(); // Crea el apartado de mejores rutas
    crearCercanas(); // Crea el apartado de rutas cercanas al usuario
    crearFiltros(); // Crea el menú de filtros de búsqueda de rutas

    // Realizo una petición a rutas.php para obtener todas las rutas
    const response = await fetch('http://localhost/GreenRoads/api/rutas.php')
        .catch(error => console.error(error));
    const data = await response.json();

    // Recorro las rutas obtenidas y creo un item con cada una
    data.forEach(item => {
        crearRutas(item);
    })
    contenido.append(all_rutas);
}

// Crea el menú superior
function crearMenu() {
    // Div principal
    let menu = document.createElement('div');
    menu.id = 'busqueda';

    // Elementos del menú
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

    menu.append(seleccion); // Añadir al menú

    // Barra de búsqueda y subida de rutas
    let barra = document.createElement('div');
    barra.id = 'barra';
    let busqueda = document.createElement('div');
    busqueda.classList.add('barra-item');
    busqueda.innerHTML = `<input type="text" name="buscar-ruta" id="buscar-ruta" placeholder="Buscar rutas...">`;
    barra.append(busqueda);
    let subir = document.createElement('div');
    subir.classList.add('barra-item');
    let subirDiv = document.createElement('div');
    subirDiv.id = 'subir-ruta';
    subirDiv.innerHTML = `<i class="bi bi-cloud-arrow-up"></i>&nbsp;&nbsp;Subir ruta`;
    subirDiv.addEventListener('click', () => {
        if (localStorage.getItem('usuario') && localStorage.getItem('webToken')) {
            window.location.href = 'subir_ruta.html';
        } else {
            window.location.href = 'login.html';
        }
    })
    subir.append(subirDiv);
    barra.append(subir);

    menu.append(barra);

    contenido.append(menu); // Lo añado al contenedor principal
}

// Creación el apartado de mejores rutas
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
    
    // Petición para obtener todas las rutas
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
        // Creación depárrafo con la cantidad de rutas totales
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

    contenido.append(mejoresRutas); // Añadir al contenedor principal
}

// Creación del apartado de rutas cercanaas al usuario
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

    // Otra petición para obtener las rutas totales
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

    contenido.append(principal); // Añadir al contenedor principal
}

// Creación del formulario de búsqueda de filtros
function crearFiltros() {
    // Formulario
    let formulario = document.createElement('form');
    formulario.action = "";
    formulario.method = "post";

    // Principal
    let principal = document.createElement('div');
    principal.id = 'filtros';

    principal.innerHTML = `
        <div class="filtro-titulo"><h2><i class="bi bi-search"></i>Filtros de búsqueda</h2></div>`;

    // Nombre de la ruta
    let fNombre = document.createElement('div');
    fNombre.classList.add('filtros-item');
    let iNombre = document.createElement('input');
    iNombre.type = "text";
    iNombre.name = "filtro-nombre";
    iNombre.id = "filtro-nombre";
    iNombre.placeholder = "Nombre de la ruta";
    fNombre.append(iNombre);
    principal.append(fNombre);

    // Dificultad de la ruta
    let fDificultad = document.createElement('div');
    fDificultad.classList.add('filtros-item');
    let iDificultad = document.createElement('input');
    iDificultad.type = "text";
    iDificultad.name = "dificultad";
    iDificultad.id = "dificultad";
    iDificultad.placeholder = "Dificultad";
    fDificultad.append(iDificultad);
    principal.append(fDificultad);

    // Ciudad de la ruta
    let fUsuario = document.createElement('div');
    fUsuario.classList.add('filtros-item');
    let iUsuario = document.createElement('input');
    iUsuario.type = "text";
    iUsuario.name = "usuario";
    iUsuario.id = "usuario";
    iUsuario.placeholder = "Usuario";
    fUsuario.append(iUsuario);
    principal.append(fUsuario);
    
    // Botón de buscar
    let buscar = document.createElement('div');
    buscar.classList.add('filtros-item');

    let boton = document.createElement('div');
    boton.id = 'buscar-filtros';
    boton.textContent = 'Buscar';

    boton.addEventListener('click', async () => {
        let url = `http://localhost/GreenRoads/api/rutas.php`;
        if (!(iNombre.value == "" && iDificultad.value == "" && iUsuario.value == "")) {
            rutas = [];
            let aux = '?';
            if (iNombre.value != "") {
                let nombre = iNombre.value.replace(/ /g, '+');
                url = `${ url }${ aux }nombre_ruta=${ nombre }`;
                if (aux == '?') {
                    aux = '&';
                }
            }
            if (iDificultad.value != "") {
                url = `${ url }${ aux }dificultad=${ iDificultad.value }`;
                if (aux == '?') {
                    aux = '&';
                }
            }
            if (iUsuario.value != "") {
                url = `${ url }${ aux }usuario=${ iUsuario.value }`;
                if (aux == '?') {
                    aux = '&';
                }
            }
        }
        all_rutas.innerHTML = ``;
        const response = await fetch( url )
            .catch(error => console.error(error));
            const data = await response.json();
        
            // Recorro las rutas obtenidas y creo un item con cada una
            data.forEach(item => {
                crearRutas(item);
            })
    });
    buscar.append(boton);

    principal.append(buscar);
    formulario.append(principal);
    contenido.append(formulario);
}

// Crear item para una ruta
function crearRutas(ruta) {
    // Pincipal
    let principal = document.createElement('div');
    principal.classList.add('item-ruta');

    // Título
    let titulo = document.createElement('div');
    titulo.classList.add('rt-titulo');
    titulo.innerHTML = `
        <div class="nombre-ruta"><h2>${ ruta.nombre_ruta }</h2></div>
        <div class="lugar-ruta"><h4>${ ruta.usuario }</h4></div>`;
    // <div class="lugar-ruta"><h4>País - Comunidad - Ciudad</h4></div>
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
            <tr><td class="dificultad">${ ruta.dificultad }</td></tr>
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
    desc.textContent = `${ ruta.descripcion.slice(0, 200) }...`;
    info.append(desc);

    // Ver ruta
    let boton = document.createElement('div');
    boton.classList.add('ver-ruta');
    let verMas = document.createElement('a');
    verMas.setAttribute('data-id', ruta.id);
    verMas.textContent = 'Ver más';
    verMas.href = 'detalles.php';
    verMas.addEventListener('click', (e) => {
        e.preventDefault();
        let id = e.target.dataset.id;
        console.log(id);
        window.location.href = `detalles.php?id=${ id }`;
    });
    boton.append(verMas);
    info.append(boton);

    contenidoImg.append(info);
    principal.append(contenidoImg);
    all_rutas.append(principal);
    
}

// Obtiene todas las rutas con una petición
async function obtenerRutas() {
    const response = await fetch('http://localhost/GreenRoads/api/rutas.php')
        .catch(error => console.error(error));
    const data = await response.json();
    return data;
}

// Cambia el texto de unos botones dependiendo del tamaño de la página
function changeText() {
    if(document.documentElement.clientWidth < 420) {
        btn_ver1.innerHTML = `<i class="bi bi-plus-lg"></i>`;
        btn_ver2.innerHTML = `<i class="bi bi-plus-lg"></i>`;
    } else {
        btn_ver1.textContent = `Ver más`;
        btn_ver2.textContent = `Ver más`;
    }
}
