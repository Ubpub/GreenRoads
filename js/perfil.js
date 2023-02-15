let user = {};

renderPage();

function renderPage() {
    obtenerUsuario(localStorage.getItem('usuario'));
    document.querySelector('#eliminar').addEventListener('click', clickEliminar);
}

// Mathew Math1234

function obtenerUsuario(usuario) {
    // Petición para obtener usuario
    let url = (`http://localhost/GreenRoads/api/register-login.php?usuario=${ usuario }`);
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
                if (data[0] != null) {
                    // Objeto con información del usuario y mostrar en la página
                    user = {
                        'id': data[0]['id'],
                        'usuario': data[0]['usuario'],
                    };
                    document.querySelector('#nom-usuario').textContent = `${ data[0]['usuario'] }`;
                    document.querySelector('#email').textContent = `${ data[0]['correo'] }`;
                } else {
                    // Si no hay información se muestra lo siguiente
                    document.querySelector('#nom-usuario').textContent = `Usuario`;
                    document.querySelector('#email').textContent = `No hay correo`;
                }
            } else {
                console.log("ERROR");
            }
        })
}

function clickEliminar() {
    // Popup de eliminar cuenta
    document.querySelector('#black-div').style.display = 'block';
    document.querySelector('#delete-alert').style.display = 'grid';
    document.querySelector('#close-icon').addEventListener('click', close);

    // Evento al hacer click
    document.querySelector('#boton-delete').addEventListener('click', () => {

        // Obtiene los valores del formulario
        let input_ctr = document.querySelector('#contrasena');
        let contrasena = input_ctr.value;
        let usuario = {
            'id': user.id,
            'pass': contrasena,
        }

        // Comprueba que la contraseña no esté en blanco
        if (contrasena != "") {

            // Petición DELETE hacia editar.php
            fetch(`http://localhost/GreenRoads/api/editar.php`,{
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json,charset-utf-8'
                },
                body: JSON.stringify(usuario),
            })
            .then(response => {
                switch (response.status) {
                    case 200:
                        // Todo correcto, se eliminan los items de localStorage
                        localStorage.removeItem('usuario');
                        localStorage.removeItem('webToken');
                        localStorage.removeItem('id');
                        localStorage.removeItem('img');
                        document.querySelector('#info').style.display = 'none';
                        document.querySelector('#delete-form').style.display = 'block';
                        return response.text();
                    case 400:
                        console.log("No se ha podido borrar el usuario");
                    case 404:
                        writeAlert("La contraseña es incorrecta");
                        input_ctr.style.border = '1px solid red';
                }
            });
        } else {
            writeAlert("Escribe la contraseña");
            input_ctr.style.border = '1px solid red';
        }
    });
}

// Cierra el Popup de eliminar cuenta
function close() {
    document.querySelector('#delete-alert').style.display = 'none';
    document.querySelector('#black-div').style.display = 'none';
}

// Escribe una alerta con el texto pasado por parámetro
function writeAlert(texto) {
    document.querySelector('.alerta').textContent = texto;
    document.querySelector('.alerta').style.display = 'block';
}
