let contenido = document.querySelector('#wrapper');
let all_rutas = document.querySelector('#all_rutas');
let rutas = [];

renderPage();

async function renderPage() {
    const response = await fetch(`http://localhost/GreenRoads/api/rutas.php?usuario=${ localStorage.getItem('usuario') }`)
        .catch(error => console.error(error));
    const data = await response.json();
    data.forEach(item => {
        crearRutas(item);
    })
    contenido.append(all_rutas);

    document.querySelector('#buscar-filtros').addEventListener('click', async () => {
        let nombre = document.querySelector('#filtro-nombre').value;
        let dificultad = document.querySelector('#dificultad').value;
        let usuario = document.querySelector('#usuario').value;
        let url = `http://localhost/GreenRoads/api/rutas.php`;
        if (!(nombre == "" && dificultad == "" && usuario == "")) {
            rutas = [];
            let aux = '?';
            if (nombre != "") {
                let nom = nombre.replace(/ /g, '+');
                url = `${ url }${ aux }nombre_ruta=${ nom }`;
                if (aux == '?') {
                    aux = '&';
                }
            }
            if (dificultad != "") {
                url = `${ url }${ aux }dificultad=${ dificultad }`;
                if (aux == '?') {
                    aux = '&';
                }
            }
            if (usuario != "") {
                url = `${ url }${ aux }usuario=${ usuario }`;
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
}

function crearRutas(ruta) {
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
        <div class="img-principal"></div>`;
    contenidoImg.append(imagen);

    // Info
    let info = document.createElement('div');
    info.classList.add('rt-info');

    // Descripción
    let desc = document.createElement('div');
    desc.classList.add('rt-descripcion');
    desc.textContent = `${ ruta.descripcion.slice(0, 200) }...`;
    info.append(desc);

    // Botones
    let botones = document.createElement('div');
    botones.classList.add('botones');

    // Ver ruta
    let ver = document.createElement('div');
    ver.classList.add('ver-ruta');
    let verMas = document.createElement('a');
    verMas.setAttribute('data-id', ruta.id);
    verMas.textContent = 'Ver ruta';
    // verMas.href = 'detalles.php';

    ver.append(verMas);
    botones.append(ver);

    // Editar ruta
    let boton = document.createElement('div');
    boton.classList.add('editar-ruta');
    let editar = document.createElement('a');
    editar.setAttribute('data-id', ruta.id);
    editar.textContent = 'Editar ruta';
    editar.href = 'subir_ruta.html';
    /* editar.addEventListener('click', (e) => {
        e.preventDefault();
        let id = e.target.dataset.id;
        console.log(id);
        window.location.href = `detalles.php?id=${ id }`;
    }); */
    boton.append(editar);
    botones.append(boton);

    info.append(botones);

    contenidoImg.append(info);
    principal.append(contenidoImg);
    all_rutas.append(principal);
}