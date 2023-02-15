let image = document.querySelector('.image-user');

// Comprueba si hay una sesión activa en localStorage
if (localStorage.getItem('usuario') != null) {
    obtenerUsario(localStorage.getItem('usuario'));
}

// Obtiene el usuario con el localStorage y una petición
function obtenerUsario(usuario) {
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
                // Si tiene foto de perfil le pone su foto. Si no, le pone la predeterminada
                if (data[0]['imagen'] != null) {
                    image.style.backgroundImage = `url('${ data[0]['imagen'] }')`;
                    image.style.borderRadius = "50%";
                } else {
                    image.style.backgroundImage = `url('../imgs/icons/user-no-image.png')`
                }
            } else {
                console.log("ERROR");
            }
        })
}