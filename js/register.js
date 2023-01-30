const hola = '';

renderPage();

function renderPage() {
    document.querySelector('#btn-registro').addEventListener('click', (e) => {
        let vacio = emptyFields();
        let alerta = document.querySelector('#alerta');
        if (vacio == 0) {
            getNameSurname(document.querySelector('#nombreApell').value);
            chekcUsername(document.querySelector('#usuario').value);
            alerta.style.display = 'none';
            let nombre = document.querySelector('#nombreApell').value;
            let usuario = document.querySelector('#usuario').value;
            let correo = document.querySelector('#correo').value;
            let contrasena = document.querySelector('#contrasena').value;
            let nacimiento = document.querySelector('#fechanac').value;
            let estatura = document.querySelector('#estatura').value;
            let peso = document.querySelector('#peso').value;
            let actividades = obtenerActividades();
            let user = generateJSON(nombre, usuario, correo, contrasena, nacimiento, estatura, peso, actividades);

            fetch('http://localhost/GreenRoads/api/register.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json,charset-utf-8'
                },
                body: JSON.stringify(user),
            }).then(response => response.text())
            .then(data => {
                console.log(data);
            })

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
    }
    else if (document.querySelector('#usuario').value == "") {
        vacio = "Nombre de usuario";
    }
    else if (document.querySelector('#correo').value == "") {
        vacio = "Correo electrónico";
    }
    else if (document.querySelector('#contrasena').value == "") {
        vacio = "Contraseña";
    }
    else if (document.querySelector('#fechanac').value == "") {
        vacio = "Fecha de nacimiento";
    }
    else if (document.querySelector('#estatura').value == "") {
        vacio = "Estatura";
    }
    else if (document.querySelector('#peso').value == "") {
        vacio = "Peso";
    }
    return vacio;
}

function getNameSurname(texto) {

    // Sugerir nombre de usuario en un futuro
    /* [nombre, ...apellidos] = texto.split(' ');
    apellidos = apellidos.join(' '); */
}

function chekcUsername() {

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
