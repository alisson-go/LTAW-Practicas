const http = require('http');
const fs = require('fs');
const url = require('url');
const PUERTO = 8080;

//-- Texto HTML de la página de error
const pagina_error = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: red">
    <h1 style="color: white">ERROR!!!!</h1>
</body>
</html>
`

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let page = ""

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log("recurso recibido" + url.pathname);

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname == '/') {
        page += "tienda.html";
       
    }else{
        page += "." + url.pathname
        console.log('ES EL NOMBREEE' + page);

    }
     //--
    
    console.log('Fichero a devolver: ' + page);
    
    var findout = page.split(".");
    console.log('FIND OUT: ' + findout);
    var type = findout[2];
    var selection = "";
    console.log("tipoooo " + type);
    if (type == "jpg"){
        selection = "image/jpg";
    }else if  (type == "html") {
        selection = "text/html";
    }else if(type == "css") {
        selection = "text/css";
    }else if (type == "jpeg"){
        selection = "image/jpeg";
    }else if (type == "png"){
        selection = "image/png";
    }else if (type == "ico"){
        selection = "image/ico";
    }else{
        selection = "text/html";
    }
    console.log("LA SELECCION ES  " + selection);
    //-- Fichero a leer

    fs.readFile(page, 'utf8', (err, data) => {

        if (err) {  //-- Ha ocurrido algun error
        console.log("Error!!");
        console.log(err.message);
        } 
        else {  //-- Lectura normal
            console.log("Lectura completada...");
            console.log("Contenido del fichero: \n");
            res.writeHead(200, {'Content-Type': selection});
            console.log("200 OK");
        }
        res.write(data);
        res.end();
    });
});

server.listen(PUERTO);

console.log("Ejemplo 7. Escuchando en puerto: " + PUERTO);