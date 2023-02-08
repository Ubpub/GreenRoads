renderPage();

function renderPage() {
    obtenerUsuario(localStorage.getItem('usuario'));
}

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
                    document.querySelector('#nom-usuario').textContent = `${ data[0]['usuario'] }`;
                    document.querySelector('#email').textContent = `${ data[0]['correo'] }`;
                } else {
                    document.querySelector('#nom-usuario').textContent = `Usuario`;
                    document.querySelector('#email').textContent = `No hay correo }`;
                }
            } else {
                console.log("ERROR");
            }
        })
}