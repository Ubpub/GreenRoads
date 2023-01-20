const hola = '';

renderPage();

function renderPage() {
    document.querySelector('#btn-registro').addEventListener('click', (e) => {
        getNameSurname(document.querySelector('#nombreApell').value);
        getuser(document.querySelector('#usuario').value);
    });
}

function getNameSurname(texto) {

    // Sugerir nombre de usuario en un futuro
    /* [nombre, ...apellidos] = texto.split(' ');
    apellidos = apellidos.join(' '); */
}

function chekcUsername() {

}
