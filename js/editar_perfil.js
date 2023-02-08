renderPage();

function renderPage() {
    obtenerUsuario(localStorage.getItem('usuario'));
};

function obtenerUsuario(usuario) {
    const url = (`http://localhost/GreenRoads/api/register-login.php?usuario=${ usuario }`);
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
                if (data[0]['imagen'] != null) {

                    // Escribir campos
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

                        if (document.querySelector('#contrasena').value != "") {

                            // Comprobar campos vacíos
                            if ((document.querySelector('#nombreApell').value != null && document.querySelector('#nombreApell').value != "") &&
                                (document.querySelector('#usuario').value != null && document.querySelector('#usuario').value != "") &&
                                (document.querySelector('#correo').value != null && document.querySelector('#correo').value != "") &&
                                (document.querySelector('#estatura').value != null && document.querySelector('#estatura').value != "") &&
                                (document.querySelector('#peso').value != null && document.querySelector('#peso').value != "") &&
                                (document.querySelector('#fechanac').value != null && document.querySelector('#fechanac').value != ""))
                            {

                                document.querySelector('#alerta2').style.display = 'none';
                                document.querySelector('#contrasena').style.border = '1px solid #B9B9B9';

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
                                            console.log("ERROR");
                                    }
                                })
                                .then(data => {
                                    document.querySelector('#izquierda').style.display = 'none';
                                    document.querySelector('#derecha').style.display = 'none';
                                    document.querySelector('#editado').style.display = 'block';
                                })
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
                } else {
                    document.querySelector('#nom-usuario').textContent = `Usuario`;
                    document.querySelector('#email').textContent = `No hay correo }`;
                }
            } else {
                console.log("ERROR");
            }
        })
}
