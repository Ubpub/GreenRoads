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
            let user = generateJSON(nombre, usuario, correo, contrasena, nacimiento, estatura, peso);

            fetch('localhost/api/register.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json,charset-utf-8'
                },
                body: user,
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

function generateJSON(nombre, usuario, correo, contrasena, nacimiento, estatura, peso) {
    return user = {
        'nombre': nombre,
        'usuario': usuario,
        'correo': correo,
        'contrasena': contrasena,
        'nacimiento': nacimiento,
        'estatura': estatura,
        'peso': peso,
    };
}
