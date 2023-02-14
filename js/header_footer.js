const header_view = checkLocalStorage();

let header_id = '#index-header';
const nav_bar = "../views/included-views/nav-bar.html";
let nav_bar_id = '#nav-bar';
const footer_view = "../views/included-views/footer.html";
let footer_id = '#index-footer';

obtenerHeaderFooter(header_view, header_id, true);
// obtenerHeaderFooter(nav_bar, nav_bar_id);
obtenerHeaderFooter(footer_view, footer_id, false);

function checkLocalStorage() {
    let header = "nulo";
    if (localStorage.getItem('webToken') != null) {
        header = "../views/included-views/headerlog.html";
    } else {
        header = "../views/included-views/header.html";
    }
    return header;
}

function obtenerHeaderFooter(view, id, isHeader) {
    fetch(view)
        .then( (response) => response.text())
        .then(data => {
            document.querySelector(id).innerHTML = data;
            if (isHeader) {
                if (localStorage.getItem('img') == 'userImagen') document.querySelector('.image-user-hd').style.backgroundImage = `url('../imgs/icons/user-no-image.png')`;
                else {
                    document.querySelector('.image-user-hd').style.backgroundImage = `url('${ localStorage.getItem('img') }')`;
                    document.querySelector('.image-user-hd').style.borderRadius = "50%";
                }
                document.querySelector('#nom-usu').textContent = `${ localStorage.getItem('usuario')} - Cerrar sesión`;
            }
            cerrarSesion();
        });
}

function cerrarSesion() {
    if (header_view == '../views/included-views/headerlog.html') {
        document.querySelector('#nom-usu').addEventListener('click', (e) => {
            localStorage.removeItem('usuario');
            localStorage.removeItem('webToken');
            localStorage.removeItem('id');
            localStorage.removeItem('img');
        });
    }
}
