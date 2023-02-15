// Patrones para el correo y la fecha
let patron = {
    'email': /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
    'fecha': /^([1-2][0-9]{3})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[0-1])$/,
};

// Carga los componentes de la página
renderPage();

function renderPage() {
    // Obtiene el usuario utilizando localStorage
    obtenerUsuario(localStorage.getItem('usuario'));
};

// Obtiene el usuario pasado por parámetro
function obtenerUsuario(usuario) {
    
    // Petición para obtener el usuario
    const url = (`http://localhost/GreenRoads/api/usuario.php?usuario=${ usuario }`);
    fetch( url )
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                case 404:
                    console.log("ERROR");
            }
        })
        .then(data => {
            if (data[0]) {
                // Se ejecuta si el primer dato no es nulo
                if (data[0] != null) {

                    // Escribir campos del formulario con los valores obtenidos
                    document.querySelector('#nombreApell').value = `${ data[0]['nom_ape'] }`;
                    document.querySelector('#usuario').value = `${ data[0]['usuario'] }`;
                    document.querySelector('#correo').value = `${ data[0]['correo'] }`;
                    document.querySelector('#estatura').value = `${ data[0]['estatura'] }`;
                    document.querySelector('#peso').value = `${ data[0]['peso'] }`;
                    document.querySelector('#fechanac').value = `${ data[0]['fecnac'] }`;

                    // Escribir actividades
                    let actividades = data[0]['activ_fav'].split(' ');
                    if (actividades.length > 0){
                        actividades.forEach(item => {
                            document.querySelector(`#${ item }`).checked = true;
                        });
                    }

                    // Evento para guardar los cambios
                    document.querySelector("#btn-editar").addEventListener('click', () => {

                        // Comprueba que la contraseña no se haya dejado vacía
                        if (document.querySelector('#contrasena').value != "") {

                            // Recoger valores del formulario
                            let nomApe = document.querySelector('#nombreApell').value;
                            let usuerName = document.querySelector('#usuario').value;
                            let correo = document.querySelector('#correo').value;
                            let estatura = document.querySelector('#estatura').value;
                            let peso = document.querySelector('#peso').value;
                            let fechanac = document.querySelector('#fechanac').value;

                            // Oculta la alerta en caso de que esté visible
                            document.querySelector('#alerta2').style.display = 'none';
                            document.querySelector('#contrasena').style.border = '1px solid #B9B9B9';

                            // Comprobar campos vacíos
                            if ((nomApe != null && nomApe != "") &&
                                (usuerName != null && usuerName != "") &&
                                (correo != null && correo != "") &&
                                (estatura != null && estatura != "") &&
                                (peso != null && peso != "") &&
                                (fechanac != null && fechanac != ""))
                            {
                                // Comprobación de patrones
                                if (!patron['email'].test(correo)) {
                                    document.querySelector('#alerta2').textContent = 'Correo no válido';
                                    alerta2.style.display = 'block';
                                } else if (!patron['fecha'].test(fechanac)) {
                                    document.querySelector('#alerta2').textContent = 'Fecha no válida';
                                    alerta2.style.display = 'block';
                                } else {

                                    // Almacenar las actividades seleccionadas
                                    let actividadesArr = [];
                                    if (document.querySelector('#jogging').checked) actividadesArr.push('jogging');
                                    if (document.querySelector('#trekking').checked) actividadesArr.push('trekking');
                                    if (document.querySelector('#cycling').checked) actividadesArr.push('cycling');
                                    if (document.querySelector('#mountaineering').checked) actividadesArr.push('mountaineering');
                                    if (document.querySelector('#walk').checked) actividadesArr.push('walk');
                                    if (document.querySelector('#kayak').checked)  actividadesArr.push('kayak');
                                    actividadesArr = actividadesArr.join(' ');

                                    // Creación del JSON del usuario
                                    let user = {
                                        'nombre': document.querySelector('#nombreApell').value,
                                        'usuario': document.querySelector('#usuario').value,
                                        'correo': document.querySelector('#correo').value,
                                        'contrasena': document.querySelector('#contrasena').value,
                                        'nacimiento': document.querySelector('#fechanac').value,
                                        'estatura': document.querySelector('#estatura').value,
                                        'peso': document.querySelector('#peso').value,
                                        'actividades': actividadesArr,
                                    };

                                    // Fetch a la API editar.php
                                    const url2 = (`http://localhost/GreenRoads/api/editar.php`);
                                    fetch( url2, {
                                        method: 'POST',
                                        headers: {
                                            'Content-type': 'application/json,charset-utf-8'
                                        },
                                        body: JSON.stringify(user),
                                    } )
                                    .then(response => {
                                        switch (response.status) {
                                            case 200:
                                                return response.json();
                                            case 404:
                                                return 400;
                                            case 409:
                                                return 409;
                                        }
                                    })
                                    .then(data => {
                                        // Comprueba los resultados que ha devuelto
                                        if (data != 409 && data != 400){
                                            document.querySelector('#informacion').style.display = 'none';
                                            document.querySelector('#editado').style.display = 'block';
                                        } else {
                                            document.querySelector('#alerta2').textContent = 'Contraseña incorrecta'
                                            document.querySelector('#alerta2').style.display = 'block';
                                        }
                                    })
                                }
                            } else {
                                document.querySelector('#alerta2').textContent = 'Hay campos vacíos'
                                document.querySelector('#alerta2').style.display = 'block';
                            }
                        } else {
                            document.querySelector('#alerta2').textContent = 'Pon tu contraseña'
                            document.querySelector('#alerta2').style.display = 'block';
                            document.querySelector('#contrasena').style.border = '1px solid red';
                        }
                    });
                }
            } else {
                console.log("ERROR");
            }
        })
}

// Escribe una alerta
function writeAlert(texto) {
    document.querySelector('#alerta2').textContent = texto;
    alerta2.style.display = 'block';
}
