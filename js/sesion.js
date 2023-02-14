let login = document.querySelector('#btn-inicio')
login.addEventListener('click', sesion);

function sesion() {
    let usuario = document.querySelector('#usuario-correo').value;
    let pass = document.querySelector('#contrasena').value;
    console.log("Usuario:", usuario);
    console.log("Pass:", pass);

    const url = (`http://localhost/GreenRoads/api/register-login.php?usuario=${ usuario }&pass=${ pass }`);
    console.log("URL:", url);
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
            console.log(data);
            if (data[0]) {
                console.log(data[0]);
                localStorage.setItem('webToken', data[0].webToken);
                localStorage.setItem('usuario', data[0].usuario);
                localStorage.setItem('id', data[0].id);
                if(data[0].imagen != null) localStorage.setItem('img', data[0].imagen);
                else localStorage.setItem('img', 'userImagen');
                document.querySelector('#login').style.display = 'none';
                document.querySelector('#logueado').style.display = 'block';
            } else {
                console.log("ERROR");
            }
        })
}