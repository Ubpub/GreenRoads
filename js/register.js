const patrones = {
    'email': /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
    'fecha': /^([1-2][0-9]{3})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[0-1])$/,
    'contrasena': /^(?=.*)(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

if (localStorage.getItem('webToken') == null) renderPage();

// Carga la página
function renderPage() {

    // Evento para click
    document.querySelector('#btn-registro').addEventListener('click', (e) => {
        // Comprueba los campos vacíos
        let vacio = emptyFields();
        let alerta = document.querySelector('#alerta');
        let alerta2 = document.querySelector('#alerta2');

        // Se ejecuta si no hay vacíos
        if (vacio == 0) {
            // getNameSurname(document.querySelector('#nombreApell').value);

            // Obtener todos los valores del formulario
            let nombre = document.querySelector('#nombreApell').value;
            let usuario = document.querySelector('#usuario').value;
            // let userNameExists = checkUsername(document.querySelector('#usuario').value);
            let correo = document.querySelector('#correo').value;
            let contrasena = document.querySelector('#contrasena').value;
            let nacimiento = document.querySelector('#fechanac').value;
            let estatura = document.querySelector('#estatura').value;
            let peso = document.querySelector('#peso').value;
            let actividades = obtenerActividades();

            // Comprobar campos
            // MATH: math1234MATH
            if (!(comprobarCampos(correo, 'email'))) {
                writeAlert('Correo no válido');
                changeInputStyle('#correo', 'red');
            } else if(!(comprobarCampos(contrasena, 'contrasena'))) {
                writeAlert('La contraseña debe contener al menos 8 caracteres, mayúsculas, minísculas y números');
                changeInputStyle('#contrasena', 'red');
            }else if(!(comprobarCampos(nacimiento, 'fecha'))) {
                writeAlert('Fecha no válida');
                changeInputStyle('#fechanac', 'red');
            }else {

                // Oculta las alertas en caso de que no lo estuviesen
                alerta2.style.display = 'none';
                alerta.style.display = 'none';

                // Genera un JSON con los datos obtenidos
                let user = generateJSON(nombre, usuario, correo, contrasena, nacimiento, estatura, peso, actividades);

                // Petición para registrarse
                fetch('http://localhost/GreenRoads/api/register-login.php', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json,charset-utf-8'
                    },
                    body: JSON.stringify(user),
                }).then(response => {
                    switch(response.status) {
                        case 200:
                            return response.text();
                        case 404:
                            writeAlert('Ha ocurrido un error');
                        case 409:
                            writeAlert('El nombre de usuario ya está en uso');
                            changeInputStyle('#usuario', 'red');
                    }
                    
                })
                .then(data => {
                    document.querySelector('#registro').style.display = 'none';
                    document.querySelector('#registrado').style.display = 'block';
                })
            }
        } else {
            document.querySelector('#nombre-campo').textContent = vacio;
            alerta.style.display = 'block';
        }
    });
}

// Cambia el estilo del input pasado por parámetro
function changeInputStyle(input, color) {
    document.querySelector(input).style.border = `1px solid ${ color }`;
}

function getNameSurname(texto) {
    // Sugerir nombre de usuario en un futuro
    /* [nombre, ...apellidos] = texto.split(' ');
    apellidos = apellidos.join(' '); */
}

// Comprueba si el nombre de usuario ya existe
async function checkUsername(usuario) {
    let exists = false;
    let respuesta = await fetch(`http://localhost/GreenRoads/api/register-login.php`)
        .then( respuesta => {return respuesta.json();} )
        .then( data => {
            data.forEach(item => {
                if (item['usuario'] == usuario) {
                    exists = true;
                }
            });
        } );
    
    return exists;
}

// Comprueba los campos con los patrones
function comprobarCampos(campo, patron) {
    return patrones[patron].test(campo);
}

// Obtiene las actividades seleccionadas del formulario
function obtenerActividades() {
    let actividades = [];
    if (document.querySelector('#jogging').checked) actividades.push('jogging');
    if (document.querySelector('#trekking').checked) actividades.push('trekking');
    if (document.querySelector('#cycling').checked) actividades.push('cycling');
    if (document.querySelector('#mountaineering').checked) actividades.push('mountaineering');
    if (document.querySelector('#walk').checked) actividades.push('walk');
    if (document.querySelector('#kayak').checked) actividades.push('kayak');

    // Lo devuelve como una cadena separada por espacios
    return (actividades.join(' '));
}

// Genera un JSON con los datos obtenidos del usuario
function generateJSON(nombre, usuario, correo, contrasena, nacimiento, estatura, peso, actividades) {
    return user = {
        'nombre': nombre,
        'usuario': usuario,
        'correo': correo,
        'contrasena': contrasena,
        'nacimiento': nacimiento,
        'estatura': estatura,
        'peso': peso,
        'actividades': actividades,
    };
}

// Escribe una alerta con el texto pasado por parámetro
function writeAlert(texto) {
    document.querySelector('#alerta2').textContent = texto;
    alerta2.style.display = 'block';
}

// Comprueba campos vacíos y les da estilos
function emptyFields() {
    let inputs = document.querySelectorAll('input');
    Array.from(inputs).forEach(item => {
        item.style.border = '1px solid #B9B9B9';
    })
    let vacio = 0;
    if (document.querySelector('#nombreApell').value == "") {
        vacio = "Nombre y apellidos";
        changeInputStyle('#nombreApell', 'red');
    }
    else if (document.querySelector('#usuario').value == "") {
        vacio = "Nombre de usuario";
        changeInputStyle('#usuario', 'red');
    }
    else if (document.querySelector('#correo').value == "") {
        vacio = "Correo electrónico";
        changeInputStyle('#correo', 'red');
    }
    else if (document.querySelector('#contrasena').value == "") {
        vacio = "Contraseña";
        changeInputStyle('#contrasena', 'red');
    }
    else if (document.querySelector('#fechanac').value == "") {
        vacio = "Fecha de nacimiento";
        changeInputStyle('#fechanac', 'red');
    }
    else if (document.querySelector('#estatura').value == "") {
        vacio = "Estatura";
        changeInputStyle('#estatura', 'red');
    }
    else if (document.querySelector('#peso').value == "") {
        vacio = "Peso";
        changeInputStyle('#peso', 'red');
    }
    return vacio;
}
