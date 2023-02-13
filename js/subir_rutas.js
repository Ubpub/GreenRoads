document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Cargar el fichero
    let fileInput = document.getElementById("gpx");
    console.log(fileInput);
    let file = fileInput.files[0];
    console.log("FICHERO:", file);
    let reader = new FileReader();
    console.log("READER:", reader);

    reader.onload = function() {
        let gpx = reader.result;
        console.log("GPX:", gpx);
        let route_name = document.getElementById('nombre').value;
        console.log("NOMBRE RUTA:", route_name);
        // let id = document.getElementById('').value;
        let desc = document.getElementById('descripcion').value;
        console.log("DESCRIPCIÓN:", desc);

        fetch('http://localhost/GreenRoads/api/rutas.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json,charset-utf-8'
            },
            body: JSON.stringify({
                id,
                route_name,
                desc,
                gpx,
            })
        })
        .then((result) => {
            switch (result.status) {
                case 200:
                    return result.json();
                case 404:
                    console.log("ERROR");
            }
        });
    };
    reader.readAsText(file);
});