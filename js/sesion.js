// Evento onClick del botón de Inicio de sesión
let login = document.querySelector('#btn-inicio');
login.addEventListener('click', sesion);

function sesion() {
    // Obtener valores del formulario
    let usuario = document.querySelector('#usuario-correo').value;
    let pass = document.querySelector('#contrasena').value;

    // Petición pasando el usuario y la contraseña
    const url = (`http://localhost/GreenRoads/api/usuario.php?usuario=${ usuario }&pass=${ pass }`);
    fetch( url )
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                case 404:
                    document.querySelector('#alerta').style.display = 'block';
                case 409:
                    document.querySelector('#alerta').style.display = 'block';
            }
        })
        .then( data => {
            if (data[0]) {
                // Añade los datos a localStorage para mantener la sesión activa
                localStorage.setItem('webToken', data[0].webToken);
                localStorage.setItem('usuario', data[0].usuario);
                localStorage.setItem('id', data[0].id);

                // Comprueba si tiene una imagen
                if(data[0].imagen != null) localStorage.setItem('img', data[0].imagen);
                else localStorage.setItem('img', 'userImagen');
                
                document.querySelector('#login').style.display = 'none';
                document.querySelector('#logueado').style.display = 'block';
            } else {
                console.log("ERROR");
            }
        })
}