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
                    document.querySelector('#alerta').display = 'block';
            }
        })
        .then( data => {
            console.log(data);
            if (data[0]) {
                localStorage.setItem('webToken', data[0].webToken);
                localStorage.setItem('usuario', data[0].usuario);
            } else {
                console.log("ERROR");
            }
            
        })
}