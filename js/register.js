const patrones = {
    'email': /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
};

if (localStorage.getItem('webToken') == null) renderPage();

function renderPage() {
    document.querySelector('#btn-registro').addEventListener('click', (e) => {
        let vacio = emptyFields();
        let alerta = document.querySelector('#alerta');
        let alerta2 = document.querySelector('#alerta2');
        if (vacio == 0) {
            // getNameSurname(document.querySelector('#nombreApell').value);

            // Comprobar si el usuario existe en la base de datos
            let nombre = document.querySelector('#nombreApell').value;
            let usuario = document.querySelector('#usuario').value;
            // console.log(checkUsername(document.querySelector('#usuario').value));
            // let userNameExists = checkUsername(document.querySelector('#usuario').value);
            // console.log(userNameExists);
            let correo = document.querySelector('#correo').value;
            let contrasena = document.querySelector('#contrasena').value;
            let nacimiento = document.querySelector('#fechanac').value;
            let estatura = document.querySelector('#estatura').value;
            let peso = document.querySelector('#peso').value;
            let actividades = obtenerActividades();
            if (!(validateEmail(correo))) {
                writeAlert('Correo no válido');
                changeInputStyle('#correo', 'red');
            } else {
                alerta2.style.display = 'none';
                alerta.style.display = 'none';

                let user = generateJSON(nombre, usuario, correo, contrasena, nacimiento, estatura, peso, actividades);

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

function changeInputStyle(input, color) {
    document.querySelector(input).style.border = `1px solid ${ color }`;
}

function getNameSurname(texto) {
    // Sugerir nombre de usuario en un futuro
    /* [nombre, ...apellidos] = texto.split(' ');
    apellidos = apellidos.join(' '); */
}

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
    // let data = await respuesta.json();
    
    return exists;
}

function validateEmail(correo) {
    valido = comprobarCampos(correo, 'email')
    if (!valido) return false;
    return true;
}

function comprobarCampos(campo, patron) {
    return patrones[patron].test(campo);
}

function obtenerActividades() {
    let actividades = [];
    if (document.querySelector('#jogging').checked) {
        actividades.push('jogging');
    }
    if (document.querySelector('#trekking').checked) {
        actividades.push('trekking');
    }
    if (document.querySelector('#cycling').checked) {
        actividades.push('cycling');
    }
    if (document.querySelector('#mountaineering').checked) {
        actividades.push('mountaineering');
    }
    if (document.querySelector('#walk').checked) {
        actividades.push('walk');
    }
    if (document.querySelector('#kayak').checked) {
        actividades.push('kayak');
    }
    return (actividades.join(' '));
}

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

function writeAlert(texto) {
    document.querySelector('#alerta2').textContent = texto;
    alerta2.style.display = 'block';
}
