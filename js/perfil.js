let user = {};

renderPage();

function renderPage() {
    obtenerUsuario(localStorage.getItem('usuario'));
    document.querySelector('#eliminar').addEventListener('click', clickEliminar);
}

// Mathew Math1234

function obtenerUsuario(usuario) {
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
                    user = {
                        'id': data[0]['id'],
                        'usuario': data[0]['usuario'],
                    };
                    document.querySelector('#nom-usuario').textContent = `${ data[0]['usuario'] }`;
                    document.querySelector('#email').textContent = `${ data[0]['correo'] }`;
                } else {
                    document.querySelector('#nom-usuario').textContent = `Usuario`;
                    document.querySelector('#email').textContent = `No hay correo`;
                }
            } else {
                console.log("ERROR");
            }
        })
}

function clickEliminar() {
    document.querySelector('#black-div').style.display = 'block';
    document.querySelector('#delete-alert').style.display = 'grid';
    document.querySelector('#close-icon').addEventListener('click', close);
    document.querySelector('#boton-delete').addEventListener('click', eliminarUsuario);
}

function close() {
    document.querySelector('#delete-alert').style.display = 'none';
    document.querySelector('#black-div').style.display = 'none';
}

function eliminarUsuario() {
    let input_ctr = document.querySelector('#contrasena');
    let contrasena = input_ctr.value;
    if (contrasena != "") {
        fetch(`http://localhost/GreenRoads/api/editar.php?id=${ user.id }&pass=${ contrasena }`)
        .then(response => {
            switch (response.status) {
                case 200:
                    localStorage.removeItem('usuario');
                    localStorage.removeItem('webToken');
                    localStorage.removeItem('id');
                case 400:
                    console.log("No se ha podido borrar el usuario");
                case 404:
                    writeAlert("La contraseña es incorrecta");
                    input_ctr.style.border = '1px solid red';
            }
        })
        .then(data => {
            console.log(data);
        })
    } else {
        writeAlert("Escribe la contraseña");
        input_ctr.style.border = '1px solid red';
    }
}

function writeAlert(texto) {
    document.querySelector('.alerta').textContent = texto;
    document.querySelector('.alerta').style.display = 'block';
}
