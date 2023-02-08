let image = document.querySelector('.image-user');
let imageHD = document.querySelector('.image-user-hd');
console.log(imageHD);

if (localStorage.getItem('usuario') != null) {
    obtenerUsario(localStorage.getItem('usuario'));
}

function obtenerUsario(usuario) {
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