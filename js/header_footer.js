const header_view = "./views/header.html";
let header_id = '#index-header';
const footer_view = "./views/footer.html";
let footer_id = '#index-footer';

obtenerHeaderFooter(header_view, header_id);
obtenerHeaderFooter(footer_view, footer_id);

function obtenerHeaderFooter(view, id) {
    fetch(view)
        .then( (response) => response.text())
        .then(data => {
            document.querySelector(id).innerHTML = data;
        });
}