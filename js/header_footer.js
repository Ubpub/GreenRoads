const header_view = "./views/included-views/header.html";
let header_id = '#index-header';
const nav_bar = "/views/included-views/nav-bar.html";
let nav_bar_id = '#nav-bar';
const footer_view = "/views/included-views/footer.html";
let footer_id = '#index-footer';

obtenerHeaderFooter(header_view, header_id);
// obtenerHeaderFooter(nav_bar, nav_bar_id);
obtenerHeaderFooter(footer_view, footer_id);

function obtenerHeaderFooter(view, id) {
    fetch(view)
        .then( (response) => response.text())
        .then(data => {
            document.querySelector(id).innerHTML = data;
        });
}