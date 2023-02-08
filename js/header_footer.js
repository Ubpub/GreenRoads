const header_view = checkLocalStorage();

let header_id = '#index-header';
const nav_bar = "../views/included-views/nav-bar.html";
let nav_bar_id = '#nav-bar';
const footer_view = "../views/included-views/footer.html";
let footer_id = '#index-footer';

obtenerHeaderFooter(header_view, header_id);
// obtenerHeaderFooter(nav_bar, nav_bar_id);
obtenerHeaderFooter(footer_view, footer_id);

function checkLocalStorage() {
    let header = "nulo";
    if (localStorage.getItem('webToken') != null) {
        header = "../views/included-views/headerlog.html";
    } else {
        header = "../views/included-views/header.html";
    }
    return header;
}

function obtenerHeaderFooter(view, id) {
    fetch(view)
        .then( (response) => response.text())
        .then(data => {
            document.querySelector(id).innerHTML = data;
            document.querySelector('#nom-usu').textContent = `${ localStorage.getItem('usuario')} - Cerrar sesion`;
            cerrarSesion();
        });
}

function cerrarSesion() {
    if (header_view == '../views/included-views/headerlog.html') {
        document.querySelector('#nom-usu').addEventListener('click', (e) => {
            localStorage.removeItem('usuario');
            localStorage.removeItem('webToken');
        });
    }
}
